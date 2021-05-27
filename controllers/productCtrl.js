const Products = require('../models/productModel');

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const products = await Products.find();
            res.json(products)
            
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    createProduct: async (req, res) => {
        try {
            const {products_id, title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: 'No images uploaded'});

            const product = await Products.findOne({products_id});
            if(product)
                return res.status(400).json({msg: 'This product already exists.'});

            const newProduct = new Products({
                products_id, title: title.toLowerCase(), price, description, content, images, category

            })


            
        } catch (err) {
            return res.status(500).json({msg: err.message});

            
        }
    },

    deleteProduct: async (req, res) => {
        try {
            
        } catch (err) {
            return res.status(500).json({msg: err.message});

            
        }
    },

    updateProduct: async (req, res) => {
        try {
            
        } catch (err) {
            return res.status(500).json({msg: err.message});

            
        }
    },


}

module.exports = productCtrl;