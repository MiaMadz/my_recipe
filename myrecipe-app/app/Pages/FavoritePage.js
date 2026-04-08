'use client'

import { useSelector } from "react-redux"
import MealCard from "../Components/MealCard"

export default function FavoritePage() {
  const favorites = useSelector((state) => state.favorites.favorites)

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">

        <h1 className="text-2xl font-bold text-white mb-6">
          Your Favorites 💚
        </h1>

        {favorites.length === 0 ? (
          <p className="text-white">No favorites yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {favorites.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}