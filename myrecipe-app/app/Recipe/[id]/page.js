import DetailPage from '../../Pages/DetailPage'

export default async function RecipePage({ params }) {
    const {id}= await params
    return <DetailPage id={id} />
}