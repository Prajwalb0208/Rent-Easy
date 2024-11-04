import React from 'react';
import './AreaFilters.css';

const AreaFilters = ({ selectedArea, setSelectedArea, houseType, setHouseType, applyFilters }) => {
  const areas = [
    'Nayandahalli', 'Hosakerehalli', 'Giri Nagar', 'Katriguppe', 'Vidya Peeta Ward', 
    'Jayanagar East', 'JP Nagar', 'Sarakki', 'Shakambari Narar', 'Banashankari Temple Ward',
    'Kumara Swamy Layout', 'Padmanabha Nagar', 'Chikkala Sandra', 'Uttarahalli', 
    'Yelchenahalli', 'Jaraganahalli', 'Puttenahalli', 'Gottigere', 'Konankunte', 
    'Anjanapura', 'Vasanthpura'
  ];

  const houseTypes = [
    'Room',
    '1bhk',
    '2bhk',
    '2bhk+duplex',
    '3bhk',
    '3bhk+duplex',
    '4bhk',
    'Villa',
    'Office Space'
  ];
  const resetFilters = () => {
    setSelectedArea(''); // Reset selected area
    setHouseType(''); // Reset house type
  };

  return (
    <div className="area-filters">
      <h3>Filters</h3>
      <div className="filter-group">
        <label>Area</label>
        <select onChange={(e) => setSelectedArea(e.target.value)} value={selectedArea}>
          <option value="" disabled>Select Area</option>
          {areas.map((area, index) => (
            <option key={index} value={area}>{area}</option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>House Type</label>
        <select onChange={(e) => setHouseType(e.target.value)} value={houseType}>
          <option value="" disabled>Select house type</option>
          {houseTypes.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div className="filter-buttons">
        <button className="apply-filters-btn" onClick={applyFilters}>Apply Filters</button>
        <button className="reset-filters-btn" onClick={resetFilters}>Reset Filters</button>
      </div>
    </div>
  );
};

export default AreaFilters;
