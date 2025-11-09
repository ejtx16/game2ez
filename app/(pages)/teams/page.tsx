import { Suspense } from "react";
import { unstable_cache } from "next/cache";
import { BalldontlieAPI } from "@balldontlie/sdk";
import type { Team } from "@/types";
import TeamCard from "./TeamCard";
import TeamsSearch from "./TeamsSearch";

const api = new BalldontlieAPI({
  apiKey: process.env.BALLDONTLIE_API_KEY || "",
});

// Cached function to fetch teams from the API
const getCachedTeamsData = unstable_cache(
  async () => {
    try {
      // Fetch all teams from BallDontLie API
      const response = await api.nba.getTeams({});

      // Convert to our Team type
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

      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to fetch teams from BallDontLie API";

      return {
        data: [],
        error: errorMessage,
      };
    }
  },
  ["nba-teams"], // Cache key/tag
  {
    revalidate: 3600, // Revalidate every 1 hour (3600 seconds)
    tags: ["teams"], // Cache tags for manual invalidation
  }
);

// Server Component to fetch teams
async function getTeamsData() {
  return getCachedTeamsData();
}

// Server Component to display teams
async function TeamsList() {
  const { data: teams, error } = await getTeamsData();

  if (error) {
    const isRateLimitError =
      error.toLowerCase().includes("rate limit") ||
      error.toLowerCase().includes("429");

    return (
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <svg
            className="w-6 h-6 text-red-600 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
            Error Loading Teams
          </h3>
        </div>
        <p className="text-red-800 dark:text-red-200">
          {isRateLimitError
            ? "API rate limit exceeded. Please wait a few moments and refresh the page."
            : error}
        </p>
        {isRateLimitError && (
          <p className="text-sm text-red-600 dark:text-red-300 mt-2">
            The BallDontLie API has rate limits. Try refreshing in a few
            seconds.
          </p>
        )}
      </div>
    );
  }

  if (!teams || teams.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
        No teams data available
      </div>
    );
  }

  return <TeamsSearch teams={teams} />;
}

export default async function TeamsPage() {
  return (
    <div className="container mx-auto px-4 py-8 min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
          NBA Teams
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg">
          Browse all NBA teams fetched from the BallDontLie API
        </p>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 animate-pulse"
              >
                <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded mb-2"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        }
      >
        <TeamsList />
      </Suspense>
    </div>
  );
}
