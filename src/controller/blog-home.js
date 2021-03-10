/**
 * @description 首页 controller
 * @author me
 * */


const {createBlogFailInfo} = require("../db/model/ErrorInfo");
const {SuccessModel, ErrorModel} = require("../db/model/ResModel");
const {createBlog,getFollowersBlogList} = require('../services/blog');

const xss = require('xss');
const {creatAtRelation} = require("../services/atRelation");
const {getUserInfo} = require("../services/user");
const {REG_FOR_AT_WHO} = require("../config/constant");

const pageSize = 5;

/**
 * 创建微博
 * @param{Object} param0 {userId,content,image}
 * */

async function create({userId,content,image}) {
    //service

    let atUserNameList = [];
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr,nickName,userName) => {
            atUserNameList.push(userName);
            return matchStr //替换不生效，但是能拿到用户名
        }
    )

    //根据@ 用户名查询用户信息

    const atUserList = await Promise.all(
        atUserNameList.map(userName => getUserInfo(userName))
    )

    //根据用户信息，获取用户id
    const atUserIdList = atUserList.map(user => user.id)


    try{
        //创建微博
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        });

        //创建@ 关系

        await Promise.all(atUserIdList.map(userId => creatAtRelation(blog.id,userId)))

        //返回

        return new SuccessModel(blog)

    }catch (e) {
        return new ErrorModel(createBlogFailInfo)
    }
}

/**
 * 获取首页微博列表
 * @param{number} userId
 * @param{number} pageIndex
 * */

async function getHomeBlogList(userId,pageIndex = 0){
    // service
    const result = await getFollowersBlogList({userId,pageIndex,pageSize});

    const {count, blogList} = result;

    //返回数据

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize,
        pageIndex,
        count
    })
}

module.exports = {
    create,
    getHomeBlogList
}