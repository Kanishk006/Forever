import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [category, setCategory] = useState("Men")
    const [subCategory, setSubCategory] = useState("Topwear")
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {

            const formData = new FormData()

            formData.append("name", name)
            formData.append("description", description)
            formData.append("price", price)
            formData.append("category", category)
            formData.append("subCategory", subCategory)
            formData.append("bestseller", bestseller)
            formData.append("sizes", JSON.stringify(sizes))

            if (image1) formData.append("image1", image1)
            if (image2) formData.append("image2", image2)
            if (image3) formData.append("image3", image3)
            if (image4) formData.append("image4", image4)

            const response = await axios.post(
                backendUrl + "/api/products/add",
                formData,
                {
                    headers: {
                        token: token
                    }
                }
            )

            if (response.data.success) {

                toast.success(response.data.message)

                setName("")
                setDescription("")
                setPrice("")
                setCategory("Men")
                setSubCategory("Topwear")
                setBestseller(false)
                setSizes([])

                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)

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

    const toggleSize = (size) => {
        if (sizes.includes(size)) {
            setSizes(sizes.filter(item => item !== size))
        } else {
            setSizes([...sizes, size])
        }
    }

    return (
        <form
            onSubmit={onSubmitHandler}
            className='flex flex-col w-full items-start gap-3'
        >

            {/* Upload Image */}
            <div>
                <p className='mb-2'>Upload Image</p>

                <div className='flex gap-2'>

                    <label htmlFor='image1'>
                        <img
                            className='w-20'
                            src={image1 ? URL.createObjectURL(image1) : assets.upload_area}
                            alt=''
                        />
                        <input
                            onChange={(e) => setImage1(e.target.files[0])}
                            type='file'
                            id='image1'
                            hidden
                        />
                    </label>

                    <label htmlFor='image2'>
                        <img
                            className='w-20'
                            src={image2 ? URL.createObjectURL(image2) : assets.upload_area}
                            alt=''
                        />
                        <input
                            onChange={(e) => setImage2(e.target.files[0])}
                            type='file'
                            id='image2'
                            hidden
                        />
                    </label>

                    <label htmlFor='image3'>
                        <img
                            className='w-20'
                            src={image3 ? URL.createObjectURL(image3) : assets.upload_area}
                            alt=''
                        />
                        <input
                            onChange={(e) => setImage3(e.target.files[0])}
                            type='file'
                            id='image3'
                            hidden
                        />
                    </label>

                    <label htmlFor='image4'>
                        <img
                            className='w-20'
                            src={image4 ? URL.createObjectURL(image4) : assets.upload_area}
                            alt=''
                        />
                        <input
                            onChange={(e) => setImage4(e.target.files[0])}
                            type='file'
                            id='image4'
                            hidden
                        />
                    </label>

                </div>
            </div>

            {/* Product Name */}
            <div className='w-full'>
                <p className='mb-2'>Product name</p>

                <input
                    className='w-full max-w-[500px] px-3 py-2'
                    type='text'
                    placeholder='Type here'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            {/* Product Description */}
            <div className='w-full'>
                <p className='mb-2'>Product description</p>

                <textarea
                    className='w-full max-w-[500px] px-3 py-2'
                    placeholder='Write content here'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            {/* Category, Sub Category and Price */}
            <div className='flex flex-col sm:flex-row gap-2 w-full'>

                {/* Category */}
                <div>
                    <p className='mb-2'>Product category</p>

                    <select
                        className='w-full px-3 py-2'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value='Men'>Men</option>
                        <option value='Women'>Women</option>
                        <option value='Kids'>Kids</option>
                    </select>
                </div>

                {/* Sub Category */}
                <div>
                    <p className='mb-2'>Sub category</p>

                    <select
                        className='w-full px-3 py-2'
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                    >
                        <option value='Topwear'>Topwear</option>
                        <option value='Bottomwear'>Bottomwear</option>
                        <option value='Winterwear'>Winterwear</option>
                    </select>
                </div>

                {/* Price */}
                <div>
                    <p className='mb-2'>Product Price</p>

                    <input
                        className='w-full px-3 py-2 sm:w-[120px]'
                        type='number'
                        placeholder='25'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

            </div>

            {/* Product Sizes */}
            <div>
                <p className='mb-2'>Product Sizes</p>

                <div className='flex gap-2'>

                    <div>
                        <p
                            onClick={() => toggleSize("S")}
                            className={`${
                                sizes.includes("S")
                                    ? 'bg-pink-100 border border-pink-300'
                                    : 'bg-slate-200'
                            } px-3 py-1 cursor-pointer`}
                        >
                            S
                        </p>
                    </div>

                    <div>
                        <p
                            onClick={() => toggleSize("M")}
                            className={`${
                                sizes.includes("M")
                                    ? 'bg-pink-100 border border-pink-300'
                                    : 'bg-slate-200'
                            } px-3 py-1 cursor-pointer`}
                        >
                            M
                        </p>
                    </div>

                    <div>
                        <p
                            onClick={() => toggleSize("L")}
                            className={`${
                                sizes.includes("L")
                                    ? 'bg-pink-100 border border-pink-300'
                                    : 'bg-slate-200'
                            } px-3 py-1 cursor-pointer`}
                        >
                            L
                        </p>
                    </div>

                    <div>
                        <p
                            onClick={() => toggleSize("XL")}
                            className={`${
                                sizes.includes("XL")
                                    ? 'bg-pink-100 border border-pink-300'
                                    : 'bg-slate-200'
                            } px-3 py-1 cursor-pointer`}
                        >
                            XL
                        </p>
                    </div>

                    <div>
                        <p
                            onClick={() => toggleSize("XXL")}
                            className={`${
                                sizes.includes("XXL")
                                    ? 'bg-pink-100 border border-pink-300'
                                    : 'bg-slate-200'
                            } px-3 py-1 cursor-pointer`}
                        >
                            XXL
                        </p>
                    </div>

                </div>
            </div>

            {/* Bestseller */}
            <div className='flex gap-2 mt-2'>
                <input
                    type='checkbox'
                    id='bestseller'
                    checked={bestseller}
                    onChange={() => setBestseller(prev => !prev)}
                />

                <label
                    className='cursor-pointer'
                    htmlFor='bestseller'
                >
                    Add to bestseller
                </label>
            </div>

            {/* Add Button */}
            <button
                type='submit'
                className='w-28 py-3 mt-4 bg-black text-white hover:bg-gray-800 transition-all'
            >
                ADD
            </button>

        </form>
    )
}

export default Add