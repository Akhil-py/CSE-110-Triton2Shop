import { AppProvider } from "./context/AppContext";
import { HomePage } from "./views/HomePage";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup/signup';
import Login from './Components/Login/login';
import { PostItem } from './Components/PostItem/PostItem';
import RequestTracker from './Components/Request Tracker/requestTracker';
import FavoritesList from "./Components/FavoritesList/FavoritesList";
import ProductPage from "./Components/Product Page/product";
import ProfilePage from "./Components/Profile Page/product";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/postitem" element={<PostItem />} />

          <Route path="/rq-tracker" element={<RequestTracker />} />
          <Route path="/favorites" element={<FavoritesList/>} />

          <Route path="/product" element={<ProductPage title={"Rotisserie Chicken"} price={12} imageUrl={""} description={"beeswax"} distance={12} sellerName={"triton"} sellerUsername={"tritonlowballer"} sellerContact={"123-456-7890"} />} />
          <Route path="/profile" element={<ProfilePage title={"Profile Page"} price={12} imageUrl={""} description={"beeswax"} distance={12} sellerName={"triton"} sellerUsername={"tritonlowballer"} sellerContact={"123-456-7890"} />} />
        </Routes>
      </div>

    </AppProvider>
  );
}

export default App;
