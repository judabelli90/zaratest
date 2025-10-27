import { render, screen, fireEvent } from '@testing-library/react'
import { AppProvider } from '../context/AppContext'
import Home from '../app/page'

describe('Home page', () => {
  it('debería mostrar el tema actual y cambiarlo al hacer clic', () => {
    render(
      <AppProvider>
        <Home />
      </AppProvider>
    )

    // Comprueba que muestra el tema inicial
    expect(screen.getByText(/theme actual: light/i)).toBeInTheDocument()

    // Simula un clic en el botón
    const button = screen.getByRole('button', { name: /cambiar tema/i })
    fireEvent.click(button)

    // Verifica que cambió el texto a "dark"
    expect(screen.getByText(/theme actual: dark/i)).toBeInTheDocument()
  })
})
