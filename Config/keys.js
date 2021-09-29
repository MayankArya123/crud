if(process.env.NODE_ENV === 'production') {
    console.log('prod')
    module.exports=require('./prod')
}
else {
    module.exports = require('./dev')
    
    console.log('dev')
    }