import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider } from '../context/AppContext'
import Home from '../app/page'

// Mock de Next Router
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/',
}))

// Productos de prueba
const mockProducts = [
  { id: 'SMG-S24U', name: 'Galaxy S24 Ultra', brand: 'Samsung', imageUrl: '', basePrice: 1000 },
  { id: 'APL-I15PM', name: 'iPhone 15 Pro Max', brand: 'Apple', imageUrl: '', basePrice: 1200 },
]

beforeEach(() => {
  jest.resetAllMocks()
  // Mock global fetch antes de render
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockProducts),
    })
  ) as jest.Mock
})

describe('Home page', () => {
  it('filtra productos al escribir y navega al detalle', async () => {
    render(
      <AppProvider>
        <Home />
      </AppProvider>
    )

    // Espera a que los productos se carguen
    const galaxyProduct = await screen.findByText(/Galaxy S24 Ultra/i)
    const iphoneProduct = await screen.findByText(/iPhone 15 Pro Max/i)
    expect(galaxyProduct).toBeInTheDocument()
    expect(iphoneProduct).toBeInTheDocument()

    // Verifica ResultsCounter
    expect(screen.getByText(/2 RESULTS/i)).toBeInTheDocument()

    // Escribir en el input para filtrar
    const input = screen.getByPlaceholderText(/Search for a smartphone.../i)
    fireEvent.change(input, { target: { value: 'Galaxy' } })

    // Espera a que el filtrado se aplique
    expect(await screen.findByText(/Galaxy S24 Ultra/i)).toBeInTheDocument()
    expect(screen.queryByText(/iPhone 15 Pro Max/i)).not.toBeInTheDocument()
    expect(screen.getByText(/1 RESULTS/i)).toBeInTheDocument()

    // Click en el producto y verifica navegación
    const productLink = screen.getByText(/Galaxy S24 Ultra/i).closest('a')
    fireEvent.click(productLink!)
    expect(mockPush).toHaveBeenCalledWith('/product/SMG-S24U')
  })
})
