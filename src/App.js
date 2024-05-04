import './App.css';
import React, {useEffect} from 'react';
import HomePage from './pages/HomePage';
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import MetamaskConnection from './pages/MetamaskConnection';
import ListAllProducts from './pages/ListAllProducts';
import UploadProduct from './pages/UploadProduct';



const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

function App() {
  return (
    <div>
      <BrowserRouter>
      <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="metamaskconnection" element={<MetamaskConnection />} />
          <Route path="listallproducts" element={<ListAllProducts />} />
          <Route path="listallproducts/upload" element={<UploadProduct/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
