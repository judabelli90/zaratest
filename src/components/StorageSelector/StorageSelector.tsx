import styles from './StorageSelector.module.scss'

interface StorageOption {
  capacity: string
  price: number
}

interface StorageSelectorProps {
  storageOptions: StorageOption[]
  selectedIndex: number | null
  onSelect: (index: number) => void
}

export function StorageSelector({ storageOptions, selectedIndex, onSelect }: StorageSelectorProps) {
  return (
    <div className={styles.storageSelector}>
      <h3 className={styles.title}>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</h3>
      <div className={styles.storageList}>
        {storageOptions.map((storage, index) => (
          <div 
            key={index} 
            className={`${styles.storageItem} ${selectedIndex === index ? styles.storageItemSelected : ''}`}
            onClick={() => onSelect(index)}
          >
            <span className={styles.storageCapacity}>{storage.capacity}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

