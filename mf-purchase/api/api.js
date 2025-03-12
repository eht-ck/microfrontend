import axios from "axios"
 

const tokenHeader = () =>{
 
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

        
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
        
    return config;
}

const addToCart = async (productId, quantity) => {
  
         
       const data =  await axios.get("http://localhost:8082/api/cart/", tokenHeader());
        const payload = {
            productId: productId,
            quantity: quantity
        }
        const response = await axios.post(`http://localhost:8082/api/cart`,payload,tokenHeader());   

    }


   

const getUserOrder = async () => {
        try {
            const response = await axios.get("http://localhost:8082/api/order/", tokenHeader());
            const data = response.data;
            console.log(data);
            return data;
        } catch (error) {
            console.error("Error fetching user order:", error);
        }
};
    

const getAllOrders = async (page = 0, size = 10) => {
    try {
        const response = await axios.get(`http://localhost:8082/api/order/all?page=${page}&size=${size}`, tokenHeader());
        const data = response.data;
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error fetching all orders:', error);
    }
};


const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await axios.patch(
            'http://localhost:8082/api/order/status',
            { orderId, status },
            tokenHeader()
        );
        const data = response.data;
        console.log(data);
        return data;
    } catch (error) {
        console.error('Error updating order status:', error);
    }
};

export { addToCart, getUserOrder, getAllOrders , updateOrderStatus};