"use client";

import { useState, useEffect, useMemo } from "react";
import type { Team } from "@/types";
import TeamCard from "./TeamCard";

interface TeamsSearchProps {
  teams: Team[];
}

export default function TeamsSearch({ teams }: TeamsSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Debounce search query (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Filter teams based on debounced search query
  const filteredTeams = useMemo(() => {
    if (!debouncedQuery.trim()) {
      return teams;
    }

    const query = debouncedQuery.toLowerCase();
    return teams.filter(
      (team) =>
        team.name.toLowerCase().includes(query) ||
        team.full_name?.toLowerCase().includes(query) ||
        team.city.toLowerCase().includes(query) ||
        team.abbreviation.toLowerCase().includes(query) ||
        team.conference.toLowerCase().includes(query) ||
        team.division.toLowerCase().includes(query)
    );
  }, [teams, debouncedQuery]);

  return (
    <div className="space-y-6">
      {/* Search Input - Upper Right */}
      <div className="flex justify-end">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search teams by name, city, conference..."
            className="w-full px-4 py-2 pr-10 text-sm border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 focus:border-transparent"
          />
          <svg
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Results Count */}
      {debouncedQuery && (
        <div className="text-sm text-zinc-600 dark:text-zinc-400">
          Found {filteredTeams.length} team{filteredTeams.length !== 1 ? "s" : ""}
        </div>
      )}

      {/* Teams Grid */}
      {filteredTeams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeams.map((team: Team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <svg
            className="mx-auto w-12 h-12 text-zinc-400 dark:text-zinc-600 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-zinc-500 dark:text-zinc-400 text-lg">
            No teams found matching &quot;{debouncedQuery}&quot;
          </p>
          <p className="text-zinc-400 dark:text-zinc-500 text-sm mt-2">
            Try searching by team name, city, conference, or division
          </p>
        </div>
      )}
    </div>
  );
}
