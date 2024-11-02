// AreaFilters.jsx
import React, { useState } from 'react';
import './AreaFilters.css';

const AreaFilters = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [houseType, setHouseType] = useState('');

  const areas = [
    'Nayandahalli', 'Hosakerehalli', 'Giri Nagar', 'Katriguppe', 'Vidya Peeta Ward', 
    'Jayanagar East', 'JP Nagar', 'Sarakki', 'Shakambari Narar', 'Banashankari Temple Ward',
    'Kumara Swamy Layout', 'Padmanabha Nagar', 'Chikkala Sandra', 'Uttarahalli', 
    'Yelchenahalli', 'Jaraganahalli', 'Puttenahalli', 'Gottigere', 'Konankunte', 
    'Anjanapura', 'Vasanthpura'
  ];

  const houseTypes = ['1 BHK', '2 BHK', '3 BHK', 'Room'];

  return (
    <div className="area-filters">
      <h3>Filters</h3>
      <div className="filter-group">
        <label>Area</label>
        <select onChange={(e) => setSelectedArea(e.target.value)} value={selectedArea}>
          <option value="">Select Area</option>
          {areas.map((area, index) => (
            <option key={index} value={area}>{area}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>House Type</label>
        <select onChange={(e) => setHouseType(e.target.value)} value={houseType}>
          <option value="">Select Type</option>
          {houseTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <button className="apply-filters-btn">Apply Filters</button>
    </div>
  );
};

export default AreaFilters;
