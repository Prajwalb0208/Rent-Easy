import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';

const Add = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    typeOfHouse: '',
    typeOfPayment: 'rent',
    location: '',
    rent: '',
    advance: '',
    lease: '',
    ownerMobile: '',
    imageUrl: '',
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const file = e.target.image.files[0];
      if (!file) {
        throw new Error("No file selected for upload");
      }

      const uploadPreset = 'images';
      const cloudName = "dibjzqrp6";

      const formDataImg = new FormData();
      formDataImg.append('file', file);
      formDataImg.append('upload_preset', uploadPreset);

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formDataImg,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Cloudinary upload error: ${errorData.message}`);
      }

      const data = await response.json();
      const imageUrl = data.secure_url; // Get the image URL

      // Update formData with the image URL
      const submissionData = {
        ...formData,
        imageUrl, // Add the image URL to the submission data
        rent: formData.typeOfPayment === 'rent' ? formData.rent : undefined,
        advance: formData.typeOfPayment === 'rent' ? formData.advance : undefined,
        lease: formData.typeOfPayment === 'lease' ? formData.lease : undefined,
      };

      const apiResponse = await fetch('/api/houses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(`API submission error: ${errorData.message}`);
      }

      // Reset form data
      setFormData({
        typeOfHouse: '',
        typeOfPayment: 'rent',
        location: '',
        rent: '',
        advance: '',
        lease: '',
        ownerMobile: '',
        imageUrl: '', // Reset the image URL
      });
      setImagePreview(null);

    } catch (error) {
      console.error("Error uploading image or submitting form:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={imagePreview || assets.addimage} alt="Upload" className='add-img' />
          </label>
          <input type="file" id="image" hidden onChange={handleImageUpload} required />
        </div>

        <div className="add-house-type flex-col">
          <p>Type of House</p>
          <input
            type="text"
            name='typeOfHouse'
            placeholder='E.g., 2BHK, 3BHK'
            onChange={handleInputChange}
            value={formData.typeOfHouse}
            required
          />
        </div>

        <div className="add-payment-type flex-col">
          <p>Type of Payment</p>
          <select name="typeOfPayment" onChange={handleInputChange} value={formData.typeOfPayment}>
            <option value="rent">Rent</option>
            <option value="lease">Lease</option>
          </select>
        </div>

        <div className="add-location flex-col">
          <p>Location</p>
          <input
            type="text"
            name='location'
            placeholder='Enter location'
            onChange={handleInputChange}
            value={formData.location}
            required
          />
        </div>

        {/* Conditional rendering based on payment type */}
        {formData.typeOfPayment === 'rent' && (
          <>
            <div className="add-rent flex-col">
              <p>Rent Amount</p>
              <input
                type="number"
                name='rent'
                placeholder='Enter rent amount'
                onChange={handleInputChange}
                value={formData.rent}
                required
              />
            </div>
            <div className="add-advance flex-col">
              <p>Advance Amount</p>
              <input
                type="number"
                name='advance'
                placeholder='Enter advance amount'
                onChange={handleInputChange}
                value={formData.advance}
                required
              />
            </div>
          </>
        )}

        {formData.typeOfPayment === 'lease' && (
          <div className="add-lease flex-col">
            <p>Lease Amount</p>
            <input
              type="number"
              name='lease'
              placeholder='Enter lease amount'
              onChange={handleInputChange}
              value={formData.lease}
              required
            />
          </div>
        )}

        <div className="add-owner-mobile flex-col">
          <p>Owner Mobile</p>
          <input
            type="text"
            name='ownerMobile'
            placeholder='Enter owner mobile number'
            onChange={handleInputChange}
            value={formData.ownerMobile}
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Add;
