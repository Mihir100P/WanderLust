const Review = require("../models/Review.js");
const Listing = require("../models/listing.js");

module.exports.create = async(req,res)=>{
        const {review} = req.body;
        const {id} = req.params;
        const rev = new Review(review);
        rev.author=req.user._id;
        const list = await Listing.findById(id);
        list.reviews.push(rev);
        await rev.save();
        await list.save();
        // console.log("Review Saved");
        req.flash("success","New Review is created!");
        return res.redirect(`/listing/show/${id}`);
}

module.exports.delete = async(req,res)=>{
            let {id,revId} = req.params;
            await Review.findByIdAndDelete(revId);
            await Listing.findByIdAndUpdate(id, { $pull: { reviews: revId } });
            req.flash("success","Review deleted!");
            return res.redirect(`/listing/show/${id}`);
}