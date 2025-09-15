import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Card from '../../components/Card'
import Loader from '../../components/Loader'
import { fetchProxy } from '../../utils/api'

export default function ComicIndex() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetchProxy('comic/terbaru')
      .then(d => { if (mounted) setData(Array.isArray(d) ? d : d.results || d.data || []) })
      .catch(err => console.error(err))
      .finally(() => mounted && setLoading(false))
    return () => mounted = false
  }, [])

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Komik - Terbaru</h1>
      {loading ? <Loader/> : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {data.map((it, i) => (
            <Card key={i} item={{ thumb: it.thumb || it.image || it.cover, title: it.title || it.name, extra: it.type }} href={`/comic/${it.slug || it.id}`} />
          ))}
        </div>
      )}
    </Layout>
  )
}
