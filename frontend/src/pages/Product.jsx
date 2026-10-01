import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

const Product = () => {
    const { productId } = useParams()
    const { products, currency , addToCart } = useContext(ShopContext)
    const [productData, setProductData] = useState(false)
    const [image, setImage] = useState('')
    const [Size, setSize] = useState('')

    useEffect(() => {
        const product = products.find(item => item._id === productId)
        if (product) {
            setProductData(product)
            setImage(product.image[0])
        }
    }, [productId, products])

    return productData ? (
        <div className="border-t pt-10">

            <div className="flex flex-col sm:flex-row gap-8">

                {/* Images */}
                <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
                    <div className="flex sm:flex-col gap-3 overflow-x-auto sm:w-[18%]">
                        {productData.image.map((item, index) => (
                            <img
                                key={index}
                                src={item}
                                onClick={() => setImage(item)}
                                className={`w-[23%] sm:w-full cursor-pointer ${
                                    image === item ? 'border border-gray-400' : ''
                                }`}
                                alt=""
                            />
                        ))}
                    </div>

                    <div className="w-full sm:w-[82%]">
                        <img src={image} className="w-full" alt="" />
                    </div>
                </div>

                {/* Details */}
                <div className="flex-1">
                    <h1 className="text-xl sm:text-2xl font-medium">
                        {productData.name}
                    </h1>

                    <div className="flex items-center gap-1 mt-3">
                        {[1, 2, 3, 4].map(i => (
                            <img key={i} src={assets.star_icon} className="w-3.5" alt="" />
                        ))}
                        <img src={assets.star_dull_icon} className="w-3.5" alt="" />
                        <p className="ml-2 text-sm">(122)</p>
                    </div>

                    <p className="mt-5 text-2xl font-medium">
                        {currency}{productData.price}
                    </p>

                    <p className="mt-5 text-sm text-gray-500 leading-6">
                        {productData.description}
                    </p>

                    <div className="mt-8">
                        <p className="mb-4 text-sm font-medium">Select Size</p>
                        <div className="flex gap-2">
                            {productData.sizes.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSize(item)}
                                    className={`px-4 py-3 text-sm bg-gray-100 border ${
                                        item === Size
                                            ? 'border-orange-500'
                                            : 'border-transparent'
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button onClick={() => addToCart(productData._id , Size)} className="mt-8 bg-black text-white px-8 py-3 text-sm hover:bg-gray-800">
                        ADD TO CART
                    </button>

                    <hr className="mt-8" />

                    <div className="mt-5 text-xs text-gray-500 space-y-2">
                        <p>100% Original Product</p>
                        <p>Cash on Delivery is available on this product</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mt-16">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews (122)</p>
                </div>

                <div className="border px-6 py-6 text-sm text-gray-500 space-y-4">
                    <p>An e-commerce website is an online platform that facilitates the buying and selling of products or services.</p>
                    <p>E-commerce websites typically display products or services along with detailed information about them.</p>
                </div>
            </div>

            <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>

        </div>
    ) : (
        <div className="min-h-[50vh] flex items-center justify-center">
            Loading...
        </div>
    )
}

export default Product