// app/api/meals/route.js
import { NextResponse } from 'next/server'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const c = searchParams.get('c')
  const a = searchParams.get('a')
  const i = searchParams.get('i')
  const s = searchParams.get('s')

  let url = 'https://www.themealdb.com/api/json/v1/1/'

  if (i) {
    url += `lookup.php?i=${i}`
  } else if (c) {
    url += `filter.php?c=${c}`
  } else if (a) {
    url += `filter.php?a=${a}`
  } else {
    url += `search.php?s=${s || ''}`
  }

  try {
    console.log('Fetching from MealDB:', url)

    const res = await fetch(url, {
      cache: 'no-store',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!res.ok) {
      console.error('MealDB responded with:', res.status, res.statusText)
      return NextResponse.json({ meals: null }, { status: res.status })
    }

    const data = await res.json()
    console.log('MealDB response OK, meals count:', data.meals?.length ?? 0)

    return NextResponse.json(data)
  } catch (error) {
    console.error('Proxy fetch error:', error.message)
    return NextResponse.json({ meals: null, error: error.message }, { status: 500 })
  }
}