import { QueryClient } from '@tanstack/react-query'
const FIVE_MIN= 1000 * 60 * 5
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: FIVE_MIN,
      refetchOnWindowFocus: false,
    },
  },
})
