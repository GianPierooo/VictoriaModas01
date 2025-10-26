import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem('vm_cart_items')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })
  
  const [showNotification, setShowNotification] = useState(false)

  useEffect(() => {
    localStorage.setItem('vm_cart_items', JSON.stringify(items))
  }, [items])

  function addItem(product, quantity = 1) {
    setItems(prev => {
      // Buscar si ya existe un producto con el mismo ID, color y talla
      const idx = prev.findIndex(p => 
        p.id === product.id && 
        p.selectedColor === product.selectedColor && 
        p.selectedSize === product.selectedSize
      )
      
      if (idx !== -1) {
        // Si existe el mismo producto con mismo color y talla, aumentar cantidad
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity }
        return next
      }
      
      // Si no existe, agregar como nuevo item
      return [...prev, { ...product, quantity }]
    })
    
    // Mostrar notificación (sin auto-cerrar)
    setShowNotification(true)
  }
  
  function closeNotification() {
    setShowNotification(false)
  }

  function removeItem(itemId) {
    setItems(prev => prev.filter((_, index) => index !== itemId))
  }

  function updateQuantity(itemId, quantity) {
    setItems(prev => prev.map((p, index) => 
      index === itemId ? { ...p, quantity: Math.max(1, quantity) } : p
    ))
  }

  function clearCart() {
    setItems([])
  }

  const totals = useMemo(() => {
    const itemCount = items.reduce((sum, it) => sum + it.quantity, 0)
    return { itemCount }
  }, [items])

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQuantity, clearCart, totals, showNotification, closeNotification }),
    [items, totals, showNotification]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}


