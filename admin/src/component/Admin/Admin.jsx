import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [houses, setHouses] = useState([]);
  const [editHouseData, setEditHouseData] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      const mockData = [
        {
          id: 1,
          address: '123 Main St, Springfield',
          facing: 'East',
          size: '1200 sq ft',
          status: 'Pending',
        },
        {
          id: 2,
          address: '456 Elm St, Springfield',
          facing: 'West',
          size: '1500 sq ft',
          status: 'Pending',
        },
        // Add more mock data as needed
      ];
      setHouses(mockData);
    };
    fetchHouses();
  }, []);

  const approveHouse = (id) => {
    setHouses((prevHouses) =>
      prevHouses.map((house) =>
        house.id === id ? { ...house, status: 'Approved' } : house
      )
    );
  };

  const rejectHouse = (id) => {
    setHouses((prevHouses) =>
      prevHouses.map((house) =>
        house.id === id ? { ...house, status: 'Rejected' } : house
      )
    );
  };

  const handleEdit = (house) => {
    setEditHouseData(house);
  };

  const saveEdit = () => {
    setHouses((prevHouses) =>
      prevHouses.map((house) =>
        house.id === editHouseData.id ? editHouseData : house
      )
    );
    setEditHouseData(null);
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Address</th>
            <th>Facing</th>
            <th>Size</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((house) => (
            <tr key={house.id}>
              <td>{house.address}</td>
              <td>{house.facing}</td>
              <td>{house.size}</td>
              <td>{house.status}</td>
              <td>
                {house.status === 'Pending' && (
                  <>
                    <button onClick={() => approveHouse(house.id)}>Approve</button>
                    <button onClick={() => rejectHouse(house.id)}>Reject</button>
                  </>
                )}
                <button onClick={() => handleEdit(house)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editHouseData && (
        <div className="edit-modal">
          <h3>Edit House Details</h3>
          <label>Address:</label>
          <input
            type="text"
            value={editHouseData.address}
            onChange={(e) =>
              setEditHouseData({ ...editHouseData, address: e.target.value })
            }
          />
          <label>Facing:</label>
          <input
            type="text"
            value={editHouseData.facing}
            onChange={(e) =>
              setEditHouseData({ ...editHouseData, facing: e.target.value })
            }
          />
          <label>Size:</label>
          <input
            type="text"
            value={editHouseData.size}
            onChange={(e) =>
              setEditHouseData({ ...editHouseData, size: e.target.value })
            }
          />
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setEditHouseData(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Admin;
