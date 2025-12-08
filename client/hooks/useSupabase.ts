"import { createClientSupabase } from '@shared/supabase';
import { useMemo } from 'react';

export function useSupabase() {
  const supabase = useMemo(() => {
    try {
      return createClientSupabase();
    } catch (error) {
      console.error('Failed to create Supabase client:', error);
      return null;
    }
  }, []);

  return supabase;
}
"
