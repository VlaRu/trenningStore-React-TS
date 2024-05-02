import React from "react";
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Store from './pages/Store';
import About from './pages/About';
import Navbar from './components/Navbar';
import { Container } from 'react-bootstrap';
import { ShoppingCartProvider } from "./context/ShoppingCartContext";


function App() {
  return(
   <ShoppingCartProvider>
      <Navbar />
      <Container>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/store' element={<Store />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  )
}

export default App;