const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index=async (req,res)=>{
    const listings = await Listing.find({});
    return res.render("./listing/index.ejs",{listings});
}

module.exports.search=async(req,res)=>{
     const { category } = req.query;
     if(category){
     const listings = await Listing.find({
        category:{ $regex: category, $options: 'i' }  // case-insensitive match
    });
    return res.render('./listing/index.ejs', {listings});
}
else{
     return res.redirect("/listing");
}
    
}
module.exports.show=async (req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id)
    .populate({path:"reviews",
              populate:{path:"author"},})
              .populate("owner");
    // console.log(listing);
    if(!listing){
        req.flash("error","Listing is not found!");
        return res.redirect("/listing");
    }
    else{
    return res.render("./listing/show.ejs",{listing});
    }
}

module.exports.new=(req,res)=>{
   return res.render("./listing/new.ejs");
}

module.exports.create=async(req,res)=>{
    const list = req.body.list;
    const response = await geocodingClient.forwardGeocode({
        query: list.location,
        limit:1
    })
    .send();
    // Add uploaded image info if file exists 
     let filename = req.file.filename;
     let url = req.file.path;
    const newList = new Listing(list);
    newList.image = {url,filename};
    newList.owner = req.user._id;
    //newList cordinates in database
    newList.geometry = response.body.features[0].geometry;
    await newList.save();
    req.flash("success","New Listing is created!");
    return res.redirect("/listing");
}

module.exports.getEdit=async (req,res)=>{
    const {id} = req.params;
    const data = await Listing.findById(id);
    if(!data){
        req.flash("error","Listing is not found!");
        return res.redirect("/listing");
    }
    else{
    let originalImg = data.image.url;
    originalImg = originalImg.replace("/upload", "/upload/f_auto,q_30,w_400,dpr_auto");   //reducing the quality and size
    return res.render("./listing/edit.ejs",{data,originalImg});
    }
}
module.exports.edit=async (req, res) => {
        const { id } = req.params;
        const list = req.body.list;
        let updated = await Listing.findByIdAndUpdate(id,{...list},{ new: true, runValidators: true }); //deconstructive
        if(typeof req.file!=="undefined"){
          updated.image.url=req.file.path;
          updated.image.filename=req.file.filename;
           await updated.save();
        }
        req.flash("success","Listing edited!");
        return res.redirect(`/listing/show/${id}`);
}

module.exports.delete=async (req, res) => {
    const { id } = req.params;
    const data = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted!");
    return res.redirect("/listing");
}
