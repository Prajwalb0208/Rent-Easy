// cloudinary.js
import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: 'dibjzqrp6', 
    api_key: '477842255548552', 
    api_secret: 'LDff-G_jAE1ZzBqG3F5SwLLAnuk' 
});

/**
 * Upload an image to Cloudinary and return the result.
 * @param {string} imageUrl - The URL of the image to upload.
 * @returns {Promise<Object>} - The upload result from Cloudinary.
 */
export const uploadImage = async (imageUrl) => {
    try {
        const uploadResult = await cloudinary.uploader.upload(imageUrl, {
            public_id: 'shoes', // You can change the public_id as needed
        });
        return uploadResult;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

/**
 * Generate a URL for the uploaded image with optimized delivery.
 * @param {string} publicId - The public ID of the uploaded image.
 * @returns {string} - The optimized image URL.
 */
export const getOptimizedUrl = (publicId) => {
    return cloudinary.url(publicId, {
        fetch_format: 'auto',
        quality: 'auto',
    });
};

/**
 * Generate a transformed URL for the uploaded image.
 * @param {string} publicId - The public ID of the uploaded image.
 * @returns {string} - The transformed image URL.
 */
export const getTransformedUrl = (publicId) => {
    return cloudinary.url(publicId, {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
};
