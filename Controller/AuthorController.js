const AuthorModel = require("../Models/AuthorModel");


const registerAuthor = async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const exsitAuthor = await AuthorModel.findOne({ email : email})
        if(exsitAuthor){
            return res.status(400).json({ message : "Author already exist" });
        }
        const newAuthor = new AuthorModel({
            username : username,
            email : email,
            password : password
        });
        await newAuthor.save();
        res.status(200).json({message : "User Create successful"})
    } catch (error) {
        res.status(500).json(error)
    }
}
const loginAuthor = async (req, res) => {

    const {email, password} = req.body;
    try {
        const existAuthor = await AuthorModel.findOne({email : email});
        if(!existAuthor){
            return res.status(400).json({message : "Author does not exist"})
        }
        if(password !== existAuthor.password){
            return res.status(400).json({message : "Password Incorrect"})
        }
        res.status(200).json({message : "Author login successful"})
    } catch (error) {
        res.status(500).json(error)
    }

}


module.exports = {registerAuthor, loginAuthor}