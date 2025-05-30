const Category = require("../models/Category") ; 

exports.createCategory = async (req,res )=> {
    try{
        const {name , desc}= req.body ; 

        if(!name || !desc ){
            return res.status(400).json({
                success : false , 
                message  :"all fields are required",
            })
        }

        const CategoryDeatil = await Category.create({
            name : name , 
            description : desc , 
        });
        // console.log(CategoryDeatil) ;

        return res.status(200).json({
            success : true , 
            message : "Category created Successfully" , 
        })
    }
    catch(err){
        res.status(500).json({
            success : false , 
            message : err.message ,
        })
    }
}
exports.editCategory = async (req,res )=> {
    try{
        const {name ,categoryId}= req.body ; 


        const CategoryDeatil = await Category.findByIdAndUpdate(categoryId , {
            name : name
        } , {new : true } , 
        )

        return res.status(200).json({
            success : true , 
            message : "Category updated Successfully" , 
        })
    }
    catch(err){
        res.status(500).json({
            success : false , 
            message : err.message ,
        })
    }
}

exports.getAllCategories = async (req ,res) => {
    try{
        const allCategorys = await Category.find({} , {name :true , description : true}) ;

        res.status(200).json({
            success:true ,
            message : "all Categorys return successfully",
            data: allCategorys,
        }) ;
    }
    catch(err){
        res.status(500).json({
            success : false , 
            message : err.message ,
        })
    }
}


//categoryPageDetails.
exports.CategoryPageDeatil = async (req ,res) => { 

    try{
        //get category id 
        const {categoryId} = req.body 
        // console.log("CATEGORYID ..." , categoryId) ; 
        //get courses for specified id
        const selectedCategory = await Category.findById(categoryId)
        .populate({
            path : "courses" , 
            populate : {
                path : "instructor" , 
            }
        })
        .populate({
            path : "courses" , 
            populate : {
                path : "ratingAndReviews" , 
            }
        })
        .exec() ; 
        //validation
        if(!selectedCategory){
            return res.status(404).json({
                success : false , 
                message : 'Data not found', 
            })
        }

        if(selectedCategory.courses.length === 0 ){
            // console.log("No courses found for the selected category") 
            return res.status(404).json({
                success : false , 
                message : 'No courses found for the selected category', 
            })
        }
        //get courses for different category
        const differentCategories = await Category.find({
            _id : {$ne : categoryId} , 
        })
        .populate({
            path : "courses" , 
            populate : {
                path : "instructor" , 
            }
        })
        .populate({
            path : "courses" , 
            populate : {
                path : "ratingAndReviews" , 
            }
        })
        .exec() ; 
        //get top 10 selling courses
        //hw -> write it by your own by help of variable

        const allCategories =   await Category.find()
        .populate({
            path : "courses" , 
            match : {status : "Published"} ,
            populate : {
                path : "instructor" , 
            }
        })
        .populate({
            path : "courses" , 
            populate : {
                path : "ratingAndReviews" , 
            }
        })
        .exec() ; 
        const allCourses = allCategories.flatMap((category) => category.courses )
        const allDifferentCatagories = differentCategories.flatMap((category) => category.courses) ; 
        // console.log("ALL CATEGORY..." , allCourses) ; 
        // const mostSellingCourses = allCourses; 
        const mostSellingCourses = allCourses.sort((a,b) => b.sold - a.sold ).slice(0 ,10 ) ; 
        //retun response 
        return res.status(200).json({
            success : true , 
            message : 'data found',
            data : {
                selectedCategory , 
                allDifferentCatagories,
                mostSellingCourses , 

            }
        })
    }
    catch(err){
        console.error(err) ; 
        return res.status(500).json({
            success : false , 
            message : 'ISE' , 
            error : err.message  ,
        })
    }
}