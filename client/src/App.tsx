import { AppProvider } from "./context/AppContext";
import { HomePage } from "./views/HomePage";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/signup';
import Login from './Components/Login/login';
import ProductPage from "./Components/Product Page/product";

function App() {
  return (
    <AppProvider>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<ProductPage title={"Rotisserie Chicken"} price={12} imageUrl={""} description={"beeswax"} distance={12} sellerName={"triton"} sellerUsername={"tritonlowballer"} sellerContact={"123-456-7890"} />} />
      </Routes>
    </div>
    </AppProvider>
  );
}

export default App;
