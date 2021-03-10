/**
 * @description user json schema 校验
 * @author me
 * */


const Ajv = require('ajv');

const ajv = new Ajv({
    // allErrors: true  //输出所有的错误(比较慢)
});


/**
 * json schema 校验
 * @param{Object} schema 校验规则
 * @param{Object} data  待校验的数据
 * */
function _validator(schema, data={}) {
    const valid = ajv.validate(schema,data);
    if(!valid){
        return ajv.errors[0]
    }
}

module.exports = _validator