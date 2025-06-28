const jwt = require("jsonwebtoken") ;
require("dotenv").config() ; 
const user = require("../models/User") ; 

//auth
exports.auth = async (req , res , next ) => {
    try{
        //excratct token
        const authHeader = req.header("Authorization") || req.header("authorization");
        const token =
        req.cookies.token ||
        req.body.token ||
        (authHeader ? authHeader.replace("Bearer ", "") : null);
        //if token is missing
        if(! token ){
            return res.status(401).json({
                success : true ,
                message : "Token is missing " , 
            })
        }
        //verify the token 
        try{
            const decode = jwt.verify(token , process.env.JWT_SECRET) ;
            // console.log(decode) ; 
            req.user = decode 

        }
        catch(err){
            console.error(err) ; 
            return res.status(401).json({
                success : false , 
                message : "token is invalid" , 
            });
        }
        next() ; 
    } 
    catch(err){
            console.error(err) ; 
            return res.status(500).json({
                success : false , 
                message : "Something went wrong while validating the token " , 
            });
        }
    }


//is student
exports.isStudent = async (req , res  ,next ) => {
    try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success : false , 
                message : "This is protected route for student only " , 
            });
        }
        next() ; 
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : "user role cannot be verified . pleade try again later " , 
        });
    }
}

//is Instructor
exports.isInstructor = async (req , res  ,next ) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success : false , 
                message : "This is protected route for Instructor only " , 
            });
        }
        next() ; 
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : "user role cannot be verified . pleade try again later " , 
        });
    }
}
//is Admin
exports.isAdmin = async (req , res  ,next ) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success : false , 
                message : "This is protected route for Admin only " , 
            });
        }
        next() ; 
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : "user role cannot be verified . pleade try again later " , 
        });
    }
}

