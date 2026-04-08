'use client'

import { useState, useEffect } from 'react'
import MealCard from '../Components/MealCard'
import Filters from '../Components/Filters' // adjust path as needed

export default function BrowsePage() {
  const [meals, setMeals] = useState([])
  const [filters, setFilters] = useState({ category: 'Seafood', area: '' })

  const fetchMeals = async () => {
    try {
      const { category, area } = filters
      let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='

      if (category) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      } else if (area) {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
      }

      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

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

        {/* FILTERS */}
        <Filters onFilterChange={setFilters} />

        {/* CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} category={filters.category} />
            ))
          ) : (
            <p className="text-white text-lg">No meals available</p>
          )}
        </div>

      </div>
    </div>
  )
}