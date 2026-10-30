
import Title from '../components/Title'
import CartTotal from '../components/cartTotal'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const PlaceOrder = () => {

    const [method, setMethod] = useState('stripe')
    const {
        navigate,
        cartItems,
        products,
        getCartTotal,
        getCartCount,
        delivery_fee,
        backendUrl,
        token,
        setCartItems
    } = useContext(ShopContext)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value

        setFormData(data => ({ ...data, [name]: value }))
    }

  const initPay = (order) => {
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID

    if (!razorpayKey || !window.Razorpay) {
        toast.error('Razorpay is not configured correctly')
        return
    }

    const options = {
        key: razorpayKey,
        amount: order.amount,
        currency: order.currency,
        name: 'Order Payment',
        description: 'Order Payment',
        order_id: order.id,
        receipt: order.receipt,
        handler: async (response) => {
            console.log(response)
            try {
                const { data } = await axios.post(
                    backendUrl + '/api/order/verifyRazorpay',
                    response,
                    { headers: { token } }
                )

                if (data.success) {
                    navigate('/orders')
                    setCartItems({})
                }

            } catch (error) {
                console.log(error)
                toast.error(
                    error.response?.data?.message || error.message
                )
            }
        }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
}


    const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
        let orderItems = [];

        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                if (cartItems[items][item] > 0) {
                    const itemInfo = structuredClone(
                        products.find(product => product._id === items)
                    );

                    if (itemInfo) {
                        itemInfo.size = item;
                        itemInfo.quantity = cartItems[items][item];
                        orderItems.push(itemInfo);
                    }
                }
            }
        }

        let orderData = {
            address: formData,
            items: orderItems,
            amount: getCartTotal() + delivery_fee
        };

        switch (method) {

            // API Calls for COD
            case 'cod': {
                const response = await axios.post(
                    backendUrl + '/api/order/place',
                    orderData,
                    { headers: { token } }
                );

                if (response.data.success) {
                    setCartItems({});
                    navigate('/orders');
                } else {
                    toast.error(response.data.message);
                }

                break;
            }
            // API Calls for Stripe
            case 'stripe': {
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData , { headers: { token } });
            if (responseStripe.data.success) {
                const { session_url } = responseStripe.data
                window.location.replace(session_url)
            } else {
                toast.error(responseStripe.data.message)
            }
            break;
            }
            case 'razorpay':{

            const responseRazorpay = await axios.post(
                backendUrl + '/api/order/razorpay',
                orderData,
                { headers: { token } }
            )

            if (responseRazorpay.data.success) {
                initPay(responseRazorpay.data.order);
            } else {
                toast.error(responseRazorpay.data.message)
            }

            break;
            }

            default:
                break;
        }

    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};

if (getCartCount() === 0) {
    return (
        <div className="border-t pt-14 min-h-[50vh] flex flex-col items-center justify-center gap-6">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <button
                type="button"
                className="bg-black text-white py-3 px-8 hover:bg-gray-800 transition duration-300"
                onClick={() => navigate('/cart')}
            >
                Return to Cart
            </button>
        </div>
    )
}

return (
        <form className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">

            {/* Left Side */}
            <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">

                <div className="text-xl sm:text-2xl my-3">
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>

                <div className="flex gap-3">
                    <input
                        onChange={onChangeHandler}
                        name="firstName"
                        value={formData.firstName}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="First name"
                    />
                    <input
                        onChange={onChangeHandler}
                        name="lastName"
                        value={formData.lastName}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Last name"
                    />
                </div>

                <input
                    onChange={onChangeHandler}
                    name="email"
                    value={formData.email}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="email"
                    placeholder="Email address"
                />

                <input
                    onChange={onChangeHandler}
                    name="street"
                    value={formData.street}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="text"
                    placeholder="Street"
                />

                <div className="flex gap-3">
                    <input
                        onChange={onChangeHandler}
                        name="city"
                        value={formData.city}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="City"
                    />
                    <input
                        onChange={onChangeHandler}
                        name="state"
                        value={formData.state}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="State"
                    />
                </div>

                <div className="flex gap-3">
                    <input
                        onChange={onChangeHandler}
                        name="zipcode"
                        value={formData.zipcode}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="number"
                        placeholder="Zipcode"
                    />
                    <input
                        onChange={onChangeHandler}
                        name="country"
                        value={formData.country}
                        className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                        type="text"
                        placeholder="Country"
                    />
                </div>

                <input
                    onChange={onChangeHandler}
                    name="phone"
                    value={formData.phone}
                    className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
                    type="tel"
                    placeholder="Phone"
                />

            </div>

            {/* Right Side */}
            <div className="mt-8 sm:mt-0 min-w-80">

                <CartTotal />

                <div className="mt-12">
                    <Title text1="PAYMENT" text2="METHOD" />

                    {/* Payment Method Selection */}
                    <div className="flex gap-3 flex-col lg:flex-row mt-5">

                        {/* Stripe */}
                        <div
                            onClick={() => setMethod('stripe')}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                        >
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                            <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
                        </div>

                        {/* Razorpay */}
                        <div
                            onClick={() => setMethod('razorpay')}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                        >
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className="h-5 mx-4" src={assets.razorpay_logo} alt="Razorpay" />
                        </div>

                        {/* Cash on Delivery */}
                        <div
                            onClick={() => setMethod('cash_on_delivery')}
                            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
                        >
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cash_on_delivery' ? 'bg-green-400' : ''}`}></p>
                            <p className="text-gray-500 text-sm font-medium">
                                CASH ON DELIVERY
                            </p>
                        </div>

                    </div>

                    <div className="text-end mt-8">
                        <button
                            className="bg-black text-white px-8 py-3 text-sm hover:bg-gray-800 transition"
                            type="submit"
                            onClick={onSubmitHandler}
                        >
                            PLACE ORDER
                        </button>
                    </div>
                </div>
            </div>

        </form>
    )
}

export default PlaceOrder
