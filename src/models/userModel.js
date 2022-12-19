const mongoose = require('mongoose');


const userSchema = new mongoose.Schema( {
   
       email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
        // 'valid email': [validateEmail, 'Please fill a valid email address'],
        trim: true
                                                
    },
                         
    password: {
        type: String,
        require: true,
        trim: true
    }, 
    
 }, { timestamps: true });

module.exports = mongoose.model('User', userSchema)