const express=require('express');
const router=express.Router({mergeParams: true});
const catchAsync=require('../utils/catchAsync');

const reviews=require('../controllers/reviews');

const Campground=require('../models/campgrounds');
const Review=require('../models/review');
const  ExpressError=require('../utils/ExpressError');
const {validateReview, isLoggedIn,isAuthor}=require('../middleware.js');



router.post('/',isLoggedIn,validateReview,catchAsync(reviews.createReview))
 
 router.delete('/:reviewId',isLoggedIn,isAuthor,catchAsync(reviews.deleteReviews))

 module.exports=router;
