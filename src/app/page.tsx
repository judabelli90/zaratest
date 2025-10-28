'use client'
import { useState, useEffect } from 'react'
import Image from "next/image";
import Link from "next/link";

import { useAppContext } from '../context/AppContext'
import { Header, SearchBar, ResultsCounter, ProductCard} from '@/components'

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
      <div className={`container ${styles.page}`}>
      <Header />
      <main className={styles.main}>
        <div className="">
                <SearchBar
                  value={query}
                  onChange={setQuery}
                  placeholder="Search for a smartphone..."
                />           

         <ResultsCounter count={products.length} loading={loading} />

        </div>
        <div className={styles.searchResults}>
          {loading && <p>Cargando productos...</p>}
          {error && <p>Error: {error}</p>}

          <div className={styles.resultsBoxes}>
            {products.map((product: any) => (
              <ProductCard
                key={product.id}
                id={product.id}
                imageUrl={product.imageUrl}
                brand={product.brand}
                name={product.name}
                basePrice={product.basePrice}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
