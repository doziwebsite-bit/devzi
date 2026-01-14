-- Create Projects Table
create table if not exists projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  name text not null,
  status text check (status in ('active', 'completed', 'archived')) default 'active',
  progress integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Timeline Steps Table
create table if not exists timeline_steps (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  title text not null,
  status text check (status in ('done', 'active', 'pending')) default 'pending',
  date_label text,
  description text,
  order_index integer not null
);

-- Create Assets Table
create table if not exists assets (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references projects(id) on delete cascade not null,
  icon_name text not null,
  label text not null,
  sub_label text,
  url text
);

-- Enable RLS
alter table projects enable row level security;
alter table timeline_steps enable row level security;
alter table assets enable row level security;

-- Policies for Projects
drop policy if exists "Users can view their own projects" on projects;
create policy "Users can view their own projects" on projects for select using (auth.uid() = user_id);

-- Policies for Timeline Steps
drop policy if exists "Users can view timeline steps for their projects" on timeline_steps;
create policy "Users can view timeline steps for their projects" on timeline_steps for select using (
  exists ( select 1 from projects where id = timeline_steps.project_id and user_id = auth.uid() )
);

-- Policies for Assets
drop policy if exists "Users can view assets for their projects" on assets;
create policy "Users can view assets for their projects" on assets for select using (
  exists ( select 1 from projects where id = assets.project_id and user_id = auth.uid() )
);
