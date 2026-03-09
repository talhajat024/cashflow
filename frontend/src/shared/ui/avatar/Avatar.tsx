import { ChevronDown } from 'lucide-react'

interface AvatarProps {
  src?: string
  alt?: string
  size?: number
}

export function Avatar({
  src,
  alt = 'User avatar',
  size = 30,
}: AvatarProps) {
  return (
    <div className="flex items-center gap-1 cursor-pointer">
      <div
        className="rounded-full overflow-hidden bg-gray-200 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {src ? (
          <img src={src} alt={alt} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm font-medium text-gray-600">T</span>
        )}
      </div>

      <ChevronDown className="h-4 w-4 text-white/80" />
    </div>
  )
}
