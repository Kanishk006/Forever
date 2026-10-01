import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import CartTotal from '../components/cartTotal'
import { assets } from '../assets/assets'

const Cart = () => {

  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    navigate
  } = useContext(ShopContext)

  const [cartData, setCartData] = useState([])

  useEffect(() => {
    const tempData = []

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          })
        }
      }
    }

    setCartData(tempData)
  }, [cartItems])

  return (
    <div className="border-t pt-14 px-4 sm:px-8 md:px-12 lg:px-16">

      {/* Cart Heading */}
      <div className="mb-8">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.map((item, index) => {

          const productData = products.find(
            (product) => product._id === item._id
          )

          if (!productData) return null

          return (
            <div
              key={`${item._id}-${item.size}-${index}`}
              className="py-4 border-t border-b border-gray-200
                         grid grid-cols-[1fr_80px_30px]
                         sm:grid-cols-[1fr_100px_30px]
                         items-center gap-4"
            >

              {/* Product Information */}
              <div className="flex items-center gap-4">

                <img
                  className="w-20 sm:w-24 h-24 object-cover"
                  src={productData.image[0]}
                  alt={productData.name}
                />

                <div>
                  <p className="text-sm sm:text-base font-medium text-gray-700">
                    {productData.name}
                  </p>

                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-sm text-gray-600">
                      {currency}{productData.price}
                    </p>

                    <p className="border border-gray-200 px-3 py-1 text-xs text-gray-600">
                      {item.size}
                    </p>
                  </div>
                </div>

              </div>

              {/* Quantity */}
              <input
                className="w-16 sm:w-20 border border-gray-200
                           px-3 py-2 text-sm text-center outline-none"
                type="number"
                min="1"
                defaultValue={item.quantity}
                onChange={(e) =>
                  e.target.value === '' || e.target.value === '0'
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        parseInt(e.target.value)
                      )
                }
              />

              {/* Delete */}
              <img
                onClick={() =>
                  updateQuantity(item._id, item.size, 0)
                }
                className="w-4 sm:w-5 cursor-pointer opacity-70 hover:opacity-100"
                src={assets.bin_icon}
                alt="Delete"
              />

            </div>
          )
        })}
      </div>

      {/* Cart Total */}
      <div className="flex justify-end mt-16 mb-10">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="mt-8">
            <button 
              className="bg-black text-white py-3 px-8 hover:bg-gray-800 transition duration-300"
              onClick={() => navigate('/place-order')}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Cart