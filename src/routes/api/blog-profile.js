/**
 * @description 个人主页 API 路由
 * @author me
 * */


const {follow,unFollow} = require("../../controller/user-relation");
const {getProfileList} = require("../../controller/blog-profile");
const {loginCheck} = require("../../middlewares/loginChecks");
const router = require('koa-router')()
const {getBlogListStr} = require('../../utils/blog');

router.prefix('/api/profile')


//加载更多


router.get('/loadMore/:userName/:pageIndex',loginCheck ,async (ctx, next) => {
    let { userName, pageIndex } = ctx.params;
    pageIndex = parseInt(pageIndex);
    const result = await getProfileList(userName,pageIndex);
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result;
})



router.post('/follow',loginCheck,async (ctx,next) => {
    const {id: myUserId } = ctx.session.userInfo;

    const {userId: curUserId } =ctx.request.body;


    //controller
    ctx.body = await follow(myUserId,curUserId);

})

router.post('/unFollow',loginCheck,async (ctx,next) => {
    const {id: myUserId } = ctx.session.userInfo;

    const {userId: curUserId } =ctx.request.body;


    //controller
    ctx.body = await unFollow(myUserId,curUserId);

})



module.exports = router