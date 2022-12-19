const express = require('express')
const router = express.Router();
const userdetails=require('../controllers/userdetails')

const mw=require('../middlewares/auth')



router.get("/test",function(req,res){
    res.send("My first api for checking the terminal")
})




router.post('/login', userdetails.createuser)



router.all("/**", function (req, res) {
    res.status(400).send({
        status: false,
        msg: "Make Sure Your Endpoint is Correct or Not!"
    })
})

module.exports=router;