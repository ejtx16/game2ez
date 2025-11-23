import { Suspense } from "react";
import type { Team } from "@/types";
import TeamCard from "./TeamCard";
import TeamsSearch from "./TeamsSearch";
import { getCachedTeamsData } from "@/lib/api/teams";

// Server Component to display teams
async function TeamsList() {
  const { data: teams, error } = await getCachedTeamsData();
  // The `teams` data variable is used throughout this component:
  // - Passed to TeamsSearch component as prop: <TeamsSearch teams={teams} />
  // - Used in error handling: if (!teams || teams.length === 0)
  // - Rendered through TeamCard components in the TeamsSearch component

  if (error) {
    const isRateLimitError = error.toLowerCase().includes("rate limit") || error.toLowerCase().includes("429");

    return (
      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-2">
          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Error Loading Teams</h3>
        </div>
        <p className="text-red-800 dark:text-red-200">
          {isRateLimitError ? "API rate limit exceeded. Please wait a few moments and refresh the page." : error}
        </p>
        {isRateLimitError && (
          <p className="text-sm text-red-600 dark:text-red-300 mt-2">
            The BallDontLie API has rate limits. Try refreshing in a few seconds.
          </p>
        )}
      </div>
    );
  }

  if (!teams || teams.length === 0) {
    return <div className="text-center py-8 text-zinc-500 dark:text-zinc-400">No teams data available</div>;
  }

  return <TeamsSearch teams={teams} />;
}

export default async function TeamsPage() {
  return (
    <div className="container mx-auto px-6 sm:px-8 py-10 sm:py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 min-h-screen">
      <div className="mb-10 sm:mb-12 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl border border-gray-200/60 dark:border-zinc-800/60 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg">
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
              NBA Teams
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base font-medium mt-1">
              Browse all NBA teams fetched from the BallDontLie API
            </p>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(30)].map((_, i) => (
              <div key={i} className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 animate-pulse">
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
