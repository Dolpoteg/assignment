import React, { useEffect, useState } from 'react'
import { Fruit, StockEvent, KCAL_LIMIT, ERROR_MESSAGE_CALORIES } from '@lepaya/core'

export default function Order({ fruit, selectedOfficeId }) {
  const [orders, setOrders] = useState<StockEvent[]>([])
  const [orderKCal, setOrderKCal] = useState(0)

  useEffect(() => {
    if (selectedOfficeId) {
      removeOrder()
    }
  }, [selectedOfficeId])

  const sendOrder = () => {
    return fetch('/api/add-stock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orders)
    }).then(removeOrder)
  }

  function addFruit(fruit: Fruit) {
    console.log(`Add fruit ${fruit.name}`)
    const orderToEdit = orders?.find(o => o.fruitId === fruit.id)
    if (orderToEdit) {
      orderToEdit.amount += 1
    } else {
      setOrders([...orders, { fruitId: fruit.id, officeId: selectedOfficeId, amount: 1 }])
    }
    setOrderKCal(orderKCal + fruit.kcal)
  }

  function removeFruit(fruit: Fruit) {
    console.log(`Remove fruit ${fruit.name}`)
    const orderToEdit = orders?.find(o => o.fruitId === fruit.id)
    if (orderToEdit?.amount === 1) {
      const indexToRemove = orders.indexOf(orderToEdit)
      orders.splice(indexToRemove, 1)
    } else if (orderToEdit) {
      orderToEdit.amount -= 1
    }
    setOrderKCal(orderKCal - fruit.kcal)
  }

  function ordered(id) {
    return orders?.find(o => o.fruitId === id)?.amount
  }

  function removeOrder() {
    setOrders([])
    setOrderKCal(0)
  }

  return (
    <div>
      {fruit.map(fruit => (
        <div key={fruit.id}>
          <span>{fruit.name}</span>

          <button onClick={() => removeFruit(fruit)} disabled={!ordered(fruit.id)}>
            -
          </button>
          <span>{ordered(fruit.id) || 0}</span>
          <button onClick={() => addFruit(fruit)}>+</button>
        </div>
      ))}

      <p>{orderKCal > KCAL_LIMIT ? `${ERROR_MESSAGE_CALORIES}` : `Total calories ${orderKCal} kCal`}</p>
      <button onClick={() => removeOrder()}>Clear</button>
      <button onClick={() => sendOrder()} disabled={orderKCal > KCAL_LIMIT}>
        Send
      </button>
    </div>
  )
}
