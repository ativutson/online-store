const router = require('express').Router();
const cloudinary = require('cloudinary').v2;
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const fs = require('fs');
let streamifier = require('streamifier');


// We will upload images on cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API,
    api_seret: process.env.CLOUD_API_SECRET
})

// Only admin can upload images
router.post('/upload', auth, authAdmin, (req, res) => {
    try {
        console.log(req.files);
        if(!req.files || Object.keys(req.files).length === 0)
            return res.status(400).send({msg: 'No files were uploaded.'});

        const file = req.files.file;
        if(file.size > 1024 * 1024)
            // removeTmp(file.tempFilePath)
            return res.status(400).json({msg: 'The size is too large.'});
        
        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png')
            // removeTmp(file.tempFilePath)
            return res.status(400).json({msg: 'The file format is incorrect.'});

        cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
            if(err) throw err;
            // removeTmp(file.tempFilePath)
            res.json({result})
    })
    } catch(err) {
        return res.status(500).json({msg: err.message});

    }
})

      

// Delete images
router.post('/destroy', auth, authAdmin, (req, res) => {
    try {
        const {public_id} = req.body;
        if(!public_id) return res.status(400).json({msg: 'No images selected'})
        
        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if(err) throw err;
        
            res.json({msg: 'Deleted image.'})
        })
    } catch (error) {
        return res.status(500).json({msg: err.message});
    }
})


// const removeTmp = (path) => {
//     fs.unlink(path, err => {
//         if(err) throw err;
//     })
// }

module.exports = router;