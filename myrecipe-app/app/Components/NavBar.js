'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { Heart, Search } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const [mounted, setMounted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    // favorite count from main
    const favorites = useSelector((state) => state.favorites?.favorites || [])

    useEffect(() => { setMounted(true) }, [])

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchQuery(value)
        router.push(`/Browse?search=${encodeURIComponent(value)}`)
    }

    const navLink = (to, label) => (
        <Link href={to} style={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#358D52',
            textDecoration: 'none',
            padding: '4px 0',
            borderBottom: pathname === to ? '2px solid #7ABA30' : '2px solid transparent',
        }}>{label}</Link>
    )

    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 40px',
            background: '#fff',
            borderBottom: '1px solid #eee',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
        }}>
            <Link href="/HomePage" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <Image src="/images/Logo.png" alt="MyRecipe Logo" width={230} height={230} />
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                {navLink('/Home', 'Home')}
                {navLink('/Browse', 'Browse')}
                {navLink('/About', 'About')}

                {/* Heart with favorite count */}
                <Link href="/Favorite" style={{ position: 'relative', color: '#358D52' }}>
                    <Heart size={20} />
                    {mounted && favorites.length > 0 && (
                        <span style={{
                            position: 'absolute',
                            top: '-6px',
                            right: '-6px',
                            background: '#E53E3E',
                            color: '#fff',
                            fontSize: '10px',
                            fontWeight: '600',
                            borderRadius: '9999px',
                            width: '16px',
                            height: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            {favorites.length}
                        </span>
                    )}
                </Link>

                {/* Search */}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: isOpen ? '#f3f4f6' : 'transparent',
                        borderRadius: '9999px',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        width: isOpen ? '200px' : '36px',
                        padding: isOpen ? '6px 12px' : '6px'
                    }}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#358D52' }}
                        >
                            <Search size={20} />
                        </button>

                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            style={{
                                border: 'none',
                                outline: 'none',
                                background: 'transparent',
                                color: '#358D52',
                                marginLeft: isOpen ? '8px' : '0px',
                                width: isOpen ? '100%' : '0px',
                                opacity: isOpen ? 1 : 0,
                                transition: 'all 0.3s ease'
                            }}
                            autoFocus={isOpen}
                        />
                    </div>
                </div>
            </div>
        </nav>
    )
}