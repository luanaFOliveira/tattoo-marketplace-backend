const bcrypt = require('bcrypt');
const UserModel = require('../models/User');

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Name, email, and password are required." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({
            name: name,
            email: email,
            senha: hashedPassword,
        });

        await user.save();
        return res.status(201).json({
            message: "User created successfully",
            user: {
                name: user.name,
                email: user.email,
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Error creating user", error: err.message });
    }
};

const getUserList = async (req, res) => {
    try{
        const resultado = await UserModel.find();
        res.send(resultado);
    }catch(err){
        res.send(err);
    }
};

module.exports = {
    createUser,
    getUserList
};
