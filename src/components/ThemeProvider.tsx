'use client'
import { useAppContext } from '../context/AppContext'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useAppContext()
  
  return (
    <div className={`${theme}-theme`}>
      {children}
    </div>
  )
}

