import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import type { Player } from '@/types'
import { bdlFetch, hasPaidTier } from '@/lib/api/balldontlie'

/**
 * Where the roster comes from:
 * - active-players: /players/active (paid plans), the current roster only
 * - all-players: /players (free plan), which also lists former players
 */
type RosterSource = 'active-players' | 'all-players'

interface ApiPlayer extends Omit<Player, 'team'> {
	team: Player['team'] | null
}

interface PlayersPage {
	data: ApiPlayer[]
	meta?: { next_cursor?: number | null }
}

/**
 * The free plan allows 5 requests per minute, so the free roster reads at
 * most this many pages of 100 players.
 */
const FREE_MAX_PAGES = 3

/**
 * On the free plan, drop players drafted this many years ago or earlier.
 * They are retired, and /players still lists them under their last team.
 */
const FREE_MAX_DRAFT_AGE = 25

const toPlayer = (player: ApiPlayer, team: Player['team']): Player => ({
	id: player.id,
	first_name: player.first_name,
	last_name: player.last_name,
	position: player.position,
	height: player.height,
	weight: player.weight,
	jersey_number: player.jersey_number,
	college: player.college,
	country: player.country,
	draft_year: player.draft_year,
	draft_round: player.draft_round,
	draft_number: player.draft_number,
	team: {
		id: team.id,
		name: team.name,
		city: team.city,
		abbreviation: team.abbreviation,
		conference: team.conference,
		division: team.division,
		full_name: team.full_name,
	},
})

const fetchActiveRoster = async (teamId: number): Promise<ApiPlayer[]> => {
	const params = new URLSearchParams()
	params.append('team_ids[]', teamId.toString())
	params.append('per_page', '100')

	const page = await bdlFetch<PlayersPage>('/players/active', params)

	return page.data
}

const fetchFreeRoster = async (teamId: number): Promise<ApiPlayer[]> => {
	const players: ApiPlayer[] = []
	let cursor: number | null | undefined

	for (let pageIndex = 0; pageIndex < FREE_MAX_PAGES; pageIndex++) {
		const params = new URLSearchParams()
		params.append('team_ids[]', teamId.toString())
		params.append('per_page', '100')

		if (cursor) {
			params.append('cursor', cursor.toString())
		}

		const page = await bdlFetch<PlayersPage>('/players', params)
		players.push(...page.data)
		cursor = page.meta?.next_cursor

		if (!cursor) {
			break
		}
	}

	const oldestDraftYear = new Date().getFullYear() - FREE_MAX_DRAFT_AGE

	return players
		.filter(
			(player) => !player.draft_year || player.draft_year > oldestDraftYear,
		)
		.sort((a, b) => (b.draft_year ?? 0) - (a.draft_year ?? 0))
}

const getCachedTeamPlayers = (teamId: number, source: RosterSource) =>
	unstable_cache(
		async () => {
			const apiPlayers =
				source === 'active-players'
					? await fetchActiveRoster(teamId)
					: await fetchFreeRoster(teamId)

			return apiPlayers.flatMap((player) =>
				player.team?.id === teamId ? [toPlayer(player, player.team)] : [],
			)
		},
		['nba-team-players', source, teamId.toString()],
		{
			revalidate: 1800,
			tags: ['active-players', `team-${teamId}-active-players`],
		},
	)()

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> },
) {
	try {
		const { id } = await params
		const teamId = parseInt(id)

		if (isNaN(teamId)) {
			return NextResponse.json(
				{ error: 'Invalid team ID' },
				{ status: 400 },
			)
		}

		const source: RosterSource = hasPaidTier()
			? 'active-players'
			: 'all-players'
		const players = await getCachedTeamPlayers(teamId, source)

		return NextResponse.json({
			data: players,
			count: players.length,
			meta: { source },
		})
	} catch (error) {
		console.error('Error fetching players:', error)

		const errorMessage =
			error instanceof Error
				? error.message
				: 'Failed to fetch players from BallDontLie API'

		const isRateLimitError =
			errorMessage.toLowerCase().includes('rate limit') ||
			errorMessage.toLowerCase().includes('429')

		return NextResponse.json(
			{
				error: isRateLimitError
					? 'API rate limit exceeded. Please wait a few moments and try again.'
					: errorMessage,
			},
			{ status: isRateLimitError ? 429 : 500 },
		)
	}
}
