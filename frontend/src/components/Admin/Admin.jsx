import React, { useState, useEffect } from 'react';
import './Admin.css';
import { assets } from '../../assets/assets'; // Make sure assets path is correct
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const [houses, setHouses] = useState([]);
  const [editHouseData, setEditHouseData] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

  const navBacktoHome = () =>{
    navigate('');
  }

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
    setCurrentImageIndex(0);
  };

  const saveEdit = async () => {
    if (!editHouseData || !editHouseData._id) {
      toast.error('Invalid house data');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/houses/${editHouseData._id}`, {
        method: 'PUT',
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
        navigate('/admin');
        toast.success('Changes saved successfully!');
      } else {
        throw new Error('Failed to save changes');
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      console.log('Editing house with ID:', editHouseData._id);
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


  const nextImage = () => {
    if (editHouseData.images && editHouseData.images.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === editHouseData.images.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const prevImage = () => {
    if (editHouseData.images && editHouseData.images.length) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === 0 ? editHouseData.images.length - 1 : prevIndex - 1
      );
    }
  };

  const deleteImage = (index) => {
    if (editHouseData.images) {
      const newImages = editHouseData.images.filter((_, i) => i !== index);
      setEditHouseData((prevData) => ({ ...prevData, images: newImages }));
      toast.success('Image deleted successfully!');
      setCurrentImageIndex(0); // Reset index to avoid out-of-bounds
    }
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
          <option value="area">Area</option>
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
                  <img src={house.imageUrl[0]} alt="House" className="house-image" />
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
                        src={assets.delete}
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
              <td colSpan="11">No houses available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {editHouseData && (
        <div className="carousel-container">
          <h3>Edit House Details</h3>
          <form className="edit-form">
            <label>
              Type of House:
              <input
                type="text"
                name="typeOfHouse"
                value={editHouseData.typeOfHouse}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Type of Payment:
              <select
                name="typeOfPayment"
                value={editHouseData.typeOfPayment}
                onChange={handleInputChange}
                required
              >
                <option value="rent">Rent</option>
                <option value="lease">Lease</option>
              </select>
            </label>

            {editHouseData.typeOfPayment === 'rent' && (
              <>
                <label>
                  Rent:
                  <input
                    type="number"
                    name="rent"
                    value={editHouseData.rent || ''}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Advance:
                  <input
                    type="number"
                    name="advance"
                    value={editHouseData.advance || ''}
                    onChange={handleInputChange}
                    required
                  />
                </label>
              </>
            )}

            {editHouseData.typeOfPayment === 'lease' && (
              <label>
                Lease:
                <input
                  type="number"
                  name="lease"
                  value={editHouseData.lease || ''}
                  onChange={handleInputChange}
                  required
                />
              </label>
            )}

            <label>
              Owner Mobile:
              <input
                type="text"
                name="ownerMobile"
                value={editHouseData.ownerMobile}
                onChange={handleInputChange}
                required
              />
            </label>

            <label>
              Area:
              <select
                name="area"
                value={editHouseData.area}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled>Select Area</option>
                {[
                  'Nayandahalli', 'Hosakerehalli', 'Giri Nagar', 'Katriguppe', 'Vidya Peeta Ward',
                  'Jayanagar East', 'JP Nagar', 'Sarakki', 'Shakambari Narar', 'Banashankari Temple Ward',
                  'Kumara Swamy Layout', 'Padmanabha Nagar', 'Chikkala Sandra', 'Uttarahalli',
                  'Yelchenahalli', 'Jaraganahalli', 'Puttenahalli', 'Gottigere', 'Konankunte',
                  'Anjanapura', 'Vasanthpura'
                ].map((area) => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </label>
            

            <button type="button" onClick={saveEdit} className="save-button">Save Changes</button>
            <button type="button" onClick={() => setEditHouseData(null)} className="cancel-button">Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Admin;
