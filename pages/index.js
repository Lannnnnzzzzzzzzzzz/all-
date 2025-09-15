import Layout from '../components/Layout'
import Link from 'next/link'

export default function Home() {
  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/anime"
          className="block p-8 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-lg text-center"
        >
          Anime
        </Link>

        <Link
          href="/donghua"
          className="block p-8 bg-gradient-to-br from-red-500 to-pink-600 text-white rounded-lg text-center"
        >
          Donghua
        </Link>

        <Link
          href="/comic"
          className="block p-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg text-center"
        >
          Comic
        </Link>
      </div>
    </Layout>
  )
}
