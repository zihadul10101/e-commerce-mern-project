// const multer  = require('multer');
// const {  ALLOWED_FILE_TYPE, MAX_FILE_SIZE } = require('../config');

// const storage = multer.memoryStorage();
// const fileFilter =(req, file, cb) => {
//   // Check if the file is an image
//   if (!file.mimetype.startsWith("image/")) {
//     return cb(new Error("Only image files are allowed."), false);
//   }
//   // Check if the file size exceeds the maximum limit
//   if (file.size > MAX_FILE_SIZE) {
//     return cb(new Error("File size exceeds the maximum limit."), false);
//   }
//   // Check if the file type is allowed
//   if (!ALLOWED_FILE_TYPE.includes(file.mimetype)) {
//     return cb(new Error("File type is not allowed."), false);
//   }
//   // If all checks pass, accept the file
//   cb(null, true);
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
// });


//   module.exports={upload}

const multer  = require('multer')
const path  = require('path')
const createError = require('http-errors');
const { UPLOAD_USER_IMG_DIRECTORY, ALLOWED_FILE_TYPE, MAX_FILE_SIZE, UPLOAD_PRODUCT_IMG_DIRECTORY } = require('../config');
 


const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_USER_IMG_DIRECTORY)
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+"-"+file.originalname);
    },
  });
const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, UPLOAD_PRODUCT_IMG_DIRECTORY)
    },
    filename: function (req, file, cb) {
      cb(null,Date.now()+"-"+file.originalname);
    },
  });
  const fileFilter =(req,file,cb)=>{
    if(!ALLOWED_FILE_TYPE.includes(file.mimetype)){
        return cb(new Error('File type not allowed'),false);
    }
    cb(null,true);
  };
  const uploadUserImage = multer({ 
    storage: userStorage,
    limits:{fileSize:MAX_FILE_SIZE},
    fileFilter,
});
  const uploadProductImage = multer({ 
    storage: productStorage,
    limits:{fileSize:MAX_FILE_SIZE},
    fileFilter,
});

  module.exports={uploadUserImage,uploadProductImage}
