// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/'); // Folder penyimpanan
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // ambil ekstensi (.jpg/.png)
    const baseName = path.basename(file.originalname, ext)
      .replace(/\s+/g, "-") // ganti spasi dengan -
      .toLowerCase();

    cb(null, Date.now() + "-" + baseName + ext);
  }
});

// Filter file hanya gambar
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diperbolehkan'), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;