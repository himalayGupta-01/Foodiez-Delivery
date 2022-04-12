const Product = require('../../models/product');
const Category = require('../../models/category');
const slugify = require('slugify')

exports.createProduct = (req, res) => {
    // res.status(200).json({file:req.files,body:req.body});

    const { name, price, description, category, createdBy } = req.body;

    let productPictures = [];

    if (req.files.length > 0) {
        productPictures = req.files.map(file => {
            return { img: file.filename }
        })
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        createdBy: req.user._id
    });

    product.save((error, product) => {
        if (error) return res.status(400).json({ error })
        if (product) {
            return res.status(201).json({ product })
        }
    })

}

exports.getProducts = (req, res) => {
    Product.find({}).exec((error, products) => {
        if (error) return res.status(400).json({ error })

        if (products) {
            return res.status(200).json({ products })
        }
    });
}

exports.updateProduct = async (req, res) => {
    const { name, price, description, productPictures, category, updatedBy } = req.body.form;
    const product={
        name: name,
        slug: slugify(name),
        price,
        description,
        productPictures,
        category,
        updatedBy
    };
    console.log(product);
    const updatedProduct = await Product.findOneAndUpdate({ _id: req.params.id }, product, { new: true });
    return res.status(201).json(updatedProduct);
    // return res.status(201).json("Done");

}

exports.deleteProduct = async (req, res) => {
    const result = await Product.findByIdAndDelete(req.params.id).exec((error, res) => {
        if (error) return res.status(400).json(error)
        // return res.status(200).json(res);
    });
}

// exports.getProductsWithCategories = (req, res) => {
//     let dataSet = []
//     let finalDataSet = []
//     Category.find({}).exec((error, categories) => {
//         if (error) return res.status(400).json({ error })
//         if (categories) {
//             for (let cat of categories) {
//                 Product.find({ category: cat._id }).exec((error, products) => {
//                     if (error) return res.status(400).json({ error })
//                     if (products) {
//                         dataSet.push({
//                             ...cat,
//                             products: products
//                         })
//                     }
//                     finalDataSet.push({
//                         ...dataSet
//                     })
//                     console.log("DATASET IS GIVEN BY 88888888888888888888888888888888888888888888888888888888", dataSet)
//                 })
//             }
//             return res.status(200).json({ dataSet: finalDataSet })
//         }

//     })
// }
