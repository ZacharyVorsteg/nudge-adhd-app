-- Nudge ADHD App Database Schema
-- Run this in your Supabase SQL Editor

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Users table for subscription tracking
create table if not exists users (
  id uuid primary key references auth.users on delete cascade,
  email text,
  stripe_customer_id text,
  is_pro boolean default false,
  pro_type text, -- 'lifetime' or 'annual'
  subscription_status text default 'free', -- free, active, canceled, past_due
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table users enable row level security;

-- RLS Policies
create policy "Users can view own data" on users
  for select using (auth.uid() = id);

create policy "Users can update own data" on users
  for update using (auth.uid() = id);

create policy "Users can insert own data" on users
  for insert with check (auth.uid() = id);

-- Function to auto-create user record on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to call function on user creation
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Function to update timestamp
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger for updated_at
create trigger update_users_updated_at
  before update on users
  for each row execute function update_updated_at();
