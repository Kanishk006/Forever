import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const CartTotal = () => {

  const {
    currency,
    delivery_fee,
    getCartTotal
  } = useContext(ShopContext)

  return (
    <div className="w-full">

      {/* Heading */}
      <div className="mb-6">
        <Title text1="CART" text2="TOTAL" />
      </div>

      {/* Total Details */}
      <div className="text-sm text-gray-600">

        {/* Subtotal */}
        <div className="flex justify-between py-3">
          <p>Subtotal</p>

          <p>
            {currency}{getCartTotal()}.00
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* Delivery Fee */}
        <div className="flex justify-between py-3">
          <p>Shipping Fee</p>

          <p>
            {currency}{delivery_fee}.00
          </p>
        </div>

        <hr className="border-gray-200" />

        {/* Total */}
        <div className="flex justify-between py-3 text-gray-800 font-semibold">
          <b>Total</b>

          <b>
            {currency}{getCartTotal() + delivery_fee}.00
          </b>
        </div>

      </div>

    </div>
  )
}

export default CartTotal