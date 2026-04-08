'use client'

import { useState, useEffect } from 'react'
import MealCard from '../Components/MealCard'

const Category = ['Seafood', 'Chicken']

const Area = [
  'Algerian','American','Argentinian','Australian','British','Canadian','Chinese','Croatian','Dutch',
  'Egyptian','Filipino','French','Greek','Indian','Irish','Italian','Jamaican','Japanese','Kenyan',
  'Malaysian','Mexican','Moroccan','Norwegian','Polish','Portuguese','Russian','Saudi Arabian',
  'Slovakian','Spanish','Syrian','Thai','Tunisian','Turkish','Ukrainian','Uruguayan','Venezulan','Vietnamese'
]

export default function BrowsePage() {
  const [meals, setMeals] = useState([])
  const [category, setCategory] = useState('')
  const [area, setArea] = useState('')

 const fetchMeals = async () => {
  try {
    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

    if (category) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    } else if (area) {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
    }

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }

    const data = await res.json()

    if (data.meals) {
      const detailedMeals = await Promise.all(
        data.meals.map(async (meal) => {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
          )
          const detail = await res.json()
          return detail.meals[0]
        })
      )

      setMeals(detailedMeals)
    } else {
      setMeals([])
    }

  } catch (error) {
    console.error("Fetch error:", error)
    setMeals([])
  }
}
  useEffect(() => {
    fetchMeals()
  }, [category, area])

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">

        {/* FILTERS */}
        <div className="flex gap-4 mb-6">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-2 rounded"
          >
            <option value="">All Categories</option>
            {Category.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="p-2 rounded"
          >
            <option value="">All Areas</option>
            {Area.map((a) => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} category={category} />
            ))
          ) : (
            <p className="text-white text-lg">No meals available</p>
          )}
        </div>

      </div>
    </div>
  )
}