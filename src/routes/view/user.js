/**
 * @description user view 路由
 * @author me
 * */

const { loginRedirect } = require("../../middlewares/loginChecks");
const router = require('koa-router')();



/**
 * @param{Object} ctx koa2 ctx
 * */


function getLoginInfo(ctx){
    let data = {
        isLogin: false,  //默认未登录
    }
    const userInfo = ctx.session.userInfo

    if(userInfo){
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }
    return data;
}

router.get('/login',async (ctx,next) => {
    await ctx.render('login',getLoginInfo(ctx))
})

router.get('/register',async (ctx,next) => {
    await ctx.render('register',getLoginInfo(ctx))
})

router.get('/setting',loginRedirect,async (ctx,next) => {
    console.log(ctx.session.userInfo);
    await ctx.render('setting',ctx.session.userInfo)
})


module.exports = router