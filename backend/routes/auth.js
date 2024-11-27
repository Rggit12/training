const express = require('express');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = "Heloodwfjwbedgversecretkeytokenforsecurity"

// Create a user using : POST "api/auth". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 character').isLength({ min: 5 }),

], async (req, res) => {

    let success = false;
    // validate the request body or json passed in request.
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.json({success: success, errors: error.array() })
    }

    try {

        // check wether the user with this email exist.
        let user = await User.findOne({ email: req.body.email })

        // If email is already used then return status 400.
        if (user) {
            return res.status(400).json({success: success, errors: 'A user already exists with this e-mail address' })
        }

        const salt = await bcrypt.genSalt(10);
        const securedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user with new email.
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securedPassword,
        });

        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({success: success, authToken});

    }
    catch (error) {
        console.error(error.message)
        res.status(500).send('Some error occured!!');
    }

})

// authenticate a user using : POST "api/auth". No login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),

], async (req, res) => {

    let success = false;
    // validate the request body or json passed in request.
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.json({success:success, errors: error.array() })
    }

    const {email, password} = req.body;

    try {

        // check wether the user with this email exist.
        let user = await User.findOne({ email: email})

        // If email is already used then return status 400.
        if (!user) {
            return res.status(400).json({success: success, errors: 'please try to login with correct credentials' })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(400).json({success, error:'please try to login with correct credentials'})
        }

        const data = {
            user:{
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET)

        success = true;
        res.json({success, authToken});

    }
    catch (error) {
        console.error(error.message)
        res.status(500).send('Interval server error!!');
    }

})


// Get loggedin user details : POST "api/auth/getuser". login required
router.post('/getuser', fetchuser, async (req, res) => {


    try{
        const userId = req.user.id
        const user = await User.findById(userId)
        res.send(user);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send({error: 'Internal Server error'})

    }
})

module.exports = router 