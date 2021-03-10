/**
 * @description user API 路由
 * @author me
 * */


const router = require('koa-router')();

const {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    loginOut
} = require('../../controller/user');

const userValidator = require('../../validator/user');

const { genValidator } = require('../../middlewares/validator');

const { isTest } = require('../../utils/env');

const { loginCheck } = require('../../middlewares/loginChecks');

const {getFollowers} = require('../../controller/user-relation')

router.prefix('/api/user');


//注册
router.post('/register', genValidator(userValidator),async (ctx,next) => {
    const { userName, password, gender } = ctx.request.body;
    //controller
    ctx.body = await register({
        userName,
        password,
        gender
    })
})

//用户名是否存在
router.post('/isExist', async (ctx,next) => {

    const { userName } = ctx.request.body;
    // controller
    ctx.body = await isExist(userName);
})

//登录
router.post('/login', async (ctx,next) => {
    const { userName, password } = ctx.request.body;
    // controller
    ctx.body = await login(ctx,userName,password);

})


//删除
router.post('/delete', loginCheck ,async (ctx,next) => {
    //测试环境下删除自己
    if(isTest){
        const { userName } = ctx.session.userInfo
        //调用 controller
        ctx.body = await deleteCurUser(userName);
    }
})

//修改用户路由信息

router.patch('/changeInfo',loginCheck,genValidator(userValidator), async (ctx,next) => {
    const { nickName, city, picture } = ctx.request.body;


    //controller
    ctx.body = await changeInfo(ctx,{ nickName, city, picture });

})


//修改用户密码

router.patch('/changePassword',loginCheck,genValidator(userValidator), async (ctx,next) => {
    const { password,newPassword } = ctx.request.body;
    const { userName } = ctx.session.userInfo;

    //controller
    ctx.body = await changePassword(userName,password,newPassword);

})


//退出登录

router.post('/logout',loginCheck,async (ctx,next) => {
    //controller
    ctx.body = await loginOut(ctx);
})


//获取@ 列表

router.get('/getAtList',loginCheck,async (ctx,next) => {
    const {id: userId} = ctx.session.userInfo

    const result = await getFollowers(userId);

    const {followerList} = result.data;

    const list = followerList.map( user => {
        return `${user.nickName} - ${user.userName}`
    })
    //格式如 ['张三 - zhangsan']
    console.log(list);
    ctx.body = list;
})

module.exports = router