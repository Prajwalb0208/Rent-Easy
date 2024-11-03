import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Houses from './components/Houses/Houses';
import AreaFilters from './components/AreaFilters/AreaFilters';
import './index.css';
import AboutUs from './components/AboutUs/AboutUs';

const App = () => {
  const [housesData, setHousesData] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [selectedArea, setSelectedArea] = useState('');
  const [houseType, setHouseType] = useState('');

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/houses');
        setHousesData(response.data);
        setFilteredHouses(response.data);
      } catch (error) {
        console.error("Error fetching houses data:", error);
      }
    };

    fetchHouses();
  }, []);

  // Function to apply filters
  const applyFilters = () => {
    const filtered = housesData.filter(house => {
      const areaMatch = selectedArea ? house.location === selectedArea : true;
      const typeMatch = houseType ? house.typeOfHouse === houseType : true;
      return areaMatch && typeMatch;
    });
    setFilteredHouses(filtered);
  };

  return (
    <div className='app'>
      <Navbar />
      <div className="content">
        <AreaFilters 
          selectedArea={selectedArea} 
          setSelectedArea={setSelectedArea} 
          houseType={houseType} 
          setHouseType={setHouseType} 
          applyFilters={applyFilters} 
        />
        <Houses houses={filteredHouses} /> 
      </div>
      <AboutUs/>
      <Footer />
    </div>
  );
};

export default App;
