const jwt =require('jsonwebtoken')
const auth=(req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1]
        let decodeData=jwt.verify(token,'test')
        req.userId=decodeData?.id
        next()

    }
    catch(err){
        console.log(err)
    }
}
module.exports=auth;