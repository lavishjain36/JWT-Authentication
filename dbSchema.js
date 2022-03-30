const mongodb=require('mongodb');
const MongoClient=mongodb.MongoClient;

let dbName='b31wd';

let dbUrl=`mongodb+srv://jainmonula:oGZuV5tBDycqxRuy@cluster0.ifjyy.mongodb.net/test?authSource=admin&replicaSet=atlas-xlfva8-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true`;

module.exports={mongodb,MongoClient,dbUrl}