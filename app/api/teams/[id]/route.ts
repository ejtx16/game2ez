import { NextRequest, NextResponse } from "next/server";
import { BalldontlieAPI } from "@balldontlie/sdk";
import type { Team } from "@/types";

const api = new BalldontlieAPI({
  apiKey: process.env.BALLDONTLIE_API_KEY || "",
});

/**
 * GET /api/teams/[id]
 *
 * Get a single NBA team by ID from BallDontLie API
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // Validate ID
    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        {
          data: null,
          error: {
            message: "Invalid team ID",
            code: "INVALID_ID",
            status: 400,
          },
        },
        { status: 400 }
      );
    }

    const teamId = Number(id);

    // Fetch team from BallDontLie API
    const response = await api.nba.getTeam(teamId);

    // Convert to our Team type
    const team: Team = {
      id: response.data.id,
      conference: response.data.conference,
      division: response.data.division,
      city: response.data.city,
      name: response.data.name,
      full_name: response.data.full_name,
      abbreviation: response.data.abbreviation,
    };

    return NextResponse.json(
      {
        data: team,
        meta: {
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in GET /api/teams/[id]:", error);

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to fetch team from BallDontLie API";

    const isRateLimitError =
      errorMessage.toLowerCase().includes("rate limit") ||
      errorMessage.toLowerCase().includes("429");

    const isNotFound =
      errorMessage.toLowerCase().includes("not found") ||
      errorMessage.toLowerCase().includes("404");

    return NextResponse.json(
      {
        data: null,
        error: {
          message: isRateLimitError
            ? "API rate limit exceeded. Please wait a few moments and refresh the page."
            : isNotFound
            ? "Team not found"
            : errorMessage,
          code: isRateLimitError
            ? "RATE_LIMIT_ERROR"
            : isNotFound
            ? "NOT_FOUND"
            : "FETCH_ERROR",
          status: isRateLimitError ? 429 : isNotFound ? 404 : 500,
        },
      },
      { status: isRateLimitError ? 429 : isNotFound ? 404 : 500 }
    );
  }
}
