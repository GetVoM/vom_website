-- Owner ruling, 2026-11-11: leads are written by the server only, with the
-- secret key, after the Turnstile check. The public key can no longer add rows,
-- so nobody can post to the table directly and skip the check.
drop policy "Public adds leads" on public.leads;
revoke insert on public.leads from anon, authenticated;

-- The first admin: the user the owner created in the dashboard.
insert into public.admins (user_id)
select id from auth.users where email = 'a.fani@getvom.com'
on conflict (user_id) do nothing;
