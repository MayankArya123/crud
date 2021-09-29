const mongoose = require('mongoose')


const UserSchema = mongoose.Schema({

    username:{
        type:String
    },

    password:{
        type:String
    }
    ,
    tokens:{
        type:Array
    }
    

})

const user = mongoose.model('users',UserSchema)

module.exports=user