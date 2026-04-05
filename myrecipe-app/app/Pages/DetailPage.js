'use client'
import { useGetRecipeByIdQuery } from '../rtk/recipeApi'

export default function DetailPage({ id }) {
    const { data, isLoading, isError } = useGetRecipeByIdQuery(id)

    if (isLoading) return <p>Loading...</p>
    if (isError)   return <p>Something went wrong.</p>

    const meal = data.meals[0]

    return (
        <div>
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <h1>{meal.strMeal}</h1>
            <p><strong>Category:</strong> {meal.strCategory}</p>
            <p><strong>Area:</strong> {meal.strArea}</p> 
            <h2><strong>Instructions</strong></h2>
            <p>{meal.strInstructions}</p>
            <p><strong>Tags:</strong>{meal.strTags}</p>
            <p><strong>Youtube:</strong>{meal.strYoutube}</p>
            <p><strong>{meal.strIngredient1}</strong> {meal.strMeasure1}</p>
            <p><strong>{meal.strIngredient2}</strong> {meal.strMeasure2}</p>
            <p><strong>{meal.strIngredient3}</strong> {meal.strMeasure3}</p>
            <p><strong>{meal.strIngredient4}</strong> {meal.strMeasure4}</p>
            <p><strong>{meal.strIngredient5}</strong> {meal.strMeasure5}</p>
            <p><strong>{meal.strIngredient6}</strong> {meal.strMeasure6}</p>
            <p><strong>{meal.strIngredient7}</strong> {meal.strMeasure7}</p>
            <p><strong>{meal.strIngredient8}</strong> {meal.strMeasure8}</p>
            <p><strong>{meal.strIngredient9}</strong> {meal.strMeasure9}</p>
            <p><strong>{meal.strIngredient10}</strong> {meal.strMeasure10}</p>
            <p><strong>{meal.strIngredient11}</strong> {meal.strMeasure11}</p>
            <p><strong>{meal.strIngredient12}</strong> {meal.strMeasure12}</p>
            <p><strong>{meal.strIngredient13}</strong> {meal.strMeasure13}</p>
            <p><strong>{meal.strIngredient14}</strong> {meal.strMeasure14}</p>
            <p><strong>{meal.strIngredient15}</strong> {meal.strMeasure15}</p>
            <p><strong>{meal.strIngredient16}</strong> {meal.strMeasure16}</p>
            <p><strong>{meal.strIngredient17}</strong> {meal.strMeasure17}</p>
            <p><strong>{meal.strIngredient18}</strong> {meal.strMeasure18}</p>
            <p><strong>{meal.strIngredient19}</strong> {meal.strMeasure19}</p>
            <p><strong>{meal.strIngredient20}</strong> {meal.strMeasure20}</p>
        </div>
    )

}