const mongoose = require('mongoose');
const { Schema } = mongoose;
const Review = require("./Review.js");
const User = require("./User.js");
const ListingSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    image:{
        filename:String,
        url:String
    },
    price:{
        type:Number,
    },
    location:{
        type:String,
    },
    country:{
        type:String,
    },
    reviews:[
        {
        type:Schema.Types.ObjectId,
        ref :"Review"
    }
        ],
 owner:{
        type:Schema.Types.ObjectId,
        ref: "User"
    },
geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  category:{
    type:String,
    required:true
  }
});
ListingSchema.post("findOneAndDelete",async(list)=>{
    if(list.reviews.length){
        await Review.deleteMany({_id:{$in:list.reviews}});
    }
});
const Listing = mongoose.model("Listing",ListingSchema);

module.exports = Listing;