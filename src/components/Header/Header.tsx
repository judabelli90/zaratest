'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useAppContext } from '../../context/AppContext'
import styles from './Header.module.scss'

export function Header() {
  const { cartItems } = useAppContext()
  const cartCount = cartItems.length

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <Image
          className={styles.logo}
          src="/images/logo-MBST.png"
          alt="MBST logo"
          width={146}
          height={57}
          priority
        />
      </Link>
      
      <Link href="/cart" className={styles.cartLink}>
        {cartCount > 0 ? (
          <Image
            src="/images/addtocard-active.png"
            alt="Cart with items"
            width={24}
            height={24}
          />
        ) : (
          <Image
            src="/images/addtocard-inactive.png"
            alt="Empty cart"
            width={24}
            height={24}
          />
        )}
        <span className={styles.cartCount}>{cartCount}</span>
      </Link>
    </header>
  )
}
