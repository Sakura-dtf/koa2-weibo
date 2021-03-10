/**
 * @description 首页 API 路由
 * @author me
 * */


const {genValidator} = require("../../middlewares/validator");
const {create} = require("../../controller/blog-home");
const router = require('koa-router')()
const {loginCheck} = require('../../middlewares/loginChecks')
const blogValidate = require('../../validator/blog')
const {getBlogListStr} = require("../../utils/blog");
const {getHomeBlogList} = require("../../controller/blog-home");

router.prefix('/api/blog')

router.post('/create',loginCheck, genValidator(blogValidate), async (ctx,next) => {
    const { content, image} = ctx.request.body;

    const { id:userId } = ctx.session.userInfo;

    ctx.body = await create({userId,content,image});
})



//加载更多

router.get('/loadMore/:pageIndex',loginCheck ,async (ctx, next) => {
    let { pageIndex } = ctx.params;
    const {id:userId} = ctx.session.userInfo
    pageIndex = parseInt(pageIndex);
    const result = await getHomeBlogList(userId,pageIndex);
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result;
})


module.exports = router