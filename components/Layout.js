import Link from 'next/link'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/"><a className="font-bold text-xl">Komikku</a></Link>
          <nav className="space-x-4">
            <Link href="/anime"><a className="hover:underline">Anime</a></Link>
            <Link href="/donghua"><a className="hover:underline">Donghua</a></Link>
            <Link href="/comic"><a className="hover:underline">Comic</a></Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
      <footer className="bg-gray-900 text-white text-center py-4">
        © {new Date().getFullYear()} Komikku — All Rights Reserved
      </footer>
    </div>
  )
}
