'use client'

import { useState, useEffect } from 'react'
import MealCard from '../Components/MealCard'
import Filters from '../Components/Filters'
import Image from 'next/image'
import Link from 'next/link'

export default function BrowsePage() {
  const [meals, setMeals] = useState([])
  const [filters, setFilters] = useState({ category: 'Seafood', area: '' })

  const fetchMeals = async () => {
    try {
      const { category, area } = filters

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

      // ✅ limit to first 20 meals to avoid rate limiting
      const limitedMeals = data.meals.slice(0, 20)

      const detailedMeals = await Promise.all(
        limitedMeals.map(async (meal) => {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
          )
          if (!res.ok) return null  // ✅ handle individual failures gracefully
          const detail = await res.json()
          return detail.meals?.[0] || null
        })
      )

      // ✅ filter out any null results from failed fetches
      const validMeals = detailedMeals.filter(Boolean)

      const filtered = area
        ? validMeals.filter(
            (meal) => meal.strArea?.toLowerCase() === area.toLowerCase()
          )
        : validMeals

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
      style={{ backgroundImage: "url('/images/bg_myrecipe.png')" }}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Filters onFilterChange={setFilters} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
          {meals.length > 0 ? (
            meals.map((meal) => (
              <MealCard key={meal.idMeal} meal={meal} category={filters.category} source="browse" />
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center mt-6">
              <Image src="/images/NoRecipeAvailable.png" alt="No recipes available" width={200} height={200}/>
              <p className="text-black text-xl mt-4">No meals available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}