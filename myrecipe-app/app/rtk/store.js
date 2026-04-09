import { configureStore } from "@reduxjs/toolkit";
import { recipeApi } from './recipeApi';
import favoriteReducer from './favoriteSlice'; 

export const store = configureStore({
    reducer:{
        [recipeApi.reducerPath]: recipeApi.reducer,
        favorites: favoriteReducer,
    },
    middleware:(getDefaultMiddleware) =>
        getDefaultMiddleware().concat(recipeApi.middleware)
})