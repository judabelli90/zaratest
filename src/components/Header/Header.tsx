'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useAppContext } from '../../context/AppContext'
import { usePathname } from 'next/navigation'
import styles from './Header.module.scss'

export function Header() {
  const { cartItems } = useAppContext()
  const cartCount = cartItems.length
  const pathname = usePathname()
  const isCartPage = pathname === '/cart'

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <Image
          className={styles.logo}
          src="/images/logo-MBST.svg"
          alt="MBST logo"
          width={0}
          height={24}
          priority
        />
      </Link>
      {!isCartPage && (
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
      )}
    </header>
  )
}
