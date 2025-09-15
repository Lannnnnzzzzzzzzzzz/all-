import Link from 'next/link'
import Image from 'next/image'

export default function Card({ item, href }) {
  return (
    <Link href={href}>
      <a className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition">
        <div className="relative h-44 md:h-56 w-full">
          {item.thumb ? (
            <Image src={item.thumb} alt={item.title || item.name} layout="fill" objectFit="cover" />
          ) : (
            <div className="bg-gray-200 w-full h-full flex items-center justify-center">No Image</div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm md:text-base truncate">{item.title || item.name || item.slug}</h3>
          <p className="text-xs text-gray-600">{item.extra || ''}</p>
        </div>
      </a>
    </Link>
  )
}
