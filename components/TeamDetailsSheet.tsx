"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Team } from "@/types";
import { Loader2 } from "lucide-react";

interface TeamDetailsSheetProps {
  teamId: number;
  trigger: React.ReactNode;
}

import type { TeamResponse } from "@/types/api";

type TeamDetailsResponse = TeamResponse;

export function TeamDetailsSheet({ teamId, trigger }: TeamDetailsSheetProps) {
  const [open, setOpen] = useState(false);
  const [teamDetails, setTeamDetails] = useState<Team | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamDetails = async () => {
    if (teamDetails) return; // Already fetched

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/teams/${teamId}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch team details");
      }

      const data: TeamDetailsResponse = await response.json();
      setTeamDetails(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching team details:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (newOpen) {
      fetchTeamDetails();
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent className="sm:max-w-[540px] bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
        <SheetHeader>
          <SheetTitle className="text-2xl text-zinc-900 dark:text-white">
            Team Details
          </SheetTitle>
          <SheetDescription className="text-zinc-600 dark:text-zinc-400">
            Detailed information about the team
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          {loading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            </div>
          )}

          {error && (
            <div className="py-8 text-center">
              <p className="text-red-500 dark:text-red-400 font-medium mb-2">
                Error loading team details
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {error}
              </p>
            </div>
          )}

          {teamDetails && !loading && !error && (
            <div className="space-y-6">
              {/* Team Name Section */}
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                <h2 className="text-3xl font-bold mb-2 text-zinc-900 dark:text-white">{teamDetails.name}</h2>
                <p className="text-lg font-semibold text-zinc-600 dark:text-zinc-400">
                  {teamDetails.abbreviation}
                </p>
                {teamDetails.full_name && (
                  <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
                    {teamDetails.full_name}
                  </p>
                )}
              </div>

              {/* Team Information Grid */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                      City
                    </p>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white">
                      {teamDetails.city}
                    </p>
                  </div>

                  <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                      Conference
                    </p>
                    <p className="text-lg font-bold text-zinc-900 dark:text-white">
                      {teamDetails.conference}
                    </p>
                  </div>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                    Division
                  </p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-white">
                    {teamDetails.division}
                  </p>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                  <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase mb-1">
                    Team ID
                  </p>
                  <p className="text-lg font-bold text-zinc-900 dark:text-white">
                    {teamDetails.id}
                  </p>
                </div>
              </div>

              {/* Additional Info Section */}
              <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Data provided by BallDontLie API
                </p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
