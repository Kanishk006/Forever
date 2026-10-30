import { createContext, useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { products } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {

    const currency = '$';
    const delivery_fee = 10;
    const backendurl = 'http://localhost:5000';
    const [Search , setSearch] = useState('');
    const [ShowSearch , setShowSearch] = useState(false);
    const [cartItems , setCartItems] = useState({});
    const [products , setProducts] = useState([]);
    const [token , setToken] = useState('');
    const [userId, setUserId] = useState('');
    
    const navigate = useNavigate();


    const addToCart = async (itemId , size) => {
        if(!size){
            toast.error('Select Product Size');
            return;
        }

        
        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            }
            else{
                cartData[itemId][size] = 1;
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
        try {
            await axios.post(
                backendurl + '/api/cart/update',
                { itemId, size, quantity: cartData[itemId][size] },
                { headers: { token } }
            );
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalCount += cartItems[items][item];
                    }
                }
                catch(error){

                }
            }
        }

        return totalCount;
    }

    const updateQuantity = async (itemId , size , quantity) => {
        let cartData = structuredClone(cartItems);
        const nextQuantity = Number(quantity);

        if (!Number.isFinite(nextQuantity) || nextQuantity < 0) {
            return;
        }

        if (!cartData[itemId]) {
            return;
        }

        if (nextQuantity === 0) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][size] = nextQuantity;
        }

        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(
                    backendurl + '/api/cart/update',
                    { itemId, size, quantity: nextQuantity },
                    { headers: { token } }
                );
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    }

    const getCartTotal = () => {
        let total = 0;
        for(const items in cartItems){
            let iteminfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        total += cartItems[items][item] * iteminfo.price;
                    }
                }
                catch(error){
                }
            }
        }
        return total;
    }
    
    const getProductsData = async () => {
        try {
            const response = await axios.get(
                backendurl + '/api/products/list'
            )

            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
    try {
        const response = await axios.post(
            backendurl + '/api/cart/get',
            {},
            { headers: { token } }
        );

        if (response.data.success) {
            setCartItems(response.data.cartData);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
};

    useEffect(() => {
        getProductsData()
    }, [])

    useEffect(() => {
    if (!token && localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
        getUserCart(localStorage.getItem('token'));
    }
}, []);

    const value = {
        products,
        currency,
        delivery_fee,
        Search,
        setSearch,
        ShowSearch,
        setShowSearch,
        cartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartTotal,
        navigate,
        backendurl,
        backendUrl: backendurl,
        token,
        setToken,
        setCartItems,
        userId,
        setUserId
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;