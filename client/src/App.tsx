import { AppProvider } from "./context/AppContext";
import { Routes, Route } from 'react-router-dom';
import { HomePage } from "./views/HomePage";
import Login from './Components/Login/login';
import Profile from './Components/Profile/Profile';
import { PostItem } from './Components/PostItem/PostItem';
import RequestTracker from './Components/Request Tracker/requestTracker';
import FavoritesList from "./Components/FavoritesList/FavoritesList";
import ProductPage from "./Components/Product Page/product";
import ProtectedRoute from './Components/Login/ProtectedRoute'; 

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/postitem" element={<PostItem />} />
          <Route path="/rq-tracker" element={<RequestTracker />} />
          <Route path="/favorites" element={<FavoritesList/>} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>

    </AppProvider>
  );
}

export default App;
