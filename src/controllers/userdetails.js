const userModel = require('../models/userModel')

const jwt = require('jsonwebtoken');


const isValidEmail = function (email) {
    let checkemail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    if (checkemail.test(email)) {
        return true;
    }
    return false;
}

const isValidpassword = function (password) {

    let checkPassword = /^[a-zA-Z0-9!@#$%^&*]{8,15}$/
    if (checkPassword.test(password)) {
        return true
    }
    return false
}

const createuser = async function (req, res) {

    try {
        const userdata = req.body

        const {  email, password } = userdata



       
      

            if (!email) {
                return res.status(400).send({ status: false, msg: "Oops! you forgot to enter email address" })
            }

            if (!isValidEmail(email)) { return res.status(400).send({ status: false, msg: 'Please enter valid emailId' }) }
           

            let uniqueEmail = await userModel.findOne({ email: email })

            if (uniqueEmail) {
                return res.status(400).send({ status: false, msg: "Sorry! this email is already exists" })
            }


            if (!password) {
                return res.status(400).send({ status: false, msg: "Oops! you forgot to enter Password" })
            }

            if (!isValidpassword(password)) { return res.status(400).send({ status: false, msg: "password should be have minimum 8 character and max 15 character" }) }


        
     
        const finalData = await userModel.create(userdata);
        return res.status(201).send({ status: true, data: finalData })
    }
    
    catch (error) {
        console.log("this is the error ", error.message)
        res.status(500).send({ msg: error.message })

    }

}



const userLogin = async function (req, res) {

    const bodyData = req.body

    // if(Object.keys(bodyData) == 0){
    //     return res.send({status:false , msg:"Please Enter the Email & Password"})
    // }
    const username = req.body.email
    const password = req.body.password

    if (!username && !password) {
        return res.status(400).send({ status: false, msg: "Please Enter the Email & password" })
    } else {

        if (!username) {
            return res.status(400).send({ status: false, msg: "Please Enter the Email" })
        }

        let checkEmail =  isValidEmail(username)
        if (!checkEmail) {
            return res.status(400).send({ status: false, msg: "please enter the email address properly " })
        }

        if (!password) {
            return res.status(400).send({ status: false, msg: "Please Enter the Password" })
        }

    }

    console.log(username);
    const finduser = await userModel.findOne({ email: username, password: password })
    if (!finduser) {
        return res.status(404).send({ status: false, data: "Make sure your email & Password Correct. sorry No Author found Or Your Credentials are not Matched, Please Create Author first" })
    }


    const token = jwt.sign({
        userId: finduser._id.toString(),
        iat:Math.floor(Date.now() / 1000),
        exp:Math.floor(Date.now() / 1000) + 10*60*60

       
    }, "my-first-blog-project"
    )

    res.setHeader("x-api-key", token)
    return res.status(201).send({ status: true, data: token })

}




module.exports.userLogin = userLogin
module.exports.createuser= createuser