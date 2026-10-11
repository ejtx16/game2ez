import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import {
	ArrowLeft,
	User,
	Ruler,
	Weight,
	MapPin,
	GraduationCap,
	Trophy,
	Calendar,
	Hash,
	Target,
	BarChart3,
	Lock,
} from 'lucide-react'
import Link from 'next/link'
import type { Player, Stats } from '@/types'
import {
	BallDontLieError,
	PLAN_REQUIRED_MESSAGE,
	bdlFetch,
	hasPaidTier,
} from '@/lib/api/balldontlie'
import PlayerStatsChart from '@/components/PlayerStatsChart'
import PlayerStatsLineChart from '@/components/PlayerStatsLineChart'
import PlayerStatsPolarChart from '@/components/PlayerStatsPolarChart'
import PlayerStatsSummary from '@/components/PlayerStatsSummary'
import RecentGames from '@/components/RecentGames'

const getCachedPlayer = (playerId: string) =>
	unstable_cache(
		async () => {
			const response = await bdlFetch<{ data: Player }>(
				`/players/${playerId}`,
			)

			return response.data
		},
		['player-details', playerId],
		{
			revalidate: 1800,
			tags: ['player-details', `player-${playerId}`],
		},
	)()

const getCachedPlayerStats = (playerId: string, season: string) =>
	unstable_cache(
		async () => {
			const params = new URLSearchParams()
			params.set('player_ids[]', playerId)
			params.set('seasons[]', season)
			params.set('per_page', '25')

			const response = await bdlFetch<{ data?: Stats[] }>('/stats', params)

			return response.data ?? []
		},
		['player-stats', playerId, season],
		{
			revalidate: 1800,
			tags: ['player-stats', `player-${playerId}`],
		},
	)()

// Failures are caught outside unstable_cache, so they are never cached.
const getPlayerData = async (playerId: string): Promise<Player | null> => {
	try {
		return await getCachedPlayer(playerId)
	} catch (error) {
		console.error(`Error fetching player ${playerId}:`, error)
		return null
	}
}

interface PlayerStatsResult {
	stats: Stats[]
	planRequired: boolean
}

// Game player stats need a paid plan. On the free plan, skip the request.
const getPlayerStats = async (playerId: string): Promise<PlayerStatsResult> => {
	if (!hasPaidTier()) {
		return { stats: [], planRequired: true }
	}

	try {
		const season = new Date().getFullYear().toString()

		return {
			stats: await getCachedPlayerStats(playerId, season),
			planRequired: false,
		}
	} catch (error) {
		console.error(`Error fetching player stats for ${playerId}:`, error)

		return {
			stats: [],
			planRequired: error instanceof BallDontLieError && error.status === 401,
		}
	}
}

const StatsPlanNotice = () => (
	<div className="bg-gray-50/50 dark:bg-zinc-900/50 border border-dashed border-gray-300 dark:border-zinc-700 rounded-xl p-8 flex flex-col items-center text-center gap-3">
		<div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
			<Lock className="w-6 h-6 text-orange-500" />
		</div>
		<h3 className="text-lg font-bold text-gray-900 dark:text-white">
			Stats not available on the free plan
		</h3>
		<p className="max-w-md text-sm text-gray-500 dark:text-zinc-400">
			{PLAN_REQUIRED_MESSAGE} Player profiles, teams and games still work on
			the free plan.
		</p>
	</div>
)

