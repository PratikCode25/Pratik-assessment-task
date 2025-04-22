const express=require('express');
require('dotenv').config();
const path=require('path');
const dbConnect=require('./app/config/db');
const flash=require('connect-flash');
const session=require('express-session');
const cookieparser=require('cookie-parser');
const app=express();

dbConnect();
app.use(session({
    cookie: {
        maxAge: 60000
    },
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(cookieparser());
app.use(flash());

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.set('view engine','ejs');
app.set('views','views');
app.use(express.static('public'));
app.use('/uploads',express.static(path.join(__dirname,'/uploads')));


const dashboardRoute=require('./app/router/dashboardRoute');
app.use('/admin/',dashboardRoute);

const categoryRoute=require('./app/router/categoryRoute');
app.use('/admin/categories',categoryRoute);

const productRoute=require('./app/router/productRoute');
app.use('/admin/products',productRoute);

const customerRoute=require('./app/router/customerRoute');
app.use(customerRoute);

const port=3005;
app.listen(port,()=>console.log(`Server is listening on port ${port}`));


