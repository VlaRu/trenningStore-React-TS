import { ShoppingCart } from "../components/ShoppingCart"
import React , { createContext, useContext, ReactNode, useState } from "react"
import {useLocalStorage} from "../hooks/useLocalStorage"

export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}

type ShoppingCartProviderProps = {
  children: ReactNode
}

type ShoppingCartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseCartQuantity: (id: number) => void
  decreaseCartQuantity: (id: number) => void
  removeFromCart: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

type CartItem = {
  id: number
  quantity: number
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', [])

  const cartQuantity = cartItems.reduce((quantity, item) =>  item.quantity + quantity, 0)

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseCartQuantity(id: number) {
    setCartItems(currItems => {
     if(currItems.find(item => item.id === id) == null) {
      return [...currItems, { id, quantity: 1}]
     } else {
      return currItems.map(item => {
        if(item.id === id) {
          return { ...item, quantity: item.quantity + 1}
        } else {
          return item
        }
      })
     }
    })
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function decreaseCartQuantity(id: number) {
    setCartItems(currItems => {
     if(currItems.find(item => item.id === id)?.quantity === 1) {
      return currItems.filter(item => item.id !== id)
     } else {
      return currItems.map(item => {
        if(item.id === id) {
          return { ...item, quantity: item.quantity - 1}
        } else {
          return item
        }
      })
     }
    })
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function removeFromCart(id: number) {
    setCartItems(currItems => {
      return currItems.filter(item => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
  );
}