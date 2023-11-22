require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

router.post("/createuser",[
    body('email','please Enter Valid Email-ID').isEmail(),
    body('name','please Enter Valid Username Length').isLength({min:5}),
    body('password','please Enter Valid Password Length').isLength({min:5})
] ,async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    // Check if the email already exists
   const existingUser = await User.findOne({ email: req.body.email });
   if (existingUser) {
    return res.status(400).json({ success: false, error: "Email already exists in the database" });
   }

    // Check if the username already exists
  const existingUsername = await User.findOne({ name: req.body.name });
  if (existingUsername) {
    return res.status(400).json({ success: false, error: "Username already taken, please try a new username" });
  }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password,salt)

    try {
      await User.create({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: secPassword
      });
  
      res.json({ success: true});
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });

router.post("/loginuser",[
    body('email','please Enter Valid Email-ID').isEmail(),
    body('password','please Enter Valid Password Length').isLength({min:5})
] ,async (req, res) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
     let email=req.body.email;
    try {
      let userdata=await User.findOne({email});
      if(!userdata){
        return res.status(400).json({success: false,error:"Try logging with correct credentials"})
      }

      const pwdCompare = await bcrypt.compare(req.body.password,userdata.password);

      if(!pwdCompare){
        return res.status(400).json({success: false,error:"Try logging with correct credentials"})
      }

      const data ={
          user:{
             id:userdata._id
          }
      }
      const authToken = jwt.sign(data,jwtSecret);
      return res.json({ success: true,authToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  });
  
module.exports=router;