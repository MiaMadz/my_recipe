'use client'

import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { Dancing_Script } from 'next/font/google'
import MealCard from "../Components/MealCard"

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
})

export default function FavoritePage() {
  const favorites = useSelector((state) => state.favorites.favorites)
  const router = useRouter()

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/bg1.png')" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">

        <div className="flex justify-between items-center mb-6">
          <h1 className={`${dancing.className} text-4xl text-green-800 drop-shadow-md`}>
            Favorite Dishes
          </h1>
          <button
            onClick={() => router.back()}
            className="text-green-700 bg-white font-semibold px-4 py-2 rounded-full hover:bg-green-50 transition"
          >
            BACK →
          </button>
        </div>

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