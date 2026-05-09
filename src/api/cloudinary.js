/**
 * Uploads a file to Cloudinary using the unsigned upload preset.
 * @param {File} file - The file object to upload.
 * @returns {Promise<string>} The public URL of the uploaded image.
 */
export const uploadToCloudinary = async (file) => {
  const url = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
  const preset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  if (!url || !preset) {
    throw new Error('Cloudinary configuration is missing in .env');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error?.message || 'Failed to upload image to Cloudinary');
  }

  const data = await response.json();
  return data.secure_url;
};
