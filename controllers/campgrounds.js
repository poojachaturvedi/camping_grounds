const Campground=require('../models/campgrounds');

module.exports.index=async (req,res)=>{
    // res.send('HELLO FROM YELP CAMP')
    const campgrounds=await Campground.find({});
    res.render('campgrounds/index',{campgrounds})
}

module.exports.renderNewForm=(req,res)=>{
   
    res.render('campgrounds/new');
}

module.exports.createCampgrounds=async (req,res,next)=>{
    // if(!req.body.campground) throw new ExpressError('Invalid Campground',400)
    
    const campground= new Campground(req.body.campground);
    campground.images=req.files.map(f=>({url:f.path,filename:f.filename}));
    campground.author=req.user._id;
    await campground.save();
    console.log(campground);
    req.flash('success','successfully made he new campground!');

    res.redirect(`/campgrounds/${campground._id}`)
    
}

module.exports.showCampgrounds=async (req,res)=>{
    const campground= await Campground.findById(req.params.id).
    populate({path:'reviews',
    populate:{
    path:'author'
    }}).populate('author');
console.log(campground);

    if(!campground){
        req.flash('error','Cannot find that campground !');
        return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show',{ campground });
}

module.exports.renderEditForm=async(req,res)=>{
    const { id }=req.params;
    const campground=await Campground.findById(id);
    if(!campground){
        req.flash('error','Cannot find that campground !');
        return res.redirect('/campgrounds');
    }
 
    if(!campground.author.equals(req.user._id)){
        req.flash('error','You do not have the permission to do that!');
        res.redirect(`/campgrounds/${id}`);
    }
    // const campground= await Campground.findById(req.params.id)
    
    res.render('campgrounds/edit',{ campground });
}

module.exports.updateCampgrounds=async(req,res)=>{
   
    const { id }=req.params;
   
    const camp=await Campground.findByIdAndUpdate(id,{...req.body.params});
    req.flash('success','Successfully updated campground!');
    res.redirect(`/campgrounds/${camp._id}`)

}

module.exports.deleteCampgrounds=async(req,res)=>{
    // const campground=await Campground.findById(id);
    const{id}=req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success','Successfully delete review');
    res.redirect('/campgrounds');
    
}
