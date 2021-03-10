/**
 * @description 个人主页 controller
 * @author me
 * */

const {SuccessModel,ErrorModel} = require("../db/model/ResModel");
const {getBlogListByUser} = require('../services/blog');

const pageSize = 5;
/**
 * 个人主页微博
 * @param{string} userName
 * @param{number} pageIndex  默认 0
 * */
async function getProfileList(userName,pageIndex = 0) {
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize
    })
    const blogList = result.blogList;

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getProfileList
}