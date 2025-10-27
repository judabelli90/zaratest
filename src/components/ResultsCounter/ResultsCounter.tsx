import styles from './ResultsCounter.module.scss'

interface ResultsCounterProps {
  count: number
  loading?: boolean
}

export function ResultsCounter({ count, loading = false }: ResultsCounterProps) {
  if (loading) {
    return <p className={styles.count}>0 RESULTS</p>
  }
  
  return <p className={styles.count}>{count} RESULTS</p>
}

