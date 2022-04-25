const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/models/');
    },
    filename: function (req, file, cb) {
        const suffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, suffix + file.originalname);
    }
});

function checkFileType(file, cb) {
    const filetypes = /jpg|JPG|png|PNG/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

const upload = multer({
    storage: storage,
    fileFilter: function (_req, file, cb) {
        checkFileType(file, cb);
    }
}).single('model');

module.exports = {upload};