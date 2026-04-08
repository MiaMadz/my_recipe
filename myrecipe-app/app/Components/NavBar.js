'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
// import { useSelector } from 'react-redux' 
import { useState, useEffect } from 'react'
import { Heart, Search } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
    const pathname = usePathname()
    const favoriteCount = 0
    const [mounted, setMounted] = useState(false)

    useEffect(() => { setMounted(true) }, [])

    const navLink = (to, label) => (
        <Link href={to} style={{
            fontSize: '15px',
            fontWeight: '500',
            color: '#358D52',
            textDecoration: 'none',
            padding: '4px 0',
            borderBottom: pathname === to ? '2px solid #7ABA30' : '2px solid transparent',
        }}>{label}
        </Link>
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
            <Link href="/HomePage" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center'}}>
                <Image
                    src="/images/Logo.png"
                    alt="MyRecipe Logo"
                    width={230}
                    height={230}
                />
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
                {navLink('/Home', 'Home')}
                {navLink('/Browse', 'Browse')}
                {navLink('/About', 'About')}

                {/* Heart Icon */}
                <Link href="/Favorite" style={{ position: 'relative', color: '#358D52' }}>
                    <Heart size={20} />
                    
                </Link>

                {/* Search Icon */}
                <Link href="/" style={{ color: '#358D52' }}>
                    <Search size={20} />
                </Link>
            </div>
        </nav>
    )
}