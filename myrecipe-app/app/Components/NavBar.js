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

    const favorites = useSelector((state) => state.favorites?.favorites || [])

    useEffect(() => { setMounted(true) }, [])

    const handleSearchChange = (e) => {
        const value = e.target.value
        setSearchQuery(value)
        router.push(`/Browse?search=${encodeURIComponent(value)}`)
    }

    const navLink = (to, label) => (
        <Link href={to} style={{
            fontSize: '18px',
            fontWeight: '500',
            color: '#358D52',
            textDecoration: 'none',
            padding: '4px 0',
            borderBottom: pathname === to || (to === '/Home' && pathname === '/') ? '2px solid #7ABA30' : '2px solid transparent',
        }}>{label}</Link>
    )

    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 40px',
            background: '#fff',
            borderBottom: '2px solid #358D52',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            position: 'sticky',
            top: '0',
            zIndex: '9999'
        }}>
            <Link href="/Home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <Image src="/images/Logo.png" alt="MyRecipe Logo" width={250} height={250} />
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                {navLink('/Home', 'Home')}
                {navLink('/Browse', 'Browse')}
                {navLink('/About', 'About')}

                <Link href="/Favorite" style={{ position: 'relative', color: '#358D52' }}>
                    <Heart size={23} />
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
                            <Search size={23} />
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