const express=require('express');
const router=express.Router();
const catchAsync=require('../utils/catchAsync');
const campgrounds=require('../controllers/campgrounds');
const multer=require('multer');
const {storage}=require('../cloudinary');
const upload=multer({ storage});


// const Campground=require('../models/campgrounds');
const {isLoggedIn,isAuthor,validateCampground}=require('../middleware.js');


router.route('/')
    .get(validateCampground,catchAsync(campgrounds.index))
    .post(isLoggedIn,upload.array('image'),validateCampground,catchAsync(campgrounds.createCampgrounds));
    

router.get('/new',isLoggedIn,campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampgrounds))
    .put(isLoggedIn,isAuthor,validateCampground,catchAsync(campgrounds.updateCampgrounds))
    .delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampgrounds));


router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(campgrounds.renderEditForm));



module.exports=router;