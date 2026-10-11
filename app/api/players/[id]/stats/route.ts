import { NextRequest, NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import {
	BallDontLieError,
	PLAN_REQUIRED_MESSAGE,
	bdlFetch,
	hasPaidTier,
} from '@/lib/api/balldontlie'

const buildStatsParams = (playerId: string, searchParams: URLSearchParams) => {
	const params = new URLSearchParams()
	params.set('player_ids[]', playerId)

	const seasons = searchParams.get('seasons')
	if (seasons) {
		params.set('seasons[]', seasons)
	}

	const startDate = searchParams.get('start_date')
	if (startDate) {
		params.set('start_date', startDate)
	}

	const endDate = searchParams.get('end_date')
	if (endDate) {
		params.set('end_date', endDate)
	}

	params.set('per_page', searchParams.get('per_page') || '25')

	const cursor = searchParams.get('cursor')
	if (cursor) {
		params.set('cursor', cursor)
	}

	return params
}

/**
 * GET /api/players/[id]/stats
 *
 * Game player stats need a paid BallDontLie plan. On the free plan this
 * answers 403 PLAN_REQUIRED and spends no API request.
 */
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id: playerId } = await params

	if (!playerId || isNaN(Number(playerId))) {
		return NextResponse.json(
			{ error: 'A numeric player ID is required' },
			{ status: 400 },
		)
	}

	if (!hasPaidTier()) {
		return NextResponse.json(
			{ error: PLAN_REQUIRED_MESSAGE, code: 'PLAN_REQUIRED' },
			{ status: 403 },
		)
	}

	try {
		const statsParams = buildStatsParams(
			playerId,
			request.nextUrl.searchParams,
		)

		const getCachedStats = unstable_cache(
			async () => bdlFetch<unknown>('/stats', statsParams),
			['player-stats-api', statsParams.toString()],
			{
				revalidate: 1800,
				tags: ['player-stats', `player-${playerId}`],
			},
		)

		return NextResponse.json(await getCachedStats())
	} catch (error) {
		console.error('Error fetching player stats:', error)

		const status = error instanceof BallDontLieError ? error.status : 500

		if (status === 401) {
			return NextResponse.json(
				{ error: PLAN_REQUIRED_MESSAGE, code: 'PLAN_REQUIRED' },
				{ status: 403 },
			)
		}

		return NextResponse.json(
			{
				error:
					status === 429
						? 'API rate limit exceeded. Please wait a few moments and try again.'
						: 'Failed to fetch player stats',
			},
			{ status },
		)
	}
}
