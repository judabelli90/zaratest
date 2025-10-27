import { useState } from 'react'
import styles from './ColorSelector.module.scss'

interface ColorOption {
  name: string
  hexCode: string
  imageUrl: string
}

interface ColorSelectorProps {
  colors: ColorOption[]
  selectedIndex: number
  onSelect: (index: number) => void
  showName?: boolean
}

export function ColorSelector({ colors, selectedIndex, onSelect, showName = true }: ColorSelectorProps) {
  return (
    <div className={styles.colorSelector}>
      <h3 className={styles.title}>Color. Pick your favorite</h3>
      <div className={styles.colorList}>
        {colors.map((color, index) => (
          <div 
            key={index} 
            className={`${styles.colorItem} ${selectedIndex === index ? styles.colorItemSelected : ''}`}
            onClick={() => onSelect(index)}
          >
            <div className={styles.colorImageContainer} style={{ backgroundColor: color.hexCode }}>
            </div>
          </div>
        ))}
      </div>
      {showName && (
        <div className={styles.selectedColor}>
          {colors[selectedIndex].name}
        </div>
      )}
    </div>
  )
}

