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
          width={345} 
          height={345}
          className={styles.productImage}
        />
        <div className={styles.productInfo}>
          <div className={styles.productInfoBrand}>
            <h5 className={styles.productBrand}>{brand} </h5>
            <h4 className={styles.productName}>{name}</h4>
          </div>
    
          <p className={styles.productPrice}>{basePrice} EUR</p>
         </div>
      </div>
    </Link>
  )
}

