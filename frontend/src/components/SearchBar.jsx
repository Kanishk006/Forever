import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

const SearchBar = () => {

    const {
        Search,
        setSearch,
        ShowSearch,
        setShowSearch
    } = useContext(ShopContext)

    const [Visible, setVisible] = useState(false)

    const location = useLocation()

    // Show search bar only on collection page
    useEffect(() => {

        if (location.pathname.includes('collection')) {
            setVisible(true)
        } else {
            setVisible(false)
        }

    }, [location.pathname])


    return ShowSearch && Visible ? (

        <div className="
            w-full
            bg-[#fafafa]
            border-t
            border-b
            border-gray-100
            px-4
            sm:px-6
            md:px-8
        ">

            <div className="
                max-w-[1200px]
                mx-auto
                h-[100px]
                sm:h-[100px]
                flex
                items-center
                justify-center
                gap-4
            ">

                {/* Search Input Container */}

                <div className="
                    relative
                    w-full
                    max-w-[600px]
                    h-12
                ">

                    <input
                        value={Search}
                        onChange={(e) => setSearch(e.target.value)}
                        type="text"
                        placeholder="Search"
                        className="
                            w-full
                            h-full
                            rounded-full
                            border
                            border-gray-300
                            bg-white
                            pl-5
                            pr-12
                            text-sm
                            text-gray-700
                            placeholder:text-gray-400
                            outline-none
                            focus:border-gray-500
                            transition
                        "
                    />

                    {/* Search Icon */}

                    <img
                        src={assets.search_icon}
                        alt="Search"
                        className="
                            absolute
                            right-4
                            top-1/2
                            -translate-y-1/2
                            w-5
                            h-5
                            cursor-pointer
                        "
                    />

                </div>

                {/* Close Icon */}

                <button
                    type="button"
                    onClick={() => {
                        setShowSearch(false)
                        setSearch('')
                    }}
                    className="
                        flex
                        items-center
                        justify-center
                        w-8
                        h-8
                        flex-shrink-0
                        hover:opacity-60
                        transition
                    "
                >

                    <img
                        src={assets.cross_icon}
                        alt="Close search"
                        className="w-4 h-4"
                    />

                </button>

            </div>

        </div>

    ) : null
}

export default SearchBar