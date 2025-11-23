import { Suspense } from "react";
import type { Team } from "@/types";
import FavoriteTeamsList from "./FavoriteTeamsList";
import { getCachedTeamsData } from "@/lib/api/teams";

async function FavoritesContent() {
  const { data: teams, error } = await getCachedTeamsData();

  if (error) {
    const isRateLimitError = error.toLowerCase().includes("rate limit") || error.toLowerCase().includes("429");

    return (
      <div className="bg-red-50/90 dark:bg-red-950/30 backdrop-blur-md border border-red-200/50 dark:border-red-800/50 rounded-2xl p-6 sm:p-8 shadow-lg">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-red-900 dark:text-red-100">Error Loading Favorites</h3>
        </div>
        <p className="text-red-800 dark:text-red-200 font-medium ml-11">
          {isRateLimitError ? "API rate limit exceeded. Please wait a few moments and refresh the page." : error}
        </p>
        {isRateLimitError && (
          <p className="text-sm text-red-600 dark:text-red-300 mt-3 ml-11 font-medium">
            The BallDontLie API has rate limits. Try refreshing in a few seconds.
          </p>
        )}
      </div>
    );
  }

  if (!teams || teams.length === 0) {
    return <div className="text-center py-12 text-zinc-600 dark:text-zinc-400 font-medium text-lg">No teams data available</div>;
  }

  return <FavoriteTeamsList teams={teams} />;
}

export default function FavoritesPage() {
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
              My Favorites
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base font-medium mt-1">
              Your favorite NBA teams in one place
            </p>
          </div>
        </div>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-gray-200/50 dark:border-zinc-800/50 rounded-2xl p-6 sm:p-7">
                <div className="h-7 bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-2 w-3/4"></div>
                <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-1/4 mb-5"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
                  <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        }
      >
        <FavoritesContent />
      </Suspense>
    </div>
  );
}
