'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { useAppContext } from '../../../context/AppContext'
import { Header, ColorSelector, StorageSelector, ProductCard, SpecificationsList,LoadingSkeleton, Button} from '@/components'
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

        <Button
          className={styles.backButton}
          variant="secondary"
          onClick={() => router.back()}
        >
          Back
        </Button>
      <main className={styles.main}>
<div className={styles.productDetail}>
  <div className={styles.imageContainer}>
    <LoadingSkeleton width={600} height={600} borderRadius={12} />
  </div>
  <div className={styles.productInfo}>
    <LoadingSkeleton width="60%" height={40} borderRadius={6} /> 
    <LoadingSkeleton width="30%" height={25} borderRadius={6} style={{ marginTop: '1rem' }} /> 
    
    <div style={{ marginTop: '2rem' }}>
      <LoadingSkeleton width="100%" height={50} borderRadius={8} />  {/* botón añadir */}
      <LoadingSkeleton width="80%" height={40} borderRadius={6} style={{ marginTop: '1rem' }} />
      <LoadingSkeleton width="80%" height={40} borderRadius={6} style={{ marginTop: '1rem' }} /> 
    </div>
  </div>
</div>

{/* Similar products */}
<div className={styles.similarProducts}>
  <h3>Similar items</h3>
  <div className={styles.similarList}>
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} style={{ marginRight: '1rem' }}>
        <LoadingSkeleton width={150} height={200} borderRadius={12} /> {/* imagen similar */}
        <LoadingSkeleton width={120} height={20} borderRadius={4} style={{ marginTop: '0.5rem' }} /> {/* nombre */}
        <LoadingSkeleton width={80} height={20} borderRadius={4} style={{ marginTop: '0.25rem' }} /> {/* precio */}
      </div>
    ))}
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
      <div className={styles.backContainer}>

       <Button
          className={styles.backButton}
          variant="secondary"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
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
              width={600} 
              height={600}
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
        
        <div className={styles.productOptions}>
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
        </div>

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
