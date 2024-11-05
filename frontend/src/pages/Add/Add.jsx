import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';

const DEFAULT_IMAGE_URL = 'https://i.ibb.co/c1fsDnX/home-placeholder.jpg';

const Add = () => {
  const [imagePreviews, setImagePreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    typeOfHouse: '',
    typeOfPayment: 'rent',
    area: '',
    location: '',
    rent: '',
    advance: '',
    lease: '',
    ownerMobile: '',
    imageUrl: [], // For storing multiple image URLs
  });

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImagePreviews = files.map(file => URL.createObjectURL(file));

    // Update state to include new images
    setImagePreviews(prev => [...prev, ...newImagePreviews]);
    
    // Update formData.imageUrl to include the new file objects
    setFormData(prev => ({
      ...prev,
      imageUrl: [...prev.imageUrl, ...files] // Store the actual file objects for upload
    }));
  };

  const handleImageDelete = (index) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    const newFormDataImages = formData.imageUrl.filter((_, i) => i !== index);
    
    setImagePreviews(newPreviews);
    setFormData(prev => ({
      ...prev,
      imageUrl: newFormDataImages // Update the imageUrl in formData as well
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const uploadPromises = formData.imageUrl.map(file => {
        const formDataImg = new FormData();
        formDataImg.append('file', file);
        formDataImg.append('upload_preset', 'images_to_url');

        // Upload the image to Cloudinary
        return fetch(`https://api.cloudinary.com/v1_1/dxsprjxhl/image/upload`, {
          method: 'POST',
          body: formDataImg,
        }).then(response => {
          if (!response.ok) {
            throw new Error('Failed to upload image');
          }
          return response.json();
        }).then(data => data.secure_url);
      });

      const imageUrls = await Promise.all(uploadPromises); // Wait for all uploads to complete

      const submissionData = {
        ...formData,
        imageUrl: imageUrls, // Store the array of uploaded image URLs
        rent: formData.typeOfPayment === 'rent' ? formData.rent : undefined,
        advance: formData.typeOfPayment === 'rent' ? formData.advance : undefined,
        lease: formData.typeOfPayment === 'lease' ? formData.lease : undefined,
      };

      const apiResponse = await fetch(`http://localhost:5000/api/houses`, {
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

      // Reset the form data and image previews after submission
      setFormData({
        typeOfHouse: '',
        typeOfPayment: 'rent',
        area: '',
        location: '',
        rent: '',
        advance: '',
        lease: '',
        ownerMobile: '',
        imageUrl: [],
      });
      setImagePreviews([]);

    } catch (error) {
      console.error("Error uploading images or submitting form:", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={handleSubmit}>
        <div className="add-img-upload flex-col">
          <p>Upload Images</p>
          <label htmlFor="image" className='add-img-label'>
            <img src={assets.addimage || DEFAULT_IMAGE_URL} alt="Upload" className='add-img' />
          </label>
          <input type="file" id="image" hidden onChange={handleImageUpload} multiple />
        </div>

        <div className="image-preview-container">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="image-preview">
              <img src={preview} alt={`Preview ${index}`} className='image-preview-img' />
              <span className="delete-image" onClick={() => handleImageDelete(index)}>✖</span>
            </div>
          ))}
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

        <div className="add-area flex-col">
          <p>Area</p>
          <select
            name='area'
            onChange={handleInputChange}
            value={formData.area}
            required
          >
            <option value="" disabled>Select area</option>
            <option value="Anjanapura">Anjanapura</option>
            <option value="Banashankari Temple Ward">Banashankari Temple Ward</option>
            <option value="Chikkala Sandra">Chikkala Sandra</option>
            <option value="Giri Nagar">Giri Nagar</option>
            <option value="Gottigere">Gottigere</option>
            <option value="Hosakerehalli">Hosakerehalli</option>
            <option value="Jaraganahalli">Jaraganahalli</option>
            <option value="JP Nagar">JP Nagar</option>
            <option value="Jayanagar East">Jayanagar East</option>
            <option value="Katriguppe">Katriguppe</option>
            <option value="Konankunte">Konankunte</option>
            <option value="Kumara Swamy Layout">Kumara Swamy Layout</option>
            <option value="Nayandahalli">Nayandahalli</option>
            <option value="Padmanabha Nagar">Padmanabha Nagar</option>
            <option value="Puttenahalli">Puttenahalli</option>
            <option value="Sarakki">Sarakki</option>
            <option value="Shakambari Narar">Shakambari Narar</option>
            <option value="Uttarahalli">Uttarahalli</option>
            <option value="Vasanthpura">Vasanthpura</option>
            <option value="Yelchenahalli">Yelchenahalli</option>
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
          <p>Owner Mobile Number</p>
          <input
            type="text"
            name='ownerMobile'
            placeholder='Enter owner mobile'
            onChange={handleInputChange}
            value={formData.ownerMobile}
            required
          />
        </div>

        <button type="submit" className='submit-button' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add House'}
        </button>
      </form>
    </div>
  );
};

export default Add;
