import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Loader from '../../components/Loader'
import { fetchProxy } from '../../utils/api'
import Link from 'next/link'

export default function ComicDetail() {
  const { query } = useRouter()
  const slug = query.slug
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!slug) return
    let mounted = true
    fetchProxy(`comic/comic/${slug}`)
      .then(d => { if (mounted) setData(d) })
      .catch(err => console.error(err))
      .finally(() => mounted && setLoading(false))
    return () => mounted = false
  }, [slug])

  if (loading) return <Layout><Loader/></Layout>
  if (!data) return <Layout><div>Not found</div></Layout>

  return (
    <Layout>
      <div className="grid md:grid-cols-3 gap-6">
        <div>
          <img src={data.thumb || data.image || data.cover} alt={data.title} className="w-full rounded" />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-2xl font-bold">{data.title}</h1>
          <p className="text-sm text-gray-600">{data.status || ''} • {data.type || ''}</p>
          <p className="mt-4 text-gray-800">{data.synopsis || data.description}</p>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Chapters</h3>
            <div className="grid grid-cols-3 gap-2">
              {(data.chapters || []).map((ch, i) => (
                <Link key={i} href={`/comic/chapter/${ch.slug || ch.id}`}><a className="bg-white p-2 rounded shadow text-sm">{ch.title || ch.name || `#${i+1}`}</a></Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
