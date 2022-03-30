var express = require('express');
var router = express.Router();
var {mongodb,MongoClient,dbUrl} = require('../dbSchema')
var {hashPassword,hashCompare} = require('../auth')


router.post('/signup',async(req,res)=>{
  const client=await MongoClient.connect(dbUrl);
  try{
    let db=await client.db('b31');
    let user=await db.collection('users').find({email:req.body.email});
    if(user.length>0){

      res.json({
        "statusCode":400,
        "message":"User Already Exists"
      })
  }else{
    let hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword
    let user=await db.collection('users').insertOne(req.body);
    res.json({
      hashedPassword,
      statusCode: 200,
      message: 'User signup successfully'
    })
  }
  }catch(err){
res.json({
  statusCode: 500,
  message: 'Internal server error'
})
}
})





router.post('/signup',async(req,res)=>{
  const client=await MongoClient.connect(dbUrl);
  try{
    let db=await client.db('b31');
    let user=await db.collection('users').find({email:req.body.email});
    if(user.length>0){

      res.json({
        "statusCode":400,
        "message":"User Already Exists"
      })
  }else{
    let hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword
    let user=await db.collection('users').insertOne(req.body);
    res.json({
      hashedPassword,
      statusCode: 200,
      message: 'User signup successfully'
    })
  }
  }catch(err){
res.json({
  statusCode: 500,
  message: 'Internal server error'
})
}
})

// Login
router.post('/login',async(req,res)=>{
  const client=await MongoClient.connect(dbUrl);
  try{
    let db=await client.db('b31');
    let user=await db.collection('users').findOne({email:req.body.email});
    if(user){
      let compare=await hashCompare(req.body.password,user.password);
      if(compare){
        res.json({
          statusCode:200,
          role:user.role,
          email:user.email,
          firstname:user.firstname,
          message:'Login Successfully'
        })
      }
      else{
        res.json({
          statusCode:400,
          message:'Invalid Password'
        })
      }
  }else{
    res.json({
      statusCode:404,
      message:'User Not Found'
    })
  }
  }catch(err){
res.json({
  statusCode: 500,
  message: 'Internal server error'
})
}
})

module.exports = router;
