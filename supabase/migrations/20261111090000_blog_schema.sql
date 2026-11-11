-- Blog backend: posts, categories, authors, leads and the admin allowlist.
-- Access rules live in the next migration; this one only creates the tables.
-- See docs/superpowers/specs/2026-11-11-blog-backend.md.

create schema if not exists private;

create function private.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Writers and the reviewing accountant share this table.
create table public.authors (
  id uuid primary key default gen_random_uuid(),
  wp_id bigint unique,
  slug text not null unique check (slug <> ''),
  name text not null check (name <> ''),
  job_title text,
  bio text,
  avatar text,
  same_as text[] not null default '{}',
  credentials text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  wp_id bigint unique,
  -- The preserved WordPress path, decoded, with both slashes: /accounting/
  path text not null unique check (path like '/%/'),
  slug text not null check (slug <> ''),
  name text not null check (name <> ''),
  lang text not null default 'ar' check (lang in ('ar', 'en')),
  seo_title text,
  seo_description text,
  intro text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  wp_id bigint unique,
  -- 'template' can join this list later.
  type text not null default 'post' check (type in ('post', 'news')),
  lang text not null default 'ar' check (lang in ('ar', 'en')),
  -- The exact preserved path, decoded, with both slashes: /accounting/<slug>/
  path text not null unique check (path like '/%/'),
  slug text not null check (slug <> ''),
  title text not null,
  seo_title text,
  seo_description text,
  excerpt text,
  content_json jsonb,
  content_html text not null default '',
  cover_image text,
  cover_alt text,
  primary_category_id uuid references public.categories (id) on delete set null,
  author_id uuid references public.authors (id) on delete set null,
  reviewed_by_id uuid references public.authors (id) on delete set null,
  faq jsonb,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  modified_at timestamptz,
  alternate_post_id uuid references public.posts (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint posts_published_has_date check (status <> 'published' or published_at is not null)
);

create table public.post_categories (
  post_id uuid not null references public.posts (id) on delete cascade,
  category_id uuid not null references public.categories (id) on delete cascade,
  primary key (post_id, category_id)
);

-- Form submissions. The public may add rows and never read them.
create table public.leads (
  id uuid primary key default gen_random_uuid(),
  form text not null check (char_length(form) between 1 and 64),
  name text check (char_length(name) <= 200),
  email text check (char_length(email) <= 320),
  phone text check (char_length(phone) <= 40),
  company text check (char_length(company) <= 200),
  message text check (char_length(message) <= 5000),
  payload jsonb check (payload is null or pg_column_size(payload) <= 8192),
  locale text check (locale in ('ar', 'en')),
  page_path text check (char_length(page_path) <= 500),
  utm jsonb check (utm is null or pg_column_size(utm) <= 2048),
  user_agent text check (char_length(user_agent) <= 500),
  created_at timestamptz not null default now()
);

-- Who may use the editor. Rows are added by migration only.
create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index posts_listing_idx on public.posts (status, lang, type, published_at desc);
create index posts_primary_category_idx on public.posts (primary_category_id);
create index posts_author_idx on public.posts (author_id);
create index posts_reviewed_by_idx on public.posts (reviewed_by_id);
create index posts_alternate_idx on public.posts (alternate_post_id);
create index post_categories_category_idx on public.post_categories (category_id);
create index leads_form_created_idx on public.leads (form, created_at desc);

create trigger authors_set_updated_at before update on public.authors
  for each row execute function private.set_updated_at();
create trigger categories_set_updated_at before update on public.categories
  for each row execute function private.set_updated_at();
create trigger posts_set_updated_at before update on public.posts
  for each row execute function private.set_updated_at();
