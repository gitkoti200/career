-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Table: User Profiles
-- Extends the default Supabase 'auth.users' table
create table user_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  email text,
  education text,
  interests text[], -- Array of strings
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: Resumes
create table resumes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references user_profiles(id) on delete cascade,
  resume_text text,
  extracted_skills text[],
  extracted_experience text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: Career Recommendations
create table career_recommendations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references user_profiles(id) on delete cascade,
  role text not null,
  match_score integer,
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: Skill Gaps
create table skill_gaps (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references user_profiles(id) on delete cascade,
  career_role text,
  missing_skills text[],
  priority text, -- 'High', 'Medium', 'Low'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Table: Learning Roadmaps
-- Stores the JSON structure of the roadmap
create table learning_roadmaps (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references user_profiles(id) on delete cascade,
  career_role text,
  roadmap_data jsonb, -- Stores the week-by-week plan
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS Policies (Row Level Security)
-- Allow users to only see/edit their own data

alter table user_profiles enable row level security;
create policy "Users can view own profile" on user_profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on user_profiles for update using (auth.uid() = id);
-- Trigger to create profile on sign up
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.user_profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


alter table resumes enable row level security;
create policy "Users can view own resumes" on resumes for select using (auth.uid() = user_id);
create policy "Users can insert own resumes" on resumes for insert with check (auth.uid() = user_id);

alter table career_recommendations enable row level security;
create policy "Users can view own matches" on career_recommendations for select using (auth.uid() = user_id);

alter table skill_gaps enable row level security;
create policy "Users can view own gaps" on skill_gaps for select using (auth.uid() = user_id);

alter table learning_roadmaps enable row level security;
create policy "Users can view own roadmaps" on learning_roadmaps for select using (auth.uid() = user_id);
