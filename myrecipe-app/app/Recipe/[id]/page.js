'use client'
import { useEffect, useState } from 'react'

export default function DetailPage({ id }) {
  const [meal, setMeal] = useState(null)

  useEffect(() => {
    async function fetchMeal() {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      )
      const data = await res.json()
      setMeal(data.meals[0])
    }

    fetchMeal()
  }, [id])

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    )
  }

  // Generate ingredients dynamically
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      )
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white shadow-xl rounded-2xl overflow-hidden grid md:grid-cols-2">

        {/* IMAGE */}
        <div className="w-full h-80 md:h-full">
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            className="w-full h-full object-cover"
          />
        </div>

        {/* CONTENT */}
        <div className="p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-2">{meal.strMeal}</h1>
          <p className="text-gray-500 mb-4">
            {meal.strCategory} • {meal.strArea}
          </p>

          {/* INGREDIENTS */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              {ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* INSTRUCTIONS */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Instructions</h2>
            <p className="text-gray-700 whitespace-pre-line">
              {meal.strInstructions}
            </p>
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => window.history.back()}
            className="mt-6 bg-[#C5E1A4] hover:bg-green-500 text-black font-semibold px-6 py-3 rounded-xl transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}