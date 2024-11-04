import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';

const DEFAULT_IMAGE_URL = 'https://i.ibb.co/c1fsDnX/home-placeholder.jpg';

const Add = () => {
  const [imagePreview, setImagePreview] = useState(null);
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
    imageUrl: DEFAULT_IMAGE_URL,
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
      let imageUrl = formData.imageUrl;

      if (file) {
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

        const data = await response.json();
        imageUrl = data.secure_url;
      }

      const submissionData = {
        ...formData,
        imageUrl,
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

      setFormData({
        typeOfHouse: '',
        typeOfPayment: 'rent',
        location: '',
        rent: '',
        advance: '',
        lease: '',
        ownerMobile: '',
        imageUrl: DEFAULT_IMAGE_URL, // Reset to the placeholder image
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
            <img src={imagePreview || assets.addimage || DEFAULT_IMAGE_URL} alt="Upload" className='add-img' />
          </label>
          <input type="file" id="image" hidden onChange={handleImageUpload} />
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
