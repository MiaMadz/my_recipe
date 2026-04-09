'use client'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

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

    const selectStyle = {
        appearance: 'none',
        WebkitAppearance: 'none',
        padding: '8px 40px 8px 16px',
        borderRadius: '10px',
        color: 'white',
        background: '#16A34A',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        border: 'none',
        outline: 'none',
        width: '100%'
    }

    const iconStyle = {
        position: 'absolute',
        right: '12px',
        color: 'white'
    }

    const wrapperStyle = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    }

    return (
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={wrapperStyle}>
            <select value={category} onChange={handleCategory} style={selectStyle}>
                {Category.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
            <ChevronDown size={16} style={iconStyle} />
            </div>

            <div style={wrapperStyle}>
            <select value={area} onChange={handleArea} style={selectStyle}>
                <option value="">All Areas</option>
                {Area.map((a) => (
                    <option key={a} value={a}>{a}</option>
                ))}
            </select>
            <ChevronDown size={16} style={iconStyle} />
            </div>

        </div>
    )
}