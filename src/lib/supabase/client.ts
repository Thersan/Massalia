import { createBrowserClient } from "@supabase/ssr";
import { supabaseUrl, supabaseAnonKey } from "./config";

/** Client Supabase côté navigateur (Client Components). */
export function createClient() {
  return createBrowserClient(supabaseUrl!, supabaseAnonKey!);
}
