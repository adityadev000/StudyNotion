const User = require("../models/User") ; 
const Otp = require("../models/Otp") ; 
const otpGenerator = require("otp-generator");
const profile = require("../models/Profile");
const bcrypt = require("bcryptjs") ;
const jwt = require("jsonwebtoken") ; 

require("dotenv").config ; 


//passwordAuthenticate
function passwordAuthenticate(password) {
    const data = {
        uppercase : "QWERTYUIOPLKJHGFDSAZXCVBNM",
        lowercase : "qwertyuioplkjhgfdsazxcvbnm",
        special_char : "~!@#$%^&*()_+=[{]};:',./<>?",
        number : "1234567890"
    }
    
        //check password condtion 
        let uppercase = false ; 
        let lowercase = false ; 
        let number = false ; 
        let special_char = false ; 

        if(password.length < 8 ){
            return false ; 
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
            return false ; 
        }
        else{
            return true ; 
        }
}


//sendOtp
exports.sendOtp = async(req , res ) => {
    try{

        //fetch email from req ki body se 
        const {email , password } = req.body ;

        console.log(email , " " , password ) ; 

        //agar user pahhle se exist krta h to return 401 
        const checkUserPresent = await User.findOne({email}) ; 

        if(checkUserPresent){
            return res.status(401).json({
                success : false ,
                messagge : "user Already resistered" ,
            })
        }

        console.log("new user ayya h ") ; 
        //chk password condition 
        const passwordAuth = passwordAuthenticate(password) ; 
        if(!passwordAuth){
            return res.json({
                success : false , 
                message : 'password required condition not fullfilled', 
            })
        }

        console.log("password conditon checked " ) ; 

        //ek unique otp generate kro.
        var otp = otpGenerator.generate(6 , {
            upperCaseAlphabets : false ,
            lowerCaseAlphabets : false,
            specialChars : false ,
        })
        // console.log('otp genenrated ',otp);

        
        let result = await Otp.findOne({otp : otp }) ; 
        
        while(result){
            otp = otpGenerator.generate(6 , {
                upperCaseAlphabets : false ,
                lowerCaseAlphabets : false,
                specialChars : false ,
            })
            result = await Otp.findOne({otp : otp }) ;
        }

        console.log("otp generated") ;
        //otp ka ek payload create kiya
        const otpPayload = {email , otp} ; 
        //db ke andr entry bano otp ke liye 
        //create hone se pahle Otp schema wala pre middleware call hoga or otp mail pe send kega 
        const otpBody = await Otp.create(otpPayload) ;
        // console.log(otpBody) ; 

        //return res successfully.
        return res.status(200).json({
            success : true , 
            message : "Otp sent successfully",
            otp , 
        })

    }

    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false ,
            message : err.message , 
        })
    }

    
}
//signUp 
exports.signUp = async (req, res ) => {
    try{
        
        //1.fetch data fromm req ki body se 
        const {firstName , lastName ,email , password , confirmPassword , otp , accountType} = req.body ; 
        //2.validate data
        console.log(firstName , lastName ,email ,password , confirmPassword , otp ,accountType ) ; 
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp ){
            return res.status(403).json({
                success : false , 
                message : "All field are required"
            })
        }
        // console.log("All fileld done")
        //3.match password and confirm password
        if(password !== confirmPassword) {
            return res.status(400).json({
                success : false , 
                message : "password and confirm password does not matched"
            })
        }
        // console.log("password matched")
        //4.check user already exist or not ? 
        const existUser = await User.findOne({email}) ; 
        if(existUser){
            return res.status(400).json({
                success : false , 
                message : "user is already resistered",
            })
        }
        // console.log("user exixt")
        
        
        //5.find recent otp of that user
        const recentOtp = await Otp.find({email}).sort({createdAt : -1}).limit(1) ; 
        
        // console.log("recent otp " , recentOtp[0].otp) ; 
        // console.log("otp " , otp ) ; 
        
        //6.validiate otp
        if(recentOtp.length === 0 ){
            return res.status(400).json({
                success : false , 
                message : "otp not found",
            })
        }else if(otp.toString()  !== recentOtp[0].otp){
            return res.status(400).json({
                success : false , 
                message : "Invalid Otp",
            })
        }
        // console.log("otp matched ")
        
        //7. hash password
        const hashedPassword = await bcrypt.hash(password , 10 ) ; 

        let approved = "";
		approved = accountType === "Instructor" ? false : true ;

        //8.craete entry in db 

        const profileDetail  = await profile.create({
            gender : null , 
            dateOfBirth : null ,
            about : null , 
            contactNumber : null 
        })
        const user = await User.create({
            firstName ,
            lastName,
            email,
            password : hashedPassword ,
			accountType: accountType,
			approved: approved,
            additionalDetail : profileDetail._id ,
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        //9.send success responce
        return res.status(200).json({
            success : true , 
            message : "user is registered successfully",
            user ,
        })

    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : "user cannot be resistered. please try again "
        })
    }
}

//login 
exports.login = async (req , res ) =>  {

    try {
        //1.get data from req ki body 
        const {email , password , currentUser} = req.body ; 

        //2. validate data 
        if(!email || !password ){
            return res.status(403).json({
                success : false , 
                message : "All fields are required, please try again later"
            })
        }

        const updatedUser = await User.findOne({email})
        // 3.user exist or not
        if(!updatedUser){
            return res.status(401).json({
                success : false , 
                message : "user is not resistered, please sign up first",
            })
        }


        //3.1 check user type 
        if(updatedUser.accountType !== currentUser){
            return res.json({
                success : false , 
                message : 'Invalid User type', 
            })
        }
        //4.password matched or not
        if(await bcrypt.compare(password , updatedUser.password)) {

            const payload ={
                email : updatedUser.email,
                id : updatedUser._id ,
                accountType: updatedUser.accountType ,
            }
            const token = jwt.sign(payload , process.env.JWT_SECRET , {
                expiresIn : "24h" ,
            }) ;

            updatedUser.token = token ; 
            updatedUser.password = undefined ;
            const option = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) ,
                httpOnly : true , 
            }
            // 4.1 create cookie and send res
            res.cookie("token" , token , option).status(200).json({
                success : true , 
                token, 
                updatedUser, 
                message : "Logged In successfully" 
    
            }) ; 
        }
        else{
            return res.status(401).json({
                success : false , 
                message : "Incorrect password"
            })
        }


    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : "Login failed , please try again later "
        })
    }
}

//changePassWord 
//Home work
exports.changePassword = async (req, res) => {
    try{
        const {oldPassword , newPassword } = req.body ;
        const userid = req.user.id;

        const currentUser = await User.findById(userid) ; 

        //match kro old passwork ko 
        if(await bcrypt.compare(oldPassword , currentUser.password)){
            // thk h to update kro na yyar bycrypt krke ;

            //authenticate new password 
            const passwordAuth = passwordAuthenticate(newPassword) ; 

            if(passwordAuth){

                const hashedPassword = await bcrypt.hash(newPassword , 10 ) ; 
    
                const userUpdated = await User.findByIdAndUpdate(
                    userid,
                    {password : hashedPassword } ,
                    {new : true }
                )
    
                return res.status(200).json({
                    success : true , 
                    message : 'Password updated Successfully', 
                })
            }
            else{
                return res.status(400).json({
                    success : false , 
                    message : 'New Password condition not fullfilled', 
                })
            }


        }
        else{
            return res.status(400).json({
                success : false , 
                message : 'The Password is incorrect', 
            })
        }
    }
    catch(err){
        console.log(err) ;
        return res.status(500).json({
            success : false , 
            message : 'failed to update password', 
        })
    }
}