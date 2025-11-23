import { NextRequest, NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'

async function fetchPlayerStatsFromAPI(playerId: string, searchParams: URLSearchParams) {
	const apiKey = process.env.BALLDONTLIE_API_KEY

	if (!apiKey) {
		throw new Error('BALLDONTLIE_API_KEY is not set')
	}

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

	const perPage = searchParams.get('per_page') || '25'
	params.set('per_page', perPage)

	const cursor = searchParams.get('cursor')
	if (cursor) {
		params.set('cursor', cursor)
	}

	const response = await fetch(
		`https://api.balldontlie.io/v1/stats?${params.toString()}`,
		{
			headers: {
				Authorization: apiKey,
			},
		}
	)

	if (!response.ok) {
		throw new Error(`Failed to fetch player stats: ${response.status} ${response.statusText}`)
	}

	return await response.json()
}

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const { id: playerId } = await params

	if (!playerId) {
		return NextResponse.json(
			{ error: 'Player ID is required' },
			{ status: 400 }
		)
	}

	try {
		const searchParams = request.nextUrl.searchParams
		const seasons = searchParams.get('seasons') || new Date().getFullYear().toString()
		const cacheKey = `player-stats-${playerId}-${seasons}`

		const getCachedStats = unstable_cache(
			async () => fetchPlayerStatsFromAPI(playerId, searchParams),
			[cacheKey],
			{
				revalidate: 1800,
				tags: ['player-stats', `player-${playerId}`],
			}
		)

		const data = await getCachedStats()

		return NextResponse.json(data)
	} catch (error) {
		console.error('Error fetching player stats:', error)
		return NextResponse.json(
			{ error: 'Internal server error' },
			{ status: 500 }
		)
	}
}
