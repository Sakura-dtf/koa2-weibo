/**
 * @description user-relation controller
 * @author me
 * */


const {addFollowerFailInfo,deleteFollowerFailInfo} = require("../db/model/ErrorInfo");
const {SuccessModel, ErrorModel} = require("../db/model/ResModel");
const {getUsersByFollower,addFollower,deleteFollower,getFollowerByUser} = require("../services/user-relation");

/**
 * 根据userId获取粉丝列表
 * @param{number} userId
 * */
async function getFans(userId) {
    //service

    const {count,userList} = await getUsersByFollower(userId)

    return new SuccessModel({
        count,
        userList
    })
}


/**
 * 关注
 * @param{number} myUserId
 * @param{number} curUserId
 * */

async function follow(myUserId,curUserId){
    //service

    try{
        const result = await addFollower(myUserId,curUserId);
        return new SuccessModel()
    }catch (e) {
        console.error(e.message)
        return new ErrorModel(addFollowerFailInfo);
    }
}


async function unFollow(myUserId,curUserId){
    //service

    const result = await deleteFollower(myUserId,curUserId);

    if(result){
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo);
}


/**
 * @param{number} userId
 * */
async function getFollowers(userId){
    //service
    const result = await getFollowerByUser(userId);
    const { count, userList } = result

    return new SuccessModel({
        count,
        followerList: userList
    })
}


module.exports = {
    getFans,
    follow,
    unFollow,
    getFollowers
}