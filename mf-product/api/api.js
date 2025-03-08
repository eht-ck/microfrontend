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
   





export  {addToCart};