export default async function PlayerPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const { id } = await params
	const [player, { stats, planRequired }] = await Promise.all([
		getPlayerData(id),
		getPlayerStats(id),
	])

	if (!player) {
		notFound()
	}

	return (
		<div className="min-h-screen bg-white dark:bg-zinc-950 text-gray-900 dark:text-white">
			{/* Hero Section with Gradient Background */}
			<div className="relative bg-gradient-to-b from-gray-50 via-gray-50 to-white dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 border-b border-gray-200 dark:border-zinc-800">
				<div className="container mx-auto px-4 py-6">
					{/* Back Button */}
					<Link
						href="/teams"
						className="inline-flex items-center gap-2 text-gray-600 dark:text-zinc-400 hover:text-orange-500 transition-colors mb-6"
					>
						<ArrowLeft className="w-4 h-4" />
						<span className="font-medium">Back to Teams</span>
					</Link>

					{/* Player Header */}
					<div className="flex flex-col lg:flex-row items-start gap-8 pb-8">
						<div className="flex items-start gap-8 flex-1">
							{/* Avatar */}
							<div className="relative">
								<div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl border-2 border-gray-300 dark:border-zinc-700 flex items-center justify-center shadow-xl">
									<User className="w-16 h-16 text-gray-400 dark:text-zinc-500" />
								</div>
								{player.jersey_number && (
									<div className="absolute -bottom-3 -right-3 bg-orange-500 text-white font-bold text-lg px-3 py-1.5 rounded-lg shadow-lg border-2 border-white dark:border-zinc-950">
										#{player.jersey_number}
									</div>
								)}
							</div>

							{/* Player Info */}
							<div className="flex-1 pt-2">
								<div className="mb-3">
									<h1 className="text-5xl font-bold mb-2 text-gray-900 dark:text-white">
										{player.first_name} {player.last_name}
									</h1>
									{player.position && (
										<div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-zinc-800 px-4 py-2 rounded-lg border border-gray-300 dark:border-zinc-700">
											<Target className="w-4 h-4 text-orange-500" />
											<span className="text-lg font-semibold text-gray-700 dark:text-zinc-300">
												{player.position}
											</span>
										</div>
									)}
								</div>

								{/* Team Info */}
								{player.team && (
									<div className="flex items-start gap-3">
										<div className="h-px flex-1 bg-gradient-to-r from-gray-300 dark:from-zinc-700 to-transparent my-3"></div>
										<Link
											href={`/teams?teamId=${player.team.id}`}
											className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100/50 dark:bg-zinc-800/50 hover:bg-gray-100 dark:hover:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-lg transition-all hover:border-orange-500/50 group"
										>
											<span className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors">
												{player.team.full_name || player.team.name}
											</span>
											<span className="text-sm text-gray-500 dark:text-zinc-500 font-medium">
												({player.team.abbreviation})
											</span>
										</Link>
										<div className="h-px flex-1 bg-gradient-to-l from-gray-300 dark:from-zinc-700 to-transparent my-3"></div>
									</div>
								)}
							</div>
						</div>

						{/* Stats Summary */}
						<div className="lg:pt-2">
							<PlayerStatsSummary stats={stats} />
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="container mx-auto px-4 py-12">
				{/* Section Header */}
				<div className="mb-8">
					<h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
						Player Information
					</h2>
					<div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"></div>
				</div>

				{/* Information Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
					{/* Physical Stats Card */}
					<div className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-zinc-700 transition-all shadow-lg">
						<div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
							<div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
								<Ruler className="w-5 h-5 text-orange-500" />
							</div>
							<h3 className="text-lg font-bold text-gray-900 dark:text-white">Physical Stats</h3>
						</div>
						<div className="space-y-4">
							{player.height && (
								<div className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-zinc-800/50 rounded-lg">
									<div className="flex items-center gap-3">
										<Ruler className="w-4 h-4 text-gray-500 dark:text-zinc-500" />
										<span className="text-sm text-gray-600 dark:text-zinc-400">Height</span>
									</div>
									<span className="text-lg font-semibold text-gray-900 dark:text-white">
										{player.height}
									</span>
								</div>
							)}
							{player.weight && (
								<div className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-zinc-800/50 rounded-lg">
									<div className="flex items-center gap-3">
										<Weight className="w-4 h-4 text-gray-500 dark:text-zinc-500" />
										<span className="text-sm text-gray-600 dark:text-zinc-400">Weight</span>
									</div>
									<span className="text-lg font-semibold text-gray-900 dark:text-white">
										{player.weight} lbs
									</span>
								</div>
							)}
							{player.position && (
								<div className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-zinc-800/50 rounded-lg">
									<div className="flex items-center gap-3">
										<Target className="w-4 h-4 text-gray-500 dark:text-zinc-500" />
										<span className="text-sm text-gray-600 dark:text-zinc-400">Position</span>
									</div>
									<span className="text-lg font-semibold text-gray-900 dark:text-white">
										{player.position}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Background Card */}
					<div className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-zinc-700 transition-all shadow-lg">
						<div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
							<div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
								<GraduationCap className="w-5 h-5 text-orange-500" />
							</div>
							<h3 className="text-lg font-bold text-gray-900 dark:text-white">Background</h3>
						</div>
						<div className="space-y-4">
							{player.college && (
								<div className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-zinc-800/50 rounded-lg">
									<div className="flex items-center gap-3">
										<GraduationCap className="w-4 h-4 text-gray-500 dark:text-zinc-500" />
										<span className="text-sm text-gray-600 dark:text-zinc-400">College</span>
									</div>
									<span className="text-lg font-semibold text-gray-900 dark:text-white">
										{player.college}
									</span>
								</div>
							)}
							{player.country && (
								<div className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-zinc-800/50 rounded-lg">
									<div className="flex items-center gap-3">
										<MapPin className="w-4 h-4 text-gray-500 dark:text-zinc-500" />
										<span className="text-sm text-gray-600 dark:text-zinc-400">Country</span>
									</div>
									<span className="text-lg font-semibold text-gray-900 dark:text-white">
										{player.country}
									</span>
								</div>
							)}
						</div>
					</div>

					{/* Draft Info Card */}
					{(player.draft_year ||
						player.draft_round ||
						player.draft_number) && (
						<div className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-zinc-700 transition-all shadow-lg">
							<div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200 dark:border-zinc-800">
								<div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
									<Trophy className="w-5 h-5 text-orange-500" />
								</div>
								<h3 className="text-lg font-bold text-gray-900 dark:text-white">Draft Info</h3>
							</div>
							<div className="space-y-4">
								{player.draft_year && (
									<div className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-zinc-800/50 rounded-lg">
										<div className="flex items-center gap-3">
											<Calendar className="w-4 h-4 text-gray-500 dark:text-zinc-500" />
											<span className="text-sm text-gray-600 dark:text-zinc-400">Draft Year</span>
										</div>
										<span className="text-lg font-semibold text-gray-900 dark:text-white">
											{player.draft_year}
										</span>
									</div>
								)}
								{player.draft_round && (
									<div className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-zinc-800/50 rounded-lg">
										<div className="flex items-center gap-3">
											<Hash className="w-4 h-4 text-gray-500 dark:text-zinc-500" />
											<span className="text-sm text-gray-600 dark:text-zinc-400">Draft Round</span>
										</div>
										<span className="text-lg font-semibold text-gray-900 dark:text-white">
											{player.draft_round}
										</span>
									</div>
								)}
								{player.draft_number && (
									<div className="flex items-center justify-between p-3 bg-gray-100/50 dark:bg-zinc-800/50 rounded-lg">
										<div className="flex items-center gap-3">
											<Hash className="w-4 h-4 text-gray-500 dark:text-zinc-500" />
											<span className="text-sm text-gray-600 dark:text-zinc-400">
												Draft Number
											</span>
										</div>
										<span className="text-lg font-semibold text-gray-900 dark:text-white">
											{player.draft_number}
										</span>
									</div>
								)}
							</div>
						</div>
					)}

					{/* Recent Games Card */}
					{!planRequired && (
						<div className="md:col-span-2 lg:col-span-3 xl:col-span-1">
							<RecentGames stats={stats} limit={3} />
						</div>
					)}
				</div>

				{/* Player Statistics Section */}
				<div className="mb-8">
					<div className="flex items-center gap-3 mb-6">
						<div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
							<BarChart3 className="w-5 h-5 text-orange-500" />
						</div>
						<div>
							<h2 className="text-2xl font-bold text-gray-900 dark:text-white">
								Player Statistics
							</h2>
							<p className="text-sm text-gray-500 dark:text-zinc-500">
								Season performance breakdown
							</p>
						</div>
					</div>
					<div className="h-1 w-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full mb-6"></div>

					{/* Charts Grid */}
					{planRequired ? (
						<StatsPlanNotice />
					) : (
						<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
							<PlayerStatsChart stats={stats} />
							<PlayerStatsLineChart stats={stats} />
							<PlayerStatsPolarChart stats={stats} />
						</div>
					)}
				</div>

				{/* Footer Section */}
				<div className="mt-12 pt-8 border-t border-gray-200 dark:border-zinc-800">
					<div className="flex items-center justify-center gap-2 text-gray-500 dark:text-zinc-500">
						<div className="h-px w-12 bg-gray-300 dark:bg-zinc-800"></div>
						<p className="text-xs">Player ID: {player.id}</p>
						<div className="h-px w-12 bg-gray-300 dark:bg-zinc-800"></div>
					</div>
				</div>
			</div>
		</div>
	)
}
