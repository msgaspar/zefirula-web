import { useQuery } from "react-query"
import { api } from "../api"

type League = {
  id: string;
  name: string;
  clubs_count: number;
}

export function useLeagues() {
  return useQuery<League[]>('leagues', async () => {
    const { data } = await api.get('leagues')
    return data
  }, {
    staleTime: 1000 * 60 * 10
  })
}