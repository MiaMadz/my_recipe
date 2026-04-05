import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const recipeApi = createApi({
    reducerPath:"recipeApi",
    baseQuery:fetchBaseQuery({baseUrl:'https://www.themealdb.com/api/json/v1/1/'}),
    tagTypes:["Recipes"],
    endpoints:(builder)=>(
        {
           getRecipesByCategory:builder.query({
                query:(category)=>`filter.php?c=${category}`
            }), 

           getRecipesByArea:builder.query({
                query:(area)=>`filter.php?a=${area}`
            }),

           getRecipesBySearch: builder.query({
                query: (search) => `search.php?s=${search}`,
            }),

           getRecipeById:builder.query({
                query:(id)=>`lookup.php?i=${id}`
            })
        }
    )
})
export const {useGetRecipesByCategoryQuery,useGetRecipeByIdQuery, useGetRecipesByAreaQuery, useGetRecipesBySearchQuery} = recipeApi