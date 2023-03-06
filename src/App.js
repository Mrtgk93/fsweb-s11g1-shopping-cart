import React, { useState } from "react";
import { Route } from "react-router-dom";
import { data } from "./data";
import { ProductContext } from "./contexts/ProductContext";
import { CartContext } from "./contexts/CartContext";
// Bileşenler
import Navigation from "./components/Navigation";
import Products from "./components/Products";
import ShoppingCart from "./components/ShoppingCart";

let key = "s11g1";

function localStorageStateYaz(key, item) {
  window.localStorage.setItem(key, JSON.stringify(item));
}

function localStorageStateOku(key) {
  if (JSON.parse(localStorage.getItem(key)))
    return JSON.parse(localStorage.getItem(key));
  else {
    window.localStorage.setItem(key, JSON.stringify([]));
    return JSON.parse(window.localStorage.getItem(key));
  }
}

function App() {
  const [products, setProducts] = useState(data);
  const [cart, setCart] = useState(localStorageStateOku(key));

  const addItem = (item) => {
    // verilen itemi sepete ekleyin
    setCart([...cart, item]);
    localStorageStateYaz(key, [...cart, item]);
  };

  const removeItem = (item) => {
    setCart([...cart.filter((i) => i.id !== item.id)]);
    let filteredCart = [...cart.filter((i) => i.id !== item.id)];
    localStorageStateYaz(key, filteredCart);
  };

  return (
    <div className="App">
      <CartContext.Provider value={{ cart, removeItem }}>
        <Navigation />

        {/* Routelar */}
        <ProductContext.Provider value={{ products, addItem }}>
          <main className="content">
            <Route exact path="/">
              <Products />
            </Route>

            <Route path="/cart">
              <ShoppingCart />
            </Route>
          </main>
        </ProductContext.Provider>
      </CartContext.Provider>
    </div>
  );
}

export default App;
