const commentModel = require("../Models/CommentModel");



const getAllComment = async (req, res) => {
    try {
        const comments = await commentModel.find();
        
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error)
    }
}

const getUserCOmment = async (req, res) => {
    try {
        const comments = await commentModel.find({ postId: req.params.id });
        
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error)
    }
}

const getsingleComment = async (req, res) => {
    
    const id = req.params.id
    try {
        const comments = await commentModel.findOne({_id : id})
        
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error)
    }
}

const postComment = async (req, res) => {
    try {
        const comment = await new commentModel(req.body);
        await comment.save();

        res.status(200).json('Comment saved successful');
    } catch (error) {
        res.status(500).json(error);
    }
}

const updateComment = async (req, res) => {

    
    const id = req.params.id;
    const {username, comment} = req.body
    const userPicInput = () => {
        if (req.files?.userPic?.[0].path === undefined) {
            return null;
        } else {
            return req.files.userPic[0].path;
        }
    };
    const commentData = {
        username : username,
        comment : comment,
        userPic : userPicInput(),
    }
    try {
        await commentModel.findByIdAndUpdate(id, commentData, {new : true});
        res.status(200).json({message : "Comment saved successful"});
    } catch (error) {
        res.status(500).json(error);
    }
}

const deleteComment = async (req, res) => {
    try {
        await commentModel.findByIdAndRemove(req.params.id);
        res.status(200).json({message : 'comment deleted successful'});
    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {getAllComment, postComment, deleteComment, getUserCOmment, getsingleComment, updateComment}