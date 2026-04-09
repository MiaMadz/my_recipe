'use client'
import { useGetRecipesByCategoryQuery, useGetRecipeByIdQuery } from '../rtk/recipeApi'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Filters from '../Components/Filters'
import Link from 'next/link'

function MealCard({ meal, area, searchQuery }) {
    const { data } = useGetRecipeByIdQuery(meal.idMeal)

    if (!data || !data.meals) return null

    const fullMeal = data.meals[0]

    if (area && fullMeal.strArea !== area) return null
    if (searchQuery && !fullMeal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())) return null

    return (
        <Link href={`/Recipe/${fullMeal.idMeal}`}>
            <div>
                <img src={fullMeal.strMealThumb} alt={fullMeal.strMeal} />
                <h3>{fullMeal.strMeal}</h3>
            </div>
        </Link>
    )
}

export default function BrowsePage() {
    const searchParams = useSearchParams()
    const searchQuery = searchParams.get('search') || ''

    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery)
    const [filters, setFilters] = useState({ category: 'Seafood', area: '' })

    useEffect(() => {
        const timeout = setTimeout(() => setDebouncedSearch(searchQuery), 300)
        return () => clearTimeout(timeout)
    }, [searchQuery])

    const { data: seafoodData, isLoading: seafoodLoading } = useGetRecipesByCategoryQuery('Seafood')
    const { data: chickenData, isLoading: chickenLoading } = useGetRecipesByCategoryQuery('Chicken')

    const isLoading = seafoodLoading || chickenLoading

    const meals = debouncedSearch
        ? [...(seafoodData?.meals || []), ...(chickenData?.meals || [])]
        : filters.category === 'Chicken'
            ? chickenData?.meals || []
            : seafoodData?.meals || []

    const visibleMeals = meals.filter(meal =>
        !debouncedSearch || meal.strMeal.toLowerCase().includes(debouncedSearch.toLowerCase())
    )

    if (isLoading) return <p>Loading...</p>

    return (
        <div>
            <Filters onFilterChange={setFilters} />

            {debouncedSearch && (
                <p>Showing results for: <strong>{debouncedSearch}</strong></p>
            )}

            <div>
                {visibleMeals.length === 0 && debouncedSearch ? (
                    <p>No meals found for "{debouncedSearch}"</p>
                ) : (
                    visibleMeals.map((meal) => (
                        <MealCard
                            key={meal.idMeal}
                            meal={meal}
                            area={filters.area}
                            searchQuery={debouncedSearch}
                        />
                    ))
                )}
            </div>
        </div>
    )
}