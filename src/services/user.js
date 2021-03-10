/**
 * @description user services
 * @author me
 * */


const {addFollower} = require("./user-relation");
const { User } = require('../db/model/index');

const doCrypto


    = require('../utils/cryp');
const {formatUser} = require('./_format');
/**
 * 获取用户信息
 * @param{string} userName
 * @param{string} password
 * */

async function getUserInfo(userName,password) {
    //查询条件
    const whereOpt = {
        userName
    }
    if(password){
        Object.assign(whereOpt,{password});
    }

    //查询

    const result = await User.findOne({
        attributes: ['id','userName','nickName','picture','city'],
        where: whereOpt
    })
    if(null == result){
        //未找到
        return result;
    }

    console.log(formatUser(result.dataValues));

    return  formatUser(result.dataValues)
}

/**
 * 创建用户
 * @param{string} userName 用户名
 * @param{string} password 密码
 * @param{string} nickName 昵称
 * @param{number} gender 性别
 * */



async function createUser({userName,password,gender = 3,nickName}){
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })

    const data = result.dataValues
    //自己关注自己,方便获取首页数据

    await addFollower(data.id, data.id);
    return data
}

/**
 * 删除用户
 * @param{string} userName 用户名
 * */


async function deleteUser(userName){
    const result = await User.destroy({
        where:{
            userName
        }
    })
    return  result > 0;
}

/**
 * 更新用户信息
 * @param{Object} param0 要修改的内容 { newPassword, newNickName, newPicture, newCity }
 * @param{Object} param1 查询条件 { userName, password}
 * */

async function updateUser(
    { newPassword, newNickName, newPicture, newCity },
    { userName, password}) {
    //拼接修改内容

    let updateData = {};
    if(newPassword){
        updateData.password = newPassword;
    }
    if(newNickName){
        updateData.nickName = newNickName;
    }
    if(newPicture){
        updateData.picture = newPicture;
    }
    if(newCity){
        updateData.city = newCity;
    }


    //拼接查询内容

    let whereData = {
        userName
    }
    if (password){
        whereData.password = password;
    }

    //执行修改

    const result = await User.update(updateData,{
        where:whereData
    })

    return result[0] > 0; //修改的行数
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}