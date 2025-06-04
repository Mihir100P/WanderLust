const Listing = require("../models/listing.js");
const User = require("../models/User.js");
const passport = require("passport");

module.exports.signupGet = (req,res)=>{
    res.render("./user/register.ejs")
}

module.exports.signup = async(req,res,next)=>{
    try{
    let {username,email,password,Confirmpassword}=req.body;
    // console.log(password);
    if(password!=Confirmpassword){
        req.flash("error","Password does not match");
        return res.redirect("/signup");
    }
else{
    let newUser = new User({email,username});
    const registeredUser =  await User.register(newUser,password);
    // console.log(registeredUser);
    req.login(registeredUser,(err)=>{
        if(err){
            return next(err);
        }
        else{
            req.flash("success","Welcome to wanderlust!");
            return res.redirect("/listing");
        }
    }
)};
    }
    catch(err){
        req.flash("error",err.message);
        return res.redirect("/signup");
    }
}

module.exports.loginGet = (req,res)=>{
    return res.render("./user/login.ejs")
}

module.exports.login = async(req,res)=>{
   req.flash("success","Welcome-back to wanderlust!");
   let redirectUrl = res.locals.redirectUrl || "/listing";
   return res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        else{
        req.flash("success","Logout Successfully!");
        return res.redirect("/listing");
        }
    });
}