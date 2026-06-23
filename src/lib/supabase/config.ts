export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** Vrai uniquement si les deux variables d'environnement Supabase sont définies. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);
