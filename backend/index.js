const express = require("express") ; 
const app = express() ; 

const userRoutes = require("./routes/User") ;
const profileRoutes = require("./routes/Profile") ;
const paymentRoutes = require("./routes/Payments") ;
const courseRoutes = require("./routes/Course") ;
const conatctRoutes = require("./routes/Contact") ; 

const database = require("./config/database") ;
const cookieParser = require("cookie-parser") ; 

const cors = require("cors") ;
const {cloudinaryConnect} = require("./config/cloudinary") ;
const fileUplaod = require("express-fileupload") ; 
const dotenv = require("dotenv") ; 
dotenv.config() ; 
const PORT = process.env.PORT || 4000 ; 
const cron = require("node-cron") ; 
const {deleteUser} = require("./controllers/Profile") ;


//database connection 
database.connect() ; 

//middleware ; 
app.use(express.json()) ; 
app.use(cookieParser()) ;
app.use(
    cors({
        origin : "https://studynotion-frontend-olive-beta.vercel.app/" , 
        credentials : true , 
    })
)

app.use(
    fileUplaod({
        useTempFiles: true,
        tempFileDir: "/tmp/" 

    })
)
//cloudinary connection 
cloudinaryConnect() ; 
//routes 
app.use("/api/v1/user" , userRoutes) ; 
app.use("/api/v1/profile" , profileRoutes) ; 
app.use("/api/v1/course" , courseRoutes) ; 
app.use("/api/v1/payment" , paymentRoutes) ; 
app.use("/api/v1/reach" , conatctRoutes) ; 

//default route
app.get("/" , (req, res) => {
    return res.json({
        success : true   , 
        message : 'Your server is up and Running...', 
    }) ;
}) ; 
cron.schedule("* * * * *" , ()=>{
    deleteUser() ; 
})
//activate server
app.listen(PORT , () => {
    console.log(`App is running at port ${PORT}`) 
})

app.get("/hello", (req, res) => {
    res.send("Hello, World!");
});
