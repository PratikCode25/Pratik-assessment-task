const express=require('express');
const router=express.Router();
const CategoryController=require('../controller/CategoryController');

router.get('/',CategoryController.categoryListPage);
router.get('/add',CategoryController.categoryAddPage);
router.post('/add',CategoryController.categoryAdd);
router.get('/edit/:id',CategoryController.categoryEditPage);
router.post('/update/:id',CategoryController.categoryUpdate);
router.post('/softDelete/:id',CategoryController.categoryDelete);

module.exports=router;