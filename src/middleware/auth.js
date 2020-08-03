const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async(req,res,next) =>{
    try{
        const token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token,'thisismynewcourse')
        const user = await User.findOne({
            _id: decoded._id,
            'tokens.token':token
        })
        if(!user){
            throw new Error()
        }
        req.token= token
        req.user = user //this will store the user who is logged in and the middleware won't need to search DB for token again and wasting its resources
        next()

    }catch(e){
        res.status(401).send({error:'Please authenticate.'})
    }
    
}

module.exports = auth