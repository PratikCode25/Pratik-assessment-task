const express=require('express');
const router=express.Router();
const CustomerController=require('../controller/CustomerController');

router.get('/',CustomerController.homePage);
router.get('/product/:slug/:id',CustomerController.viewProductPage);
router.get('/product/search',CustomerController.searchProductPage);

module.exports=router;