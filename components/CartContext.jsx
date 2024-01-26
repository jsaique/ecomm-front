const { createContext, useState, useEffect } = require("react");

export const CartContext = createContext({});

export function CartContextProvider({ children }) {
  const ls = typeof window !== "undefined" ? window.localStorage : null;
  const [cartProducts, setCartProducts] = useState([]);

  // Retrieving cart data from local storage on component mount
  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setCartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  // Saving the cart data to local storage whenever it changes
  useEffect(() => {
    if (cartProducts?.length > 0) {
      ls?.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  // Adding the product to the cart
  const addProduct = function (productID) {
    setCartProducts((prev) => [...prev, productID]);
  };

  // Removing the product from the cart
  const removeProduct = function (productID) {
    setCartProducts((prev) => {
      const updatedCart = prev.filter((value) => value !== productID);
      ls.setItem("cart", JSON.stringify(updatedCart)); // Update local storage here
      return updatedCart;
    });
  };

  // Clearing the cart and local storage
  const clearCart = function () {
    setCartProducts([]);
    ls.clear();
  };

  return (
    <CartContext.Provider
      value={{
        cartProducts,
        setCartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
