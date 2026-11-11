-- The cover image's pixel size, so pages can reserve its space before it loads.
alter table public.posts
  add column cover_width integer check (cover_width > 0),
  add column cover_height integer check (cover_height > 0);
