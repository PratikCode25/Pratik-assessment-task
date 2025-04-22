const {categoryModel}=require('../model/category');
const {productModel}=require('../model/product');
class CustomerController{
    async homePage(req,res){
        try {
            

            const categories=await categoryModel.find({isDeleted:false});
            const products=await productModel.find({isDeleted:false}).populate('category');
            res.render('customer-portal',{categories,products,title:'Home'});
        } catch (error) {
            console.log(error);
        }
    }

    async viewProductPage(req,res){
        try {
            const {slug,id}=req.params;
            const product=await productModel.findOne({_id:id,isDeleted:false}).populate('category');
            res.render('product-view',{product,title:'View Product'});
        } catch (error) {
            console.log(error);
        }
    }

    async searchProductPage(req,res){
        try {
            try {
                const filterObj={}
                const{categoryId,keyword}=req.query;
                if(categoryId){
                    filterObj.category=req.query.categoryId
                }
                if(keyword){
                    filterObj.name= {$regex: keyword, $options: 'i'};
                }

                if(keyword){
                    filterObj.name= {$regex: keyword, $options: 'i'};
                }

    
                filterObj.isDeleted=false;
    
                const categories=await categoryModel.find({isDeleted:false});
                const products=await productModel.find(filterObj).populate('category');
                res.render('customer-portal',{categories,products,title:'Search Product'});
        } catch (error) {
            
        }
    }catch(error){
        console.log(error);
    }
}


}

module.exports=new CustomerController();