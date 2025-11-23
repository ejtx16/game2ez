"use client";

import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Heart, MapPin, Trophy, Building2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { toggleFavorite, initializeFavorites, selectIsFavorite } from "@/lib/store/features/favorites/favoritesSlice";
import type { Team } from "@/types";
import type { TeamResponse } from "@/types/api";

interface TeamDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: number | null;
  teamData?: Team | null;
}

export default function TeamDetailsSheet({ isOpen, onClose, teamId, teamData: providedTeamData }: TeamDetailsSheetProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teamData, setTeamData] = useState<Team | null>(null);

  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(teamId ? selectIsFavorite(teamId) : () => false);

  useEffect(() => {
    dispatch(initializeFavorites());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen && teamId) {
      if (providedTeamData) {
        setTeamData(providedTeamData);
        setLoading(false);
        setError(null);
      } else {
        setLoading(true);
        setError(null);

        fetch(`/api/teams/${teamId}`)
          .then((res) => {
            if (!res.ok) {
              throw new Error(`Failed to fetch team details: ${res.statusText}`);
            }
            return res.json();
          })
          .then((data: TeamResponse) => {
            setTeamData(data.data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error fetching team details:", err);
            setError("Failed to load team details. Please try again.");
            setLoading(false);
          });
      }
    }
  }, [isOpen, teamId, providedTeamData]);


  const handleToggleFavorite = () => {
    if (teamId) {
      dispatch(toggleFavorite(teamId));
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[300px] sm:w-[400px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-zinc-900 dark:text-white text-2xl">Team Details</SheetTitle>
          <SheetDescription className="text-zinc-600 dark:text-zinc-400">View detailed information about the selected team</SheetDescription>
        </SheetHeader>

        {loading && (
          <div className="mt-8 space-y-4 animate-pulse">
            <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded w-1/2"></div>
            <div className="space-y-3 mt-6">
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
              <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 bg-red-50 dark:bg-red-950/20 border border-red-300 dark:border-red-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h3 className="text-sm font-semibold text-red-900 dark:text-red-100">Error</h3>
            </div>
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {!loading && !error && teamData && (
          <div className="mt-8">
            {/* Team Header with Enhanced Design */}
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 via-orange-500/20 to-orange-600/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-br from-zinc-100/90 to-zinc-200/90 dark:from-zinc-800/90 dark:to-zinc-900/90 backdrop-blur-sm rounded-2xl p-6 border border-zinc-300/50 dark:border-zinc-700/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2 leading-tight">
                      {teamData.full_name || teamData.name}
                    </h2>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                        {teamData.abbreviation}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleToggleFavorite}
                    className="p-3 rounded-xl hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-all duration-200 backdrop-blur-sm"
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart
                      className={`w-7 h-7 transition-all duration-200 ${
                        isFavorite
                          ? "fill-orange-500 text-orange-500 scale-110"
                          : "text-zinc-400 dark:text-zinc-400 hover:text-orange-500 hover:scale-110"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Team Details Grid */}
            <div className="space-y-4 mb-8">
              {/* Location Card */}
              <div className="group bg-gradient-to-br from-zinc-100/80 to-zinc-200/80 dark:from-zinc-800/80 dark:to-zinc-900/80 rounded-xl p-5 border border-zinc-300/50 dark:border-zinc-700/50 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors duration-300">
                    <MapPin className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Location</h3>
                    <p className="text-xl font-bold text-zinc-900 dark:text-white">{teamData.city}</p>
                  </div>
                </div>
              </div>

              {/* Conference Card */}
              <div className="group bg-gradient-to-br from-zinc-100/80 to-zinc-200/80 dark:from-zinc-800/80 dark:to-zinc-900/80 rounded-xl p-5 border border-zinc-300/50 dark:border-zinc-700/50 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors duration-300">
                    <Trophy className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Conference</h3>
                    <p className="text-xl font-bold text-zinc-900 dark:text-white">{teamData.conference}</p>
                  </div>
                </div>
              </div>

              {/* Division Card */}
              <div className="group bg-gradient-to-br from-zinc-100/80 to-zinc-200/80 dark:from-zinc-800/80 dark:to-zinc-900/80 rounded-xl p-5 border border-zinc-300/50 dark:border-zinc-700/50 hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition-colors duration-300">
                    <Building2 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider mb-1">Division</h3>
                    <p className="text-xl font-bold text-zinc-900 dark:text-white">{teamData.division}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Information Footer */}
            <div className="mt-8 pt-6 border-t border-zinc-300/50 dark:border-zinc-800/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">Team ID</p>
                  <p className="text-sm font-mono text-zinc-700 dark:text-zinc-400">{teamData.id}</p>
                </div>
                <div className="px-4 py-2 bg-zinc-200/50 dark:bg-zinc-800/50 rounded-lg border border-zinc-300/50 dark:border-zinc-700/50">
                  <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mb-1">Full Name</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white">{teamData.full_name || teamData.name}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
