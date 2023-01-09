const mongoose=require('mongoose');
const review = require('./review');
const Schema=mongoose.Schema;


const CampGroundSchema=new Schema(
    {
        title:String,
        images:[
            {
                url:String,
                filename:String
            }
        ],
        price:Number,
        description:String,
        location:String,
        author:{
            type:Schema.Types.ObjectId,
            ref:'User'
        },
        reviews:[
            {
                type:Schema.Types.ObjectId,
                ref:'Review'
            }

            
        ]
    }
);

CampGroundSchema.post('findOneAndDelete',async function(doc){
    console.log(doc);
    if(doc){
        await review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
    
})

module.exports=mongoose.model('Campground',CampGroundSchema);
