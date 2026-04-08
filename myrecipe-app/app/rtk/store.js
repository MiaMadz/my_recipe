import { configureStore } from "@reduxjs/toolkit";
import { recipeApi } from './recipeApi';
import favoriteReducer from './favoriteSlice'; // ✅ ADD THIS

export const store = configureStore({
    reducer:{
        [recipeApi.reducerPath]: recipeApi.reducer,
        favorites: favoriteReducer, // ✅ ADD THIS LINE
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(recipeApi.middleware)
});