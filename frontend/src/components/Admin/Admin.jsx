import React, { useState, useEffect } from 'react';
import './Admin.css';
import { assets } from '../../assets/assets';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [houses, setHouses] = useState([]);
  const [editHouseData, setEditHouseData] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const navigate = useNavigate();

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

  const navigateToAdd = () => {
    navigate('add');
  };

  const approveHouse = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/houses/${id}/approve`, {
        method: 'PATCH',
      });
      if (response.ok) {
        setHouses((prevHouses) =>
          prevHouses.map((house) =>
            house._id === id ? { ...house, status: 'Approved' } : house
          )
        );
        toast.success('House approved successfully!');
      } else {
        throw new Error('Failed to approve house');
      }
    } catch (error) {
      console.error('Error approving house:', error);
      toast.error('Failed to approve house!');
    }
  };

  const rejectHouse = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/houses/${id}/reject`, {
        method: 'PATCH',
      });

      if (response.ok) {
        setHouses((prevHouses) =>
          prevHouses.map((house) =>
            house._id === id ? { ...house, status: 'Rejected' } : house
          )
        );
        toast.success('House rejected successfully!');
      } else {
        throw new Error('Failed to reject house');
      }
    } catch (error) {
      console.error('Error rejecting house:', error);
      toast.error('Failed to reject house!');
    }
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

  const saveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/houses/${editHouseData._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editHouseData),
      });

      if (response.ok) {
        setHouses((prevHouses) =>
          prevHouses.map((house) =>
            house._id === editHouseData._id ? { ...editHouseData, status: 'Pending' } : house
          )
        );
        setEditHouseData(null);
        navigate('/admin'); // Redirect after saving
        toast.success('Changes saved successfully!');
      } else {
        throw new Error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      toast.error('Failed to save changes!');
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedHouses = [...houses].sort((a, b) => {
    switch (sortOption) {
      case 'status':
        return a.status.localeCompare(b.status);
      case 'typeOfHouse':
        return a.typeOfHouse.localeCompare(b.typeOfHouse);
      case 'typeOfPayment':
        return a.typeOfPayment.localeCompare(b.typeOfPayment);
      case 'dateModified':
        return new Date(b.dateModified) - new Date(a.dateModified);
      case 'area':
        return a.area.localeCompare(b.area);
      default:
        return 0;
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditHouseData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <img
          src={assets.add} alt="Add New House" className="add-icon" onClick={navigateToAdd} />
      </div>
      <ToastContainer />
      <div className="sorting-container">
        <label>Sort by:</label>
        <select onChange={handleSortChange} value={sortOption}>
          <option value="">Select</option>
          <option value="status">Status</option>
          <option value="typeOfHouse">Type of House</option>
          <option value="typeOfPayment">Type of Payment</option>
          <option value="dateModified">Date Modified</option>
          <option value="area">Area</option> {/* Added sorting by area */}
        </select>
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Area</th>
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
                <td>{house.area}</td>
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
              <label>Area:</label>
              <select
                name='area'
                onChange={handleInputChange}
                value={editHouseData.area}
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
            </div>
            <div className="edit-field">
              <label>Location:</label>
              <input
                type="text"
                name="location"
                onChange={handleInputChange}
                value={editHouseData.location}
                required
              />
            </div>
            <div className="edit-field">
              <label>Type of House:</label>
              <input
                type="text"
                name="typeOfHouse"
                onChange={handleInputChange}
                value={editHouseData.typeOfHouse}
                required
              />
            </div>
            <div className="edit-field">
              <label>Type of Payment:</label>
              <input
                type="text"
                name="typeOfPayment"
                onChange={handleInputChange}
                value={editHouseData.typeOfPayment}
                required
              />
            </div>
            <div className="edit-field">
              <label>Rent:</label>
              <input
                type="number"
                name="rent"
                onChange={handleInputChange}
                value={editHouseData.rent}
                required
              />
            </div>
            <div className="edit-field">
              <label>Advance:</label>
              <input
                type="number"
                name="advance"
                onChange={handleInputChange}
                value={editHouseData.advance}
                required
              />
            </div>
            <div className="edit-field">
              <label>Lease:</label>
              <input
                type="number"
                name="lease"
                onChange={handleInputChange}
                value={editHouseData.lease}
                required
              />
            </div>
            <div className="edit-field">
              <label>Owner Mobile:</label>
              <input
                type="text"
                name="ownerMobile"
                onChange={handleInputChange}
                value={editHouseData.ownerMobile}
                required
              />
            </div>
          </div>
          <div className="edit-modal-actions">
            <button onClick={saveEdit}>Save Changes</button>
            <button onClick={() => setEditHouseData(null)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
