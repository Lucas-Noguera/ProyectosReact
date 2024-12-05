import { useInfiniteQuery } from '@tanstack/react-query'
import { fetchUsers } from '../services/users'
import { User } from '../types'

export const useUsers = () => {
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery<{ users: User[]; nextCursor?: number }, Error>({
    queryKey: ['users'],
    queryFn: ({ pageParam }: { pageParam?: unknown }) => fetchUsers({ pageParam: pageParam as number || 1 }),  // Asegúrate de convertir pageParam a number
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 10,
    initialPageParam: 1,
  })

  return {
    data,
    isLoading,
    isError,
    fetchNextPage,
    users: data?.pages.flatMap((page) => page.users) ?? [],
    hasNextPage,
    refetch,
  }
}