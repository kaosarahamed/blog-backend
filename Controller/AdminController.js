const AdminModel = require("../Models/AdminModel");



const getAdminData = async (req, res) => {
    try {
        const getData = await AdminModel.find();
        res.status(200).json(getData)
    } catch (error) {
        res.status(500).json(error)
    }
}
const postAdminData = async (req, res) => {
    const adminlogoInput = () => {
        if (req.files?.adminlogo?.[0].path === undefined) {
          return null;
        } else {
          return req.files.adminlogo[0].path;
        }
      };
      const adminPicInput = () => {
        if (req.files?.adminPic?.[0].path === undefined) {
          return null;
        } else {
          return req.files.adminPic[0].path;
        }
      };
    const {adminname, about, facebook, twitter, linkedin, instagram, youtube, copytext, footerText} = req.body;
    const admin = new AdminModel({
      adminname,
      adminlogo : adminlogoInput(),
      adminPic : adminPicInput(),
      about,
      facebook,
      twitter,
      linkedin,
      instagram,
      youtube,
      copytext,
      footerText
  })
    try {       
        await admin.save();
        res.status(200).json({message : "Admin data create successful"})
    } catch (error) {
        res.status(500).json({error : error})
    }

}
const editAdminData = async (req, res) => {
    const adminlogoInput = () => {
        if (req.files?.adminlogo?.[0].path === undefined) {
          return null;
        } else {
          return req.files.adminlogo[0].path;
        }
      };
      const adminPicInput = () => {
        if (req.files?.adminPic?.[0].path === undefined) {
          return null;
        } else {
          return req.files.adminPic[0].path;
        }
      };
      const {adminname, about, facebook, twitter, linkedin, instagram, youtube, copytext, footerText} = req.body;
    const id = req.params.id;
    const editAdmin = {
      adminname,
      adminlogo : adminlogoInput(),
      adminPic : adminPicInput(),
      about,
      facebook,
      twitter,
      linkedin,
      instagram,
      youtube,
      copytext,
      footerText
    }

    try {
        await AdminModel.findByIdAndUpdate(id, editAdmin, {new : true})
        res.status(200).json({message : "Admin data update successful"})
    } catch (error) {
        res.status(500).json({error : error, message : "Admin data update faild"})
    }
}
const deleteAdminData = async (req, res) => {
    const id =  req.params.id
    try {
        const adminData = await AdminModel.findByIdAndDelete(id)
        res.status(200).json({message : "Admin data delete successful"})
    } catch (error) {
        res.status(500).json({error : error, message : "Admin data delete sucessfull"})
    }
}


module.exports = {getAdminData, postAdminData, editAdminData, deleteAdminData}