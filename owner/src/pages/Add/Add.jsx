import React, { useState } from 'react';
import './Add.css'; // Import your CSS styles
import { assets } from '../../assets/assets'; // Adjust the import path if needed

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
      setImagePreview(URL.createObjectURL(file)); // Set image preview
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update form data
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    setIsSubmitting(true);

    try {
      const file = e.target.image.files[0]; // Get the uploaded file
      if (!file) {
        throw new Error("No file selected for upload");
      }

      const uploadPreset = 'images_to_url';
      const cloudName = "dxsprjxhl";

      const formDataImg = new FormData();
      formDataImg.append('file', file);
      formDataImg.append('upload_preset', uploadPreset);

      // Upload the image to Cloudinary
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formDataImg,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Cloudinary upload error: ${errorData.message}`);
      }

      const data = await response.json(); // Get the response data
      const imageUrl = data.secure_url; // Get the secure URL of the uploaded image

      // Prepare data for submission to your API
      const submissionData = {
        ...formData,
        imageUrl, // Include the image URL
        rent: formData.typeOfPayment === 'rent' ? formData.rent : undefined,
        advance: formData.typeOfPayment === 'rent' ? formData.advance : undefined,
        lease: formData.typeOfPayment === 'lease' ? formData.lease : undefined,
      };

      // Submit data to your API
      const apiResponse = await fetch(`http://localhost:5000/api/houses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData), // Send the data as JSON
      });

      if (!apiResponse.ok) {
        const errorData = await apiResponse.json();
        throw new Error(`API submission error: ${errorData.message}`);
      }

      // Reset form data after successful submission
      setFormData({
        typeOfHouse: '',
        typeOfPayment: 'rent',
        location: '',
        rent: '',
        advance: '',
        lease: '',
        ownerMobile: '',
        imageUrl: '',
      });
      setImagePreview(null); // Clear the image preview

    } catch (error) {
      console.error("Error uploading image or submitting form:", error.message);
    } finally {
      setIsSubmitting(false); // Reset the submitting state
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
          <select
            name='typeOfHouse'
            onChange={handleInputChange}
            value={formData.typeOfHouse}
            required
          >
            <option value="" disabled>Select house type</option>
            <option value="Room">Room</option>
            <option value="1bhk">1BHK</option>
            <option value="2bhk">2BHK</option>
            <option value="2bhk+duplex">2BHK + Duplex</option>
            <option value="3bhk">3BHK</option>
            <option value="3bhk+duplex">3BHK + Duplex</option>
            <option value="4bhk">4BHK</option>
            <option value="Villa">Villa</option>
            <option value="Office space">Office Space</option>
          </select>
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

        <button className='submit' type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default Add;
