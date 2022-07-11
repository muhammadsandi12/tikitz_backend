const jwt = require('jsonwebtoken')

const verifyAuth = ( req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send({message: "Unauthorized User, Token Required"})
    }else{ 
         jwt.verify(req.headers.authorization, process.env.JWT_SECRET_KEY, function(err, decode){
            if(err) res.send({
                message: 'Access Forbidden'
            })
            if(decode.role === process.env.ROLE_ADMIN){
                next()
            } else if(decode.role === process.env.ROLE_USER){
                res.send({message: 'Access Forbidden'})
            }

        })
    }
    
}

module.exports = verifyAuth