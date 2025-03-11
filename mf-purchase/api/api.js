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
    



export { addToCart, getUserOrder };
