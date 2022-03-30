var bcrypt = require('bcryptjs');
var saltRound=1;



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

module.exports={hashPassword,hashCompare}