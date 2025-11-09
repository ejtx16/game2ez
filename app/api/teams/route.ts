import { NextResponse } from "next/server";
import { BalldontlieAPI } from "@balldontlie/sdk";
import type { Team } from "@/types";

const api = new BalldontlieAPI({
  apiKey: process.env.BALLDONTLIE_API_KEY || "",
});

/**
 * GET /api/teams
 *
 * Get all NBA teams from BallDontLie API
 */
export async function GET() {
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

    return NextResponse.json(
      {
        data: teams,
        meta: {
          total: teams.length,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/teams:", error);

    // Check if it's a rate limit error
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to fetch teams from BallDontLie API";

    const isRateLimitError =
      errorMessage.toLowerCase().includes("rate limit") ||
      errorMessage.toLowerCase().includes("429");

    return NextResponse.json(
      {
        data: [],
        error: {
          message: isRateLimitError
            ? "API rate limit exceeded. Please wait a few moments and refresh the page."
            : errorMessage,
          code: isRateLimitError ? "RATE_LIMIT_ERROR" : "FETCH_ERROR",
          status: isRateLimitError ? 429 : 500,
        },
      },
      { status: isRateLimitError ? 429 : 500 }
    );
  }
}
