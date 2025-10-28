import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider } from '../context/AppContext'
import Home from '../app/page'

const mockPush = jest.fn()
const mockPathname = '/'

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
}))

const mockProducts = [
  { id: 'SMG-S24U', name: 'Galaxy S24 Ultra', brand: 'Samsung' },
  { id: 'APL-I15PM', name: 'iPhone 15 Pro Max', brand: 'Apple' },
]

beforeEach(() => {
  jest.resetAllMocks()
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockProducts), // devuelve array directo
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

    const galaxyProduct = await screen.findByText(/Galaxy S24 Ultra/i)
    const iphoneProduct = await screen.findByText(/iPhone 15 Pro Max/i)
    expect(galaxyProduct).toBeInTheDocument()
    expect(iphoneProduct).toBeInTheDocument()

    const input = screen.getByPlaceholderText(/Search for a smartphone.../i)
    fireEvent.change(input, { target: { value: 'Galaxy' } })

    expect(screen.getByText(/Galaxy S24 Ultra/i)).toBeInTheDocument()
    expect(screen.queryByText(/iPhone 15 Pro Max/i)).not.toBeInTheDocument()
    expect(screen.getByText(/1 RESULTS/i)).toBeInTheDocument()

    const productLink = screen.getByText(/Galaxy S24 Ultra/i).closest('a')
    fireEvent.click(productLink!)
    expect(mockPush).toHaveBeenCalledWith('/product/SMG-S24U')
  })
})
