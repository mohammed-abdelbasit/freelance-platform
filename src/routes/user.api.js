const User = require('../models/User');
const express = require('express')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs') ;
const router = express.Router();


router.post('/signup',async (req,res)=>{
    try {
        const {username,userType,password,email,bio,avatar} = req.body;
        if (!(email && password && username)) {
            res.status(400).send("All input is required");
          }
        
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
          
          if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
        }

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            username,
            userType,
            password,
            email,
            bio,
            avatar,
            password: encryptedPassword,
        });

        // Create token
        const token = jwt.sign(
        { user_id: user._id, email },
        "SECRET",
        {
            expiresIn: "2h",
        }
        );
        // save user token
        
        // return new user
        res.status(201).json({user,token});
    } catch (error) {
        console.log(error)
        res.status(500).send("server error signup");
    }
})

router.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const email = req.body.email;
      const password = req.body.password;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({email});
  
      if (user) {
        const  passwordCorrect= await bcrypt.compare(password, user.password)
      if(passwordCorrect){
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            "SECRET"
          );
    
          // save user token
    
          // user
          res.status(200).json({user,token});
      }
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });


module.exports = router

