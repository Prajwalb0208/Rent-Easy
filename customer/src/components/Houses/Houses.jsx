import React, { useState } from 'react';
import PaymentPopUp from '../PaymentPopUp/PaymentPopUp';
import './Houses.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const housesData = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/150',
    address: '123 Main St, Springfield',
    facing: 'East',
    size: '1200 sq ft',
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/150',
    address: '456 Elm St, Springfield',
    facing: 'West',
    size: '1500 sq ft',
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/150',
    address: '789 Oak St, Springfield',
    facing: 'North',
    size: '900 sq ft',
  },
  {
    id: 4,
    imageUrl: 'https://via.placeholder.com/150',
    address: '101 Maple St, Springfield',
    facing: 'South',
    size: '1100 sq ft',
  },
];

const Houses = () => {
  const [isPaymentPopupOpen, setPaymentPopupOpen] = useState(false);

  const handlePaymentSuccess = () => {
    toast.success("Details sent to your email and phone!");
  };

  const openPaymentPopup = () => {
    setPaymentPopupOpen(true);
  };

  const closePaymentPopup = () => {
    setPaymentPopupOpen(false);
  };
  return (
      <div className="houses-container">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="houses-grid">
          {housesData.map((house) => (
            <div key={house.id} className="house-card">
              <img src={house.imageUrl} alt="House" className="house-image" />
              <div className="house-info">
                <p><strong>Address:</strong> {house.address}</p>
                <p><strong>Facing:</strong> {house.facing}</p>
                <p><strong>Size:</strong> {house.size}</p>
                <button className="contact-owner-btn" onClick={openPaymentPopup}>Contact Owner</button>
              </div>
            </div>
          ))}
        </div>
        {isPaymentPopupOpen && (
          <PaymentPopUp onClose={closePaymentPopup} onPaymentSuccess={handlePaymentSuccess} />
        )}
      </div>
    );
  };

export default Houses;
