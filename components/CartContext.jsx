const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);
  // Saving the cart number in localStorage
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  // Keep track of cart length on reload
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);
  // Adding the product to the cart
  const addProduct = function (productID) {
    setCartProducts((prev) => [...prev, productID]);
  };
  // Removing the product from the cart
  const removeProduct = function (productID) {
    setCartProducts((prev) => {
      const position = prev.indexOf(productID);
      if (position !== -1) {
        return prev.filter((value, index) => index !== position);
      }
      return prev;
    });
  };
  return (
    <CartContext.Provider
      value={{ cartProducts, setCartProducts, addProduct, removeProduct }}
    >
      {children}
    </CartContext.Provider>
  );
}
