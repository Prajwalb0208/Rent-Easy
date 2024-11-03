// Houses.jsx
import React from 'react';
import PaymentPopUp from '../PaymentPopUp/PaymentPopUp';
import './Houses.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Houses = ({ houses }) => {
  const [isPaymentPopupOpen, setPaymentPopupOpen] = React.useState(false);

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
        {houses.map((house) => (
          <div key={house._id} className="house-card">
            <img src={house.imageUrl} alt="House" className="house-image" />
            <div className="house-info">
              <p><strong>Address:</strong> {house.location}</p>
              <p><strong>Type of House:</strong> {house.typeOfHouse}</p>
              <p><strong>Type of Payment:</strong> {house.typeOfPayment}</p>
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
