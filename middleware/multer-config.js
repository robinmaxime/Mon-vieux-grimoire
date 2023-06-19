const multer = require('multer');


function removeExtension(filename) {
  return filename.substring(0, filename.lastIndexOf('.')) || filename;
}

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, removeExtension(name) + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');