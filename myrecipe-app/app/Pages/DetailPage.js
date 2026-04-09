'use client'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../rtk/favoriteSlice'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetRecipeByIdQuery } from '../rtk/recipeApi'
import styles from './DetailPage.module.css'

export default function DetailPage({ id }) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const source = searchParams.get('source')  

    const dispatch = useDispatch()
    const { data, isLoading, isError } = useGetRecipeByIdQuery(id)
    const favorites = useSelector((state) => state.favorites.favorites)

    if (isLoading) return <p>Loading...</p>
    if (isError)   return <p>Something went wrong.</p>

    const meal = data.meals[0]
    const isFavorited = favorites.some(f => f.idMeal === meal.idMeal)

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

    const handleFavorite = () => {
        if (isFavorited) {
            dispatch(removeFavorite(meal.idMeal))
        } else {
            dispatch(addFavorite(meal))
        }
    }

    const handleBack = () => {
        if (source === 'browse') {
            router.push('/Browse')
        } else {
            router.back()
        }
    }

    return (
        <div className={styles.detailContainer}>
            
            <button className={styles.backButton} onClick={handleBack}>← BACK</button>

            <div className={styles.mainContent}>
                <div className={styles.leftSection}>
                    <div className={styles.imageContainer}>
                        <img src={meal.strMealThumb} alt={meal.strMeal} className={styles.recipeImage} />
                        <h1 className={styles.recipeTitle}>{meal.strMeal}</h1>
                        
                        <div className={styles.tagsContainer}>
                            <div className={styles.tags}>
                                {meal.strCategory && <span className={styles.tag}>{meal.strCategory.toUpperCase()}</span>}
                                {meal.strArea && <span className={styles.tag}>{meal.strArea.toUpperCase()}</span>}
                            </div>
                            <button className={styles.favoriteEmoji} onClick={handleFavorite}>
                                <span style={{ color: isFavorited ? '#16a34a' : '#ccc' }}>♥</span>
                            </button>
                        </div>

                        {meal.strYoutube && (
                            <a href={meal.strYoutube} target="_blank" rel="noopener noreferrer" className={styles.youtubeButton}>
                                Watch Here!
                            </a>
                        )}
                    </div>
                </div>

                <div className={styles.rightSection}>
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