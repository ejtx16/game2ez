import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./features/theme/themeSlice";
import favoritesReducer from "./features/favorites/favoritesSlice";

// Create a store factory function instead of a global store instance
// This ensures a new store is created for each request in Next.js App Router
export const makeStore = () => {
  return configureStore({
    reducer: {
      theme: themeReducer,
      favorites: favoritesReducer,
      // Add your other reducers here
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
