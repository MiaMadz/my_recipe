'use client'

import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../rtk/favoriteSlice'
import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function MealCard({ meal, category }) {
  const dispatch = useDispatch()
  const favorites = useSelector((state) => state.favorites?.favorites || [])

  const isFav = favorites.some(f => f.idMeal === meal.idMeal)
  const rating = favorites.filter(f => f.idMeal === meal.idMeal).length

  const toggleFavorite = () => {
    if (isFav) {
      dispatch(removeFavorite(meal.idMeal))
    } else {
      dispatch(addFavorite(meal))
    }
  }

  return (
    <div className="bg-white/90 backdrop-blur rounded-2xl shadow-lg p-4 relative flex flex-col hover:scale-105 transition duration-300">

      <span className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full">
        {meal.strCategory || category || "Recipe"}
      </span>

      {/* Top-right heart: white fill + green-600 border by default, fully green-600 when favorited */}
      <button
        onClick={toggleFavorite}
        className="absolute top-2 right-2 text-xl"
      >
        <Heart
          fill={isFav ? '#16a34a' : 'white'}
          stroke='#16a34a'
        />
      </button>

      <img
        src={meal.strMealThumb}
        className="rounded-lg h-40 w-full object-cover"
      />

      <h3 className="font-bold text-green-700 mt-2">
        {meal.strMeal}
      </h3>

      {/* Bottom heart: always green-600 */}
      <p className="text-sm mt-1 flex items-center gap-1">
        <Heart
          fill='#16a34a'
          stroke='#16a34a'
          size={16}
        />
        {rating} ({rating} favorites)
      </p>

      <div className="flex justify-end mt-auto">
        <Link href={`/Recipe/${meal.idMeal}`}>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded-full text-sm">
            View Recipe
          </button>
        </Link>
      </div>

    </div>
  )
}