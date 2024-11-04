import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/signup';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
