var express = require('express');
var router = express.Router();
var {mongodb,MongoClient,dbUrl} = require('../dbSchema')
var {hashPassword} = require('../auth')


router.post('/signup',async(req,res)=>{
  const client=await MongoClient.connect(dbUrl);
  try{
    let db=await client.db('b31');
    let user=await db.collection('users').find({email:req.body.email});
    if(user.length>0){

  }else{
    let hashedPassword = await hashPassword(req.body.password);
    req.body.password = hashedPassword
    res.json({
      hashedPassword
    })
  }
  }catch(err){
    console.log(err);
  }
})

module.exports = router;
