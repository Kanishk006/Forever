import React from 'react'
import Title from '../components/Title'
import CartTotal from '../components/cartTotal'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
const PlaceOrder = () => {


  const [method , setMethod] = useState('stripe');
  const {navigate} = useContext(ShopContext);


  return (
    <div className="flex flex-col sm:flex-row justify-between gap-10 pt-5 sm:pt-14 min-h-[80vh] border-t">

      {/* ================= LEFT SIDE ================= */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

        {/* Heading */}
        <div className="text-xl sm:text-2xl my-3">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>

        {/* First Name + Last Name */}
        <div className="flex gap-3">

          <input
            className="border border-gray-300 rounded py-3 px-4 w-full outline-none focus:border-gray-500"
            type="text"
            placeholder="First name"
          />

          <input
            className="border border-gray-300 rounded py-3 px-4 w-full outline-none focus:border-gray-500"
            type="text"
            placeholder="Last name"
          />

        </div>

        {/* Email */}
        <input
          className="border border-gray-300 rounded py-3 px-4 w-full outline-none focus:border-gray-500"
          type="email"
          placeholder="Email address"
        />

        {/* Street */}
        <input
          className="border border-gray-300 rounded py-3 px-4 w-full outline-none focus:border-gray-500"
          type="text"
          placeholder="Street"
        />

        {/* City + State */}
        <div className="flex gap-3">

          <input
            className="border border-gray-300 rounded py-3 px-4 w-full outline-none focus:border-gray-500"
            type="text"
            placeholder="City"
          />

          <input
            className="border border-gray-300 rounded py-3 px-4 w-full outline-none focus:border-gray-500"
            type="text"
            placeholder="State"
          />

        </div>

        {/* Zipcode + Country */}
        <div className="flex gap-3">

          <input
            className="border border-gray-300 rounded py-3 px-4 w-full outline-none focus:border-gray-500"
            type="number"
            placeholder="Zipcode"
          />

          <input
            className="border border-gray-300 rounded py-3 px-4 w-full outline-none focus:border-gray-500"
            type="text"
            placeholder="Country"
          />

        </div>

        {/* Phone */}
        <input
          className="border border-gray-300 rounded py-3 px-4 w-full outline-none focus:border-gray-500"
          type="tel"
          placeholder="Phone"
        />

      </div>


      {/* ================= RIGHT SIDE ================= */}
      <div className="mt-8 sm:mt-0 min-w-80">

        <CartTotal />

        <div className="mt-12">

  <Title text1="PAYMENT" text2="METHOD" />

  {/* Payment Method Selection */}
  <div className="flex gap-3 flex-col lg:flex-row mt-5">

    {/* Stripe */}
    <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>

      <img
        className="h-5 mx-4"
        src={assets.stripe_logo}
        alt="Stripe"
      />
    </div>

    {/* Razorpay */}
    <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>

      <img
        className="h-5 mx-4"
        src={assets.razorpay_logo}
        alt="Razorpay"
      />
    </div>

    {/* Cash on Delivery */}
    <div onClick={() => setMethod('cash_on_delivery')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cash_on_delivery' ? 'bg-green-400' : ''}`}></p>

      <p className="text-gray-500 text-sm font-medium">
        CASH ON DELIVERY
      </p>
    </div>

  </div>
  <div className="text-end mt-8">
    <button
      className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition"
      onClick={() => navigate('/orders')}
    >
      PLACE ORDER
    </button>
  </div>
</div>
      </div>

    </div>
  )
}

export default PlaceOrder