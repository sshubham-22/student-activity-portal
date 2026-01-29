import { supabase } from './supabase'

export async function signUp(
  email: string,
  password: string,
  name: string,
) {
  
  const { data, error } = await supabase.auth.signUp({
    
    email,
    password,
    options:{
      data:{name},
    },
  })

  if (error) throw error
  if (!data.user) throw new Error('User not created')
  console.log(data.user)
  
  const { error: dbError } = await supabase
    .from('students')
    .upsert({
      id: data.user.id,   
      name: name,
      email,
      department:'',
    })

  if (dbError) throw dbError

  return data.user
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export async function signOut() {
  await supabase.auth.signOut()
}
