/**
 * @description 404路由
 * @author me
 * */


const router = require('koa-router')();

//error

router.get('/',async (ctx,next) => {
    ctx.body = 'string';
})

router.get('/a',async (ctx,next) => {
    await ctx.render('error');
})


//404
router.get('*',async (ctx,next) => {
    await ctx.render('404');
})


module.exports = router