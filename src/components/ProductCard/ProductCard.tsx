import Image from 'next/image'
import Link from 'next/link'
import styles from './ProductCard.module.scss'

interface ProductCardProps {
  id: string
  imageUrl: string
  brand: string
  name: string
  basePrice: number
}

export function ProductCard({ id, imageUrl, brand, name, basePrice }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} className={styles.productLink}>
      <div className={styles.product}>
        <Image 
          src={imageUrl} 
          alt={name} 
          width={150} 
          height={150}
          className={styles.productImage}
        />
        <h3 className={styles.productName}>{brand} {name}</h3>
        <p className={styles.productPrice}>Precio: ${basePrice}</p>
      </div>
    </Link>
  )
}

