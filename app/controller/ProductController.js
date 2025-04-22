
const { categoryModel } = require('../model/category');
const { productModel, productValidationSchema } = require('../model/product');
const slugify = require('slugify');
const fs = require('fs').promises;
class ProductController {

    async productListPage(req, res) {
        try {
            const products = await productModel.find({ isDeleted: false }).populate('category');
            return res.render('admin/product-list', { data: products, message: req.flash('msg'),title:'Product List' });
        } catch (error) {
            console.log(error);
        }
    }

    async productAddPage(req, res) {
        try {
            const categories = await categoryModel.find({ isDeleted: false });
            res.render('admin/product-add', { message: req.flash('msg'), categories, title: 'Product Add' })
        } catch (error) {
            console.log(error);
        }
    }

    async productAdd(req, res) {
        try {

            const { error } = productValidationSchema.validate(req.body);

            if (error) {
                req.flash('msg', error.details[0].message);
                return res.redirect('/admin/products/add');
            }
            const { name, description, category } = req.body;

            const slug = slugify(name, { lower: true, strict: true });

            const newProduct = new productModel({
                name,
                description,
                category,
                productSlug: slug
            })


            if (req.file) {
                newProduct.image = req.file.path;
            }

            await newProduct.save();

            req.flash('msg', 'Product added successfully');
            return res.redirect('/admin/products/');

        } catch (error) {
            console.log(error);
        }
    }

    async productEditPage(req, res) {
        try {
            const categories = await categoryModel.find({ isDeleted: false });
            const product = await productModel.findById(req.params.id).populate('category');
            if (!product) {
                return res.redirect('/admin/products');
            }
            return res.render('admin/product-edit', { message:req.flash('msg'),product, categories, title: 'Product Edit' })
        } catch (error) {
            console.log(error);
        }
    }

    async ProductUpdate(req, res) {
        try {
            const id = req.params.id;
            const { error } = productValidationSchema.validate(req.body);

            if (error) {
                req.flash('msg', error.details[0].message);
                return res.redirect('/admin/products/edit/'+id);
            }

            const { name, description, category } = req.body;

            const product = await productModel.findById(id);
            if (!product) {
                return res.redirect('/admin/products/edit/' + id);
            }

            const slug = slugify(name, { lower: true, strict: true });
            const image = req.file ? req.file.path : product.image;


            const updateProduct = await productModel.findByIdAndUpdate(id, {
                name,
                description,
                category,
                productSlug: slug,
                image
            })

            if (req.file && product.image) {
                await fs.access(product.image);
                await fs.unlink(product.image);
            }
            if (!updateProduct) {
                return res.redirect('/admin/products/edit/' + id);
            }
            req.flash('msg', 'Product updated successfully');
            return res.redirect('/admin/products');

        } catch (error) {
            console.log(error);
        }
    }

    async productDelete(req, res) {
        try {
            const id = req.params.id;
            const product = await productModel.findById(id);
            if (!product) {
                return res.redirect('/admin/products');
            }

            const deleteProduct = await productModel.findByIdAndUpdate(id, {
                isDeleted: true
            })

            if (!deleteProduct) {
                return res.redirect('/admin/products');
            }

            if (product.image) {
                await fs.access(product.image);
                await fs.unlink(product.image);
            }

            req.flash('msg', 'Product deleted successfully');
            return res.redirect('/admin/products');
        } catch (error) {
            console.log(error);
        }

    }

}

module.exports = new ProductController();