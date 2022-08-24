const jwt =require('jsonwebtoken')
const dotenv = require('dotenv');
const ApiResponse = require('../routers/responses/ApiResponse');

//getting >env elements
dotenv.config()

class JWT{
     generateAccessToken(email) {
        return jwt.sign({user:email}, process.env.TOKEN_SECRET, 
            { expiresIn: '5m' });
    }

    authenticateToken=()=>(req,res,next)=>{
        const authHeader = req.headers['authentication']
        const token= authHeader && authHeader.split(' ')[1]

        if(token==null){
            res.status(500).json(new ApiResponse(false,null,"Token not found"))
        }else{
            jwt.verify(token,env.process.TOKEN_SECRET,(err,tokendata)=>{
                if(err)
                    res.status(200).json(new ApiResponse(false,null,"Invalid or Expired Token !"))
                else
                    req.user_email=tokendata.email
                    next()
            })
        }
    }
}


module.exports= new JWT();