const express = require('express');
const router = express.Router();
const { signup,login } = require('../controllers/auth.controllers.js');
const {authenticate} = require("../middlewares/auth.middleware.js");

router.post('/signup',signup);
router.post('/login', login);

router.get('/me', authenticate,(req,res)=>{
    res.json({
        message: 'you are authenticated',
        user:req.user
    });
});
module.exports=router;
