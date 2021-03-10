/**
 * @description user controller
 * @author me
 * */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user')

const {SuccessModel, ErrorModel } = require('../db/model/ResModel');

const doCrypto = require('../utils/cryp')

const {registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo
} = require('../db/model/ErrorInfo')

/**
 * 用户名是否存在
 * @param {string} userName
 * */
async function isExist(userName) {
    //调用 services 获取数据
    //统一返回格式

    const userInfo = await getUserInfo(userName);

    console.log(userInfo);

    if(userInfo){
        //已存在
        return  new SuccessModel(userInfo);
    }else {
        return new ErrorModel(registerUserNameNotExistInfo)
    }
}


//解构穿参

/**
 * 注册
 * @param{string} userName 用户名
 * @param{string} password mim
 * @param{string} gender 性别 {1：男，2：女，3：保密}
 * */
async function register({userName,password,gender}){
    const userInfo = await getUserInfo(userName);

    if(userInfo) {
        //用户名已存在
        return new ErrorModel(registerUserNameExistInfo);
    }


    //注册 service

    try{
        await createUser({
            userName,
            password : doCrypto(password),
            gender
        })
        return new SuccessModel();
    } catch (e) {
        console.error(e.message,e.stack);
        return new ErrorModel(registerFailInfo)
    }
    
}

/**
 * 登录
 * @param{Object} ctx  koa2 ctx
 * @param{string} userName 用户名
 * @param{string} password 密码
 * */

async function login(ctx,userName,password){
    //登陆成功 ctx.session.userInfo = xxx

    const userInfo = await getUserInfo(userName,doCrypto(password))


    if(userInfo){
        //登录成功
        console.log(1);
        if(null == ctx.session.userInfo){
            ctx.session.userInfo = userInfo;
        }

        return new SuccessModel()
    }else {
        //登录失败
        console.log(2);
        return new ErrorModel(loginFailInfo);
    }
}


/**
 * 删除
 * @param{string} userName 用户名
 * */

async function deleteCurUser(userName){
    const result = await deleteUser(userName);
    console.log(result);
    if(result){
        return new SuccessModel()
    }else {
        return new ErrorModel(deleteUserFailInfo);
    }
}

/**
 * 修改信息
 * @param{Object} ctx koa2-ctx
 * @param{string} nickName 昵称
 * @param{string} city 城市
 * @param{string} picture 图片url地址
 * */


async function changeInfo(ctx,{ nickName, city, picture}){
    const { userName } = ctx.session.userInfo
    if(! nickName){
        nickName = userName
    }
    const result = await updateUser({
        newNickName : nickName,
        newCity: city,
        newPicture: picture
    },{
        userName
    })

    if(result){
        //执行成功
        //更新session
        Object.assign(ctx.session.userInfo,{
            nickName,
            city,
            picture
        })
        return new SuccessModel();
    }
    return new ErrorModel(changeInfoFailInfo)

}

/**
 * @param{string} userName
 * @param{string} password
 * @param{string} newPassword
 * */

async function changePassword(userName,password,newPassword){
    const result = await updateUser({
        newPassword:doCrypto(newPassword)
    },{
        userName,
        password:doCrypto(password)
    })

    if(result){
        return new SuccessModel()
    }
    return new ErrorModel(changePasswordFailInfo)
}

/**
 * @param{Object} ctx

 * */

async function loginOut(ctx){
    delete ctx.session.userInfo;
    return new SuccessModel();
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    loginOut
}