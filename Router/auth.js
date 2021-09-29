const express = require('express')
const user = require('../Schemas/user')
const jwt = require('jsonwebtoken')

const {JWT_SECRET} = require('../Config/keys')
const authenticate = require('../middleware/middleware')

const router = express.Router()


router.post('/login', async(req,res)=>{


    console.log('login route hitting')

    const {username,password} = req.body

    console.log('req.body',req.body)

try {

const succs =  await user.collection.findOne({username:username})


if(!succs) {


    console.log('in else')

    res.status(202).json({msg:'this username is not registered with us'})
    console.log('inside')

    // res.json({msg:'this username already registered with us please create a new one'})


}

else {

   
    if(succs.password === password) {

        // res.json({msg:'user logged in'})

    const jsonwebtoken  =  jwt.sign({_id:succs._id},JWT_SECRET)

    if(jsonwebtoken) {

console.log('json web token created succsfully')

const tokenDetails ={

    token:jsonwebtoken

}

const tokenAdded = await user.collection.updateOne(  {_id:succs._id} ,{ $push :{
    tokens:tokenDetails
} }  )


if(tokenAdded) {
    console.log('token added succesfully')

    res.cookie('jstoken',jsonwebtoken,{
        expires:new Date( Date.now() + 1200000),
        sameSite:true
    })

    res.json({msg:'logged in'})


}

      }

      }

      else {

        res.status(202).json({msg:'please enter the write password'})

      }



}




}

catch(err){


}


})



router.delete('/logout',(req,res)=>{


console.log('logout route hitting')

res.clearCookie('jstoken')

res.json({msg:'logout successfully'})


})




router.get('/LoggingCheck',authenticate ,(req,res)=>{


console.log('loggingcheck route hitting')

res.json(req.rootUser)


})


module.exports = router