---
id: w11-supabase
title: "Supabase free: database and login"
week: 11
estimatedMinutes: 10
tags: [tool, supabase, database, auth]
---

## What it is

**Supabase** is an open-source backend platform built on **PostgreSQL** (a relational database). It provides a database, **authentication** (email, magic links, social login), file storage, **Edge Functions** (server-side code) and auto-generated APIs. The free plan suits small projects (check current limits; inactive free projects may be paused after a period).

## Why PMs use it

It gives your P4 app real user accounts, a real database and a safe place to run server-side code (like calling the Gemini API with a secret key). You’ll apply Week 7 concepts directly: SQL tables, keys, auth tokens and permissions.

## Account setup (free plan)

1. Go to supabase.com → **Start your project** → sign in with GitHub.
2. **New project:** name it “p4”, set a strong database password (store it privately), choose a region close to your users (e.g., Mumbai/ap-south-1 if available).
3. Wait a minute for the project to provision.

## Walkthrough: tables, security, auth and a function

### 1. Create tables (Table Editor or SQL Editor)
In **SQL Editor**, run something like:
```sql
create table groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz default now()
);
create table members (
  group_id uuid references groups(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  display_name text not null,
  primary key (group_id, user_id)
);
create table expenses (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references groups(id) on delete cascade,
  description text,
  amount numeric(12,2) not null check (amount > 0),
  paid_by uuid references auth.users(id),
  created_at timestamptz default now()
);
create table ai_feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  draft_id text,
  rating text check (rating in ('up','down')),
  created_at timestamptz default now()
);
```
(If you built with Lovable, it may have created similar tables; review them instead.)

### 2. Turn on Row Level Security (RLS)
**Row Level Security** lets the database enforce who can read or write each row. Without it, anyone with your public key could read every table.
1. For each table: **Authentication → Policies** (or Table Editor → RLS) → **Enable RLS**.
2. Add policies, e.g., members can read expenses of groups they belong to:
```sql
alter table expenses enable row level security;
create policy "members read group expenses" on expenses
  for select using (
    exists (select 1 from members m where m.group_id = expenses.group_id and m.user_id = auth.uid())
  );
create policy "members add group expenses" on expenses
  for insert with check (
    exists (select 1 from members m where m.group_id = expenses.group_id and m.user_id = auth.uid())
  );
```
3. Test with two accounts: user A must not see user B’s group.

### 3. Set up authentication
1. **Authentication → Providers:** enable **Email** (magic link). Optionally Google.
2. **URL configuration:** add your app’s URL (preview and production) to allowed redirect URLs.
3. Customise email templates (friendly, short).

### 4. Create an Edge Function for the AI call
1. Edge Functions run server-side, so your **Gemini key stays secret**.
2. Add the key: **Project Settings → Edge Functions → Secrets** (or `supabase secrets set GEMINI_API_KEY=...` with the CLI).
3. Create a function `parse-expense` (via the dashboard, CLI, or let Lovable generate it) that:
   - checks the user is logged in (reads the auth token),
   - sends the message + group member names to Gemini with your system prompt and JSON schema,
   - validates the JSON (amounts positive, names in the group),
   - returns the draft (doesn’t save it; the user confirms first).
4. Log latency and token usage (and optionally send a trace to Langfuse).

### 5. Data deletion (DPDP-friendly)
Add a “Delete my data” action that deletes the user’s rows (cascade) and their auth account (via an Edge Function using the service role key, kept secret).

## Tips

- **RLS on every table** before real users arrive. This is the most common security mistake in quick builds.
- **Never expose the service role key** in the front end; only use it in server functions.
- **Use `numeric` for money**, never floating-point.
- **Back up**: export your schema SQL to your GitHub repo.
- **Watch free-tier pausing**: open the dashboard occasionally if your project is idle.
