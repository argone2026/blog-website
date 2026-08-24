-- Run this in the Supabase SQL editor (Project -> SQL Editor -> New query)

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text not null default '',
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table posts enable row level security;

-- Anyone (including signed-out visitors) can read published posts
create policy "Public can read published posts"
  on posts for select
  using (published = true);

-- Signed-in users (you, the admin) can read/write everything, drafts included
create policy "Authenticated users manage posts"
  on posts for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- Keep updated_at current on every edit
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists posts_updated_at on posts;
create trigger posts_updated_at
before update on posts
for each row execute function set_updated_at();
