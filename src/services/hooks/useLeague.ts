import { useQuery } from "react-query";
import { api } from "../api";

export function useLeague(leagueId: string) {
  return useQuery(['league', leagueId], () => getLeagueById(leagueId), {
    enabled: !!leagueId,
  })
}

const getLeagueById = async (id) => {
  const { data } = await api.get(`http://localhost:3333/leagues/${id}`)
  return data
}