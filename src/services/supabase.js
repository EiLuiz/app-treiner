import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Pegue essas chaves no painel do Supabase (Project Settings > API)
const supabaseUrl = 'https://nezrieaufmkthdyrrecw.supabase.co';
const supabaseAnonKey = 'sb_publishable_k1wOyqGvlS88o1FU1QzseQ_yWkCtbjM';



export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});