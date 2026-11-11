-- Access rules. Everything is denied unless a grant and a policy both allow it:
-- row level security is on for every table, the default grants are removed,
-- and each role gets back only what it needs.

-- True when the signed-in user is on the admin allowlist. It lives outside the
-- exposed schema, so the API cannot call it directly.
create function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.admins where user_id = (select auth.uid())
  );
$$;

revoke all on function private.is_admin() from public, anon;
grant usage on schema private to authenticated;
grant execute on function private.is_admin() to authenticated;

alter table public.authors enable row level security;
alter table public.categories enable row level security;
alter table public.posts enable row level security;
alter table public.post_categories enable row level security;
alter table public.leads enable row level security;
alter table public.admins enable row level security;

revoke all on public.authors, public.categories, public.posts,
  public.post_categories, public.leads, public.admins
  from anon, authenticated;

grant select on public.authors, public.categories, public.posts, public.post_categories to anon;
grant insert on public.leads to anon;

grant select, insert, update, delete
  on public.authors, public.categories, public.posts, public.post_categories
  to authenticated;
grant select, insert, delete on public.leads to authenticated;
grant select on public.admins to authenticated;

-- posts: the public reads published rows; admins read and write everything.
create policy "Public reads published posts" on public.posts
  for select to anon using (status = 'published');
create policy "Signed-in users read published posts, admins read all" on public.posts
  for select to authenticated using (status = 'published' or (select private.is_admin()));
create policy "Admins add posts" on public.posts
  for insert to authenticated with check ((select private.is_admin()));
create policy "Admins change posts" on public.posts
  for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins remove posts" on public.posts
  for delete to authenticated using ((select private.is_admin()));

-- categories
create policy "Anyone reads categories" on public.categories
  for select to anon, authenticated using (true);
create policy "Admins add categories" on public.categories
  for insert to authenticated with check ((select private.is_admin()));
create policy "Admins change categories" on public.categories
  for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins remove categories" on public.categories
  for delete to authenticated using ((select private.is_admin()));

-- authors
create policy "Anyone reads authors" on public.authors
  for select to anon, authenticated using (true);
create policy "Admins add authors" on public.authors
  for insert to authenticated with check ((select private.is_admin()));
create policy "Admins change authors" on public.authors
  for update to authenticated using ((select private.is_admin())) with check ((select private.is_admin()));
create policy "Admins remove authors" on public.authors
  for delete to authenticated using ((select private.is_admin()));

-- post_categories
create policy "Anyone reads post categories" on public.post_categories
  for select to anon, authenticated using (true);
create policy "Admins add post categories" on public.post_categories
  for insert to authenticated with check ((select private.is_admin()));
create policy "Admins remove post categories" on public.post_categories
  for delete to authenticated using ((select private.is_admin()));

-- leads: the public may add a row and nothing else; admins read and delete.
create policy "Public adds leads" on public.leads
  for insert to anon, authenticated with check (char_length(form) between 1 and 64);
create policy "Admins read leads" on public.leads
  for select to authenticated using ((select private.is_admin()));
create policy "Admins remove leads" on public.leads
  for delete to authenticated using ((select private.is_admin()));

-- admins: an admin can see the list; nobody changes it through the API.
create policy "Admins read the allowlist" on public.admins
  for select to authenticated using ((select private.is_admin()));
