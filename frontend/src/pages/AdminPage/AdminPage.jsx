import React from 'react';
import './AdminPage.css';
import Admin from '../../components/Admin/Admin';
import { Route, Routes, useLocation } from 'react-router-dom';
import Add from '../Add/Add';

const AdminPage = () => {
  const location = useLocation();

  return (
    <div className='admin'>
      {location.pathname !== '/admin/add' && <Admin />}      
      <Routes>
        <Route path='add' element={<Add />} />
      </Routes>
    </div>
  );
};

export default AdminPage;
