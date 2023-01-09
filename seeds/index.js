const mongoose=require('mongoose');
const cities=require('./cities');
const {places,descriptors}=require('./seedHelpers');
const Campground=require('../models/campgrounds');

mongoose.connect('mongodb://localhost:27017/yelp-camp');


const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample= array =>array[Math.floor(Math.random()*array.length)];

const seedDB=async() =>{
    await Campground.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp=new Campground({
            author:'63838525b1e100b335f30871',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            image:'https://source.unsplash.com/collection/483251',
            description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt vel obcaecati reprehenderit facilis consequatur perferendis, alias saepe dolorum, nemo aliquid voluptate. Maxime sequi est autem ducimus, ullam consequatur deserunt harum ea sed rerum nam tenetur ab delectus accusantium nisi inventore eaque. Ipsam voluptates a optio vero fugit, fuga minus ex!",
            price 
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();
});