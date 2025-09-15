import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import Loader from '../../../components/Loader'
import ComicReader from '../../../components/ComicReader'
import { fetchProxy } from '../../../utils/api'

export default function ComicChapter() {
  const { query } = useRouter()
  const slug = query.slug
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    let mounted = true
    fetchProxy(`comic/chapter/${slug}`)
      .then(d => { if (mounted) setData(d) })
      .catch(err => console.error(err))
      .finally(() => mounted && setLoading(false))
    return () => mounted = false
  }, [slug])

  if (loading) return <Layout><Loader/></Layout>
  if (!data) return <Layout><div>Not found</div></Layout>

  const images = data.images || data.pages || []

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">{data.title || 'Chapter'}</h1>
      <ComicReader images={images} />
    </Layout>
  )
}
