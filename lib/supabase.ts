import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storage: typeof window !== "undefined" ? localStorage : undefined,
  },
});

/**
 * Saves a file to Supabase Storage
 */
export async function saveFileToSupabase(fileName: string, content: string) {
  const { data, error } = await supabase
    .from("files")
    .upsert([{ name: fileName, content }]);

  if (error) {
    console.error("Error saving file:", error.message);
    return false;
  }

  return true;
}

/**
 * Fetches all files from Supabase
 */
export async function fetchFilesFromSupabase() {
  const { data, error } = await supabase.from("files").select("*");
  if (error) {
    console.error("Error fetching files:", error.message);
    return {};
  }

  return data.reduce((acc, file) => {
    acc[file.name] = file.content;
    return acc;
  }, {} as { [key: string]: string });
}
