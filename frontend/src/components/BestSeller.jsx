import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const BestSeller = () => {

    const { products } = useContext(ShopContext)

    const [bestSellers, setBestSellers] = useState([])

    useEffect(() => {
        const bestProducts = products.filter((item) => item.bestseller)

        setBestSellers(bestProducts.slice(0, 5))
    }, [products])

    return (
        <section className="w-full py-12 sm:py-14 md:py-16">

            {/* ================= HEADER ================= */}

            <div className="text-center mb-8 sm:mb-10 md:mb-12 px-4">

                <Title
                    text1="BEST"
                    text2="SELLERS"
                />

                <p className="
                    max-w-2xl
                    mx-auto
                    mt-3
                    text-xs
                    sm:text-sm
                    text-gray-500
                    leading-6
                ">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the.
                </p>

            </div>


            {/* ================= PRODUCTS ================= */}

            <div className="
                max-w-[1400px]
                mx-auto
                px-4
                sm:px-6
                md:px-8
                lg:px-10

                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5

                gap-x-3
                sm:gap-x-4
                md:gap-x-5

                gap-y-8
            ">

                {
                    bestSellers.map((item, index) => (

                        <ProductItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            image={item.image}
                            price={item.price}
                        />

                    ))
                }

            </div>

        </section>
    )
}

export default BestSeller