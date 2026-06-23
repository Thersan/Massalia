import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { supabaseUrl, supabaseAnonKey } from "./config";

/**
 * Client Supabase côté serveur (Server Components, Route Handlers).
 * Retourne null si Supabase n'est pas configuré, afin que la vitrine
 * publique fonctionne sans base de données.
 */
export async function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  const cookieStore = await cookies();

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // Appelé depuis un Server Component : ignoré, le middleware rafraîchit la session.
        }
      },
    },
  });
}
