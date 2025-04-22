const express=require('express');
const router=express.Router();
const ProductController=require('../controller/ProductController');
const productImageUpload=require('../helper/productImageUpload');

router.get('/',ProductController.productListPage);
router.get('/add',ProductController.productAddPage);
router.post('/add',productImageUpload.single('image'),ProductController.productAdd);
router.get('/edit/:id',ProductController.productEditPage);
router.post('/update/:id',productImageUpload.single('image'),ProductController.ProductUpdate);
router.post('/softDelete/:id',ProductController.productDelete);

module.exports=router;