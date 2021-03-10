/**
 * @description sequelize 实例
 * @author me
 * */


const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../config/db');

const { host, user, password, database } = MYSQL_CONF;

const { isProd,isTest } = require('../utils/env');
/**
 * 连接池
 * */

const config = {
    host,
    dialect: 'mysql'
}


if(isProd){
    //线上环境，使用连接池
    config.pool = {
        max: 5, //连接池最大数量，
        min: 0, //最小连接数量
        idle: 10000   //10没有使用就会被释放
    }
}


if(isTest){
    config.logging = () => {}  //测试时不打印log日志
}


const seq = new Sequelize(database,user,password,config);


module.exports = seq;
