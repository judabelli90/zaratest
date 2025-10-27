# Design System - Zara Test

Este es el Design Sytem del proyecto. Todos los componentes son reutilizables y siguen las mejores prácticas de React y Next.js.

## Componentes Disponibles

### 📦 Header
Barra de navegación principal con logo y carrito de compras.

**Props:**
- Ninguna (usa contexto global para cartItems)

**Ejemplo:**
```tsx
<Header />
```

---

### 🎴 ProductCard
Tarjeta de producto para mostrar en la lista de productos.

**Props:**
- `id: string` - ID único del producto
- `imageUrl: string` - URL de la imagen
- `brand: string` - Marca del producto
- `name: string` - Nombre del producto
- `basePrice: number` - Precio base

**Ejemplo:**
```tsx
<ProductCard
  id="SMG-S24U"
  imageUrl="/images/product.jpg"
  brand="Samsung"
  name="Galaxy S24 Ultra"
  basePrice={1329}
/>
```

---

### 🔍 SearchBar
Barra de búsqueda reutilizable.

**Props:**
- `value: string` - Valor actual
- `onChange: (value: string) => void` - Handler de cambio
- `placeholder?: string` - Placeholder (opcional)

**Ejemplo:**
```tsx
<SearchBar
  value={query}
  onChange={setQuery}
  placeholder="Search for a smartphone..."
/>
```

---

### 🎨 ColorSelector
Selector de colores para productos.

**Props:**
- `colors: ColorOption[]` - Array de opciones de color
- `selectedIndex: number` - Índice del color seleccionado
- `onSelect: (index: number) => void` - Handler de selección
- `showName?: boolean` - Mostrar nombre del color (opcional)

**Ejemplo:**
```tsx
<ColorSelector
  colors={product.colorOptions}
  selectedIndex={selectedColorIndex}
  onSelect={setSelectedColorIndex}
  showName={true}
/>
```

---

### 💾 StorageSelector
Selector de capacidad de almacenamiento.

**Props:**
- `storageOptions: StorageOption[]` - Opciones disponibles
- `selectedIndex: number | null` - Índice seleccionado
- `onSelect: (index: number) => void` - Handler de selección

**Ejemplo:**
```tsx
<StorageSelector
  storageOptions={product.storageOptions}
  selectedIndex={selectedStorageIndex}
  onSelect={setSelectedStorageIndex}
/>
```

---

### 🖱️ Button
Botón reutilizable con múltiples variantes.

**Props:**
- `children: React.ReactNode` - Contenido del botón
- `onClick?: () => void` - Handler de click
- `disabled?: boolean` - Estado deshabilitado
- `variant?: 'primary' | 'secondary'` - Variante del botón
- `className?: string` - Clases adicionales
- `type?: 'button' | 'submit' | 'reset'` - Tipo de botón

**Ejemplo:**
```tsx
<Button 
  onClick={handleSubmit} 
  disabled={!isValid}
  variant="primary"
>
  Añadir al carrito
</Button>
```

---

### 📊 ResultsCounter
Contador de resultados de búsqueda.

**Props:**
- `count: number` - Cantidad de resultados
- `loading?: boolean` - Estado de carga

**Ejemplo:**
```tsx
<ResultsCounter count={products.length} loading={isLoading} />
```

---

### 🎭 ThemeProvider
Proveedor de tema para la aplicación.

**Props:**
- `children: React.ReactNode`

**Ejemplo:**
```tsx
<ThemeProvider>
  {children}
</ThemeProvider>
```

---

## Uso

### Importación desde el índice:
```tsx
import { Header, ProductCard, Button } from '@/components'
```

### Importación individual:
```tsx
import { Header } from '@/components/Header'
```

---

## Convenciones

1. **Nombres**: PascalCase para componentes
2. **Props**: Interfaz TypeScript para todas las props
3. **Estilos**: SCSS modules con mismo nombre que el componente
4. **Exportación**: Named exports
5. **Documentación**: JSDoc para props complejas

---

## Estructura de Archivos

```
components/
├── Header/
│   ├── Header.tsx
│   └── Header.module.scss
├── ProductCard/
│   ├── ProductCard.tsx
│   └── ProductCard.module.scss
└── index.ts
```

---

## Principios del Design System

1. **Reutilización**: Componentes diseñados para usarse en múltiples contextos
2. **Composabilidad**: Componentes pequeños y especializados
3. **Consistencia**: Estilos y comportamiento unificados
4. **Accesibilidad**: Contemplando a11y desde el diseño
5. **Performance**: Optimizados para renderizado eficiente


