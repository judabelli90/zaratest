import styles from './SpecificationsList.module.scss'


interface SpecificationsListProps {
  specs: Record<string, string>
}

export function SpecificationsList({ specs }: SpecificationsListProps) {
  return (
    <div className={styles.specsList}>
      {Object.entries(specs).map(([key, value]) => (
        <div key={key} className={styles.specItem}>
          <span className={styles.specKey}>{key}</span>
          <span className={styles.specValue}>{value}</span>
        </div>
      ))}
    </div>
  )
}
