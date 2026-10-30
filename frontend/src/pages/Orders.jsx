import { useCallback, useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import axios from 'axios'

const Orders = () => {

 const { backendUrl, token, currency } = useContext(ShopContext);

const [orderData, setorderData] = useState([]);

const loadOrderData = useCallback(async () => {
    try {
        if (!token) {
            return null;
        }

        const response = await axios.post(
            backendUrl + '/api/order/userorders',
            {},
            { headers: { token } }
        );

        if (response.data.success) {
            let allOrdersItem = [];

            response.data.orders.map((order) => {
                order.items.map((item) => {
                    item['status'] = order.status;
                    item['payment'] = order.payment;
                    item['paymentMethod'] = order.paymentMethod;
                    item['date'] = order.date;

                    allOrdersItem.push(item);
                });
            });

            setorderData(allOrdersItem.reverse());
        }
    } catch (error) {
        console.log(error);
    }
}, [backendUrl, token]);

useEffect(() => {
    const timeoutId = setTimeout(() => {
        void loadOrderData();
    }, 0);

    return () => clearTimeout(timeoutId);
}, [loadOrderData]);

  return (
    <div className="border-t pt-16">

      {/* Page Heading */}
      <div className="text-2xl mb-8">
        <Title text1="MY" text2="ORDERS" />
      </div>

      {/* Orders */}
      <div>

        {orderData.map((item, index) => (

          <div
            key={index}
            className="py-4 border-t border-b text-gray-700
                       flex flex-col md:flex-row md:items-center
                       md:justify-between gap-5"
          >

            {/* Product Information */}
            <div className="flex items-start gap-6 text-sm">

              {/* Product Image */}
              <img
                className="w-16 sm:w-20"
                src={item.image[0]}
                alt={item.name}
              />

              {/* Product Details */}
              <div>

                <p className="sm:text-base font-medium">
                  {item.name}
                </p>

                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">

                  <p>
                    {currency}{item.price}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <p>
                    Size: {item.size}
                  </p>

                </div>

                <p className="mt-1">
                  Date:{' '}
                  <span className="text-gray-400">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </p>
                <p className="mt-1">
                  Payment Method:{' '}
                  <span className="text-gray-400">
                    {item.paymentMethod}
                  </span>
                </p>

              </div>

            </div>

            {/* Order Status + Track Button */}
            <div className="md:w-1/2 flex items-center justify-between">

              {/* Status */}
              <div className="flex items-center gap-2">

                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>

                <p className="text-sm md:text-base">
                  {item.status}
                </p>

              </div>

              {/* Track Order */}
              <button
                className="border border-gray-300 px-4 py-2
                           text-sm font-medium hover:bg-gray-50"
              >
                Track Order
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default Orders