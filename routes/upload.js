const router = require('express').Router;
const cloudinary = require('cloudinary');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

// We will upload images on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_seret: process.env.CLOUD_API_SECRET
})

// Upload image
router.post('/upload', (req, res) => {
    try {
        console.log(req.files);
        res.json('Test')
    } catch (err) {
        res.status(500).json({msg: err.message})
    }
})

module.exports = router;