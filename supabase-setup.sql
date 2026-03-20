-- ============================================================
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- This creates all the tables Inkvoice needs.
-- ============================================================

-- Profiles table: tracks Pro status for each user
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  is_pro boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Automatically create a profile when a new user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, is_pro)
  values (new.id, false);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- Invoices table: stores saved invoices
create table if not exists invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  "invoiceNumber" text,
  date text,
  "dueDate" text,
  "from" jsonb default '{}'::jsonb,
  "to" jsonb default '{}'::jsonb,
  items jsonb default '[]'::jsonb,
  notes text default '',
  "taxRate" numeric default 0,
  "discountRate" numeric default 0,
  currency text default 'USD',
  template text default 'modern',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Saved profiles (your business info)
create table if not exists saved_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  name text default '',
  email text default '',
  address1 text default '',
  address2 text default '',
  city text default '',
  state text default '',
  zip text default '',
  phone text default ''
);

-- Saved clients
create table if not exists saved_clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users on delete cascade not null,
  name text default '',
  email text default '',
  address1 text default '',
  address2 text default '',
  city text default '',
  state text default '',
  zip text default '',
  phone text default ''
);

-- ============================================================
-- Row Level Security (RLS)
-- This ensures users can only see/edit their own data.
-- ============================================================

alter table profiles enable row level security;
alter table invoices enable row level security;
alter table saved_profiles enable row level security;
alter table saved_clients enable row level security;

-- Profiles: users can read/update their own profile
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles
  for insert with check (auth.uid() = id);

-- Invoices: users can CRUD their own invoices
create policy "Users can view own invoices" on invoices
  for select using (auth.uid() = user_id);
create policy "Users can insert own invoices" on invoices
  for insert with check (auth.uid() = user_id);
create policy "Users can update own invoices" on invoices
  for update using (auth.uid() = user_id);
create policy "Users can delete own invoices" on invoices
  for delete using (auth.uid() = user_id);

-- Saved profiles: users can CRUD their own
create policy "Users can view own saved_profiles" on saved_profiles
  for select using (auth.uid() = user_id);
create policy "Users can insert own saved_profiles" on saved_profiles
  for insert with check (auth.uid() = user_id);
create policy "Users can update own saved_profiles" on saved_profiles
  for update using (auth.uid() = user_id);
create policy "Users can delete own saved_profiles" on saved_profiles
  for delete using (auth.uid() = user_id);

-- Saved clients: users can CRUD their own
create policy "Users can view own saved_clients" on saved_clients
  for select using (auth.uid() = user_id);
create policy "Users can insert own saved_clients" on saved_clients
  for insert with check (auth.uid() = user_id);
create policy "Users can update own saved_clients" on saved_clients
  for update using (auth.uid() = user_id);
create policy "Users can delete own saved_clients" on saved_clients
  for delete using (auth.uid() = user_id);
