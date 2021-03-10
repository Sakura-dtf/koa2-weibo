/**
 * @description 连接redis的方法 get  set
 * */

const redis = require('redis');

const { REDIS_CONF } = require('../config/db');

//创建客户端

const redisClient = redis.createClient({
    port: REDIS_CONF.port,
    host: REDIS_CONF.host,
    auth_pass: REDIS_CONF.password
});


redisClient.on('error',err => {
    console.log('redis error', err);
})



/**
 * redis get
 * @param {String} key  键
 * */

function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err);
            }
            if (null == val) {
                resolve(null);
                return
            }
            try {
                resolve(JSON.parse(val))
            } catch (e) {
                resolve(val);
            }
        })
    })
}



/**
 * redis set
 * @param {String} key  键
 * @param {String} val  值
 * @param {number} timeout 过期时间
 * */
function set(key,val,timeout = 60 * 60) {
    if (typeof  val === 'object'){
        val = JSON.stringify(val);
    }
    redisClient.set(key,val);
    redisClient.expire(key,timeout);
}

module.exports = {
    set,
    get
}
