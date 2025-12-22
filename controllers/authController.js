const User = require('../models/Users.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const jwt_secret ="supersecretkey"
exports.registerUser=async(req,res)=>{
    const{name,email,password}=req.body;
    if(!name||!email||!password){
        return res.status(400).json({
            message:"please fill all fields"
        })
    }
    const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            message:"user already exists"
        })
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword
    });
    res.status(201).json({
        message:"user registered Successfully",
        user:{
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role,
        },
    });
}
exports.loginUser = async(req, res) => {
  const{email,password}=req.body;
  if(!email||!password){
    return res.status(400).json({
        message:"please provide credentials"
    });
  }
  const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({message:"user doesnt exist"});
    }
  
  const isPassword = await bcrypt.compare(password,user.password);
    if(!isPassword){
        return res.status(400).json({message:"invalid credentials"});
    }
  const token=jwt.sign({
    id:user._id,
    role:user.role,
  },jwt_secret,{expiresIn:'1d'})
  res.status(200).json({
    message:"lgin successful",
    token,
    user:{
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
    }
  })
}

