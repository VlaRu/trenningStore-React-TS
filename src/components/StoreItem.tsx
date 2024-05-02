import React from "react";
import { Button, Card } from "react-bootstrap";
import  formatCurrency from "../utilities/formatCurrency"
import AddItems from './AddItems'
import { useShoppingCart } from "../context/ShoppingCartContext";

type StoreItemsProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

export default function StoreItem({id, name, price, imgUrl}: StoreItemsProps) {
  const { getItemQuantity, increaseCartQuantity } = useShoppingCart()
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height='200px'
        style={{ objectFit: 'cover'}}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-space-between align-items-baseline mb-4">
            <span className="fs-2">{name}</span>
            <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>+ Add to Cart</Button>
          ) : <AddItems id={id}/>}
        </div>
      </Card.Body>
    </Card>
  )
}