'use client'
import { useGetRecipesByCategoryQuery, useGetRecipeByIdQuery } from '../rtk/recipeApi'
import Link from 'next/link'
import { useState } from 'react'
import Filters from '../Components/Filters'

function MealCard({ meal, area }) {
    const { data } = useGetRecipeByIdQuery(meal.idMeal)

    if (!data || !data.meals) return null

    const fullMeal = data.meals[0]

    if (area && fullMeal.strArea !== area) return null

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
    const [filters, setFilters] = useState({ category: 'Seafood', area: '' })

    const { data, isLoading, isError } = useGetRecipesByCategoryQuery(filters.category)

    if (isLoading) return <p>Loading...</p>
    if (isError) return <p>Something went wrong.</p>
    if (!data || !data.meals) return <p>No meals found.</p>

    return (
        <div>
            <Filters onFilterChange={setFilters} /> 
            <div>
                {data.meals.map((meal) => (
                    <MealCard key={meal.idMeal} meal={meal} area={filters.area} />
                ))}
            </div>
        </div>
    )
}