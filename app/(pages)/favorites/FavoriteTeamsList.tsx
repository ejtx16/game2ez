'use client'

import { useEffect, useState } from 'react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Heart } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
	selectFavoriteTeamIds,
	toggleFavorite,
	initializeFavorites,
} from '@/lib/store/features/favorites/favoritesSlice'
import type { Team } from '@/types'
import TeamDetailsSheet from '../teams/TeamDetailsSheet'

interface FavoriteTeamsListProps {
	teams: Team[]
}

export default function FavoriteTeamsList({ teams }: FavoriteTeamsListProps) {
	const [selectedTeam, setSelectedTeam] = useState<Team | null>(null)
	const [isSheetOpen, setIsSheetOpen] = useState(false)

	const dispatch = useAppDispatch()
	const favoriteTeamIds = useAppSelector(selectFavoriteTeamIds)

	useEffect(() => {
		dispatch(initializeFavorites())
	}, [dispatch])

	const handleRemoveFavorite = (teamId: number) => {
		dispatch(toggleFavorite(teamId))
	}

	const handleViewDetails = (team: Team) => {
		setSelectedTeam(team)
		setIsSheetOpen(true)
	}

	const handleCloseSheet = () => {
		setIsSheetOpen(false)
	}

	const favoriteTeams = teams.filter((team) =>
		favoriteTeamIds.includes(team.id)
	)

	if (favoriteTeams.length === 0) {
		return (
			<Card className="text-center py-16 border-none shadow-lg bg-white dark:bg-zinc-900">
				<div className="p-4 mx-auto w-fit rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
					<Heart className="h-12 w-12 text-orange-500" />
				</div>
				<h3 className="text-lg font-bold text-zinc-900 dark:text-white">
					No favorites yet
				</h3>
				<p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
					Start adding teams to your favorites list from the Teams page
				</p>
			</Card>
		)
	}

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{favoriteTeams.map((team) => (
				<Card
					key={team.id}
					className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-none shadow-md bg-white dark:bg-zinc-900 group"
				>
					<CardHeader className="pb-3">
						<div className="flex items-start justify-between">
							<div className="space-y-1">
								<CardTitle className="text-2xl text-zinc-900 dark:text-white">
									{team.full_name || team.name}
								</CardTitle>
								<CardDescription className="text-base font-bold text-zinc-600 dark:text-zinc-400">
									{team.abbreviation}
								</CardDescription>
							</div>
							<button
								onClick={() => handleRemoveFavorite(team.id)}
								className="text-orange-500 hover:text-orange-400 transition-all hover:scale-110"
								aria-label="Remove from favorites"
							>
								<Heart className="w-6 h-6 fill-current drop-shadow-md" />
							</button>
						</div>
					</CardHeader>

					<CardContent className="space-y-3">
						<div className="flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
							<span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
								City
							</span>
							<span className="text-sm font-bold text-zinc-900 dark:text-white">
								{team.city}
							</span>
						</div>
						<div className="flex items-center justify-between py-2 border-b border-zinc-200 dark:border-zinc-800">
							<span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
								Conference
							</span>
							<span className="text-sm font-bold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white">
								{team.conference}
							</span>
						</div>
						<div className="flex items-center justify-between py-2">
							<span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
								Division
							</span>
							<span className="text-sm font-bold px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-orange-500/20">
								{team.division}
							</span>
						</div>
					</CardContent>

					<CardFooter className="pt-0 flex justify-end">
						<button
							onClick={() => handleViewDetails(team)}
							className="text-sm font-semibold text-orange-500 hover:text-orange-400 transition-all"
						>
							View Details →
						</button>
					</CardFooter>
				</Card>
			))}
			<TeamDetailsSheet
				isOpen={isSheetOpen}
				onClose={handleCloseSheet}
				teamId={selectedTeam?.id || null}
				teamData={selectedTeam}
			/>
		</div>
	)
}
