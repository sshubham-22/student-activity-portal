import { supabase } from '../supabase'

export type Attendance = {
  id: number
  student_id: string
  course_id: string
  date: string
  status: 'present' | 'absent'
}

export async function getAttendance(studentId: string): Promise<Attendance[]> {
  const { data, error } = await supabase
    .from('attendance')
    .select('*')
    .eq('student_id', studentId)
    .order('date', { ascending: false })

  if (error) throw new Error(error.message)

  return data
}
