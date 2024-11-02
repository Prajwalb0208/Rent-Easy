import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css';

const List = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('/api/houses');
        // console.log(response.data);
        setHouses(response.data);
      } catch (error) {
        console.error("Error fetching houses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const handleEdit = (house) => {
    // Logic to edit a house
  };

  const handleDelete = async (id) => {
    // Logic to delete a house
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="house-list">
      {Array.isArray(houses) && houses.length > 0 ? (
        <ul>
          {houses.map((house) => (
            <li key={house._id} className="house-item">
              <img src={house.image} alt={house.name} className="house-image" />
              <div className="house-details">
                <div className="house-info-top">
                  <h3>{house.name}</h3>
                  <p>{house.location}</p>
                </div>
                <div className="house-info-bottom">
                  <p>Price: ${house.price}</p>
                </div>
                <div className="house-actions">
                  <button onClick={() => handleEdit(house)}>Edit</button>
                  <button onClick={() => handleDelete(house._id)}>Delete</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No houses found.</p>
      )}
    </div>
  );
};

export default List;
