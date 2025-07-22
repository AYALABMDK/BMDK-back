const cloudinary = require('../utils/cloudinary');
console.log('galleryController loaded');
exports.getImages = async (req, res) => {
  try {
    const result = await cloudinary.search
      .expression('folder:gallery')
      .sort_by('created_at','desc')
      .max_results(30)
      .execute();

    res.json({
      success: true,
      images: result.resources.map(img => ({
        url: img.secure_url,
        public_id: img.public_id,
      })),
    });
  }catch (err) {
    console.error('Get images error:', err);
    res.status(500).json({ error: err.message || JSON.stringify(err) });
  }
};
exports.uploadImage = async (req, res) => {
      console.log('uploadImage called');

try {
    
    console.log('req.file:', req.file);
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // req.file כבר מכיל את המידע אחרי העלאה ל-Cloudinary
    res.json({
      success: true,
      url: file.path,       // כתובת התמונה בענן
      public_id: file.filename, // מזהה ציבורי
    });
  } catch (err) {
  console.error('Upload error:', err);
  res.status(500).json({ error: err.message || err.toString() });
}

  
};

exports.deleteImage = async (req, res) => {
  try {
    const { publicId } = req.params;
    await cloudinary.uploader.destroy(publicId);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
