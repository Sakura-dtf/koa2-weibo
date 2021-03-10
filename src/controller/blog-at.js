/**
 * @description 微博@ 关系 controller
 * @author me
 * */


const {updateAtRelation} = require("../services/atRelation");
const {getAtUserBlogList} = require("../services/atRelation");
const {SuccessModel} = require("../db/model/ResModel");
const {getAtRelationCount} = require("../services/user-relation");

/**
 * 获取 @ 我的数量
 * @param{number} userId
 * */
async function getAtMeCount(userId) {
    //
    const count = await getAtRelationCount(userId);
    return new SuccessModel({
        count
    })
}

/**
 * 获取 @ 的微博列表
 * @param{number} userId
 * @param{number} pageIndex
 * */

const pageSize = 5;
async function getAtMeBlogList(userId,pageIndex=0){
    const result = await getAtUserBlogList({userId,pageIndex,pageSize});
    const {count, blogList} = result

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize,
        pageIndex,
        count
    })
}


/**
 * 标记已读
 * @param{number} userId
 * */
async function makeAsRead(userId){
    //service
    try{
        await updateAtRelation(
            { newIsRead: true},
            { userId,isRead: false}
        )
    }catch (e) {
        console.error(e);

    }
    //不需要返回

}


module.exports = {
    getAtMeCount,
    getAtMeBlogList,
    makeAsRead
}