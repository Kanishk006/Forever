import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl , currency} from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'


const Orders = ({ token, setToken }) => {

    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {
        if (!token) {
            return null
        }

        try {
            const response = await axios.post(
                backendUrl + '/api/order/list',
                {},
                { headers: { token } }
            )

            if (response.data.success) {
                setOrders(response.data.orders)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            if (error.response?.status === 401) {
                localStorage.removeItem('token')
                setToken('')
                toast.error('Admin session expired. Please log in again.')
            } else {
                toast.error(
                    error.response?.data?.message || error.message
                )
            }
        }
    }

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/order/status',
                { orderId, status: event.target.value },
                { headers: { token } }
            )

            if (response.data.success) {
                await fetchAllOrders()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(
                error.response?.data?.message || error.message
            )
        }
    }


    

    useEffect(() => {
        fetchAllOrders()
    }, [token])

    return (
        <div className="p-2 sm:p-5">
            <h3 className="mb-5 text-lg font-medium text-gray-700">
                Order Page
            </h3>

            <div className="flex flex-col gap-4">
                {orders.map((order, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-gray-200 p-4 sm:p-6 text-sm text-gray-700"
                    >
                        <img
                            className="w-12"
                            src={assets.parcel_icon}
                            alt=""
                        />

                        <div>
                            <div>
                                {order.items.map((item, itemIndex) => (
                                    <p
                                        className="py-0.5"
                                        key={itemIndex}
                                    >
                                        {item.name} x {item.quantity}
                                        <span> {item.size}</span>
                                        {itemIndex !== order.items.length - 1 && ','}
                                    </p>
                                ))}
                            </div>

                            <p className="mt-3 font-medium">
                                {order.address.firstName + ' ' + order.address.lastName}
                            </p>

                            <div>
                                <p>{order.address.street},</p>
                                <p>
                                    {order.address.city}, {order.address.state},{' '}
                                    {order.address.country}, {order.address.zipcode}
                                </p>
                            </div>

                            <p>{order.address.phone}</p>
                        </div>

                        <div>
                            <p className="text-sm">
                                Items : {order.items.length}
                            </p>
                            <p className="mt-3">
                                Method : {order.paymentMethod}
                            </p>
                            <p>
                                Payment : {order.payment ? 'Done' : 'Pending'}
                            </p>
                            <p>
                                Date : {new Date(order.date).toLocaleDateString()}
                            </p>
                        </div>

                        <p className="text-sm font-medium">
                            {currency}{order.amount}
                        </p>

                        <select
                            onChange={(event) => statusHandler(event, order._id)}
                            value={order.status}
                            className="p-2 font-semibold border border-gray-300 rounded bg-white outline-none cursor-pointer"
                        >
                            <option value="Order Placed">Order Placed</option>
                            <option value="Packing">Packing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Out for delivery">Out for delivery</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders
