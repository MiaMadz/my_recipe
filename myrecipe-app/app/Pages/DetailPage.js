'use client'
import { useGetRecipeByIdQuery } from '../rtk/recipeApi'
import styles from './DetailPage.module.css'

export default function DetailPage({ id }) {
    const { data, isLoading, isError } = useGetRecipeByIdQuery(id)

    if (isLoading) return <p>Loading...</p>
    if (isError)   return <p>Something went wrong.</p>

    const meal = data.meals[0]

    // Helper function to get all ingredients and measures
    const getIngredients = () => {
        const ingredients = []
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`]
            const measure = meal[`strMeasure${i}`]
            if (ingredient && ingredient.trim()) {
                ingredients.push({ ingredient, measure })
            }
        }
        return ingredients
    }

    const ingredients = getIngredients()

    return (
        <div className={styles.detailContainer}>
            {/* Back Button */}
            <button className={styles.backButton}>← BACK</button>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Left Section - Image and Info */}
                <div className={styles.leftSection}>
                    {/* Image and Title Container */}
                    <div className={styles.imageContainer}>
                        <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.recipeImage} />
                        <h1 className={styles.recipeTitle}>{meal.strMeal}</h1>
                        
                        <div className={styles.tags}>
                            {meal.strCategory && <span className={styles.tag}>{meal.strCategory.toUpperCase()}</span>}
                            {meal.strArea && <span className={styles.tag}>{meal.strArea.toUpperCase()}</span>}
                        </div>

                        <button className={styles.addButton}> Add to Favorites </button>
                    </div>
                </div>

                {/* Right Section - Ingredients and Instructions */}
                <div className={styles.rightSection}>
                    {/* Ingredients */}
                    <div className={styles.ingredientsSection}>
                        <h2 className={styles.sectionTitle}>Ingredients</h2>
                        <div className={styles.ingredientsList}>
                            {ingredients.map((item, idx) => (
                                <div key={idx} className={styles.ingredientItem}>
                                    <span className={styles.ingredientName}>{item.ingredient}</span>
                                    <span className={styles.ingredientMeasure}>{item.measure}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Instructions */}
                    <div className={styles.instructionsSection}>
                        <h2 className={styles.sectionTitle}>Instructions</h2>
                        <ol className={styles.instructionsList}>
                            {meal.strInstructions.split('\n').map((step, idx) => (
                                step.trim() && <li key={idx} className={styles.instructionStep}>{step.trim()}</li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )

}