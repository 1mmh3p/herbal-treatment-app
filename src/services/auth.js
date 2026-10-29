import { supabase } from './supabase';

export const signIn = async (email, password) => {
  const { user, error } = await supabase.auth.signIn({ email, password });
  if (error) throw error;
  return user;
};

export const signUp = async (email, password, name) => {
  const { user, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  
  // Kullanıcı profilini güncelle
  const { error: profileError } = await supabase
    .from('profiles')
    .insert([{ id: user.id, name, email }]);
  
  if (profileError) throw profileError;
  return user;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  const user = supabase.auth.user();
  if (!user) return null;
  
  // Profil bilgilerini getir
  const { data, error } = await supabase
    .from('profiles')
    .select('name')
    .eq('id', user.id)
    .single();
  
  if (error) console.error('Error fetching profile:', error);
  return { ...user, name: data?.name };
};