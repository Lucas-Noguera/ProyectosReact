export const fetchUsers = async ({ pageParam = 1 }: { pageParam?: number }) => {
  const response = await fetch(`https://randomuser.me/api?results=10&seed=lucas&page=${pageParam}`)
  const data = await response.json()
  return {
    users: data.results,
    nextCursor: data.info.page < 3 ? data.info.page + 1 : undefined,
  }
}