'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useAppContext } from '../../context/AppContext'
import { Header,Button } from '@/components'

import styles from './cart.module.scss'

export default function CartPage() {
  const { cartItems, removeFromCart } = useAppContext()
  const cartCount = cartItems.length
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className={`container ${styles.mainSection}`}>
      <Header />
      
      <main className={styles.main}>
        <h1 className={styles.title}>
          Cart ({cartCount})
        </h1>

        {cartItems.length === 0 ? (
          <div className={styles.emptyCart}>
            <p>Tu carrito está vacío</p>
            <Link href="/" className={styles.continueShopping}>
              Continuar comprando
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.cartItems}>
              {cartItems.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <div className={styles.itemImage}>
                    <Image 
                      src={item.imageUrl}
                      alt={item.name}
                      width={0}
                      height={324}
                      sizes="100vw"
                      className={styles.productImage}
                    />
                  </div>
                  
                  <div className={styles.itemInfo}>
                    <h3 className={styles.itemName}>
                      {item.brand} {item.name}
                    </h3>
                    <div className={styles.itemDetails}>
                      <span className={styles.itemStorage}>{item.storage}</span>
                      <span className={styles.itemColor}>{item.color}</span>
                    </div>
                    <p className={styles.itemPrice}>${item.price}</p>

                    <button 
                    className={styles.removeButton}
                    onClick={() => removeFromCart(index)}
                  >
                    Eliminar
                  </button>
                  </div>

                
                
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <Link href="/">
              <Button variant="secondary" className={styles.continueShopping}>
                Continuar comprando
              </Button>
            </Link>
                          
              <div className={styles.totalSection}>
                <div className={styles.totalRow}>
                  <span className={styles.totalLabel}>Total:</span>
                  <span className={styles.totalPrice}>${totalPrice}</span>
                </div>
  
                <Button
                  className={styles.checkoutButton}
                >
                  Pagar
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  )
}


