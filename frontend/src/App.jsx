import React from 'react';
import './index.css';
import Customer from './pages/Customer/Customer';
import Owner from './pages/Owner/Owner';
import AdminPage from './pages/AdminPage/AdminPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Customer />} />
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/owner/*' element={<Owner />} />
        </Routes>
      </Router>
      <Footer/>
    </div>
  );
};

export default App;
