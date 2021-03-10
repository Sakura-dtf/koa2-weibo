/**
 * @description 微博At关系 services
 * @author me
 * */


const {formatBlog,formatUser} = require("./_format");
const { AtRelation, Blog, User } = require("../db/model/index");

/**
 * 创建微博关系
 * @param{number} blogId
 * @param{number} userId
 * */


async function creatAtRelation(blogId,userId) {
    const result = await AtRelation.create({
        userId,
        blogId
    })
    return result.dataValues;
}


/**
 * 获取@ 用户的微博列表
 * @param{number} userId
 * @param{number} pageIndex
 * @param{number} pageSize
 * */

async function getAtUserBlogList({userId,pageIndex,pageSize=5}){
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order:[
            ['id','desc']
        ],
        include: [
            {
                model: AtRelation,
                attributes: ['userId','blogId'],
                where: {
                    userId
                }
            },
            //User
            {
                model: User,
                attributes: ['userName','nickName','picture']
            }
        ]
    })

    //result.rows
    //result.count

    let blogList = result.rows.map(row => row.dataValues);
    blogList = formatBlog(blogList);
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues);
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

/**
 *
 * @param{Object} param1 更新内容
 * @param{Object} param2 条件
 * */

async function updateAtRelation(
    { newIsRead },   //要更新的内容
    { userId, isRead }    //条件
){
    //拼接更新内容
    const updateData = {};
    if(newIsRead){
        updateData.isRead = newIsRead
    }


    //拼接查询条件
    const whereData = {};

    if(userId){
        whereData.userId = userId
    }
    if(isRead){
        whereData.isRead = isRead
    }


    //执行更新

    const result = await AtRelation.update(updateData, {
            where: whereData
        }
    )
    return result[0] > 0
}


module.exports = {
    creatAtRelation,
    getAtUserBlogList,
    updateAtRelation
}