import { supabase } from "../supabase"


export type Course = {
  id: string
  code: string
  title: string
  credits: number
  instructor: string
  status: 'active' | 'archived' 
}

export async function getCourses(): Promise<Course[]> {
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('code')
  
    if (error) throw new Error(error.message)
  
    
    return data.map(course => ({
      ...course,
      status: course.status ?? 'active',
    }))
}
