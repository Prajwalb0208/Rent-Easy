import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './List.css';

const List = () => {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentHouse, setCurrentHouse] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/houses');
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
    setCurrentHouse(house);
    setIsEditing(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const { imageUrl, ...houseDataToUpdate } = currentHouse; 
      const response = await axios.put(`http://localhost:5000/api/houses/${currentHouse._id}`, houseDataToUpdate);
      setHouses((prevHouses) => 
        prevHouses.map((house) =>
          house._id === currentHouse._id ? response.data : house
        )
      );
      setIsEditing(false);
      setCurrentHouse(null);
    } catch (error) {
      console.error("Error updating house:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/houses/${id}`);
      setHouses((prevHouses) => prevHouses.filter((house) => house._id !== id));
    } catch (error) {
      console.error("Error deleting house:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentHouse({ ...currentHouse, [name]: value });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="house-list">
      {isEditing && currentHouse ? (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <h3>Edit House</h3>
          <label>
            Type of House:
            <input
              type="text"
              name="typeOfHouse"
              value={currentHouse.typeOfHouse}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Location:
            <input
              type="text"
              name="location"
              value={currentHouse.location}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Area:
            <select
              name="area"
              value={currentHouse.area}
              onChange={handleInputChange}
              required
            >
                <option value="" disabled>Select area</option>
                <option value="Anjanapura">Anjanapura</option>
                <option value="Banashankari Temple Ward">Banashankari Temple Ward</option>
                <option value="Chikkalasandra">Chikkalasandra</option>
                <option value="Giri Nagar">Giri Nagar</option>
                <option value="Hosakerehalli">Hosakerehalli</option>
                <option value="JP Nagar">JP Nagar</option>
                <option value="Katriguppe">Katriguppe</option>
                <option value="Kumara Swamy Layout">Kumara Swamy Layout</option>
                <option value="Padmanabha Nagar">Padmanabha Nagar</option>
                <option value="Puttenahalli">Puttenahalli</option>
                <option value="Sarakki">Sarakki</option>
                <option value="Shakambari Nagar">Shakambari Nagar</option>
                <option value="Uttarahalli">Uttarahalli</option>
                <option value="Vidya Peeta Ward">Vidya Peeta Ward</option>
                <option value="Yelchenahalli">Yelchenahalli</option>
                <option value="Jaraganahalli">Jaraganahalli</option>
                <option value="Gottigere">Gottigere</option>
                <option value="Vasanthpura">Vasanthpura</option>
              </select>
              </label>
          {currentHouse.typeOfPayment === 'lease' ? (
            <label>
              Lease Amount:
              <input
                type="number"
                name="leaseAmount"
                value={currentHouse.leaseAmount}
                onChange={handleInputChange}
                required
              />
            </label>
          ) : (
            <>
              <label>
                Rent:
                <input
                  type="number"
                  name="rent"
                  value={currentHouse.rent}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label>
                Advance:
                <input
                  type="number"
                  name="advance"
                  value={currentHouse.advance}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </>
          )}
          <label>
            Owner Mobile:
            <input
              type="text"
              name="ownerMobile"
              value={currentHouse.ownerMobile}
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      ) : (
        <>
          {Array.isArray(houses) && houses.length > 0 ? (
            <ul>
              {houses.map((house) => (
                <li key={house._id} className="house-item">
                  <img 
                    src={house.imageUrl} 
                    alt={house.typeOfHouse} 
                    className="house-image" 
                  />
                  <div className="house-details">
                    <div className="house-info-top">
                      <h3>{house.typeOfHouse}</h3>
                      <p>{house.location}</p>
                      <p>Area: {house.area}</p>
                    </div>
                    <div className="house-info-bottom">
                      {house.typeOfPayment === 'lease' ? (
                        <p>Lease: ${house.leaseAmount}</p> 
                      ) : (
                        <>
                          <p>Rent: ${house.rent}</p>
                          <p>Advance: ${house.advance}</p>
                        </>
                      )}
                      <p>Owner Mobile: {house.ownerMobile}</p>
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
        </>
      )}
    </div>
  );
};

export default List;
