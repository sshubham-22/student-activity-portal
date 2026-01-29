'use client'

import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/app/lib/supabase'

export function useStudent(userId?: string) {
  return useQuery({
    queryKey: ['student', userId],
    enabled: !!userId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      return data
    },
  })
}
