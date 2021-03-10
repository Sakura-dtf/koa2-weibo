/**
 * @description user 数据格式校验
 * @author me
 * */

const validator = require('./_validator');

const SCHEMA = {
    type: 'object',
    properties: {
        userName: {
            type: 'string',
            maxLength: 255,
            minLength: 2
        },
        password: {
            type: 'string',
            maxLength: 255,
            minLength: 3
        },
        newPassword: {
            type: 'string',
            maxLength: 255,
            minLength: 2
        },
        nickName:{
            type: 'string',
            maxLength: 255,
            minLength: 2
        },
        picture: {
            type: 'string',
            maxLength: 255,
        },
        city: {
            type: 'string',
            maxLength: 255,
            minLength: 2
        },
        gender: {
            type: 'number',
            minimum: 1,
            maximum: 3
        }
    }
}


//执行校验
/**
 * 校验用户数据格式
 * @param{Object} data
 * */

function userValidate(data= {}) {
    return validator(SCHEMA,data);
}


module.exports = userValidate