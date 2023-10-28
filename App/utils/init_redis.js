const redisDB = require('redis');
const redisClient = redisDB.createClient();
redisClient.connect();
redisClient.on("connect" , ()=> console.log('connecting to redis'))
redisClient.on("error" , (err)=> console.log('Redis error : ' , err.message))
redisClient.on("ready" , ()=> console.log('Connected to redis & ready to use'))
redisClient.on("end" , ()=> console.log('Disconnected from redis'))

module.exports = redisClient