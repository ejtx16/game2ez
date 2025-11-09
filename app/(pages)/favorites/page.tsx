import { Suspense } from 'react'
import { unstable_cache } from 'next/cache'
import { BalldontlieAPI } from '@balldontlie/sdk'
import type { Team } from '@/types'
import FavoriteTeamsList from './FavoriteTeamsList'

const api = new BalldontlieAPI({
	apiKey: process.env.BALLDONTLIE_API_KEY || '',
})

const getCachedTeamsData = unstable_cache(
	async () => {
		try {
			const response = await api.nba.getTeams({})

			const teams: Team[] = response.data.map((team: any) => ({
				id: team.id,
				conference: team.conference,
				division: team.division,
				city: team.city,
				name: team.name,
				full_name: team.full_name,
				abbreviation: team.abbreviation,
			}))

			return {
				data: teams,
				error: null,
			}
		} catch (error: unknown) {
			console.error('Error fetching teams:', error)

			const errorMessage =
				error instanceof Error
					? error.message
					: 'Failed to fetch teams from BallDontLie API'

			return {
				data: [],
				error: errorMessage,
			}
		}
	},
	['nba-teams-favorites'],
	{
		revalidate: 3600,
		tags: ['teams'],
	}
)

async function getTeamsData() {
	return getCachedTeamsData()
}

async function FavoritesContent() {
	const { data: teams, error } = await getTeamsData()

	if (error) {
		const isRateLimitError =
			error.toLowerCase().includes('rate limit') ||
			error.toLowerCase().includes('429')

		return (
			<div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
				<div className="flex items-center gap-3 mb-2">
					<svg
						className="w-6 h-6 text-red-600 dark:text-red-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
						/>
					</svg>
					<h3 className="text-lg font-semibold text-red-900 dark:text-red-100">
						Error Loading Favorites
					</h3>
				</div>
				<p className="text-red-800 dark:text-red-200">
					{isRateLimitError
						? 'API rate limit exceeded. Please wait a few moments and refresh the page.'
						: error}
				</p>
				{isRateLimitError && (
					<p className="text-sm text-red-600 dark:text-red-300 mt-2">
						The BallDontLie API has rate limits. Try refreshing in a few
						seconds.
					</p>
				)}
			</div>
		)
	}

	if (!teams || teams.length === 0) {
		return (
			<div className="text-center py-8 text-zinc-500 dark:text-zinc-400">
				No teams data available
			</div>
		)
	}

	return <FavoriteTeamsList teams={teams} />
}

export default function FavoritesPage() {
	return (
		<div className="container mx-auto px-4 py-8 bg-zinc-50 dark:bg-zinc-950 min-h-screen">
			<div className="mb-8">
				<h1 className="text-4xl font-bold mb-2 text-zinc-900 dark:text-white">
					My Favorites
				</h1>
				<p className="text-zinc-600 dark:text-zinc-400 text-lg">
					Your favorite NBA teams in one place
				</p>
			</div>

			<Suspense
				fallback={
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(3)].map((_, i) => (
							<div
								key={i}
								className="animate-pulse bg-white dark:bg-zinc-900 border-none rounded-lg p-6"
							>
								<div className="h-7 bg-zinc-200 dark:bg-zinc-800 rounded mb-2 w-3/4"></div>
								<div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded w-1/4 mb-4"></div>
								<div className="space-y-3">
									<div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
									<div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
									<div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
								</div>
							</div>
						))}
					</div>
				}
			>
				<FavoritesContent />
			</Suspense>
		</div>
	)
}
