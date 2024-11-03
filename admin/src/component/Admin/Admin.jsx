import React, { useState, useEffect } from 'react';
import './Admin.css'; // Ensure this CSS file is created with appropriate styles
import { assets } from '../../../assests/assests'; // Corrected assets import path

const Admin = () => {
  const [houses, setHouses] = useState([]);
  const [editHouseData, setEditHouseData] = useState(null);
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/houses');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setHouses(data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      }
    };

    fetchHouses();
  }, []);

  const approveHouse = (id) => {
    setHouses((prevHouses) =>
      prevHouses.map((house) =>
        house._id === id ? { ...house, status: 'Approved' } : house
      )
    );
  };

  const rejectHouse = (id) => {
    setHouses((prevHouses) =>
      prevHouses.map((house) =>
        house._id === id ? { ...house, status: 'Rejected' } : house
      )
    );
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/houses/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setHouses(houses.filter(house => house._id !== id));
      } else {
        throw new Error('Error deleting house');
      }
    } catch (error) {
      console.error('Error deleting house:', error);
    }
  };

  const handleEdit = (house) => {
    setEditHouseData(house);
  };

  const saveEdit = () => {
    setHouses((prevHouses) =>
      prevHouses.map((house) =>
        house._id === editHouseData._id ? { ...editHouseData, status: 'Pending' } : house
      )
    );
    setEditHouseData(null);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedHouses = [...houses].sort((a, b) => {
    if (sortOption === 'status') {
      return a.status.localeCompare(b.status);
    } else if (sortOption === 'typeOfHouse') {
      return a.typeOfHouse.localeCompare(b.typeOfHouse);
    } else if (sortOption === 'typeOfPayment') {
      return a.typeOfPayment.localeCompare(b.typeOfPayment);
    } else if (sortOption === 'dateModified') {
      return new Date(b.dateModified) - new Date(a.dateModified);
    }
    return 0;
  });

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>

      {/* Sorting Dropdown */}
      <div className="sorting-container">
        <label>Sort by:</label>
        <select onChange={handleSortChange} value={sortOption}>
          <option value="">Select</option>
          <option value="status">Status</option>
          <option value="typeOfHouse">Type of House</option>
          <option value="typeOfPayment">Type of Payment</option>
          <option value="dateModified">Date Modified</option>
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Location</th>
            <th>Type of House</th>
            <th>Type of Payment</th>
            <th>Rent</th>
            <th>Advance</th>
            <th>Lease</th>
            <th>Owner Mobile</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(sortedHouses) && sortedHouses.length > 0 ? (
            sortedHouses.map((house) => (
              <tr key={house._id}>
                <td>
                  <img src={house.imageUrl} alt="House" className="house-image" />
                </td>
                <td>{house.location}</td>
                <td>{house.typeOfHouse}</td>
                <td>{house.typeOfPayment}</td>
                <td>{house.rent ? `$${house.rent}` : '-'}</td>
                <td>{house.advance ? `$${house.advance}` : '-'}</td>
                <td>{house.lease ? `$${house.lease}` : '-'}</td>
                <td>{house.ownerMobile}</td>
                <td className={`status-${house.status.toLowerCase()}`}>{house.status}</td>
                <td>
                  {house.status === 'Pending' && (
                    <>
                      <img
                        src={assets.approve}
                        alt="Approve"
                        className="action-icon"
                        onClick={() => approveHouse(house._id)}
                      />
                      <img
                        src={assets.reject}
                        alt="Reject"
                        className="action-icon"
                        onClick={() => rejectHouse(house._id)}
                      />
                      <img
                        src={assets.edit}
                        alt="Edit"
                        className="action-icon"
                        onClick={() => handleEdit(house)}
                      />
                    </>
                  )}
                  {house.status === 'Approved' && (
                    <img
                      src={assets.edit}
                      alt="Edit"
                      className="action-icon"
                      onClick={() => handleEdit(house)}
                    />
                  )}
                  {house.status === 'Rejected' && (
                    <>
                      <img
                        src={assets.edit}
                        alt="Edit"
                        className="action-icon"
                        onClick={() => handleEdit(house)}
                      />
                      <img
                        src={assets.del}
                        alt="Delete"
                        className="action-icon"
                        onClick={() => handleDelete(house._id)}
                      />
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No houses found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {editHouseData && (
        <div className="edit-modal">
          <h3>Edit House Details</h3>
          <div className="edit-fields">
            <div className="edit-field">
              <label>Location:</label>
              <input
                type="text"
                value={editHouseData.location}
                onChange={(e) =>
                  setEditHouseData({ ...editHouseData, location: e.target.value })
                }
              />
            </div>
            <div className="edit-field">
              <label>Type of House:</label>
              <input
                type="text"
                value={editHouseData.typeOfHouse}
                onChange={(e) =>
                  setEditHouseData({ ...editHouseData, typeOfHouse: e.target.value })
                }
              />
            </div>
          </div>
          <div className="edit-fields">
            <div className="edit-field">
              <label>Type of Payment:</label>
              <input
                type="text"
                value={editHouseData.typeOfPayment}
                onChange={(e) =>
                  setEditHouseData({ ...editHouseData, typeOfPayment: e.target.value })
                }
              />
            </div>
            <div className="edit-field">
              <label>Rent:</label>
              <input
                type="number"
                value={editHouseData.rent || ''}
                onChange={(e) =>
                  setEditHouseData({ ...editHouseData, rent: e.target.value ? Number(e.target.value) : null })
                }
              />
            </div>
          </div>
          <div className="edit-fields">
            <div className="edit-field">
              <label>Advance:</label>
              <input
                type="number"
                value={editHouseData.advance || ''}
                onChange={(e) =>
                  setEditHouseData({ ...editHouseData, advance: e.target.value ? Number(e.target.value) : null })
                }
              />
            </div>
            <div className="edit-field">
              <label>Lease:</label>
              <input
                type="number"
                value={editHouseData.lease || ''}
                onChange={(e) =>
                  setEditHouseData({ ...editHouseData, lease: e.target.value ? Number(e.target.value) : null })
                }
              />
            </div>
          </div>
          <div className="edit-fields">
            <div className="edit-field">
              <label>Owner Mobile:</label>
              <input
                type="text"
                value={editHouseData.ownerMobile}
                onChange={(e) =>
                  setEditHouseData({ ...editHouseData, ownerMobile: e.target.value })
                }
              />
            </div>
          </div>
          <button onClick={saveEdit}>Save Changes</button>
          <button onClick={() => setEditHouseData(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Admin;
