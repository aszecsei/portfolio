import ExportedImage from 'next-image-export-optimizer'
import { image as imageStyle } from './image.css'

interface IImageProps {
  alt: string
  src: string
  isRounded?: boolean
  hasRoundedCorners?: boolean
  loading?: 'lazy' | 'eager'
  width?: number
  height?: number
  unoptimized?: boolean
  fit?: 'cover'
  className?: string
}

export const Image = ({
  alt,
  src,
  isRounded,
  hasRoundedCorners,
  loading,
  width = 1200,
  height = 675,
  unoptimized,
  fit,
  className,
}: IImageProps) => (
  <ExportedImage
    className={[imageStyle({ isRounded, hasRoundedCorners, fit }), className]
      .filter(Boolean)
      .join(' ')}
    alt={alt}
    src={src}
    loading={loading}
    width={width}
    height={height}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    unoptimized={unoptimized}
  />
)
