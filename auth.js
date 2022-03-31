var bcrypt = require('bcryptjs');
const req = require('express/lib/request');
var saltRound=10;
var JWT  = require('jsonwebtoken');
var JWTD = require('jwt-decode')
var secret = "snkjdsknfjbekjb@#$mnkj*&153"




var hashPassword=async (pwd)=>{
    let salt=await bcrypt.genSalt(saltRound);
    console.log(salt);
    let hash=await bcrypt.hash(pwd,salt);
    return hash;
}


var hashCompare=async(pwd,hash)=>{
    let result=await bcrypt.compare(pwd,hash);
    return result;
}


var createToken=async(email,firstname,role)=>{
    let token=await JWT.sign({
        email,
        firstname,
        role,
    },
    secret,
    {
        expiresIn: '1m'
    }
    )
    return token;

}


var verifyToken=async(req,res,next)=>{
    let decodeData=JWTD(req.headers.token)
    // console.log(decodeData);
    if(new Date()/1000<decodeData.exp){
        next()
    }
    else{
        res.json({
            statusCode:400,
            message:'Session Expired.Login Again'
        })
    }
    
    // return true;
    
}


var verifyRole=async(req,res,next)=>{
    let decodeData=JWTD(req.headers.token)
    if(decodeData.role==1){
        next()
    }
    else{
        res.json({
            statusCode:401,
            message:'Only Admin can access site'
        })
    }
}
module.exports={hashPassword,hashCompare,createToken,verifyToken,verifyRole}