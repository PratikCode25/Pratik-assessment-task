const multer=require('multer');
const path = require('path');
const fs = require('fs');


const fileType = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const storage=multer.diskStorage({
    destination:function(req,file,cb){
       const isValid=fileType[file.mimetype];
       let uploadError=new Error('invalid image type');
       if(isValid){
           uploadError=null;
       }
       cb(uploadError,'uploads')
    },
    filename:function(req,file,cb){
        const fileName=file.originalname.split(' ').join('-');
        const extension=fileType[file.mimetype];
        cb(null,`${fileName}-${Date.now()}.${extension}`)
    }
})

const productImageUpload = multer({ storage: storage });

module.exports = productImageUpload;