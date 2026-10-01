import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {

    const {
        products,
        Search,
        ShowSearch
    } = useContext(ShopContext)

    const [showFilter, setShowFilter] = useState(false)

    const [category, setCategory] = useState([])

    const [subCategory, setSubCategory] = useState([])

    const [sortType, setSortType] = useState('relevant')


    // ================= CATEGORY FILTER =================

    const toggleCategory = (e) => {

        if (e.target.checked) {

            setCategory((prev) => [
                ...prev,
                e.target.value
            ])

        } else {

            setCategory((prev) =>
                prev.filter(
                    (item) => item !== e.target.value
                )
            )

        }
    }


    // ================= TYPE FILTER =================

    const toggleSubCategory = (e) => {

        if (e.target.checked) {

            setSubCategory((prev) => [
                ...prev,
                e.target.value
            ])

        } else {

            setSubCategory((prev) =>
                prev.filter(
                    (item) => item !== e.target.value
                )
            )

        }
    }


    // ================= FILTER PRODUCTS =================

    const filteredProducts = products.filter((item) => {

        // Search filter
        const searchMatch =
            !ShowSearch ||
            !Search ||
            item.name
                .toLowerCase()
                .includes(Search.toLowerCase())


        // Category filter
        const categoryMatch =
            category.length === 0 ||
            category.includes(item.category)


        // Sub-category filter
        const subCategoryMatch =
            subCategory.length === 0 ||
            subCategory.includes(item.subCategory)


        return (
            searchMatch &&
            categoryMatch &&
            subCategoryMatch
        )
    })


    // ================= SORT PRODUCTS =================

    const sortedProducts = [...filteredProducts]

    if (sortType === 'low-high') {

        sortedProducts.sort(
            (a, b) => a.price - b.price
        )

    }

    if (sortType === 'high-low') {

        sortedProducts.sort(
            (a, b) => b.price - a.price
        )

    }


    return (
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">

            {/* ================= FILTER OPTIONS ================= */}

            <div className="min-w-60">

                {/* Filter Heading */}

                <p
                    onClick={() =>
                        setShowFilter(!showFilter)
                    }
                    className="my-2 text-xl flex items-center cursor-pointer gap-2"
                >
                    FILTERS

                    <img
                        className={`
                            h-3
                            sm:hidden
                            transition-transform
                            duration-300
                            ${showFilter ? 'rotate-90' : ''}
                        `}
                        src={assets.dropdown_icon}
                        alt=""
                    />
                </p>


                {/* ================= CATEGORY FILTER ================= */}

                <div
                    className={`
                        border
                        border-gray-300
                        pl-5
                        py-3
                        mt-6
                        ${showFilter ? '' : 'hidden'}
                        sm:block
                    `}
                >

                    <p className="mb-3 text-sm font-medium">
                        CATEGORIES
                    </p>

                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">

                        <p className="flex gap-2">
                            <input
                                className="w-3"
                                type="checkbox"
                                value="Men"
                                onChange={toggleCategory}
                            />
                            Men
                        </p>

                        <p className="flex gap-2">
                            <input
                                className="w-3"
                                type="checkbox"
                                value="Women"
                                onChange={toggleCategory}
                            />
                            Women
                        </p>

                        <p className="flex gap-2">
                            <input
                                className="w-3"
                                type="checkbox"
                                value="Kids"
                                onChange={toggleCategory}
                            />
                            Kids
                        </p>

                    </div>

                </div>


                {/* ================= SUB CATEGORY FILTER ================= */}

                <div
                    className={`
                        border
                        border-gray-300
                        pl-5
                        py-3
                        my-5
                        ${showFilter ? '' : 'hidden'}
                        sm:block
                    `}
                >

                    <p className="mb-3 text-sm font-medium">
                        TYPE
                    </p>

                    <div className="flex flex-col gap-2 text-sm font-light text-gray-700">

                        <p className="flex gap-2">
                            <input
                                className="w-3"
                                type="checkbox"
                                value="Topwear"
                                onChange={toggleSubCategory}
                            />
                            Topwear
                        </p>

                        <p className="flex gap-2">
                            <input
                                className="w-3"
                                type="checkbox"
                                value="Bottomwear"
                                onChange={toggleSubCategory}
                            />
                            Bottomwear
                        </p>

                        <p className="flex gap-2">
                            <input
                                className="w-3"
                                type="checkbox"
                                value="Winterwear"
                                onChange={toggleSubCategory}
                            />
                            Winterwear
                        </p>

                    </div>

                </div>

            </div>


            {/* ================= RIGHT SIDE ================= */}

            <div className="flex-1">

                {/* Title + Sort */}

                <div className="flex justify-between items-center text-base sm:text-2xl mb-4">

                    <Title
                        text1="ALL"
                        text2="COLLECTIONS"
                    />


                    {/* Sort */}

                    <select
                        value={sortType}
                        onChange={(e) =>
                            setSortType(e.target.value)
                        }
                        className="border-2 border-gray-300 text-sm px-2 py-1"
                    >

                        <option value="relevant">
                            Sort by: Relevant
                        </option>

                        <option value="low-high">
                            Sort by: Low to High
                        </option>

                        <option value="high-low">
                            Sort by: High to Low
                        </option>

                    </select>

                </div>


                {/* ================= PRODUCTS ================= */}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">

                    {
                        sortedProducts.length > 0 ? (

                            sortedProducts.map(
                                (item, index) => (

                                    <ProductItem
                                        key={index}
                                        id={item._id}
                                        image={item.image}
                                        name={item.name}
                                        price={item.price}
                                    />

                                )
                            )

                        ) : (

                            <div className="col-span-full text-center py-20 text-gray-500">
                                No products found.
                            </div>

                        )
                    }

                </div>

            </div>

        </div>
    )
}

export default Collection