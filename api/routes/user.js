const router = require('express').Router();
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse');

router.put('/:id',async(req,res,next)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            });
            
            res.status(200).json("Account has been updated")
        }catch(err){
            res.status(500).json(err);
        }
    }else{
        return next(new ErrorResponse("You can only update your account",403))
    }
})

router.delete('/:id',async(req,res,next)=>{
    if(req.body.userId===req.params.id || req.body.isAdmin){
        try{
            console.log(req.params.id);
            const user = await User.findOneAndDelete({_id:req.params.id})
            res.status(200).json("Account has been deleted successfully")
            
            
        }catch(err){
            next(err)
        }
    }else{
        return next(new ErrorResponse("You can only delete your account",403))
    }
})

router.get("/", async (req,res)=>{
    const userId = req.query.userId;
    const username = req.query.username;

    try{
        const user = userId ? await User.findById(userId):await User.findOne({username:username});
        const {password,updatedAt,...other} = user._doc;
        res.status(200).json(other);
    }
    catch(err){
        next(err);
    }
})


 
router.put("/:id/follow", async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{followings:req.params.id}});

                res.status(200).json("User has been followed")
            }else{
                res.status(403).json("You already follow this user")
            }
        }
        catch(err){
            next(err);
        }
    }
    else{
        return next(new ErrorResponse("You cannot follow yourself",403))
    }
})
router.put("/:id/unfollow", async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{followings:req.params.id}});

                res.status(200).json("User has been unfollowed")
            }else{
                res.status(403).json("You dont follow this user")
            }
        }
        catch(err){
            next(err);
        }
    }
    else{
        return next(new ErrorResponse("You cannot unfollow yourself",403))
    }
})

router.put("/:id/editprofilepicture", async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try{
            
        }
        catch(err){
            next(err);
        }
    }
    else{
        return next(new ErrorResponse("You cannot unfollow yourself",403))
    }
})

module.exports = router;