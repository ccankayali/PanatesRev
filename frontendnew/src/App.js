import Navbar from "./Components/Navbar/Navbar";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import { Shop } from "./Pages/Shop";
import { Product } from "./Pages/Product";
import { LoginSignup } from "./Pages/LoginSignup";
import { Cart } from "./Pages/Cart";
import { Item } from "./Components/Item/Item";
import { useState } from "react";
function App() {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (itemName) => {
    // Sepete ekleme işlemleri burada gerçekleştirilir
    console.log(`Item with name ${itemName} added to cart`);
    // Örnek olarak, seçilen öğenin adını alarak bir nesne oluşturuyoruz ve sepete ekliyoruz
    const newItem = { name: itemName };
    setCartItems([...cartItems, newItem]);
  };
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Item addToCart={addToCart}/>}/>
        <Route path="/şirketler" element={<Shop category="şirketler" />}/>
        <Route path="/product" element={<Product/>}>
          <Route path=":productId" element={<Product/>} />
        </Route>
        <Route path="/cart" element={<Cart cartItems={cartItems}/>}/>
        <Route path="/login" element={<LoginSignup/>}/>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
  
}

export default App;