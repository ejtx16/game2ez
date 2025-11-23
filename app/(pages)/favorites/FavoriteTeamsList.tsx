"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { selectFavoriteTeamIds, toggleFavorite, initializeFavorites } from "@/lib/store/features/favorites/favoritesSlice";
import type { Team } from "@/types";
import FavoritesTeamDetailsSheet from "./FavoritesTeamDetailsSheet";

interface FavoriteTeamsListProps {
  teams: Team[];
}

export default function FavoriteTeamsList({ teams }: FavoriteTeamsListProps) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const dispatch = useAppDispatch();
  const favoriteTeamIds = useAppSelector(selectFavoriteTeamIds);

  useEffect(() => {
    dispatch(initializeFavorites());
  }, [dispatch]);

  const handleRemoveFavorite = (teamId: number) => {
    dispatch(toggleFavorite(teamId));
  };

  const handleViewDetails = (team: Team) => {
    setSelectedTeam(team);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const favoriteTeams = teams.filter((team) => favoriteTeamIds.includes(team.id));

  if (favoriteTeams.length === 0) {
    return (
      <Card className="text-center py-20 border border-gray-200/50 dark:border-zinc-800/50 shadow-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-2xl">
        <div className="p-5 mx-auto w-fit rounded-full bg-orange-50 dark:bg-orange-950/30 mb-6 border border-orange-200 dark:border-orange-900">
          <Heart className="h-14 w-14 text-orange-500" />
        </div>
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">No favorites yet</h3>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto">Start adding teams to your favorites list from the Teams page</p>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
      {favoriteTeams.map((team) => (
        <Card
          key={team.id}
          className="hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-200/50 dark:border-zinc-800/50 shadow-lg bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md group rounded-2xl overflow-hidden"
        >
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1.5 flex-1">
                <CardTitle className="text-xl sm:text-2xl text-zinc-900 dark:text-white font-black leading-tight">{team.full_name || team.name}</CardTitle>
                <CardDescription className="text-sm font-bold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider">{team.abbreviation}</CardDescription>
              </div>
              <button
                onClick={() => handleRemoveFavorite(team.id)}
                className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all hover:scale-125 active:scale-100 mt-1"
                aria-label="Remove from favorites"
              >
                <Heart className="w-6 h-6 fill-current drop-shadow-lg" />
              </button>
            </div>
          </CardHeader>

          <CardContent className="space-y-2.5">
            <div className="flex items-center justify-between py-2.5 border-b border-zinc-200/70 dark:border-zinc-800/70">
              <span className="text-sm text-zinc-600 dark:text-zinc-400 font-semibold">City</span>
              <span className="text-sm font-bold text-zinc-900 dark:text-white">{team.city}</span>
            </div>
            <div className="flex items-center justify-between py-2.5 border-b border-zinc-200/70 dark:border-zinc-800/70">
              <span className="text-sm text-zinc-600 dark:text-zinc-400 font-semibold">Conference</span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white uppercase tracking-wider">
                {team.conference}
              </span>
            </div>
            <div className="flex items-center justify-between py-2.5">
              <span className="text-sm text-zinc-600 dark:text-zinc-400 font-semibold">Division</span>
              <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 text-orange-900 dark:text-orange-400 border border-orange-200 dark:border-orange-800 uppercase tracking-wider">
                {team.division}
              </span>
            </div>
          </CardContent>

          <CardFooter className="pt-4 flex justify-end">
            <button
              onClick={() => handleViewDetails(team)}
              className="group/btn text-sm font-bold text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all flex items-center gap-1.5"
            >
              <span>View Details</span>
              <span className="transition-transform group-hover/btn:translate-x-1">→</span>
            </button>
          </CardFooter>
        </Card>
      ))}
      <FavoritesTeamDetailsSheet isOpen={isSheetOpen} onClose={handleCloseSheet} teamId={selectedTeam?.id || null} teamData={selectedTeam} />
    </div>
  );
}
