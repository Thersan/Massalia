-- =====================================================================
--  Massalia's Villa — Données de démonstration (seed)
--
--  PRÉREQUIS : crée d'abord un compte de démo via la page /signup du site
--  avec l'email ci-dessous, PUIS exécute ce script dans Supabase.
--
--  Email de démo : thersanjle01@gmail.com
-- =====================================================================

do $$
declare
  owner uuid;
begin
  select id into owner
  from auth.users
  where email = 'thersanjle01@gmail.com'
  limit 1;

  if owner is null then
    raise notice 'Compte introuvable. Inscris-toi d''abord sur /signup avec proprietaire@massalia-villas.fr puis relance ce script.';
    return;
  end if;

  -- Ce propriétaire gère 3 des 6 villas
  insert into public.villa_ownership (owner_id, villa_slug) values
    (owner, 'villa-calanque'),
    (owner, 'villa-roucas'),
    (owner, 'villa-pointe-rouge')
  on conflict (owner_id, villa_slug) do nothing;

  -- On repart d'une base propre pour les réservations de démo
  delete from public.reservations where owner_id = owner;

  insert into public.reservations
    (villa_slug, owner_id, guest_name, check_in, check_out, nights, amount, status) values
    -- Villa Calanque (980 €/nuit)
    ('villa-calanque',    owner, 'Famille Bernard',   '2026-01-12', '2026-01-19',  7,  6860, 'confirmee'),
    ('villa-calanque',    owner, 'M. et Mme Laurent', '2026-03-21', '2026-03-28',  7,  6860, 'confirmee'),
    ('villa-calanque',    owner, 'Sophie Renaud',     '2026-06-20', '2026-06-27',  7,  6860, 'en_cours'),
    ('villa-calanque',    owner, 'The Walker Family',  '2026-07-11', '2026-07-25', 14, 13720, 'confirmee'),
    ('villa-calanque',    owner, 'Klaus Berger',      '2026-04-04', '2026-04-08',  4,  3920, 'annulee'),
    -- Villa Roucas (1450 €/nuit)
    ('villa-roucas',      owner, 'Groupe Moreau',     '2026-02-14', '2026-02-21',  7, 10150, 'confirmee'),
    ('villa-roucas',      owner, 'Elena Rossi',       '2026-05-09', '2026-05-16',  7, 10150, 'confirmee'),
    ('villa-roucas',      owner, 'James Carter',      '2026-06-18', '2026-06-25',  7, 10150, 'en_cours'),
    ('villa-roucas',      owner, 'Famille Dubois',    '2026-08-01', '2026-08-15', 14, 20300, 'confirmee'),
    -- Villa Pointe Rouge (740 €/nuit)
    ('villa-pointe-rouge', owner, 'Camille Fabre',    '2026-04-25', '2026-05-02',  7,  5180, 'confirmee'),
    ('villa-pointe-rouge', owner, 'Lucas Martin',     '2026-06-15', '2026-06-22',  7,  5180, 'en_cours'),
    ('villa-pointe-rouge', owner, 'Anna Schmidt',     '2026-07-04', '2026-07-11',  7,  5180, 'confirmee'),
    ('villa-pointe-rouge', owner, 'Famille Garcia',   '2026-09-05', '2026-09-12',  7,  5180, 'confirmee');

  raise notice 'Données de démo insérées pour %', owner;
end $$;
