'use client'
import { useState } from 'react'

const Category = [
    'Seafood',
    'Chicken',
]

const Area = [
    'Algerian',
    'American',
    'Argentinian',
    'Australian',
    'British',
    'Canadian',
    'Chinese',
    'Croatian',
    'Dutch',
    'Egyptian',
    'Filipino',
    'French',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Jamaican',
    'Japanese',
    'Kenyan',
    'Malaysian',
    'Mexican',
    'Moroccan',
    'Norwegian',
    'Polish',
    'Portuguese',
    'Russian',
    'Saudi Arabian',
    'Slovakian',
    'Spanish',
    'Syrian',
    'Thai',
    'Tunisian',
    'Turkish',
    'Ukrainian',
    'Uruguayan',
    'Venezulan',
    'Vietnamese',
]

export default function Filters({ onFilterChange }) {
    const [category, setCategory] = useState('Seafood')
    const [area, setArea] = useState('')

    const handleCategory = (e) => {
        setCategory(e.target.value)
        onFilterChange({ category: e.target.value, area })
    }

    const handleArea = (e) => {
        setArea(e.target.value)
        onFilterChange({ category, area: e.target.value })
    }

    return (
        <div>
            <select value={category} onChange={handleCategory}>
                <option value="">All Categories</option>
                {Category.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            <select value={area} onChange={handleArea}>
                <option value="">All Areas</option>
                {Area.map((a) => (
                    <option key={a} value={a}>{a}</option>
                ))}
            </select>
        </div>
    )
}