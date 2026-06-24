-- =====================================================================
--  Massalia's Villa — Schéma de la base de données (espace propriétaires)
--  À exécuter dans l'éditeur SQL de Supabase.
--  Idempotent : peut être relancé sans risque.
-- =====================================================================
-- ---------- Profils ----------
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  full_name  text,
  email      text,
  role       text default 'proprietaire',
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

drop policy if exists "Voir son profil" on public.profiles;
create policy "Voir son profil"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Modifier son profil" on public.profiles;
create policy "Modifier son profil"
  on public.profiles for update
  using (auth.uid() = id);

-- Création automatique du profil à l'inscription
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data ->> 'full_name', new.email)
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- Propriété des villas ----------
-- villa_slug correspond aux slugs définis dans src/data/villas.ts
create table if not exists public.villa_ownership (
  id         uuid primary key default gen_random_uuid(),
  owner_id   uuid not null references public.profiles (id) on delete cascade,
  villa_slug text not null,
  created_at timestamptz default now(),
  unique (owner_id, villa_slug)
);

alter table public.villa_ownership enable row level security;

drop policy if exists "Voir ses villas" on public.villa_ownership;
create policy "Voir ses villas"
  on public.villa_ownership for select
  using (auth.uid() = owner_id);

-- ---------- Réservations ----------
create table if not exists public.reservations (
  id         uuid primary key default gen_random_uuid(),
  villa_slug text not null,
  owner_id   uuid not null references public.profiles (id) on delete cascade,
  guest_name text not null,
  check_in   date not null,
  check_out  date not null,
  nights     int  not null,
  amount     numeric not null,
  status     text not null default 'confirmee'
             check (status in ('confirmee', 'en_cours', 'annulee')),
  created_at timestamptz default now()
);

alter table public.reservations enable row level security;

drop policy if exists "Voir ses réservations" on public.reservations;
create policy "Voir ses réservations"
  on public.reservations for select
  using (auth.uid() = owner_id);

drop policy if exists "Créer ses réservations" on public.reservations;
create policy "Créer ses réservations"
  on public.reservations for insert
  with check (auth.uid() = owner_id);

drop policy if exists "Modifier ses réservations" on public.reservations;
create policy "Modifier ses réservations"
  on public.reservations for update
  using (auth.uid() = owner_id);

create index if not exists reservations_owner_idx on public.reservations (owner_id);
create index if not exists reservations_villa_idx on public.reservations (villa_slug);
