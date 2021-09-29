const express = require('express')
const authenticate = require('../middleware/middleware')
const user = require('../Schemas/user')


const router = express.Router()


router.get('/user', async (req,res) =>{

console.log('home route hitting')


})



router.post('/user/create', async (req,res) =>{

console.log('user create route hitting',req.body)

const {username,password} = req.body

const newUser = user({
    username:username,
    password:password
})


try {

    const succs = await user.collection.insertOne(newUser)

    if(succs) {
        console.log('user created',succs)
        res.json(succs)
    }


}

 catch(err){
      console.log('error',err)
 }

})



router.get('/getAllUsers', async (req,res) =>{

// console.log(' get all users route hitting ',req.body)


try {

    const succs = await user.find()

    if(succs) {
        console.log('got all the users',succs)
        res.json(succs)
    }


}

 catch(err){
      console.log('error',err)
 }



})


router.post('/EditUserInformation', authenticate, async (req,res) =>{

// console.log(' get all users route hitting ',req.body)

try {

    const  {param} = req.body

    
console.log('seeing ',param)

    const succs = await user.find({_id:param})

    if(succs) {
        console.log('got the selected user',succs)
        res.json(succs)
    }


}

 catch(err){
      console.log('error',err)

 }



})


router.delete('/deleteTheUser', authenticate, async (req,res) =>{

console.log(' delete route hitting ')

try {

    const  {id} = req.body

// console.log('seeing ',req.body)

    const succs = await user.findOneAndDelete( {_id:id})

    if(succs) {
        console.log('deleted the user',succs)
        res.json(succs)
    }

}

 catch(err){
      console.log('error while deleting the user',err)
 }



})



router.put('/update',  authenticate, async (req,res) =>{

// console.log(' get all users route hitting ',req.body)

try {

    const  {username,password,param} = req.body

    
// console.log('seeing ',param)

    const succs = await user.findOneAndUpdate( {_id:param},{$set :{

        username:username,
        password:password

    } })

    if(succs) {
        console.log('updated the user',succs)
        res.json(succs)
    }


}

 catch(err){
      console.log('error',err)
 }



})

module.exports=router