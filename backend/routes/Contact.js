const express = require("express") ; 
const router = express.Router() ; 
const { contactUsController ,getStats} = require("../controllers/ContactUs")

router.post("/contact" , contactUsController) ; 
router.get("/getStats" , getStats) ; 

module.exports = router 