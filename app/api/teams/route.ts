import { NextResponse } from 'next/server'
import { getCachedTeamsData } from '@/lib/api/teams'

/**
 * GET /api/teams
 *
 * Get all NBA teams from BallDontLie API (cached for 1 hour)
 */
export async function GET() {
	const { data: teams, error } = await getCachedTeamsData()

	if (error) {
		const isRateLimitError =
			error.toLowerCase().includes('rate limit') ||
			error.toLowerCase().includes('429') ||
			error.toLowerCase().includes('too many requests')

		return NextResponse.json(
			{
				data: [],
				error: {
					message: isRateLimitError
						? 'API rate limit exceeded. Please wait a few moments and refresh the page.'
						: error,
					code: isRateLimitError ? 'RATE_LIMIT_ERROR' : 'FETCH_ERROR',
					status: isRateLimitError ? 429 : 500,
				},
			},
			{ status: isRateLimitError ? 429 : 500 },
		)
	}

	return NextResponse.json(
		{
			data: teams,
			meta: {
				total: teams.length,
				timestamp: new Date().toISOString(),
			},
		},
		{ status: 200 },
	)
}
