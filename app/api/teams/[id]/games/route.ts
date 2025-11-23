import { NextResponse } from 'next/server'
import { unstable_cache } from 'next/cache'
import type { Game } from '@/types'

const getCachedTeamGames = (
  teamId: number,
  season?: string,
  limit?: number,
  postseason?: boolean
) =>
  unstable_cache(
    async () => {
      const apiKey = process.env.BALLDONTLIE_API_KEY

      if (!apiKey) {
        throw new Error('BallDontLie API key is not configured')
      }

      const params = new URLSearchParams()
      params.append('team_ids[]', teamId.toString())

      if (season) {
        params.append('seasons[]', season)
      }

      if (postseason !== undefined) {
        params.append('postseason', postseason.toString())
      }

      const perPage = limit && limit <= 100 ? limit : 25
      params.append('per_page', perPage.toString())

      const url = `https://api.balldontlie.io/v1/games?${params.toString()}`

      const response = await fetch(url, {
        headers: {
          Authorization: apiKey,
        },
      })

      if (!response.ok) {
        throw new Error(
          `BallDontLie API error: ${response.status} ${response.statusText}`
        )
      }

      const data = await response.json()

      const games: Game[] = data.data.map((game: any) => ({
        id: game.id,
        date: game.date,
        season: game.season,
        status: game.status,
        period: game.period,
        time: game.time,
        postseason: game.postseason,
        home_team_score: game.home_team_score,
        visitor_team_score: game.visitor_team_score,
        datetime: game.datetime,

        home_q1: game.home_q1,
        home_q2: game.home_q2,
        home_q3: game.home_q3,
        home_q4: game.home_q4,
        home_ot1: game.home_ot1,
        home_ot2: game.home_ot2,
        home_ot3: game.home_ot3,

        visitor_q1: game.visitor_q1,
        visitor_q2: game.visitor_q2,
        visitor_q3: game.visitor_q3,
        visitor_q4: game.visitor_q4,
        visitor_ot1: game.visitor_ot1,
        visitor_ot2: game.visitor_ot2,
        visitor_ot3: game.visitor_ot3,

        home_team_id: game.home_team?.id,
        home_team_conference: game.home_team?.conference,
        home_team_division: game.home_team?.division,
        home_team_city: game.home_team?.city,
        home_team_name: game.home_team?.name,
        home_team_full_name: game.home_team?.full_name,
        home_team_abbreviation: game.home_team?.abbreviation,

        visitor_team_id: game.visitor_team?.id,
        visitor_team_conference: game.visitor_team?.conference,
        visitor_team_division: game.visitor_team?.division,
        visitor_team_city: game.visitor_team?.city,
        visitor_team_name: game.visitor_team?.name,
        visitor_team_full_name: game.visitor_team?.full_name,
        visitor_team_abbreviation: game.visitor_team?.abbreviation,
      }))

      return games
    },
    [
      'nba-team-games',
      teamId.toString(),
      season || 'all',
      limit?.toString() || '25',
      postseason?.toString() || 'all',
    ],
    {
      revalidate: 1800,
      tags: ['team-games', `team-${teamId}-games`],
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
      return NextResponse.json({ error: 'Invalid team ID' }, { status: 400 })
    }

    const { searchParams } = new URL(request.url)
    const season = searchParams.get('season') || undefined
    const limit = searchParams.get('limit')
      ? parseInt(searchParams.get('limit')!)
      : undefined
    const postseason = searchParams.get('postseason')
      ? searchParams.get('postseason') === 'true'
      : undefined

    const games = await getCachedTeamGames(teamId, season, limit, postseason)

    return NextResponse.json({
      data: games,
      count: games.length,
    })
  } catch (error) {
    console.error('Error fetching games:', error)

    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Failed to fetch games from BallDontLie API'

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
