// BrowsePage.js
'use client'

import { useState, useEffect } from 'react'
import MealCard from '../Components/MealCard'
import Filters from '../Components/Filters'

export default function BrowsePage() {
  const [meals, setMeals] = useState([])
  const [filters, setFilters] = useState({ category: 'Seafood', area: '' })

  const fetchMeals = async () => {
    try {
      const { category, area } = filters

      // Step 1: Fetch by category first (or all if no category)
      const categoryUrl = category
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        : `https://www.themealdb.com/api/json/v1/1/search.php?s=`

      const res = await fetch(categoryUrl)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
      const data = await res.json()

      if (!data.meals) {
        setMeals([])
        return
      }

      // Step 2: Fetch full details for each meal (needed to get strArea)
      const detailedMeals = await Promise.all(
        data.meals.map(async (meal) => {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
          )
          const detail = await res.json()
          return detail.meals[0]
        })
      )

      // Step 3: If area is selected, filter client-side by strArea
      const filtered = area
        ? detailedMeals.filter(
            (meal) => meal.strArea?.toLowerCase() === area.toLowerCase()
          )
        : detailedMeals

      setMeals(filtered)
    } catch (error) {
      console.error('Fetch error:', error)
      setMeals([])
    }
  }

  useEffect(() => {
    fetchMeals()
  }, [filters])

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Filters onFilterChange={setFilters} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} category={filters.category} />
            ))
          ) : (
            <p className="text-white text-lg">No meals found for this combination</p>
          )}
        </div>
      </div>
    </div>
  )
}