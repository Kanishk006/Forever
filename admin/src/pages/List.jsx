
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App'
import { toast } from 'react-toastify'

const List = ({ token }) => {
    const [list, setList] = useState([])

    // Fetch all products
    const fetchList = async () => {
        try {
            const response = await axios.get(
                backendUrl + '/api/products/list'
            )

            if (response.data.success) {
                setList(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(
                error.response?.data?.message || 'Failed to fetch products'
            )
        }
    }

    // Remove a product
    const removeProduct = async (id) => {
        try {
            const response = await axios.post(
                backendUrl + '/api/products/remove',
                { id },
                {
                    headers: {
                        token: token
                    }
                }
            )

            if (response.data.success) {
                toast.success(response.data.message || 'Product removed successfully')
                await fetchList()
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(
                error.response?.data?.message || 'Failed to remove product'
            )
        }
    }

    useEffect(() => {
        fetchList()
    }, [])

    return (
        <div className="flex flex-col gap-3">
            <p className="mb-2">All Products List</p>

            <div className="flex flex-col gap-2">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-2 bg-gray-100 text-sm font-semibold">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b className="text-center">Action</b>
                </div>

                {/* Products */}
                {list.length > 0 ? (
                    list.map((item, index) => (
                        <div
                            key={item._id || index}
                            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 border text-sm"
                        >
                            <img
                                className="w-12 h-14 object-cover"
                                src={item.image?.[0]}
                                alt={item.name}
                            />

                            <p className="truncate">{item.name}</p>

                            <p>{item.category}</p>

                            <p className="hidden md:block">
                                ${item.price}
                            </p>

                            <p
                                onClick={() => removeProduct(item._id)}
                                className="text-right md:text-center cursor-pointer text-lg hover:text-red-500"
                                title="Remove product"
                            >
                                X
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="py-6 text-center text-gray-500">
                        No products found.
                    </p>
                )}
            </div>
        </div>
    )
}

export default List
