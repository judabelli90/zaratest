'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { useAppContext } from '../../../context/AppContext'
import { Header, ColorSelector, StorageSelector, ProductCard, SpecificationsList,LoadingSkeleton } from '@/components'
import styles from './product.module.scss'

interface ColorOption {
  name: string
  hexCode: string
  imageUrl: string
}

interface StorageOption {
  capacity: string
  price: number
}

interface SimilarProduct {
  id: string
  brand: string
  name: string
  basePrice: number
  imageUrl: string
}

interface Product {
  id: string
  brand: string
  name: string
  description: string
  basePrice: number
  rating: number
  imageUrl: string
  specs: {
    screen: string
    resolution: string
    processor: string
    mainCamera: string
    selfieCamera: string
    battery: string
    os: string
    screenRefreshRate: string
  }
  colorOptions: ColorOption[]
  storageOptions: StorageOption[]
  similarProducts: SimilarProduct[]
}

export default function ProductDetail() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useAppContext()
  const productId = params.id as string
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedColorIndex, setSelectedColorIndex] = useState(0)
  const [selectedStorageIndex, setSelectedStorageIndex] = useState<number | null>(null)
  
  const handleAddToCart = () => {
    if (product && selectedStorageIndex !== null) {
      addToCart(product, selectedColorIndex, selectedStorageIndex)
      router.push('/cart')
    }
  }

  const fetchProduct = async (id: string) => {
    setLoading(true)
    try {
      const res = await fetch(
        `https://prueba-tecnica-api-tienda-moviles.onrender.com/products/${id}`,
        {
          headers: {
            'x-api-key': '87909682e6cd74208f41a6ef39fe4191',
          },
        }
      )

      if (!res.ok) throw new Error('Error al cargar el producto')

      const data = await res.json()
      setProduct(data)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (productId) {
      fetchProduct(productId)
    }
  }, [productId])
if (loading) {
  return (
    <div className={`container ${styles.container}`}>
      <Header />
      <main className={styles.main}>
        <div className={styles.productDetail}>
          <div className={styles.imageContainer}>
            {/* Skeleton para la imagen del producto */}
            <LoadingSkeleton width={400} height={400} borderRadius={12} />
          </div>

          <div className={styles.productInfo}>
            <LoadingSkeleton width="70%" height={30} borderRadius={6} />
            <LoadingSkeleton width="30%" height={25} borderRadius={6} style={{ marginTop: '1rem' }} />
            <LoadingSkeleton width="100%" height={50} borderRadius={8} style={{ marginTop: '1.5rem' }} />
            <LoadingSkeleton width="100%" height={50} borderRadius={8} style={{ marginTop: '1rem' }} />
            <LoadingSkeleton width="50%" height={40} borderRadius={8} style={{ marginTop: '2rem' }} />
          </div>
        </div>

        <div className={styles.specifications}>
          <h3>Specifications</h3>
          {Array.from({ length: 6 }).map((_, i) => (
            <LoadingSkeleton key={i} width="100%" height={20} borderRadius={4} style={{ marginBottom: '0.5rem' }} />
          ))}

          <div className={styles.similarProducts}>
            <h3>Similar items</h3>
            <div className={styles.similarList}>
              {Array.from({ length: 3 }).map((_, i) => (
                <LoadingSkeleton key={i} width={150} height={200} borderRadius={12} style={{ marginRight: '1rem' }} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>Error: {error}</p>
          <Link href="/" className={styles.backButton}>
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>
          <p>Producto no encontrado</p>
          <Link href="/" className={styles.backButton}>
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
      <div className={`container ${styles.container}`}>
      <Header />
      <main className={styles.main}>
        <div className={styles.productDetail}>
          <div className={styles.imageContainer}>
            <Image 
              src={
                product.colorOptions && product.colorOptions.length > 0 
                  ? product.colorOptions[selectedColorIndex].imageUrl 
                  : product.imageUrl
              } 
              alt={product.name} 
              width={400} 
              height={400}
              className={styles.productImage}
            />
          </div>
          
          <div className={styles.productInfo}>
            <div className={styles.productHeading}>
                <h1 className={styles.productTitle}>
                  {product.brand} {product.name}
                </h1>
                
                <div className={styles.price}> 
                  From {product.basePrice} EUR
                </div>
            </div>
        
             {product.storageOptions && product.storageOptions.length > 0 && (
                <StorageSelector
                  storageOptions={product.storageOptions}
                  selectedIndex={selectedStorageIndex}
                  onSelect={setSelectedStorageIndex}
                />
              )}

            {product.colorOptions && product.colorOptions.length > 0 && (
              <ColorSelector
                colors={product.colorOptions}
                selectedIndex={selectedColorIndex}
                onSelect={setSelectedColorIndex}
              />
            )}
          <button 
            className={`${styles.addtoCard} ${selectedStorageIndex === null ? styles.addtoCardDisabled : ''}`}
            disabled={selectedStorageIndex === null}
            onClick={handleAddToCart}
          >
            Añadir
          </button>

          </div>
        </div>
        <div className={styles.specifications}>
          <h3>Specifications</h3>        
           <SpecificationsList specs={product.specs} />
           
            
            {product.similarProducts && product.similarProducts.length > 0 && (
              <div className={styles.similarProducts}>
                <h3>Similar items</h3>
                <div className={styles.similarList}>
                  {product.similarProducts.map((similar) => (
                    <ProductCard
                      key={similar.id}
                      id={similar.id}
                      imageUrl={similar.imageUrl}
                      brand={similar.brand}
                      name={similar.name}
                      basePrice={similar.basePrice}
                    />
                  ))}
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  )
}
