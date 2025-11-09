"use client";

import { useState } from "react";
import type { Team } from "@/types";
import TeamDetailsSheet from "./TeamDetailsSheet";

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleClick = () => {
    setIsSheetOpen(true);
  };

  const handleClose = () => {
    setIsSheetOpen(false);
  };

  return (
    <>
      <div
        onClick={handleClick}
        className="bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-lg hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-200 cursor-pointer group"
      >
        <div className="mb-4">
          <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
            {team.full_name}
          </h3>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
            {team.abbreviation}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">City:</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              {team.city}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Conference:</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              {team.conference}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-600 dark:text-zinc-400">Division:</span>
            <span className="font-semibold text-zinc-900 dark:text-white">
              {team.division}
            </span>
          </div>
        </div>

        {/* Click indicator */}
        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors text-center">
            Click for details →
          </p>
        </div>
      </div>

      <TeamDetailsSheet
        isOpen={isSheetOpen}
        onClose={handleClose}
        teamId={team.id}
      />
    </>
  );
}
