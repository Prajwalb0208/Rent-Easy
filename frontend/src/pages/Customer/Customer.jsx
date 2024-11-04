// Customer.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Houses from '../../components/Houses/Houses';
import AreaFilters from '../../components/AreaFilters/AreaFilters';
import AboutUs from '../../components/AboutUs/AboutUs';
import './Customer.css';

const Customer = () => {
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

  const applyFilters = () => {
    const filtered = housesData.filter(house => {
      const areaMatch = selectedArea ? house.area === selectedArea : true;
      const typeMatch = houseType ? house.typeOfHouse === houseType : true;
      return areaMatch && typeMatch;
    });
    setFilteredHouses(filtered); //
  };

  return (
    <div className='app'>
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
      <AboutUs />
    </div>
  );
};

export default Customer;
