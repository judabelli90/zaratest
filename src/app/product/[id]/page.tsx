'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { useAppContext } from '../../../context/AppContext'
import { Header } from '../../../components/Header/Header'
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
      <div className={styles.container}>
        <div className={styles.loading}>
          <p>Cargando producto...</p>
        </div>
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
    <div className={styles.container}>
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
              <div className={styles.storageOptions}>
                <h3 className={styles.productInfoTitle}>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</h3>
                <div className={styles.storageList}>
                  {product.storageOptions.map((storage, index) => (
                    <div 
                      key={index} 
                      className={`${styles.storageItem} ${selectedStorageIndex === index ? styles.storageItemSelected : ''}`}
                      onClick={() => setSelectedStorageIndex(index)}
                    >
                      <span className={styles.storageCapacity}>{storage.capacity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

                  {product.colorOptions && product.colorOptions.length > 0 && (
              <div className={styles.colorOptions}>
                <h3 className={styles.productInfoTitle}>Color. Pick your favorite</h3>
                <div className={styles.colorList}>
                  {product.colorOptions.map((color, index) => (
                    <div 
                      key={index} 
                      className={`${styles.colorItem} ${selectedColorIndex === index ? styles.colorItemSelected : ''}`}
                      onClick={() => setSelectedColorIndex(index)}
                    >
                      <div className={styles.colorImageContainer} style={{ backgroundColor: color.hexCode }}>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.selectedColor}>
                 {product.colorOptions[selectedColorIndex].name}
                </div>
              </div>
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
              <div className={styles.specsList}>
                 <div className={styles.specItem}>
                  <span className={styles.specKey}>Brand</span>
                  <span className={styles.specValue}>{product.brand}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specKey}>Name</span>
                  <span className={styles.specValue}>{product.name}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specKey}>Description</span>
                  <span className={styles.specValue}>{product.description}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specKey}>Screen</span>
                  <span className={styles.specValue}>{product.specs.screen}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specKey}>Resolution</span>
                  <span className={styles.specValue}>{product.specs.resolution}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specKey}>Processor</span>
                  <span className={styles.specValue}>{product.specs.processor}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specKey}>Main camera</span>
                  <span className={styles.specValue}>{product.specs.mainCamera}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specKey}>Selfie camera</span>
                  <span className={styles.specValue}>{product.specs.selfieCamera}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specKey}>Battery</span>
                  <span className={styles.specValue}>{product.specs.battery}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specKey}>OS</span>
                  <span className={styles.specValue}>{product.specs.os}</span>
                </div>
                <div className={styles.specItem}>
                  <span className={styles.specKey}>Screen refresh rate</span>
                  <span className={styles.specValue}>{product.specs.screenRefreshRate}</span>
                </div>
              </div>
            
      
           
            
            {product.similarProducts && product.similarProducts.length > 0 && (
              <div className={styles.similarProducts}>
                <h3>Similar items</h3>
                <div className={styles.similarList}>
                  {product.similarProducts.map((similar) => (
                    <Link key={similar.id} href={`/product/${similar.id}`} className={styles.similarItem}>
                      <Image 
                        src={similar.imageUrl} 
                        alt={similar.name} 
                        width={0} 
                        height={257}
                        sizes="100vw"
                        className={styles.similarImage}
                      />
                      <div className={styles.similarInfo}>
                        <div className={styles.similarNaming}>
                          <span className={styles.similarBrand}>{similar.brand}</span>
                          <h4 className={styles.similarName}>{similar.brand} {similar.name}</h4>
                        </div>
                        <p className={styles.similarPrice}>${similar.basePrice}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>
      </main>
    </div>
  )
}
