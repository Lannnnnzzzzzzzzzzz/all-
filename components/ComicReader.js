import Image from 'next/image'

export default function ComicReader({ images = [] }) {
  return (
    <div className="space-y-4">
      {images.length === 0 && <div className="p-6 bg-white rounded shadow">No images</div>}
      {images.map((img, idx) => (
        <div key={idx} className="bg-white rounded overflow-hidden shadow">
          <div className="relative w-full" style={{ paddingBottom: '150%' }}>
            <Image src={img} alt={`page-${idx+1}`} layout="fill" objectFit="contain" />
          </div>
        </div>
      ))}
    </div>
  )
}
