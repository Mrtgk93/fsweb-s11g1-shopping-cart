import React, { useEffect } from "react";
import { ScCartCheckout } from "./scParts";
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { localStorageStateOku } from "../App";

// Components
import Item from "./ShoppingCartItem";

const ShoppingCart = (props) => {
  const { cart, removeItem } = useContext(CartContext);
  const getCartTotal = () => {
    return cart
      .reduce((acc, value) => {
        return acc + value.price;
      }, 0)
      .toFixed(2);
  };

  return (
    <div>
      {cart.map((item) => (
        <Item key={item.id} {...item} item={item} removeItem={removeItem} />
      ))}

      <ScCartCheckout>
        <p>Total: ${getCartTotal()}</p>
        <button>Checkout</button>
      </ScCartCheckout>
    </div>
  );
};

export default ShoppingCart;
