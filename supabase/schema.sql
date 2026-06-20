-- Supabase schema for the Amazon DSP ATS/backoffice prototype.
create type app_role as enum ('owner','operations_manager','trainer','recruiter','dispatcher');
create type candidate_status as enum ('New Applicant','Interview Scheduled','Background Check','Drug Test','Onboarding','Active Driver','Rejected');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role app_role not null default 'recruiter',
  created_at timestamptz not null default now()
);

create table candidates (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text not null,
  city text,
  preferred_zone text,
  preferred_shift text,
  start_timeline text,
  status candidate_status not null default 'New Applicant',
  resume_path text,
  drivers_license_path text,
  interview_at timestamptz,
  assigned_recruiter uuid references profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table training_assignments (
  id uuid primary key default gen_random_uuid(),
  candidate_id uuid not null references candidates(id) on delete cascade,
  trainer_id uuid not null references profiles(id),
  status text not null default 'Assigned',
  notes text,
  approved boolean,
  updated_at timestamptz not null default now()
);

create table incidents (
  id uuid primary key default gen_random_uuid(),
  driver_name text not null,
  route text,
  severity text not null default 'medium',
  description text not null,
  reported_by uuid references profiles(id),
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;
alter table candidates enable row level security;
alter table training_assignments enable row level security;
alter table incidents enable row level security;

create policy "profiles read own or owner" on profiles for select using (auth.uid() = id or exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'owner'));
create policy "owner full candidates" on candidates for all using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'owner'));
create policy "ops and recruiters manage candidates" on candidates for all using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('operations_manager','recruiter')));
create policy "trainers view assigned trainees" on training_assignments for select using (trainer_id = auth.uid() or exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('owner','operations_manager')));
create policy "dispatchers manage incidents" on incidents for all using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('owner','operations_manager','dispatcher')));
