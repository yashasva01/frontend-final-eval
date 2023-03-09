import * as React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loginpage from './pages/LoginPage';
import Home from './pages/Home'


function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Loginpage>} />
        { {/* isLoggedIn */ }&& <Route path="/home" element={<Home></Home>} />} 
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;