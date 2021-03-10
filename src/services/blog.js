/**
 * @description 微博 services
 * @author me
 * */


const {formatBlog} = require("./_format");
const { Blog,User,UserRelation } = require('../db/model/index')
const {formatUser} = require('./_format');

/**
 * 创建微博
 * @param{Object} param1
 * */
async function createBlog({userId,content,image}){
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues;
}

/**
 * 根据用户获取微博列表
 * @param{Object} param1 查询参数
 * */

async function getBlogListByUser(
    {userName, pageIndex = 0, pageSize = 5}
) {
    //拼接查询条件

    const userWhereOps = {};

    if( userName){
        userWhereOps.userName =userName;
    }

    //执行查询

    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id','desc']
        ],
        include: [
            {
                model: User,
                attributes: ['userName','nickName','picture'],
                where: userWhereOps
            }
        ]
    })

    //result.count 总数， 跟分页无关
    //result.row  查询结果，数组

    let blogList = result.rows.map(row => row.dataValues)

    blogList = formatBlog(blogList);

    blogList = blogList.map( blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues);
        return blogItem;
    })

    return {
        count: result.count,
        blogList
    }
}


/**
 * 获取关注者的微博列表（首页）
 * @param{Object} param1 {userId,pageIndex =0,pageSize = 5}*/
async function getFollowersBlogList({userId,pageIndex =0,pageSize = 5}){
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id','desc']
        ],
        include:[
            {
                model: User,
                attributes: ['userName','nickName','picture']
            },
            {
                model: UserRelation,
                attributes: ['userId','followerId'],
                where: {
                    userId
                }
            }
        ]
    })

    console.log(result.rows);

    //result.count 总数， 跟分页无关
    //result.row  查询结果，数组
    let blogList = result.rows.map(row => row.dataValues);

    blogList = formatBlog(blogList);

    blogList = blogList.map( blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues);
        return blogItem;
    })

    console.log(blogList);
    console.log(1111)
    return {
        count: result.count,
        blogList
    }

}

module.exports = {
    createBlog,
    getBlogListByUser,
    getFollowersBlogList
}