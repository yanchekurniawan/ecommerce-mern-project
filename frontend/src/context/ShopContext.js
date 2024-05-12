import React, { createContext, useEffect, useState } from "react";
// import allProductData from "../assets/img/all_product";
import axios from "axios";
import Swal from "sweetalert2";

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  /* JWT */
  const [allProductData, setAllProductData] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/product");
      if (response.data.success) {
        setAllProductData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getDefaultCart = () => {
    let cart = {};
    // for (let i = 0; i < allProductData.length; i++) {
    //   cart[i] = 0;
    // }
    allProductData.map((value) => {
      cart[value.id] = 0;
    });
    /* console.log("cart", cart); */
    return cart;
  };

  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    setCartItems(getDefaultCart());
  }, [allProductData]);

  /* console.log("cart items", cartItems); */

  const addToCart = async (productId, token) => {
    setCartItems((prev) => ({ ...prev, [productId]: prev[productId] + 1 }));
    try {
      const response = await axios.post(
        "http://localhost:4000/cart",
        {
          productId,
        },
        {
          headers: {
            "x-access-token": `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      Swal.fire({
        text: "Login Required",
        icon: "warning",
      });
    }
  };

  const removeFromCart = async (productId, token) => {
    setCartItems((prev) => ({ ...prev, [productId]: prev[productId] - 1 }));
    try {
      const response = await axios.delete(
        `http://localhost:4000/cart/${productId}/one`,
        {
          headers: {
            "x-access-token": `Bearer ${token}`,
          },
        }
      );
      /* console.log(response); */
    } catch (error) {
      Swal.fire({
        text: "Login Required",
        icon: "warning",
      });
    }
  };

  const removeAllFromCart = async (productId, token) => {
    setCartItems((prev) => ({ ...prev, [productId]: 0 }));
    try {
      const response = await axios.delete(
        `http://localhost:4000/cart/${productId}/all`,
        {
          headers: {
            "x-access-token": `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      Swal.fire({
        text: "Login Required",
        icon: "warning",
      });
    }
  };

  const getTotalPrice = () => {
    let total = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        const findProduct = allProductData.find(
          (product) => product.id === Number(item)
        );
        total += findProduct.new_price * cartItems[item];
      }
    }
    return total;
  };

  const getTotalItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += 1;
      }
    }
    return totalItem;
  };

  const contextValue = {
    allProductData,
    setCartItems,
    cartItems,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    getTotalPrice,
    getTotalItems,
    getTotalCartItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
