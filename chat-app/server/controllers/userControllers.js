const Users = require('../models/userModels');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
    try {

        const { username, email, password } = req.body;
        const usrenameCheck = await Users.findOne({ username });
        if (usrenameCheck)
            return res.json({ msg: "Username is already used", status: false })
        const emailCheck = await Users.findOne({ email });
        if (emailCheck)
            return res.json({ msg: "Email already exist", status: false })
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await Users.create({
            email,
            username,
            password: hashedPassword
        });
        delete user.password;
        return res.json({ status: true, user })
    }
    catch (error) {
        next(error);
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await Users.findOne({ username });
        if (!user)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        delete user.password;
        return res.json({ status: true, user })
    }
    catch (error) {
        next(error);
    }
}

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const isAvatarImage = req.body.image;
        const userData = await Users.findByIdAndUpdate(userID, {
            isAvatarImageSet: true,
            isAvatarImage
        })
        
        return res.json({ success: userData.isAvatarImageSet, image: userData.isAvatarImage })
    }
    catch (error) {
        next(error)
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try{
        const user = await Users.find({_id: { $ne: req.params.id}}).select([
            "email",
            "username",
            "isAvatarImage",
            "_id"
        ])
        return res.json(user);
    }catch(error){
        next(error);
    }
}
