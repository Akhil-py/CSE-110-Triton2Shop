import { AppProvider } from "./context/AppContext";
import { HomePage } from "./views/HomePage";
import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';

function App() {
  return (
    <AppProvider>
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
    </AppProvider>
  );
}

export default App;
