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
  //   // Removing all product from the cart
  //   const removeAllProduct = function (productID) {
  //     setCartProducts((prev) => {
  //       const updatedCart = prev.filter((value) => value !== productID);
  //       ls.setItem("cart", JSON.stringify(updatedCart)); // Update local storage here
  //       return updatedCart;
  //     });
  //   };

  // Removing the product from the cart
  const removeProduct = function (productId) {
    setCartProducts((prev) => {
      const indexToRemove = prev.indexOf(productId);
      if (indexToRemove !== -1) {
        const updatedCart = [...prev];
        updatedCart.splice(indexToRemove, 1); // Remove one instance of the product

        ls?.setItem("cart", JSON.stringify(updatedCart));
        return updatedCart;
      }
      return prev;
    });
  };
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
