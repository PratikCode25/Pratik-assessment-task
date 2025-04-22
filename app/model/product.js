const mongoose=require('mongoose');
const joi=require('joi');

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    productSlug:{
        type:String,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true,
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

const productModel=mongoose.model('Product',productSchema);

const productValidationSchema=joi.object({
    name:joi.string().required(),
    description:joi.string().required(),
    category:joi.required(),
});

module.exports={
    productModel,
    productValidationSchema
};
