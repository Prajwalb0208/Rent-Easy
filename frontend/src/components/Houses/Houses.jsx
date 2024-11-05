import React, { useState } from 'react';
import PaymentPopUp from '../PaymentPopUp/PaymentPopUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Houses.css';

const Houses = ({ houses }) => {
  const [isPaymentPopupOpen, setPaymentPopupOpen] = useState(false);
  const [isPaymentCompleted, setIsPaymentCompleted] = useState(false);

  const handlePaymentSuccess = () => {
    toast.success("Details sent to your email and phone!");
    setIsPaymentCompleted(true);
    setPaymentPopupOpen(false);
  };

  const openPaymentPopup = () => {
    setPaymentPopupOpen(true);
  };

  const closePaymentPopup = () => {
    setPaymentPopupOpen(false);
  };

  const approvedHouses = houses.filter((house) => house.status === 'Approved');

  // Carousel settings
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="houses-container">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="houses-grid">
        {approvedHouses.length > 0 ? (
          approvedHouses.map((house) => (
            <div key={house._id} className="house-card">
              <div className="house-image-carousel">
                <Slider {...carouselSettings}>
                  {(house.imageUrl || []).map((imageUrl, index) => {
                    // Log the image URL to the console for debugging
                    console.log(`Image URL ${index + 1}:`, imageUrl);
                    return (
                      <div key={index} className="carousel-image-wrapper">
                        <img
                          src={imageUrl}
                          alt={`House ${index + 1}`}
                          className="carousel-image"
                        />
                      </div>
                    );
                  })}
                </Slider>
              </div>

              <div className="house-info">
                <p><strong>Area:</strong> {house.area}</p>
                <p><strong>Location:</strong> {house.location}</p>
                <p><strong>Type of House:</strong> {house.typeOfHouse}</p>
                <p><strong>Type of Payment:</strong> {house.typeOfPayment}</p>

                {isPaymentCompleted ? (
                  <>
                    <p><strong>Owner Mobile:</strong> {house.ownerMobile}</p>
                    {house.typeOfPayment === 'rent' ? (
                      <>
                        <p><strong>Rent:</strong> {house.rent || "N/A"}</p>
                        <p><strong>Advance:</strong> {house.advance || "N/A"}</p>
                      </>
                    ) : (
                      <p><strong>Lease:</strong> {house.lease || "N/A"}</p>
                    )}
                  </>
                ) : (
                  <button className="contact-owner-btn" onClick={openPaymentPopup}>
                    Contact Owner
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No approved houses available.</p>
        )}
      </div>

      {isPaymentPopupOpen && (
        <PaymentPopUp onClose={closePaymentPopup} onPaymentSuccess={handlePaymentSuccess} />
      )}
    </div>
  );
};

export default Houses;
