import * as React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loginpage from './pages/LoginPage';
import Home from './pages/Home';
import Collections from './pages/Collections';
import axios from 'axios';

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [collectionTypes, setCollectionTypes] = React.useState([]);

  async function getCollectionList() {
    const response = await axios.get('http://localhost:3003/api/getAllContentType', {
        headers: {
            'x-access-token': localStorage.getItem('x-access-token')
    }});
    setCollectionTypes(response.data.data);
}

  React.useEffect(() => {
    getCollectionList();
  }
  , []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginpage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Loginpage>} />
        <Route path="/home" element={<Home collectionTypes={collectionTypes} setCollectionTypes={setCollectionTypes}></Home>} />
         <Route path="/collections" element={<Collections collectionTypes={collectionTypes} setCollectionTypes={setCollectionTypes}></Collections>} />
        <Route path="*" element={<h1>404: Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
