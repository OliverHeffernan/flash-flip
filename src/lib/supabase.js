import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY;
console.log("URL: ", supabaseUrl);
console.log("KEY: ", supabaseAnonKey);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
