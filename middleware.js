const Listing = require("./models/listing");
const Review = require("./models/Review");

module.exports.auth=(req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    else{
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You have to login!");
        return res.redirect("/login");
    }
}

module.exports.saveRedirectUrl = (req,res,next)=>{
    res.locals.redirectUrl = req.session.redirectUrl;
    return next();
}

module.exports.isOwner = async(req,res,next)=>{
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if(!res.locals.currUser || !listing.owner.equals(res.locals.currUser._id)){
        req.flash("error","You are not the owner!");
        return res.redirect(`/listing/show/${id}`);
    }
    else{
    return next();
    }
}

module.exports.isAuthor = async(req,res,next)=>{
    let {id,revId} = req.params;
    const review = await Review.findById(revId);
    if(!res.locals.currUser || !review.author.equals(res.locals.currUser._id)){
        req.flash("error","You are not the Author!");
        return res.redirect(`/listing/show/${id}`);
    }
    else{
    return next();
    }
}