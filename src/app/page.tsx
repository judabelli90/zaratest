'use client'
import { useState, useEffect } from 'react'
import Image from "next/image";
import Link from "next/link";

import { useAppContext } from '../context/AppContext'
import { Header } from '../components/Header/Header'
import styles from "./page.module.scss";

export default function Home() {
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('') 
  const { theme, toggleTheme } = useAppContext()

    
  const fetchProducts = async (search: string) => {
      setLoading(true)
      try {
        // Subo el limit a 30 porque hay productos repetidos y luego los eliminamos. Así que mejor subir y luego hago slice
        const res = await fetch(
          `https://prueba-tecnica-api-tienda-moviles.onrender.com/products?limit=30${search ? `&search=${encodeURIComponent(search)}` : ''}`,
          {
            headers: {
              'x-api-key': '87909682e6cd74208f41a6ef39fe4191',
            },
          }
        )

        if (!res.ok) throw new Error('Error al cargar los productos')

        const data = await res.json()
        
        // Filtramos productos repetidos, como por ejemplo Xiaomi Redmi Note 13 Pro 5G
        const uniqueProducts = Array.from(
          new Map(data.map((item: any) => [item.id, item])).values()
        ).slice(0, 20)

        setProducts(uniqueProducts)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    fetchProducts('')
  }, [])    

  useEffect(() => {
      const timeout = setTimeout(() => {
        fetchProducts(query)
      }, 500) // 500ms de espera para no saturar la API

      return () => clearTimeout(timeout)
    }, [query])

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <div className="">
                <input
                type="text"
                placeholder="Search for a smartphone..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{ padding: '0.5rem', width: '100%' }}
                className={styles.searchbox}
              />
          {loading ? (
            <p className={styles.count}>0 RESULTS</p>
          ) : (
            <p className={styles.count}>{products.length} RESULTS</p>
          )}
        </div>
        <div className={styles.searchResults}>
              {loading && <p>Cargando productos...</p>}
          {error && <p>Error: {error}</p>}
           <div className={styles.resultsBoxes}>
             {products.map((product: any) => (
               <Link key={product.id} href={`/product/${product.id}`} className={styles.productLink}>
                 <div className={styles.product}>
                   <Image src={product.imageUrl} alt={product.name} width={150} height={150} />
                   <h3>{product.brand} {product.name}</h3>
                   <p>Precio: ${product.basePrice}</p>
                 </div>
               </Link>
             ))}
           </div>
          
        </div>
      </main>
    </div>
  );
}
