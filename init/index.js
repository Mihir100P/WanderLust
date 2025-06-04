const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const sampleData = require("./data.js");

async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/Wanderlust')
}
main().then((res)=>{
    console.log("Connected with DB");
})
.catch((err)=>{
    console.log(err);
});

sampleData.data = sampleData.data.map((obj)=>({...obj,owner:"682f0881dfa6c8c418a4cf14"}));
Listing.insertMany(sampleData.data).then((res)=>{
    console.log(res);
}).catch((err)=>{
    console.log(err);
});

