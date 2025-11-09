"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  toggleFavorite,
  initializeFavorites,
  selectIsFavorite,
} from "@/lib/store/features/favorites/favoritesSlice";
import type { Team } from "@/types";
import type { TeamResponse } from "@/types/api";

interface TeamDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  teamId: number | null;
  teamData?: Team | null;
}

export default function TeamDetailsSheet({
  isOpen,
  onClose,
  teamId,
  teamData: providedTeamData,
}: TeamDetailsSheetProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teamData, setTeamData] = useState<Team | null>(null);

  const dispatch = useAppDispatch();
  const isFavorite = useAppSelector(
    teamId ? selectIsFavorite(teamId) : () => false
  );

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
      <SheetContent className="w-[300px] sm:w-[400px] bg-zinc-900 border-zinc-800">
        <SheetHeader>
          <SheetTitle className="text-white text-2xl">Team Details</SheetTitle>
          <SheetDescription className="text-zinc-400">
            View detailed information about the selected team
          </SheetDescription>
        </SheetHeader>

        {loading && (
          <div className="mt-8 space-y-4 animate-pulse">
            <div className="h-8 bg-zinc-800 rounded"></div>
            <div className="h-6 bg-zinc-800 rounded w-1/2"></div>
            <div className="space-y-3 mt-6">
              <div className="h-4 bg-zinc-800 rounded"></div>
              <div className="h-4 bg-zinc-800 rounded"></div>
              <div className="h-4 bg-zinc-800 rounded"></div>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-8 bg-red-950/20 border border-red-800 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-red-400"
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
              <h3 className="text-sm font-semibold text-red-100">Error</h3>
            </div>
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        {!loading && !error && teamData && (
          <div className="mt-8">
            {/* Team Header */}
            <div className="mb-6 pb-6 border-b border-zinc-800">
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-3xl font-bold text-white flex-1">
                  {teamData.full_name || teamData.name}
                </h2>
                <button
                  onClick={handleToggleFavorite}
                  className="ml-2 p-2 rounded-lg hover:bg-zinc-800 transition-colors"
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <Heart
                    className={`w-6 h-6 transition-all ${
                      isFavorite
                        ? "fill-red-500 text-red-500"
                        : "text-zinc-400 hover:text-red-500"
                    }`}
                  />
                </button>
              </div>
              <p className="text-xl font-semibold text-orange-500">
                {teamData.abbreviation}
              </p>
            </div>

            {/* Team Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-1">
                  City
                </h3>
                <p className="text-lg font-semibold text-white">
                  {teamData.city}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-1">
                  Conference
                </h3>
                <p className="text-lg font-semibold text-white">
                  {teamData.conference}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-400 mb-1">
                  Division
                </h3>
                <p className="text-lg font-semibold text-white">
                  {teamData.division}
                </p>
              </div>
            </div>

            {/* Team ID (for debugging/reference) */}
            <div className="mt-8 pt-6 border-t border-zinc-800">
              <p className="text-xs text-zinc-500">Team ID: {teamData.id}</p>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
