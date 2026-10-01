import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const Product = () => {
    const { productId } = useParams()
    const { products, currency } = useContext(ShopContext)

    const [productData, setProductData] = useState(false)
    const [image, setImage] = useState('')
    const [Size, setSize] = useState('')

    const fetchProductData = () => {
        products.forEach((item) => {
            if (item._id === productId) {
                setProductData(item)
                setImage(item.image[0])
            }
        })
    }

    useEffect(() => {
        fetchProductData()
    }, [productId, products])

    return productData ? (
        <div className="border-t-2 pt-10 transition-opacity duration-500">
            <div className="flex gap-12 flex-col sm:flex-row">

                {/* Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll">
                        {productData.image.map((item, index) => (
                            <img
                                src={item}
                                key={index}
                                onClick={() => setImage(item)}
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                alt=""
                            />
                        ))}
                    </div>

                    <div className="w-full sm:w-[80%]">
                        <img src={image} alt={productData.name} className="w-full" />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1">
                    <h1 className="font-medium text-2xl">{productData.name}</h1>

                    <div className="flex items-center gap-1 mt-2">
                        {[1, 2, 3, 4].map((item) => (
                            <img key={item} src={assets.star_icon} className="w-3.5" alt="" />
                        ))}
                        <img src={assets.star_dull_icon} className="w-3.5" alt="" />
                        <p className="pl-2">(122)</p>
                    </div>

                    <p className="mt-5 text-3xl font-medium">
                        {currency} {productData.price}
                    </p>

                    <p className="mt-5 text-gray-500">
                        {productData.description}
                    </p>

                    <div className="flex flex-col gap-4 my-8">
                        <p>Select Size</p>

                        <div className="flex gap-2">
                            {productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSize(item)}
                                    className={`border py-2 px-4 bg-gray-100 ${
                                        item === Size ? 'border-orange-500' : ''
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button className="bg-black text-white px-8 py-3 text-sm">
                        ADD TO CART
                    </button>

                    <hr className="mt-8" />

                    <div className="text-sm text-gray-500 mt-5">
                        <p>100% Original Product</p>
                        <p>Cash on Delivery is available on this product</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Description & Reviews */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews (122)</p>
                </div>

                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services.</p>
                    <p>E-commerce websites typically display products or services along with detailed information about them.</p>
                </div>
            </div>
        </div>
    ) : (
        <div className="opacity-0"></div>
    )
}

export default Product