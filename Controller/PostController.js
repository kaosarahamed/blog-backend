const postModel = require("../Models/PostModel");


// get all posts
const getAllPosts = async (req, res) => {
    const getPosts = await postModel.find();
    try {
        res.status(200).json(getPosts);
    } catch (error) {
        res.status(500).json({message : "User get faild"})
    }
}
// create new post
const createPost = async (req, res) => {
    const {title, description, categories, postbanner} = req.body
    const bannerInput = () => {
        if (req.files?.postbanner?.[0].path === undefined) {
          return null;
        } else {
          return req.files.postbanner[0].path;
        }
      };
    const newPosts = new postModel({
        title : title,
        description : description,
        categories : categories,
        postbanner : bannerInput()
    });
    try {
        await newPosts.save();
        res.status(200).json({newPosts : newPosts, message : "Post create successful"})
    } catch (error) {
        res.status(500).json({error : error, message : "Post create faild"})
    }
}
// get single post
const getSinglePost = async (req, res) => {
    const id = req.params.id;
    try {
        const singlePost = await postModel.findOne({_id : id});
        res.status(200).json(singlePost);
    } catch (error) {
        res.status(500).json({error : error, message : "get post faild"})
    }
}
// update Post
const updatePost = async (req, res) => {
    const {title, description, categories, postbanner} = req.body;
    const bannerInput = () => {
        if (req.files?.postbanner?.[0].path === undefined) {
          return null;
        } else {
          return req.files.postbanner[0].path;
        }
      };
    const updatePost = {
        title : title,
        description : description,
        categories : categories,
        postbanner : bannerInput()
    }
    const id = req.params.id;
    try {
        await postModel.findByIdAndUpdate(id, updatePost, {new : true});
        res.status(200).json({message : "post update successful"})
    } catch (error) {
        res.status(500).json({error : error, message : "post update faild"});
    }
}
// delete post
const deletePost = async (req, res) => {
    const id = req.params.id;
    try {
        await postModel.findByIdAndDelete(id);
        res.status(200).json({message : "post delete successful"})
    } catch (error) {
        res.status(500).json({error : error, message : "post delete faild"})
    }
}
// comment
const comment = async (req, res) => {
    const comment = {
        text:req.body.text,
    }
    postModel.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name")
    .exec((err,result)=>{
        if(err){
            return res.status(500).json({error:err})
        }else{
            res.status(200).json(result)
        }
    })
} 







module.exports = {getAllPosts, createPost, getSinglePost, updatePost, deletePost, comment}