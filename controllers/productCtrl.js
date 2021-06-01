const Products = require('../models/productModel');

// Filtering, sorting, pagination
class APIfeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    filtering() {
        const queryObj = {...this.queryString} // queryString = req.query
        console.log({before: queryObj}); // before deleting page

        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach(el => delete(queryObj[el]))
        console.log({after: queryObj}); // after deleting page

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
        console.log({queryObj, queryStr});

        this.query.find(JSON.parse(queryStr))

        return this;

    }

    sorting(){}

    paginating(){}
}

const productCtrl = {
    getProducts: async (req, res) => {
        try {
            const features = new APIfeatures(Products.find(), req.query).filtering();
            const products = await features.query;
            res.json(products)
            
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    createProduct: async (req, res) => {
        try {
            const {product_id, title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: 'No images uploaded'});

            const product = await Products.findOne({product_id});
            if(product)
                return res.status(400).json({msg: 'This product already exists.'});

            const newProduct = new Products({
                product_id, title: title.toLowerCase(), price, description, content, images, category
            })

            await newProduct.save()
            res.json({msg: "Created a product."})
        
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    deleteProduct: async (req, res) => {
        try {
            await Products.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted the product."})
            
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    updateProduct: async (req, res) => {
        try {
            const {title, price, description, content, images, category} = req.body;
            if(!images) return res.status(400).json({msg: 'No images uploaded'});

            await Products.findOneAndUpdate({_id: req.params.id},
                {title: title.toLowerCase(), price, description, content, images, category
            })

            res.json({msg: "Updated the product."})

        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },
}

module.exports = productCtrl;