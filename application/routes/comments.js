var express=require('express');
var router=express.Router();
const{isLoggedIn}=require("../middleware/auth");
var db=require("../conf/database")
router.post('/create',isLoggedIn,async function (req,res,next){
   var {userId,username,profileImg}=req.session.user;
   var {postId,comment}=req.body;

   try{
       var [insertResult,_]=await db.execute(
           `INSERT INTO comments (text,fk_postId,fk_authorId) VALUE(?,?,?)`,[comment,postId,userId]
       );
       if(insertResult&& insertResult.affectedRows==1){
           res.status(201).json({
               commentId:insertResult.insertId,
               username:username,
               commentText:comment,
               profileImg:profileImg,
           });
       }
       else{

       }

   }catch(error) {
   next(error);
   }

})


module.exports=router;