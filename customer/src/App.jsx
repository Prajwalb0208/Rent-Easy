import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Houses from './components/Houses/Houses';
import AreaFilters from './components/AreaFilters/AreaFilters';
import './index.css';

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <div className="content">
        <AreaFilters />
        <Houses />
      </div>
      <Footer />
    </div>
  );
};

export default App;
