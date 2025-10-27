'use client'
import { createContext, useContext, useState, useEffect } from 'react'

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [cartItems, setCartItems] = useState([])
  
  // Cargar tema del localStorage al inicializar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme)
    }
    
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])
  
  // Guardar tema en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])
  
  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))
  
  const addToCart = (product, colorIndex, storageIndex) => {
    const newItem = {
      id: product.id,
      productId: product.id,
      name: product.name,
      brand: product.brand,
      color: product.colorOptions[colorIndex].name,
      storage: product.storageOptions[storageIndex].capacity,
      price: product.storageOptions[storageIndex].price,
      imageUrl: product.colorOptions[colorIndex].imageUrl
    }
    setCartItems([...cartItems, newItem])
  }
  
  const removeFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index))
  }

  return (
    <AppContext.Provider value={{ theme, toggleTheme, cartItems, addToCart, removeFromCart }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
