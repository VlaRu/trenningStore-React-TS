import {Button} from "react-bootstrap"
import React from "react"
import { useShoppingCart } from "../context/ShoppingCartContext";

type AddItemsProps = {
  id: number;
}

export default function AddItems({ id }: AddItemsProps) {
  const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart } = useShoppingCart()
  const quantity: number = getItemQuantity(id);
  return (
    <div
      className="d-flex align-items-center flex-column"
      style={{ gap: ".5rem" }}
    >
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ gap: ".5rem" }}
      >
        <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
        <div>
          <span className="fs-3">{quantity}</span> in cart
        </div>
        <Button onClick={() => increaseCartQuantity(id)}>+</Button>
      </div>
      <Button
        onClick={() => removeFromCart(id)}
        variant="danger"
        size="sm"
      >
        Remove
      </Button>
    </div>
  )
}