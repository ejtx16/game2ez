import { NextRequest, NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import { BallDontLieError, bdlFetch } from '@/lib/api/balldontlie'
import type { Player } from '@/types'

const getCachedPlayer = (playerId: string) =>
	unstable_cache(
		async () => bdlFetch<{ data: Player }>(`/players/${playerId}`),
		['player-details', playerId],
		{
			revalidate: 1800,
			tags: ['player-details', `player-${playerId}`],
		},
	)()

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

	try {
		const data = await getCachedPlayer(playerId)

		return NextResponse.json(data)
	} catch (error) {
		console.error(`Error fetching player ${playerId}:`, error)

		const status = error instanceof BallDontLieError ? error.status : 500

		return NextResponse.json(
			{
				error:
					status === 429
						? 'API rate limit exceeded. Please wait a few moments and try again.'
						: 'Failed to fetch player data',
			},
			{ status },
		)
	}
}
