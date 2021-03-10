/**
 * @description json schema 验证中间件
 * @author me
 * */

const { ErrorModel } = require('../db/model/ResModel');

const { jsonSchemaFileInfo } = require('../db/model/ErrorInfo')
/**
 * 生成 json schema 验证的中间件
 * @param{function} validateFn 验证函数
 * */

function genValidator(validateFn) {
    async function validator(ctx,next) {
        //校验
        const data= ctx.request.body;
        const error = validateFn(data);
        if(error){
            //验证失败
            ctx.body = new ErrorModel(jsonSchemaFileInfo);
            return
        }
        await next()
    }
    return validator
}

module.exports = {
    genValidator
}