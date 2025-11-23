import { unstable_cache } from "next/cache";
import { BalldontlieAPI } from "@balldontlie/sdk";
import type { Team } from "@/types";

const api = new BalldontlieAPI({
  apiKey: process.env.BALLDONTLIE_API_KEY || "",
});

export const getCachedTeamsData = unstable_cache(
  async () => {
    try {
      const response = await api.nba.getTeams({});

      const teams: Team[] = response.data.map((team: any) => ({
        id: team.id,
        conference: team.conference,
        division: team.division,
        city: team.city,
        name: team.name,
        full_name: team.full_name,
        abbreviation: team.abbreviation,
      }));

      return {
        data: teams,
        error: null,
      };
    } catch (error: unknown) {
      console.error("Error fetching teams:", error);

      const errorMessage = error instanceof Error ? error.message : "Failed to fetch teams from BallDontLie API";

      return {
        data: [],
        error: errorMessage,
      };
    }
  },
  ["nba-teams"],
  {
    revalidate: 3600,
    tags: ["teams"],
  }
);
