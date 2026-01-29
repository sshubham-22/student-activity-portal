import { useQuery } from '@tanstack/react-query'
import { getCourses } from '../lib/api/courses'

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
        try {
          return await getCourses()
        } catch (err) {
          if (err instanceof Error) {
            console.error('Failed to fetch courses:', err.message)
          } else {
            console.error('Failed to fetch courses:', err)
          }
          throw err
        }
      },
})}
