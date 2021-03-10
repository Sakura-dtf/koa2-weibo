/**
 * @description 微博广场 controller
 * @author me
 * */

const {getSquareCacheList} = require("../cache/blog");
const {SuccessModel,ErrorModel} = require("../db/model/ResModel");
const {getBlogListByUser} = require('../services/blog');

const pageSize = 5;


/**
 * 获取广场的微博列表
 * @param{number} pageIndex
 * */
async function getSquareBlogList(pageIndex = 0) {

    //cache
    const result = await getSquareCacheList(pageIndex,pageSize);

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
    getSquareBlogList
}