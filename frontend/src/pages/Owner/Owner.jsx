import React from 'react';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Add from '../../pages/Add/Add';
import List from '../../pages/List/List';
import './Owner.css';

const Owner = () => {
  return (
    <div className='app'>
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='add' element={<Add />} />
          <Route path='list' element={<List />} />
        </Routes>
      </div>
    </div>
  );
};

export default Owner;
