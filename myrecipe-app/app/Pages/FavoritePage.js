'use client'

import { useState } from 'react'
import { useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'
import MealCard from "../Components/MealCard"
import { Dancing_Script } from 'next/font/google'

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
})

const categories = ['All', 'Seafood', 'Chicken']

export default function FavoritePage() {
  const favorites = useSelector((state) => state.favorites.favorites)
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredFavorites = selectedCategory === 'All'
    ? favorites
    : favorites.filter(meal =>
        meal.strCategory?.toLowerCase() === selectedCategory.toLowerCase()
      )

  const selectStyle = {
    appearance: 'none',
    WebkitAppearance: 'none',
    padding: '8px 40px 8px 16px',
    borderRadius: '10px',
    color: 'white',
    background: '#16A34A',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  }

  const wrapperStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  }

  const iconStyle = {
    position: 'absolute',
    right: '12px',
    color: 'white',
    pointerEvents: 'none',
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/bg1.png')" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
          <h1
            className={`${dancing.className} text-4xl text-green-800 mb-4`}
            style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)' }}
          >
            Favorite Dishes
          </h1>
        <div className="flex justify-between items-center mb-6">
          <div style={wrapperStyle}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={selectStyle}
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown size={16} style={iconStyle} />
          </div>

          <button
            onClick={() => router.back()}
            className="text-green-800 font-medium tracking-wide hover:text-green-600 transition"
          >
            ← BACK
          </button>
        </div>

        {filteredFavorites.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center mt-20">
            <Image
              src="/images/NoRecipeAvailable.png"
              alt="No favorites available"
              width={200}
              height={200}
            />
            <p className="text-black text-xl mt-4">
              {favorites.length === 0
                ? 'No favorites yet. Start adding some!'
                : `No ${selectedCategory} dishes in your favorites yet.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredFavorites.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}

      </div>
    </div>
  )
}