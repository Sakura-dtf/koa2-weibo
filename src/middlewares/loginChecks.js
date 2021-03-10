/**
 * @description 登录验证的中间件
 * @author me
 * */

const { ErrorModel } = require('../db/model/ResModel');
const { loginCheckFailInfo } = require('../db/model/ErrorInfo');

/**
 * API 登录验证
 * @param{Object} ctx ctx
 * @param{function} next next
 * */
async function loginCheck(ctx,next) {
    if(ctx.session && ctx.session.userInfo){
        await next()
        return ;
    }
    //未登录
    ctx.body = new ErrorModel(loginCheckFailInfo);
}


/**
 *  页面登录验证
 * @param{Object} ctx ctx
 * @param{function} next next
 * */
async function loginRedirect(ctx,next) {
    if(ctx.session && ctx.session.userInfo){
        await next();
        return
    }
    //未登录

    const curUrl = ctx.url;
    ctx.redirect('/login?url= ' +encodeURIComponent(curUrl))

}

module.exports = {
    loginCheck,
    loginRedirect
}