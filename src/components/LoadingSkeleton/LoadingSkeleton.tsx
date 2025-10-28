import styles from './LoadingSkeleton.module.scss'

interface LoadingSkeletonProps {
  width?: string | number
  height?: string | number
  borderRadius?: string | number
  count?: number
  className?: string
  style?: React.CSSProperties  
}

export function LoadingSkeleton({
  width = '100%',
  height = 150,
  borderRadius = 8,
  count = 1,
  className = '',
  style = {}, 
}: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count })

  return (
    <>
      {skeletons.map((_, index) => (
        <div
          key={index}
          className={`${styles.skeleton} ${className}`}
          style={{
            width,
            height,
            borderRadius,
             ...style,
          }}
        />
      ))}
    </>
  )
}
