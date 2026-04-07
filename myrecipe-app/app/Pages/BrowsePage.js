'use client'
import { useGetRecipesByCategoryQuery, useGetRecipeByIdQuery } from '../rtk/recipeApi'
import Link from 'next/link'
import { useState } from 'react'
import Filters from '../Components/Filters'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../rtk/favoriteSlice'

function MealCard({ meal }) {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites.favorites)

  const isFav = favorites.some(f => f.idMeal === meal.idMeal)

  const toggleFavorite = () => {
    if (isFav) {
      dispatch(removeFavorite(meal.idMeal))
    } else {
      dispatch(addFavorite(meal))
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-3 relative">

      {/* CATEGORY BADGE */}
      <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
        Recipe
      </span>

      {/* HEART */}
      <button onClick={toggleFavorite} className="absolute top-2 right-2 text-xl">
        {isFav ? "💚" : "🤍"}
      </button>

      <Link href={`/recipe/${meal.idMeal}`}>
        <img src={meal.strMealThumb} className="rounded-lg" />

        <h3 className="font-bold text-green-700 mt-2">
          {meal.strMeal}
        </h3>
      </Link>

      <p className="text-sm mt-1">⭐ 4.5 (300)</p>

      <button className="bg-orange-500 text-white px-3 py-1 rounded-full mt-2">
        View Recipe
      </button>
    </div>
  )
}

export default function BrowsePage() {
  const [filter, setFilter] = useState({
    type: 'category',
    value: 'Seafood'
  })

  const { data: catData, isLoading: catLoading } =
    useGetRecipesByCategoryQuery(filter.value, {
      skip: filter.type !== 'category'
    })

  const { data: areaData, isLoading: areaLoading } =
    useGetRecipesByAreaQuery(filter.value, {
      skip: filter.type !== 'area'
    })

  const data = filter.type === 'category' ? catData : areaData
  const isLoading = catLoading || areaLoading

  if (isLoading) return <p>Loading...</p>
  if (!data?.meals) return <p>No meals found.</p>

  return (
    <div className="p-6">

      <Filters onFilterChange={setFilter} />

      <div className="grid grid-cols-3 gap-6">
        {data.meals.map((meal) => (
          <MealCard key={meal.idMeal} meal={meal} />
        ))}
      </div>

    </div>
  )
}