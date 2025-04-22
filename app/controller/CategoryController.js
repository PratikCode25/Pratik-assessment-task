const {categoryModel,categoryValidationSchema}=require('../model/category');
const slugify=require('slugify');

class CategoryController{

    async categoryListPage(req,res){
       try {
        const categories=await categoryModel.find({isDeleted:false});
        res.render('admin/category-list',{data:categories,title:'category List',message:req.flash('msg'),title:'Category List'});
       } catch (error) {
        console.log(error);
       }
    }

    async categoryAddPage(req,res){
        try {
            res.render('admin/category-add',{message:req.flash('msg'),title:'Category Add'})
        } catch (error) {
            console.log(error);
        }
    }

    async categoryAdd(req,res){
        try {
            const {name}=req.body;
            // console.log(name);
            const {error}=categoryValidationSchema.validate(req.body);
        
            if(error){
                req.flash('msg', error.details[0].message);
                return res.redirect('/admin/categories/add');
            }

            const slug=slugify(name,{lower: true,strict:true});
            const newCategory=new categoryModel({
                name,
                categorySlug:slug
            })

            await newCategory.save();
            req.flash('msg', 'Category added successfully');
            return res.redirect('/admin/categories');

        } catch (error) {
            console.log(error);
        }
    }

    async categoryEditPage(req,res){
        try {
            
            const category=await categoryModel.findById(req.params.id);
            if(!category){
                return res.redirect('/admin/categories');
            }
            return res.render('admin/categeory-edit',{message:req.flash('msg'),category,title:'Category Edit'})
        } catch (error) {
            console.log(error);
        }
    }

    async categoryUpdate(req,res){
        try {
            const id=req.params.id;
            const {name}=req.body;

            const {error}=categoryValidationSchema.validate(req.body);
        
            if(error){
                req.flash('msg', error.details[0].message);
                return res.redirect('/admin/categories/edit/'+id);
            }

            const category=await categoryModel.findById(id);
            if(!category){
                return res.redirect('/admin/categories/edit/'+id);
            }
            
            const slug=slugify(name,{lower: true,strict:true});
            const updateCategory=await categoryModel.findByIdAndUpdate(id,{
                name,
                categorySlug:slug
            })

            if(!updateCategory){
                return res.redirect('/admin/categories/edit/'+id);
            }
            req.flash('msg', 'Category updated successfully');
            return res.redirect('/admin/categories');
            
        } catch (error) {
            console.log(error);
        }
    }

    async categoryDelete(req,res){
        try {
            const id=req.params.id;
            const category=await categoryModel.findById(id);
            if(!category){
                return res.redirect('/admin/categories');
            }

            const deleteCategory=await categoryModel.findByIdAndUpdate(id,{
               isDeleted:true
            })

            if(!deleteCategory){
                return res.redirect('/admin/categories');
            }

            req.flash('msg', 'Category deleted successfully');
            return res.redirect('/admin/categories');
        } catch (error) {
            console.log(error);
        }
    }


}

module.exports=new CategoryController();