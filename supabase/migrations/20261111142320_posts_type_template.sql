-- Templates (the WordPress "templates" post type: downloadable forms with an
-- explanatory article) join posts and news as a third type, at /templates/<slug>/.
alter table public.posts drop constraint posts_type_check;
alter table public.posts add constraint posts_type_check check (type in ('post', 'news', 'template'));
