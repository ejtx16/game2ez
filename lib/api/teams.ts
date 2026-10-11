import { unstable_cache } from 'next/cache'
import { BalldontlieAPI } from '@balldontlie/sdk'
import type { Team } from '@/types'

const api = new BalldontlieAPI({
	apiKey: process.env.BALLDONTLIE_API_KEY?.trim() ?? '',
})

/**
 * Fetches all teams once and caches them for an hour. It throws on failure,
 * so an error (for example a missing key) is never cached.
 */
const fetchTeams = unstable_cache(
	async (): Promise<Team[]> => {
		const response = await api.nba.getTeams({})

		return response.data.map((team) => ({
			id: team.id,
			conference: team.conference,
			division: team.division,
			city: team.city,
			name: team.name,
			full_name: team.full_name,
			abbreviation: team.abbreviation,
		}))
	},
	['nba-teams-list'],
	{
		revalidate: 3600,
		tags: ['teams'],
	},
)

export const getCachedTeamsData = async (): Promise<{
	data: Team[]
	error: string | null
}> => {
	try {
		return { data: await fetchTeams(), error: null }
	} catch (error: unknown) {
		console.error('Error fetching teams:', error)

		const errorMessage =
			error instanceof Error
				? error.message
				: 'Failed to fetch teams from BallDontLie API'

		return { data: [], error: errorMessage }
	}
}

/**
 * Finds one team in the cached team list. This spends no extra API request,
 * which matters on the free plan (5 requests per minute).
 */
export const getCachedTeamById = async (
	teamId: number,
): Promise<Team | null> => {
	const teams = await fetchTeams()

	return teams.find((team) => team.id === teamId) ?? null
}
