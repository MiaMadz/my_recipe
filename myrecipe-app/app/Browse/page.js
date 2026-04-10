import { Suspense } from 'react'
import BrowsePage from '../Pages/BrowsePage'

export default function Browse() {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <BrowsePage />
        </Suspense>
    )
}