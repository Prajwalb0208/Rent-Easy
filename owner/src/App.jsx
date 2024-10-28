import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Sidebar } from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add/>}/>
          <Route path='/list' element={<List/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App