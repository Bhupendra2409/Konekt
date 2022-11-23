const router = require('express').Router();
const ErrorResponse = require('../utils/errorResponse');
const Posts = require('../models/Post')
const User = require('../models/User')


router.post('/',async (req,res,next)=>{

    const newPost = new Posts(req.body);

    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch(err){
        next(err);
    }
})

//update a post
router.put('/:id',async (req,res,next)=>{
    
    try{
        const post = await Posts.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("The post has been updated");
        }else{
            return next(new ErrorResponse("You can only update your posts",403));
        }
    }catch(err){
        next(err);
    }
    
})
// like/unlike a post
router.put('/:id/like',async (req,res,next)=>{
    
    try{
        const post = await Posts.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json("post has been liked");
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json("post has been unliked");
        }
    }catch(err){
        next(err);
    }
    
})
//delete a post
router.delete('/:id',async (req,res,next)=>{
    
    try{
        const post = await Posts.findById(req.params.id);
        if(post.userId === req.body.userId){
            await post.deleteOne();
            res.status(200).json("The post has been deleted");
        }else{
            return next(new ErrorResponse("You can only delete your posts",403));
        }
    }catch(err){
        next(err);
    }
    
})
//get a post
router.get("/:id", async(req,res,next)=>{
    try{
    const post =await Posts.findById(req.params.id) ;
    res.status(200).json(post);
    }
    catch(err){
        next(err);
    }
})
//get timeline posts
router.get("/timeline/:userId",async (req,res,next)=>{
    
    try{
        const currentUser = await User.findById(req.params.userId);
        const userPosts = await Posts.find({userId: currentUser._id});
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId=>{
               return Posts.find({userId:friendId});
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    }catch(err){
        next(err);
    }
})

//get user's all posts
router.get("/profile/:username",async (req,res,next)=>{
    
    try{
        const user = await User.findOne({username:req.params.username});
        const post = await Posts.find({userId:user._id});
        console.log(post);
        res.status(200).json(post);

    }catch(err){
        return next(new ErrorResponse("No posts found",403));
    }
})

module.exports = router;