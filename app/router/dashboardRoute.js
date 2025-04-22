const express=require('express');
const router=express.Router();
const DashboardController=require('../controller/DsahboardController');

router.get('/',DashboardController.dashboard);

module.exports=router;