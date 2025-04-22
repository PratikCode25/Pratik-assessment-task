const {categoryModel}=require('../model/category');
const {productModel}=require('../model/product');

class DashboardController{

    async dashboard(req,res){
        const categoryCount=await categoryModel.countDocuments({isDeleted:false});
        const productCount=await productModel.countDocuments({isDeleted:false});
        res.render('admin/dashboard',{categoryCount,productCount,title:'Admin Dashboard'});
    }


}

module.exports=new DashboardController();