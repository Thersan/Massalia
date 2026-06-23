# Massalia — Villas d'exception à Marseille

Site web de la maison **Massalia**, gestion et location de villas d'exception à Marseille.

- **Vitrine publique** : page d'accueil + 6 pages de villas (galerie photos, équipements, contact).
- **Espace propriétaires** : connexion sécurisée, tableau de bord des revenus et réservations par villa.

Construit avec **Next.js 16** (App Router), **Tailwind CSS v4** et **Supabase** (authentification + base de données). Déployable en un clic sur **Vercel**.

> La vitrine publique fonctionne **sans configuration**. Supabase n'est nécessaire que pour l'espace propriétaires (`/login`, `/dashboard`).

---

## 1. Démarrage local

```bash
npm install
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000).

Sans variables d'environnement, le site public est entièrement fonctionnel ; `/login` affichera un message indiquant que l'espace propriétaires n'est pas configuré.

---

## 2. Configurer l'espace propriétaires (Supabase)

1. Crée un projet gratuit sur [supabase.com](https://supabase.com).
2. Dans **Settings → API**, copie l'URL du projet et la clé `anon public`.
3. Crée un fichier `.env.local` à la racine (modèle dans `.env.example`) :

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

4. Dans Supabase, ouvre **SQL Editor** et exécute le contenu de [`supabase/schema.sql`](./supabase/schema.sql)
   (crée les tables `profiles`, `villa_ownership`, `reservations`, les politiques RLS et le trigger de création de profil).
5. *(Recommandé pour la démo)* Dans **Authentication → Providers → Email**, désactive
   « Confirm email » pour pouvoir te connecter immédiatement après inscription.

### Données de démonstration

1. Lance le site, va sur `/signup` et crée un compte avec l'email
   **`proprietaire@massalia-villas.fr`**.
2. Dans Supabase **SQL Editor**, exécute [`supabase/seed.sql`](./supabase/seed.sql).
   Ce script rattache 3 villas à ce compte et insère des réservations de démonstration.
3. Connecte-toi : le tableau de bord affiche revenus, graphiques et réservations.

Les **slugs de villas** (`villa-calanque`, `villa-roucas`, …) sont définis dans
[`src/data/villas.ts`](./src/data/villas.ts) et servent de lien entre le catalogue (statique)
et les données Supabase.

---

## 3. Déploiement sur Vercel

1. Pousse le projet sur un dépôt GitHub.
2. Sur [vercel.com/new](https://vercel.com/new), importe le dépôt (Vercel détecte Next.js automatiquement).
3. Dans **Environment Variables**, ajoute :
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Clique sur **Deploy**.
5. *(Si tu as activé la confirmation d'email)* ajoute l'URL Vercel dans Supabase
   **Authentication → URL Configuration → Site URL / Redirect URLs**.

> Astuce : sans les variables d'environnement, le déploiement réussit quand même et la vitrine
> publique reste en ligne. Tu peux les ajouter plus tard.

---

## Structure du projet

```
src/
  app/
    page.tsx                    # Page d'accueil
    villas/[slug]/page.tsx      # Pages publiques des 6 villas
    login/ · signup/            # Authentification propriétaires
    auth/actions.ts             # Server Actions (login/signup/signout)
    dashboard/                  # Espace privé (garde d'auth via proxy.ts)
      page.tsx                  # KPIs, revenus, villas, réservations
      villas/[slug]/page.tsx    # Détail de gestion par villa
  components/                   # Header, Footer, Hero, VillaCard, Gallery, dashboard/*
  data/villas.ts               # Catalogue statique des 6 villas (source de vérité)
  lib/
    supabase/                  # Clients navigateur/serveur + session (proxy)
    dashboard.ts               # Agrégations revenus/réservations
    format.ts · types.ts
  proxy.ts                      # Rafraîchit la session + protège /dashboard
supabase/
  schema.sql                    # Tables + RLS + trigger
  seed.sql                      # Données de démonstration
```

## Scripts

| Commande        | Description                          |
| --------------- | ------------------------------------ |
| `npm run dev`   | Serveur de développement             |
| `npm run build` | Build de production                  |
| `npm run start` | Sert le build de production          |
| `npm run lint`  | Analyse ESLint                       |

---

Les photos proviennent d'[Unsplash](https://unsplash.com) (libres d'usage). © Massalia Villas.
