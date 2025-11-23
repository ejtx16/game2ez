'use client'

import { useMemo } from 'react'
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
	ChartOptions,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import type { Stats } from '@/types'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
)

interface PlayerStatsChartProps {
	stats: Stats[]
}

export default function PlayerStatsChart({ stats }: PlayerStatsChartProps) {
	const chartData = useMemo(() => {
		if (!stats || stats.length === 0) {
			return null
		}

		const sortedStats = [...stats].sort((a, b) => {
			const dateA = a.game?.date || ''
			const dateB = b.game?.date || ''
			return new Date(dateA).getTime() - new Date(dateB).getTime()
		})

		const labels = sortedStats.map((stat, index) => {
			if (!stat.game?.date) {
				return `Game ${index + 1}`
			}
			try {
				const date = new Date(stat.game.date)
				if (isNaN(date.getTime())) {
					return `Game ${index + 1}`
				}
				return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
			} catch {
				return `Game ${index + 1}`
			}
		})

		const pointsData = sortedStats.map((stat) => stat.pts || 0)
		const reboundsData = sortedStats.map((stat) => stat.reb || 0)
		const assistsData = sortedStats.map((stat) => stat.ast || 0)

		return {
			labels,
			datasets: [
				{
					label: 'Points',
					data: pointsData,
					backgroundColor: 'rgba(253, 141, 60, 0.8)',
					borderColor: 'rgba(253, 141, 60, 1)',
					borderWidth: 1,
				},
				{
					label: 'Rebounds',
					data: reboundsData,
					backgroundColor: 'rgba(241, 105, 19, 0.8)',
					borderColor: 'rgba(241, 105, 19, 1)',
					borderWidth: 1,
				},
				{
					label: 'Assists',
					data: assistsData,
					backgroundColor: 'rgba(217, 95, 14, 0.8)',
					borderColor: 'rgba(217, 95, 14, 1)',
					borderWidth: 1,
				},
			],
		}
	}, [stats])

	const options: ChartOptions<'bar'> = useMemo(() => ({
		responsive: true,
		maintainAspectRatio: false,
		interaction: {
			mode: 'index' as const,
			intersect: false,
		},
		scales: {
			x: {
				stacked: true,
				grid: {
					display: false,
				},
				ticks: {
					color: 'rgb(161, 161, 170)',
					font: {
						size: 11,
					},
				},
			},
			y: {
				stacked: true,
				grid: {
					color: 'rgba(161, 161, 170, 0.1)',
				},
				ticks: {
					color: 'rgb(161, 161, 170)',
					font: {
						size: 11,
					},
				},
				beginAtZero: true,
			},
		},
		plugins: {
			legend: {
				position: 'top' as const,
				labels: {
					color: 'rgb(161, 161, 170)',
					padding: 15,
					font: {
						size: 12,
						weight: 500,
					},
					usePointStyle: true,
					pointStyle: 'circle',
				},
			},
			title: {
				display: true,
				text: 'Player Stats - Stacked',
				color: 'rgb(113, 113, 122)',
				font: {
					size: 16,
					weight: 'bold' as const,
				},
				padding: {
					top: 10,
					bottom: 20,
				},
			},
			tooltip: {
				backgroundColor: 'rgba(24, 24, 27, 0.95)',
				titleColor: 'rgb(255, 255, 255)',
				bodyColor: 'rgb(228, 228, 231)',
				borderColor: 'rgba(63, 63, 70, 0.5)',
				borderWidth: 1,
				padding: 12,
				boxPadding: 6,
				usePointStyle: true,
				callbacks: {
					label: function(context) {
						const label = context.dataset.label || ''
						const value = context.parsed.y || 0
						return ` ${label}: ${value}`
					},
				},
			},
		},
	}), [])

	if (!chartData) {
		return (
			<div className="flex items-center justify-center h-96 bg-gray-50/50 dark:bg-zinc-900/50 rounded-xl border border-gray-200 dark:border-zinc-800">
				<p className="text-gray-500 dark:text-zinc-500">No stats data available</p>
			</div>
		)
	}

	return (
		<div className="bg-gray-50/50 dark:bg-zinc-900/50 backdrop-blur border border-gray-200 dark:border-zinc-800 rounded-xl p-6 hover:border-gray-300 dark:hover:border-zinc-700 transition-all shadow-lg">
			<div className="h-96">
				<Bar data={chartData} options={options} />
			</div>
		</div>
	)
}
