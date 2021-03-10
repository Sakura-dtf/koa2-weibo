/**
 * @description 微博 view 路由
 * @author me
 * */


const {makeAsRead} = require("../../controller/blog-at");
const {getAtMeCount,getAtMeBlogList} = require("../../controller/blog-at");
const {getHomeBlogList} = require("../../controller/blog-home");
const {getFans,getFollowers} = require("../../controller/user-relation");
const {getSquareBlogList} = require("../../controller/blog-square");
const {isExist} = require("../../controller/user");
const router = require('koa-router')();
const {loginRedirect} = require('../../middlewares/loginChecks');

const {getProfileList} = require('../../controller/blog-profile');

//首页
router.get('/',loginRedirect,async  (ctx,next) => {
    const userInfo = ctx.session.userInfo;
    const {id: userId} = userInfo;

    //获取粉丝

    const fansResult = await getFans(userId);
    const {count: fansCount,userList: fansList} = fansResult.data

    //获取关注人列表

    const followerResult = await getFollowers(userId);

    const {count: followerCount, followerList }  = followerResult.data;


    //获取首页的微博列表
    //controller
    //获取第一页数据

    const result = await getHomeBlogList(userId);

    const { isEmpty,blogList,pageSize,pageIndex,count} = result.data


    //获取当前@ 数量
    const atCountResult = await getAtMeCount(userId)

    const {count: atCount} = atCountResult.data;

    await ctx.render('index',{
        userData: {
            userInfo: userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followerCount,
                list: followerList
            },
            atCount
        },
        blogData:{
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
});

//个人主页
router.get('/profile',loginRedirect,async (ctx,next) => {
    const {userName} = ctx.session.userInfo;
    ctx.redirect(`/profile/${userName}`);
})

router.get('/profile/:userName',loginRedirect, async (ctx,next) => {
    //controller
    //获取第一页数据
    const {userName: curUserName} = ctx.params
    const result = await getProfileList(curUserName,0);


    //已登录信息
    const myUserInfo = ctx.session.userInfo
    const myUserName = myUserInfo.userName

    let curUserInfo

    const isMe = myUserName === curUserName;

    if(isMe) {
        //当前用户
        curUserInfo = myUserInfo
    }else {
        const existResult = await isExist(curUserName);

        if( existResult.errno !== 0){
            //用户名不存在
            return
        }
        curUserInfo = existResult.data
    }


    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data;

    //获取粉丝
    //controller


    const fansResult = await getFans(curUserInfo.id)

    const {count: fansCount,userList: fansList} = fansResult.data


    //获取关注人列表
    //controller
    const followerResult = await getFollowers(curUserInfo.id);

    const {count: followerCount, followerList }  = followerResult.data;
    //我是否关注了此人

    const amIFollowed = fansList.some( item => {
        return item.userName === myUserName
    })


    //获取当前@ 数量
    const atCountResult = await getAtMeCount(curUserInfo.id)

    const {count: atCount} = atCountResult.data;


    await ctx.render('profile',{
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
            amIFollowed,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followerCount,
                list: followerList
            },
            atCount
        }
    })


})




// 广场
router.get('/square', loginRedirect, async (ctx, next) => {
    // 获取微博数据，第一页
    const result = await getSquareBlogList(0)
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})


//atMe 路由

router.get('/at-me',loginRedirect,async (ctx,next) => {
    const {id:userId} = ctx.session.userInfo;

    //获取@ 数量
    const atCountResult = await getAtMeCount(userId);

    const {count: atCount} = atCountResult.data;

    //获取第一页列表

    const result = await getAtMeBlogList(userId);

    const { isEmpty, blogList, pageSize, pageIndex, count} = result.data;
    //渲染已读
    await ctx.render('atMe',{
        atCount,
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })

    //标记已读
    if(atCount > 0){
        await makeAsRead(userId)
    }
})

module.exports = router
