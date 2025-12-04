import { getAuth, onAuthStateChanged } from "firebase/auth";
import React ,{createContext,useState} from "react";
import { Auth } from "../firebaseconfig";


const CartItems = createContext();
const UserAuthContext = createContext();

const BasketContext = ({children}) => {
    const [cart,setCart] = useState([]);
    return (
        <CartItems.Provider value={{cart,setCart}}>
            {children}
        </CartItems.Provider>
    )
}


const UserProvider = ({children}) => {
    const [user,setUser] = useState({})

    
    return(
        <UserAuthContext.Provider value={{user,setUser}}>
            {children}
        </UserAuthContext.Provider>
    )
}

export {CartItems,BasketContext,UserAuthContext,UserProvider};