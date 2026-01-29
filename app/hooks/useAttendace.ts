import { useQuery } from '@tanstack/react-query'
import { supabase } from '../lib/supabase'

export type Attendance = { id: number; student_id: string; course_id: number; date: string; status: string }

export const useAttendance = (studentId: string) =>
  useQuery({
    queryKey: ['attendance', studentId],
    queryFn: async () => {
      const { data, error } = await supabase.from('attendance').select('*').eq('student_id', studentId).order('date', { ascending: false })
      if (error) throw new Error(error.message)
      return data
    },
    enabled: !!studentId,
  })
