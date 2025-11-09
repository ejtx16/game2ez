import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store/store'

// Define a type for the slice state
export type ThemeMode = 'light' | 'dark'

interface ThemeState {
  mode: ThemeMode
}

// Define the initial state - default to dark theme
const initialState: ThemeState = {
  mode: 'dark',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.mode)
      }
    },
    setTheme: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.mode)
      }
    },
    initializeTheme: (state) => {
      // Load from localStorage
      if (typeof window !== 'undefined') {
        const savedTheme = localStorage.getItem('theme') as ThemeMode | null
        if (savedTheme === 'light' || savedTheme === 'dark') {
          state.mode = savedTheme
        }
      }
    },
  },
})

export const { toggleTheme, setTheme, initializeTheme } = themeSlice.actions

// Selectors
export const selectTheme = (state: RootState) => state.theme.mode

export default themeSlice.reducer
