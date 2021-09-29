const user = require('../Schemas/user')
const jwt = require('jsonwebtoken')

const {JWT_SECRET} = require('../Config/keys')

const authenticate = async(req,res,next)=>{
    


try{

    
   console.log('seeing hhhhhhhhhhhhhhhhhhhhhhhhhhhh ',req.cookies)

   const {jstoken} =req.cookies

   const verifyToken = jwt.verify(jstoken,JWT_SECRET)



   if(verifyToken) {

    console.log('in verifyToken',verifyToken)
    
           const rootUser = await user.findOne( { _id:verifyToken._id ,"tokens.token":jstoken})

           req.rootUser = rootUser
           req.userID=rootUser._id

           next()

   }


}

catch(err) {

console.log('unauthorized')
res.status(401).json({message:'unauthorized'})

}



}


module.exports = authenticate
