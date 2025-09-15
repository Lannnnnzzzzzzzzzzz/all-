import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Layout from '../../../components/Layout'
import Loader from '../../../components/Loader'
import PlayerModal from '../../../components/PlayerModal'
import { fetchProxy } from '../../../utils/api'

export default function DonghuaEpisode() {
  const { query } = useRouter()
  const slug = query.slug
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)
  const [src, setSrc] = useState(null)

  useEffect(() => {
    if (!slug) return
    let mounted = true
    fetchProxy(`anime/donghua/episode/${slug}`)
      .then(d => { if (mounted) setData(d) })
      .catch(err => console.error(err))
      .finally(() => mounted && setLoading(false))
    return () => mounted = false
  }, [slug])

  if (loading) return <Layout><Loader/></Layout>
  if (!data) return <Layout><div>Not found</div></Layout>

  const play = (stream) => { setSrc(stream); setOpen(true) }

  return (
    <Layout>
      <h1 className="text-xl font-bold mb-4">{data.title || 'Episode'}</h1>
      <div className="bg-white p-4 rounded shadow">
        <p className="mb-4">{data.description}</p>
        <div className="space-y-2">
          {(data.sources || []).map((s, i) => (
            <button key={i} onClick={() => play(s.file || s.url)} className="block w-full text-left bg-gray-100 p-2 rounded">{s.quality || s.label || 'Play'}</button>
          ))}
        </div>
      </div>

      <PlayerModal open={open} onClose={() => setOpen(false)} src={src} />
    </Layout>
  )
}
