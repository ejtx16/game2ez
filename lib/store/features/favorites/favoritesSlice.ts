import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store/store'

interface FavoritesState {
	teamIds: number[]
}

const initialState: FavoritesState = {
	teamIds: [],
}

export const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		toggleFavorite: (state, action: PayloadAction<number>) => {
			const teamId = action.payload
			const index = state.teamIds.indexOf(teamId)
			if (index > -1) {
				state.teamIds.splice(index, 1)
			} else {
				state.teamIds.push(teamId)
			}
			if (typeof window !== 'undefined') {
				localStorage.setItem('favorites', JSON.stringify(state.teamIds))
			}
		},
		addFavorite: (state, action: PayloadAction<number>) => {
			const teamId = action.payload
			if (!state.teamIds.includes(teamId)) {
				state.teamIds.push(teamId)
				if (typeof window !== 'undefined') {
					localStorage.setItem('favorites', JSON.stringify(state.teamIds))
				}
			}
		},
		removeFavorite: (state, action: PayloadAction<number>) => {
			const teamId = action.payload
			state.teamIds = state.teamIds.filter((id) => id !== teamId)
			if (typeof window !== 'undefined') {
				localStorage.setItem('favorites', JSON.stringify(state.teamIds))
			}
		},
		initializeFavorites: (state) => {
			if (typeof window !== 'undefined') {
				const savedFavorites = localStorage.getItem('favorites')
				if (savedFavorites) {
					try {
						const parsedFavorites = JSON.parse(savedFavorites)
						if (Array.isArray(parsedFavorites)) {
							state.teamIds = parsedFavorites
						}
					} catch (error) {
						console.error('Failed to parse favorites from localStorage:', error)
					}
				}
			}
		},
	},
})

export const {
	toggleFavorite,
	addFavorite,
	removeFavorite,
	initializeFavorites,
} = favoritesSlice.actions

export const selectFavoriteTeamIds = (state: RootState) =>
	state.favorites.teamIds
export const selectIsFavorite = (teamId: number) => (state: RootState) =>
	state.favorites.teamIds.includes(teamId)

export default favoritesSlice.reducer
