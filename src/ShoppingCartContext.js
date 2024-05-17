import React, { createContext, useContext, useState } from 'react';

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(0);

    const updateCartItems = (count) => {
        setCartItems(count);
        console.log("Count: ", count);
    };

    return (
        <ShoppingCartContext.Provider value={{ cartItems, updateCartItems }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};
