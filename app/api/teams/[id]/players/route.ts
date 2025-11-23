import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import type { Player } from '@/types'

const getCachedTeamPlayers = (teamId: number) =>
	unstable_cache(
		async () => {
			const apiKey = process.env.BALLDONTLIE_API_KEY

			if (!apiKey) {
				throw new Error('BallDontLie API key is not configured')
			}

			const response = await fetch(
				`https://api.balldontlie.io/v1/players/active?team_ids[]=${teamId}&per_page=100`,
				{
					headers: {
						Authorization: apiKey,
					},
				}
			)

			if (!response.ok) {
				throw new Error(
					`BallDontLie API error: ${response.status} ${response.statusText}`
				)
			}

			const data = await response.json()

			const teamPlayers = data.data.filter(
				(player: any) => player.team?.id === teamId
			)

			const players: Player[] = teamPlayers.map((player: any) => ({
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
					id: player.team.id,
					name: player.team.name,
					city: player.team.city,
					abbreviation: player.team.abbreviation,
					conference: player.team.conference,
					division: player.team.division,
					full_name: player.team.full_name,
				},
			}))

			return players
		},
		['nba-team-active-players', teamId.toString()],
		{
			revalidate: 1800,
			tags: ['active-players', `team-${teamId}-active-players`],
		}
	)()

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params
		const teamId = parseInt(id)

		if (isNaN(teamId)) {
			return NextResponse.json(
				{ error: 'Invalid team ID' },
				{ status: 400 }
			)
		}

		const players = await getCachedTeamPlayers(teamId)

		return NextResponse.json({
			data: players,
			count: players.length,
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
			{ status: isRateLimitError ? 429 : 500 }
		)
	}
}
