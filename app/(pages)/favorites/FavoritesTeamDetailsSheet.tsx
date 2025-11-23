'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from '@/components/ui/sheet'
import { Heart, Users, Loader2, Calendar } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import {
	toggleFavorite,
	initializeFavorites,
	selectIsFavorite,
} from '@/lib/store/features/favorites/favoritesSlice'
import type { Team, Player, Game } from '@/types'
import type { TeamResponse } from '@/types/api'

interface FavoritesTeamDetailsSheetProps {
	isOpen: boolean
	onClose: () => void
	teamId: number | null
	teamData?: Team | null
}

export default function FavoritesTeamDetailsSheet({
	isOpen,
	onClose,
	teamId,
	teamData: providedTeamData,
}: FavoritesTeamDetailsSheetProps) {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [teamData, setTeamData] = useState<Team | null>(null)
	const [showPlayers, setShowPlayers] = useState(false)
	const [players, setPlayers] = useState<Player[]>([])
	const [playersLoading, setPlayersLoading] = useState(false)
	const [playersError, setPlayersError] = useState<string | null>(null)
	const [showGames, setShowGames] = useState(false)
	const [games, setGames] = useState<Game[]>([])
	const [gamesLoading, setGamesLoading] = useState(false)
	const [gamesError, setGamesError] = useState<string | null>(null)
	const [loadingPlayerId, setLoadingPlayerId] = useState<number | null>(null)

	const dispatch = useAppDispatch()
	const router = useRouter()
	const isFavorite = useAppSelector(
		teamId ? selectIsFavorite(teamId) : () => false
	)

	useEffect(() => {
		dispatch(initializeFavorites())
	}, [dispatch])

	useEffect(() => {
		if (isOpen && teamId) {
			if (providedTeamData) {
				setTeamData(providedTeamData)
				setLoading(false)
				setError(null)
			} else {
				setLoading(true)
				setError(null)

				fetch(`/api/teams/${teamId}`)
					.then((res) => {
						if (!res.ok) {
							throw new Error(`Failed to fetch team details: ${res.statusText}`)
						}
						return res.json()
					})
					.then((data: TeamResponse) => {
						setTeamData(data.data)
						setLoading(false)
					})
					.catch((err) => {
						console.error('Error fetching team details:', err)
						setError('Failed to load team details. Please try again.')
						setLoading(false)
					})
			}
		}
	}, [isOpen, teamId, providedTeamData])

	useEffect(() => {
		if (!isOpen) {
			setShowPlayers(false)
			setPlayers([])
			setPlayersError(null)
			setShowGames(false)
			setGames([])
			setGamesError(null)
			setLoadingPlayerId(null)
		}
	}, [isOpen])

	const handleToggleFavorite = () => {
		if (teamId) {
			dispatch(toggleFavorite(teamId))
		}
	}

	const handleViewPlayers = async () => {
		if (!teamId) return

		if (showPlayers) {
			setShowPlayers(false)
			return
		}

		setShowPlayers(true)
		setPlayersLoading(true)
		setPlayersError(null)

		try {
			const response = await fetch(`/api/teams/${teamId}/players`)

			if (!response.ok) {
				throw new Error(`Failed to fetch players: ${response.statusText}`)
			}

			const data = await response.json()
			setPlayers(data.data || [])
		} catch (err) {
			console.error('Error fetching players:', err)
			setPlayersError('Failed to load players. Please try again.')
		} finally {
			setPlayersLoading(false)
		}
	}

	const handlePlayerClick = (playerId: number) => {
		setLoadingPlayerId(playerId)
		router.push(`/players/${playerId}`)
	}

	const handleViewGames = async () => {
		if (!teamId) return

		if (showGames) {
			setShowGames(false)
			return
		}

		setShowGames(true)
		setGamesLoading(true)
		setGamesError(null)

		try {
			const currentYear = new Date().getFullYear()
			const season = currentYear

			const response = await fetch(
				`/api/teams/${teamId}/games?season=${season}&limit=50`
			)

			if (!response.ok) {
				throw new Error(`Failed to fetch games: ${response.statusText}`)
			}

			const data = await response.json()
			setGames(data.data || [])
		} catch (err) {
			console.error('Error fetching games:', err)
			setGamesError('Failed to load games. Please try again.')
		} finally {
			setGamesLoading(false)
		}
	}

	const handleGameClick = (gameId: number) => {
		router.push(`/games/${gameId}`)
	}

	return (
		<Sheet open={isOpen} onOpenChange={onClose}>
			<SheetContent className="w-[320px] sm:w-[420px] bg-gradient-to-br from-white via-gray-50 to-white dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 border-gray-200 dark:border-zinc-800 overflow-y-auto">
				<SheetHeader className="pb-6 border-b border-gray-200 dark:border-zinc-800">
					<SheetTitle className="text-zinc-900 dark:text-white text-2xl font-black tracking-tight">Team Details</SheetTitle>
					<SheetDescription className="text-zinc-600 dark:text-zinc-400 font-medium">
						View detailed information about the selected team
					</SheetDescription>
				</SheetHeader>

				{loading && (
					<div className="mt-8 space-y-5 animate-pulse">
						<div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
						<div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-1/2"></div>
						<div className="space-y-3 mt-6">
							<div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
							<div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
							<div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-lg"></div>
						</div>
					</div>
				)}

				{error && (
					<div className="mt-8 bg-red-50 dark:bg-red-950/30 backdrop-blur-md border border-red-200 dark:border-red-800 rounded-xl p-5">
						<div className="flex items-center gap-3 mb-2">
							<div className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30">
								<svg
									className="w-5 h-5 text-red-600 dark:text-red-400"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2.5}
										d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
									/>
								</svg>
							</div>
							<h3 className="text-sm font-bold text-red-900 dark:text-red-100">Error</h3>
						</div>
						<p className="text-sm text-red-800 dark:text-red-200 font-medium ml-11">{error}</p>
					</div>
				)}

				{!loading && !error && teamData && (
					<div className="mt-8">
						{/* Team Header */}
						<div className="mb-6 pb-6 border-b border-gray-200 dark:border-zinc-800">
							<div className="flex items-start justify-between gap-3 mb-3">
								<h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white flex-1 leading-tight">
									{teamData.full_name || teamData.name}
								</h2>
								<button
									onClick={handleToggleFavorite}
									className="p-2.5 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all hover:scale-110 active:scale-100"
									aria-label={
										isFavorite ? 'Remove from favorites' : 'Add to favorites'
									}
								>
									<Heart
										className={`w-6 h-6 transition-all ${
											isFavorite
												? 'fill-orange-500 text-orange-500'
												: 'text-zinc-400 dark:text-zinc-500 hover:text-orange-500'
										}`}
									/>
								</button>
							</div>
							<p className="text-base font-bold text-orange-500 uppercase tracking-wider">
								{teamData.abbreviation}
							</p>
						</div>

						{/* Team Details */}
						<div className="space-y-4">
							<div className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-zinc-700/50">
								<h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-500 mb-2 uppercase tracking-wider">City</h3>
								<p className="text-lg font-black text-zinc-900 dark:text-white">
									{teamData.city}
								</p>
							</div>

							<div className="bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-zinc-700/50">
								<h3 className="text-xs font-bold text-zinc-500 dark:text-zinc-500 mb-2 uppercase tracking-wider">
									Conference
								</h3>
								<p className="text-lg font-black text-zinc-900 dark:text-white">
									{teamData.conference}
								</p>
							</div>

							<div className="bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/30 backdrop-blur-sm rounded-xl p-4 border border-orange-200 dark:border-orange-800">
								<h3 className="text-xs font-bold text-orange-700 dark:text-orange-500 mb-2 uppercase tracking-wider">
									Division
								</h3>
								<p className="text-lg font-black text-orange-900 dark:text-orange-400">
									{teamData.division}
								</p>
							</div>
						</div>

						{/* View Players Button */}
						<div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-800">
							<button
								onClick={handleViewPlayers}
								className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 dark:from-orange-600 dark:to-orange-700 dark:hover:from-orange-500 dark:hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 active:scale-100"
							>
								<Users className="w-5 h-5" />
								{showPlayers ? 'Hide Players' : 'View Players'}
							</button>
						</div>

						{/* View Games Button */}
						<div className="mt-4">
							<button
								onClick={handleViewGames}
								className="w-full flex items-center justify-center gap-2.5 px-5 py-3.5 bg-transparent hover:bg-gradient-to-r hover:from-orange-500 hover:to-orange-600 dark:hover:from-orange-600 dark:hover:to-orange-700 text-orange-500 dark:text-orange-400 hover:text-white font-bold rounded-xl transition-all duration-300 border border-orange-500 dark:border-orange-600 hover:border-orange-600 dark:hover:border-orange-700 hover:shadow-xl hover:shadow-orange-500/40 hover:scale-105 active:scale-100"
							>
								<Calendar className="w-5 h-5" />
								{showGames ? 'Hide Games' : 'View Games'}
							</button>
						</div>

						{/* Players List */}
						{showPlayers && (
							<div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-800">
								<h3 className="text-xl font-black text-zinc-900 dark:text-white mb-5 tracking-tight">
									Team Roster
								</h3>

								{playersLoading && (
									<div className="flex items-center justify-center py-12">
										<Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
									</div>
								)}

								{playersError && (
									<div className="bg-red-50 dark:bg-red-950/30 backdrop-blur-md border border-red-200 dark:border-red-800 rounded-xl p-4">
										<p className="text-sm text-red-800 dark:text-red-200 font-medium">{playersError}</p>
									</div>
								)}

								{!playersLoading && !playersError && players.length === 0 && (
									<div className="text-center py-12">
										<div className="p-4 mx-auto w-fit rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
											<Users className="w-12 h-12 text-zinc-400 dark:text-zinc-600" />
										</div>
										<p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
											No players found for this team
										</p>
									</div>
								)}

								{!playersLoading && !playersError && players.length > 0 && (
									<div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
										{players.map((player) => {
											const isLoading = loadingPlayerId === player.id
											return (
												<div
													key={player.id}
													onClick={() => !isLoading && handlePlayerClick(player.id)}
													className={`bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-xl p-4 transition-all duration-300 ${
														isLoading
															? 'opacity-60 cursor-wait'
															: 'hover:bg-white dark:hover:bg-zinc-800 hover:shadow-lg cursor-pointer hover:-translate-y-0.5'
													}`}
												>
													<div className="flex items-start justify-between">
														<div className="flex-1">
															<div className="flex items-center gap-2 mb-2">
																<h4 className="font-bold text-zinc-900 dark:text-white">
																	{player.first_name} {player.last_name}
																</h4>
																{player.jersey_number && (
																	<span className="text-xs font-bold text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-500/20 px-2.5 py-1 rounded-lg">
																		#{player.jersey_number}
																	</span>
																)}
															</div>
															<div className="flex flex-wrap gap-2 text-xs text-zinc-600 dark:text-zinc-400 font-medium">
																{player.position && (
																	<span className="bg-zinc-100 dark:bg-zinc-700 px-2.5 py-1 rounded-lg font-bold">
																		{player.position}
																	</span>
																)}
																{player.height && (
																	<span className="px-2 py-0.5">{player.height}</span>
																)}
																{player.weight && (
																	<span className="px-2 py-0.5">{player.weight} lbs</span>
																)}
															</div>
															{(player.college || player.country) && (
																<div className="mt-2.5 text-xs text-zinc-500 dark:text-zinc-500 font-medium space-y-0.5">
																	{player.college && (
																		<div>College: {player.college}</div>
																	)}
																	{player.country && (
																		<div>Country: {player.country}</div>
																	)}
																</div>
															)}
														</div>
														{isLoading && (
															<Loader2 className="w-5 h-5 text-orange-500 animate-spin ml-2 flex-shrink-0" />
														)}
													</div>
												</div>
											)
										})}
									</div>
								)}
							</div>
						)}

						{/* Games List */}
						{showGames && (
							<div className="mt-6 pt-6 border-t border-gray-200 dark:border-zinc-800">
								<h3 className="text-xl font-black text-zinc-900 dark:text-white mb-5 tracking-tight">
									Recent Games
								</h3>

								{gamesLoading && (
									<div className="flex items-center justify-center py-12">
										<Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
									</div>
								)}

								{gamesError && (
									<div className="bg-red-50 dark:bg-red-950/30 backdrop-blur-md border border-red-200 dark:border-red-800 rounded-xl p-4">
										<p className="text-sm text-red-800 dark:text-red-200 font-medium">{gamesError}</p>
									</div>
								)}

								{!gamesLoading && !gamesError && games.length === 0 && (
									<div className="text-center py-12">
										<div className="p-4 mx-auto w-fit rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
											<Calendar className="w-12 h-12 text-zinc-400 dark:text-zinc-600" />
										</div>
										<p className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">
											No games found for this team
										</p>
									</div>
								)}

								{!gamesLoading && !gamesError && games.length > 0 && (
									<div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
										{games.map((game) => {
											const isHomeTeam = game.home_team_id === teamId
											const opponent = isHomeTeam
												? {
														name: game.visitor_team_full_name || game.visitor_team_name,
														abbr: game.visitor_team_abbreviation,
														score: game.visitor_team_score,
												  }
												: {
														name: game.home_team_full_name || game.home_team_name,
														abbr: game.home_team_abbreviation,
														score: game.home_team_score,
												  }

											const teamScore = isHomeTeam
												? game.home_team_score
												: game.visitor_team_score

											const isWin =
												teamScore !== null &&
												opponent.score !== null &&
												teamScore > opponent.score
											const isLoss =
												teamScore !== null &&
												opponent.score !== null &&
												teamScore < opponent.score

											const gameDate = new Date(game.date)
											const formattedDate = gameDate.toLocaleDateString('en-US', {
												month: 'short',
												day: 'numeric',
												year: 'numeric',
											})

											return (
												<div
													key={game.id}
													onClick={() => handleGameClick(game.id)}
													className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-zinc-700/50 rounded-xl p-4 hover:bg-white dark:hover:bg-zinc-800 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-0.5"
												>
													<div className="flex items-center justify-between mb-3">
														<div className="flex items-center gap-2">
															<span className="text-xs text-zinc-600 dark:text-zinc-400 font-semibold">
																{formattedDate}
															</span>
															{game.postseason && (
																<span className="text-xs font-bold text-yellow-700 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-500/20 px-2.5 py-1 rounded-lg">
																	PLAYOFFS
																</span>
															)}
														</div>
														{game.status && (
															<span className="text-xs text-zinc-500 dark:text-zinc-500 uppercase font-bold">
																{game.status}
															</span>
														)}
													</div>

													<div className="flex items-center justify-between">
														<div className="flex-1">
															<div className="flex items-center gap-2 mb-1">
																<span className="text-sm text-zinc-500 dark:text-zinc-400 font-semibold">
																	{isHomeTeam ? 'vs' : '@'}
																</span>
																<span className="font-bold text-zinc-900 dark:text-white">
																	{opponent.abbr || opponent.name}
																</span>
															</div>
														</div>

														<div className="flex items-center gap-3">
															{teamScore !== null && opponent.score !== null && (
																<>
																	<div className="text-right">
																		<div className="text-lg font-black text-zinc-900 dark:text-white">
																			{teamScore} - {opponent.score}
																		</div>
																	</div>
																	{game.status === 'Final' && (
																		<div
																			className={`text-xs font-bold px-2.5 py-1.5 rounded-lg ${
																				isWin
																					? 'bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400'
																					: isLoss
																					? 'bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400'
																					: 'bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
																			}`}
																		>
																			{isWin ? 'W' : isLoss ? 'L' : '-'}
																		</div>
																	)}
																</>
															)}
														</div>
													</div>

													{game.period && game.period > 0 && game.status !== 'Final' && (
														<div className="mt-2.5 text-xs text-zinc-500 dark:text-zinc-500 font-medium">
															Period {game.period}
															{game.time && ` - ${game.time}`}
														</div>
													)}
												</div>
											)
										})}
									</div>
								)}
							</div>
						)}

						{/* Team ID */}
						<div className="mt-8 pt-6 border-t border-gray-200 dark:border-zinc-800">
							<p className="text-xs text-zinc-500 dark:text-zinc-500 font-medium">Team ID: {teamData.id}</p>
						</div>
					</div>
				)}
			</SheetContent>
		</Sheet>
	)
}
