const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const salt = 10;
const jwt = require('jsonwebtoken');

class AuthController{
    // [POST] /auth/register
    async register(req, res, next){
        const {username, email, password} = req.body;
       
        // const hashedPassword = await bcrypt.hash(password, salt);
        // await User.create({
        //     username,
        //     email,
        //     password : hashedPassword
        // })
        // res.json({message : "Register done!"});

        const user = new User({ username, email, password });
        await user.save(); // this triggers the pre('save') and hashes the password
        res.json({message : "Register done!"});
    }

    async login(req, res, next){
        const {email, password} = req.body;
        const user = await User.findOne({ email });
       
        if(!user){
            return res.status(401).json({messagse : "invalid email"});
        }

    
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Wrong email or password" });
        }

        const payload = {
            id: user._id,        
            username: user.username,
            email: user.email
        }
            
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({message : "login successfully!", token});
    }
}

module.exports = new AuthController();
