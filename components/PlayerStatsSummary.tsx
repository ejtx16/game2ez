'use client'

import { TrendingUp, TrendingDown } from 'lucide-react'
import type { Stats } from '@/types'

interface PlayerStatsSummaryProps {
	stats: Stats[]
}

interface StatCard {
	label: string
	value: number
	trend: 'up' | 'down' | 'neutral'
	trendValue: number
}

export default function PlayerStatsSummary({ stats }: PlayerStatsSummaryProps) {
	if (!stats || stats.length === 0) {
		return null
	}

	const calculateAverageAndTrend = (statKey: 'pts' | 'reb' | 'ast'): StatCard => {
		const validStats = stats.filter(s => s[statKey] !== null && s[statKey] !== undefined)

		if (validStats.length === 0) {
			return {
				label: statKey === 'pts' ? 'PPG' : statKey === 'reb' ? 'RPG' : 'APG',
				value: 0,
				trend: 'neutral',
				trendValue: 0,
			}
		}

		const total = validStats.reduce((sum, s) => sum + (s[statKey] || 0), 0)
		const average = total / validStats.length

		let trend: 'up' | 'down' | 'neutral' = 'neutral'
		let trendValue = 0

		if (validStats.length >= 6) {
			const recentGames = validStats.slice(-3)
			const previousGames = validStats.slice(-6, -3)

			const recentAvg = recentGames.reduce((sum, s) => sum + (s[statKey] || 0), 0) / recentGames.length
			const previousAvg = previousGames.reduce((sum, s) => sum + (s[statKey] || 0), 0) / previousGames.length

			trendValue = ((recentAvg - previousAvg) / previousAvg) * 100

			if (Math.abs(trendValue) < 2) {
				trend = 'neutral'
			} else if (trendValue > 0) {
				trend = 'up'
			} else {
				trend = 'down'
			}
		}

		return {
			label: statKey === 'pts' ? 'PPG' : statKey === 'reb' ? 'RPG' : 'APG',
			value: average,
			trend,
			trendValue: Math.abs(trendValue),
		}
	}

	const pointsStats = calculateAverageAndTrend('pts')
	const reboundsStats = calculateAverageAndTrend('reb')
	const assistsStats = calculateAverageAndTrend('ast')

	const statCards = [pointsStats, reboundsStats, assistsStats]

	return (
		<div className="flex flex-wrap gap-4">
			{statCards.map((stat) => (
				<div
					key={stat.label}
					className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-lg px-4 py-3 min-w-[120px] hover:border-gray-300 dark:hover:border-zinc-700 transition-all"
				>
					<div className="flex items-center justify-between gap-2 mb-1">
						<span className="text-xs font-medium text-gray-500 dark:text-zinc-500">
							{stat.label}
						</span>
						{stat.trend !== 'neutral' && (
							<div className={`flex items-center gap-1 ${
								stat.trend === 'up'
									? 'text-green-500 dark:text-green-400'
									: 'text-red-500 dark:text-red-400'
							}`}>
								{stat.trend === 'up' ? (
									<TrendingUp className="w-3.5 h-3.5" />
								) : (
									<TrendingDown className="w-3.5 h-3.5" />
								)}
								<span className="text-xs font-medium">
									{stat.trendValue.toFixed(1)}%
								</span>
							</div>
						)}
					</div>
					<div className="text-2xl font-bold text-gray-900 dark:text-white">
						{stat.value.toFixed(1)}
					</div>
				</div>
			))}
		</div>
	)
}
