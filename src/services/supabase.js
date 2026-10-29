import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bicbzthevssbydvjnrda.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpY2J6dGhldnNzYnlkdmpucmRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5NTYzNjYsImV4cCI6MjA2MzUzMjM2Nn0.NSDY66mMeGQaOexQ_a-ZcuIFD8X2PiT7_xUi_Z6R_KE';

export const supabase = createClient(supabaseUrl, supabaseKey);

export const getHerbs = async () => {
  const { data, error } = await supabase
    .from('herbs')
    .select('*')
    .order('name_tr', { ascending: true });
  
  if (error) {
    console.error('Error fetching herbs:', error);
    return [];
  }
  return data;
};

export const getHerbById = async (id) => {
  const { data, error } = await supabase
    .from('herbs')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    console.error('Error fetching herb:', error);
    return null;
  }
  return data;
};

export const searchHerbs = async (query) => {
  const { data, error } = await supabase
    .from('herbs')
    .select('*')
    .or(`name_tr.ilike.%${query}%,description_tr.ilike.%${query}%`)
    .limit(10);
  
  if (error) {
    console.error('Error searching herbs:', error);
    return [];
  }
  return data;
};