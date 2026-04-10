'use client'

import { useRouter } from "next/navigation"
import { Dancing_Script } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

const dancing = Dancing_Script({
  subsets: ['latin'],
  weight: ['700'],
})

export default function HomePage() {
  const router = useRouter()

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/bg1.png')",
      }}
    >

      <hr className="border-gray-200" />

      <main className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-12 pt-24 items-center">
        
        <div className="space-y-8">
          <h1 className="text-8xl font-serif text-gray-900 leading-tight">
            Every dish, <br />
            <span className={`${dancing.className} text-[#E67E22]`}>perfectly</span> <br />
            explained.
          </h1>
          <p className="text-xl text-gray-600 font-medium">Check out our most favorite recipe!</p>
          <div className="flex gap-4">
            <button 
              onClick={() => router.push('/Browse')}
              className="bg-[#16A34A] text-white px-10 py-4 rounded-lg font-bold shadow-lg hover:bg-[#0f853a] transition-all active:scale-95"
            >
              Browse Recipes
            </button>
            <button 
            onClick={() => router.push('/About')}
            className="bg-[#16A34A] text-white px-10 py-4 rounded-lg font-bold shadow-lg hover:bg-[#0f853a] transition-all active:scale-95">
              Learn More
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Link href="/Recipe/52772">
          <div className="relative border-[12px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-sm rotate-1 hover:rotate-0 transition-transform duration-500">
            <Image 
              src="/images/teriyakiChicken.jpg" 
              alt="Teriyaki Chicken" 
              width={500} 
              height={500} 
              className="object-cover"
              priority
            />
          </div>
          </Link>
          <h2 className={`${dancing.className} text-5xl text-[#4A7c44] mt-8`}>
            Teriyaki Chicken
          </h2>
        </div>

      </main>
    </div>
  )
}