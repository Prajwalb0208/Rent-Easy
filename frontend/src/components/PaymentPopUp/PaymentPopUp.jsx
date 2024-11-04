// PaymentPopUp.jsx
import React from 'react';
import './PaymentPopUp.css';

const PaymentPopUp = ({ onClose, onPaymentSuccess }) => {
  const handlePayment = () => {
    setTimeout(() => {
      onPaymentSuccess();
      onClose();
    }, 2000);
  };

  return (
    <div className="payment-popup">
      <div className="payment-content">
        <h3>Payment for Contact Details</h3>
        <p>Complete the payment to access the owner’s contact details.</p>
        <button className="payment-btn" onClick={handlePayment}>Pay Now</button>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default PaymentPopUp;
