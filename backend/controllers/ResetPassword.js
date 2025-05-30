const User = require("../models/User");
const mailSender = require("../utils/mailSender"); 
const bcrypt = require("bcrypt") ;
const passwordUpdated = require("../mail/templates/passwordUpdate") ; 
const dotenv = require("dotenv") ; 
dotenv.config() ;


//send reset email 
exports.resetPasswordToken = async (req , res ) => {
    try{
        //get email from req ki body. \
        const email = req.body.email ; 

        //chk user for this email , email validation
        const user = await User.findOne({email : email }) ; 
        if(!user){
            return res.json({
                success : false ,
                message : "your Email is Not resistered with us"
            });
        }
        //generate token 
        const token = crypto.randomUUID() ;  
        //update user by adding token and expirartion time 
        const updatedDetails = await User.findOneAndUpdate({email : email } , {
            token : token , 
            resetPasswordExpires : Date.now() + 5* 60 *1000 , 
        } , {new : true }) ;
        //create Url

        const url = process.env.UPDATEPASSWORD_URL + token ; 
        //send mail conatining the url
        await mailSender(email , `password Reset Link` , `password Reset Link : ${url}` ) ;

        //update password and return response
        return res.status(200).json({
            success : true , 
            message : 'Email Sent successfully please check email and change password' , 
            token , 
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'Something went wrong while sending reset pwd mail'
        })

    }
}

//reset password
exports.resetPassword = async(req ,res ) => { 
    try{
        const data = {
            uppercase : "QWERTYUIOPLKJHGFDSAZXCVBNM",
            lowercase : "qwertyuioplkjhgfdsazxcvbnm",
            special_char : "~!@#$%^&*()_+=[{]};:',./<>?",
            number : "1234567890"
        }
        //data fetch
        const {password , confirmPassword , token } = req.body ; 
        //validation
        if(password !== confirmPassword){
            return res.json({
                success :false , 
                message : "Password not matched"
            });
        }
        // get user details by token
        const userDeatil = await User.findOne({token  : token }) ; 
        //if no entry found -> invalid token
        if(!userDeatil){
            return res.json({
                success :false , 
                message : "Token is Invalid"
                
            })
        }
        //tolen time check
        if(userDeatil.resetPasswordExpires < Date.now() ){
            return res.json({
                success :false , 
                message : "Token is Expired , please regenerate your token"
            })
        }
        //check password need
        let uppercase = false ; 
        let lowercase = false ; 
        let number = false ; 
        let special_char = false ; 
        if(password.length < 8 ){
            return res.json({
                success : false , 
                message : 'password required condition not fullfilled', 
            })
        }
        else{
            for(let i = 0 ; i< password.length ; i++  ){
                if(uppercase && lowercase && number && special_char ){
                    break ; 
                }
                const char = password[i] ; 
                for(let j = 0 ; j < data.lowercase.length ; j ++ ){
                    if( char ===  data.lowercase[j] ) {
                        lowercase = true ; 
                    }
                    else if(char === data.uppercase[j] ){
                        uppercase = true ; 
                    }
                }
                for(let j = 0 ; j < data.number.length ; j ++ ){
                    if( char ===  data.number[j] ) {
                        number = true ; 
                    }
                }
                for(let j = 0 ; j < data.special_char.length ; j ++ ){
                    if( char ===  data.special_char[j] ) {
                        special_char = true ; 
                    }
                }
            }
        }
        if(!uppercase || !lowercase || !special_char || !number){
            return res.json({
                success : false , 
                message : 'password required condition not fullfilled', 
            })
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password , 10 ) ; 
        //password update
        await User.findOneAndUpdate({token : token } , {password : hashedPassword} , {new : true } ) ; 
        // return res
        return res.status(200).json({
            success : true , 
            message : "Password reset Successful",
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : true , 
            message : "password cannot be changed, please try again"
        })
    }

}
