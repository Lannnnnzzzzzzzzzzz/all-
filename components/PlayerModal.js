import { useEffect } from 'react'

export default function PlayerModal({ open, onClose, src }) {
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose(); }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-black w-full max-w-4xl rounded shadow-lg overflow-hidden">
        <div className="flex justify-end p-2">
          <button className="text-white" onClick={onClose}>Close</button>
        </div>
        <div className="aspect-video w-full bg-black">
          {src?.includes('<iframe') ? (
            <div dangerouslySetInnerHTML={{ __html: src }} />
          ) : (
            <video controls controlsList="nodownload" className="w-full h-full bg-black">
              <source src={src} />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </div>
    </div>
  )
}
