const mongoose=require('mongoose');
const joi=require('joi');

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    categorySlug:{
        type:String,
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const categoryModel=mongoose.model('Category',categorySchema);

const categoryValidationSchema=joi.object({
    name:joi.string().required()
});

module.exports={
    categoryModel,
    categoryValidationSchema
};
