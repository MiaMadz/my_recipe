'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import MealCard from '../Components/MealCard'
import Filters from '../Components/Filters'
import Image from 'next/image'
import Pagination from '../Components/Pagination'



export default function BrowsePage() {
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const [meals, setMeals] = useState([])
  const [filters, setFilters] = useState({ category: 'Seafood', area: '' })
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)
  const [currentPage, setCurrentPage] = useState(1)
  const MEALS_PER_PAGE = 6

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedSearch(searchQuery), 300)
        return () => clearTimeout(timeout)
    }, [searchQuery])

    useEffect(() => {
        setCurrentPage(1)
    }, [filters, debouncedSearch])

    const fetchMeals = async () => {
        try {
        const { category, area } = filters

        let url

        if (debouncedSearch) {
            url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(debouncedSearch)}`
        } else if (category) {
            url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        } else {
            url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`
        }

        const res = await fetch(url)
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        const data = await res.json()

        if (!data.meals) {
            setMeals([])
            return
        }

        const limitedMeals = data.meals.slice(0, 20)

        const detailedMeals = await Promise.all(
            limitedMeals.map(async (meal) => {
            const res = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
            )
            if (!res.ok) return null
            const detail = await res.json()
            return detail.meals?.[0] || null
            })
        )

        const validMeals = detailedMeals.filter(Boolean)

        // filter to only Chicken and Seafood when searching
        const categoryFiltered = debouncedSearch
            ? validMeals.filter(m => m.strCategory === 'Chicken' || m.strCategory === 'Seafood')
            : validMeals

        // filter by area
        const filtered = area
            ? categoryFiltered.filter(m => m.strArea?.toLowerCase() === area.toLowerCase())
            : categoryFiltered

        setMeals(filtered)
        } catch (error) {
        console.error('Fetch error:', error)
        setMeals([])
    }
  }

  useEffect(() => {
    fetchMeals()
  }, [filters, debouncedSearch])

    const totalPages = Math.ceil(meals.length / MEALS_PER_PAGE)
    const paginatedMeals = meals.slice(
        (currentPage - 1) * MEALS_PER_PAGE,
        currentPage * MEALS_PER_PAGE
    )

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/bg1.png')" }}
    >
        <div className="max-w-7xl mx-auto px-6 py-8">
            <Filters onFilterChange={setFilters} />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-6">
                {paginatedMeals.length > 0 ? (
                    paginatedMeals.map((meal) => (
                    <MealCard key={meal.idMeal} meal={meal} category={filters.category} source="browse" />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center mt-6">
                    <Image src="/images/NoRecipeAvailable.png" alt="No recipes available" width={200} height={200} />
                    <p className="text-black text-xl mt-4">
                        {debouncedSearch ? `No meals found for "${debouncedSearch}"` : 'No meals available'}
                    </p>
                    </div>
                )}
            </div>
            <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            />
        </div>
    </div>
    )
}