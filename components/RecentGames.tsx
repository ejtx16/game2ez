'use client'

import { Calendar } from 'lucide-react'
import type { Stats } from '@/types'

interface RecentGamesProps {
	stats: Stats[]
	limit?: number
}

export default function RecentGames({ stats, limit = 3 }: RecentGamesProps) {
	if (!stats || stats.length === 0) {
		return (
			<div className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-xl p-6">
				<p className="text-center text-gray-500 dark:text-zinc-500">No recent games available</p>
			</div>
		)
	}

	const sortedStats = [...stats]
		.sort((a, b) => {
			const dateA = a.game?.date || ''
			const dateB = b.game?.date || ''
			return new Date(dateB).getTime() - new Date(dateA).getTime()
		})
		.slice(0, limit)

	const formatDate = (dateString: string) => {
		try {
			const date = new Date(dateString)
			if (isNaN(date.getTime())) return 'N/A'
			return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
		} catch {
			return 'N/A'
		}
	}

	const getGameResult = (stat: Stats) => {
		if (!stat.game?.home_team_score || !stat.game?.visitor_team_score) {
			return { result: 'N/A', won: null }
		}

		const homeScore = stat.game.home_team_score
		const visitorScore = stat.game.visitor_team_score

		const isHome = stat.game.status === 'Final'
		const won = (isHome && homeScore > visitorScore) || (!isHome && visitorScore > homeScore)

		return {
			result: won ? 'W' : 'L',
			won,
			score: `${homeScore}-${visitorScore}`,
		}
	}

	return (
		<div className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-zinc-700 transition-all shadow-lg h-full flex flex-col">
			<div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200 dark:border-zinc-800">
				<div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center">
					<Calendar className="w-5 h-5 text-orange-500" />
				</div>
				<h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Games</h3>
			</div>

			<div className="space-y-2.5 flex-1">
				{sortedStats.map((stat, index) => {
					const gameResult = getGameResult(stat)
					const hasStats = stat.pts !== null || stat.reb !== null || stat.ast !== null

					return (
						<div
							key={stat.id || index}
							className="bg-gray-100/50 dark:bg-zinc-800/50 rounded-lg p-3 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all"
						>
							<div className="flex items-center justify-between mb-2">
								<div className="flex items-center gap-2.5">
									<div className={`flex items-center justify-center w-7 h-7 rounded-lg font-bold text-xs ${
										gameResult.won === true
											? 'bg-green-500/20 text-green-600 dark:text-green-400'
											: gameResult.won === false
											? 'bg-red-500/20 text-red-600 dark:text-red-400'
											: 'bg-gray-500/20 text-gray-600 dark:text-gray-400'
									}`}>
										{gameResult.result}
									</div>
									<div>
										<div className="text-xs font-semibold text-gray-900 dark:text-white">
											{stat.game?.date ? formatDate(stat.game.date) : 'N/A'}
										</div>
										{gameResult.score && (
											<div className="text-xs text-gray-500 dark:text-zinc-500">
												{gameResult.score}
											</div>
										)}
									</div>
								</div>
							</div>

							{hasStats && (
								<div className="grid grid-cols-3 gap-2">
									<div className="text-center">
										<div className="text-xs text-gray-500 dark:text-zinc-500">PTS</div>
										<div className="text-base font-bold text-gray-900 dark:text-white">
											{stat.pts ?? '-'}
										</div>
									</div>
									<div className="text-center">
										<div className="text-xs text-gray-500 dark:text-zinc-500">REB</div>
										<div className="text-base font-bold text-gray-900 dark:text-white">
											{stat.reb ?? '-'}
										</div>
									</div>
									<div className="text-center">
										<div className="text-xs text-gray-500 dark:text-zinc-500">AST</div>
										<div className="text-base font-bold text-gray-900 dark:text-white">
											{stat.ast ?? '-'}
										</div>
									</div>
								</div>
							)}
						</div>
					)
				})}
			</div>

		</div>
	)
}
