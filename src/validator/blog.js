/**
 * @description 微博 数据格式校验
 * @author me
 * */

const validator = require('./_validator');


const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string'
        },
        image: {
            type: 'string',
            maxLength: 255
        }
    }
}


//执行校验
/**
 * 校验博客数据格式
 * @param{Object} data
 * */

function blogValidate(data= {}) {
    return validator(SCHEMA,data);
}


module.exports = blogValidate