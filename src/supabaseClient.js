import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://hxmooenepoxphhiaknay.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4bW9vZW5lcG94cGhoaWFrbmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI0MDU4ODYsImV4cCI6MjA3Nzk4MTg4Nn0.x8qZVvSS50vzAPZZ5niejgk3g_DrUplZzuRlj-pkid0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
