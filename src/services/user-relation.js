/**
 * @description user-relation services
 * @author me
 * */


const {User, UserRelation } = require('../db/model/index')

const {formatUser} = require('./_format');

const Sequelize = require('sequelize');
const {AtRelation} = require("../db/model/index");

/**
 * 获取关注该用户的用户列表，即改用户的粉丝
 * @param{number} followerId
 * */

async function getUsersByFollower(followerId) {
    const result = await User.findAndCountAll({
        attributes: ['id','userName','nickName','picture'],
        order: [
            ['id','desc']
        ],
        include: [
            {
                model: UserRelation,
                where: {
                    followerId,
                    userId: {
                        [Sequelize.Op.ne]: followerId     //不等于followerId
                    }
                }
            }
        ]
    })

    //result.count  总数
    //result.rows  查询结果  数字
    console.log(followerId);
    console.log(result);

    let userList = result.rows.map(row => row.dataValues);
    userList = formatUser(userList);

    console.log(userList);


    return {
        count: result.count,
        userList
    }
}




/**
 * 获取关注人列表
 * @param{number} userId
 * */

async function getFollowerByUser(userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id','desc']
        ],
        include: [
            {
                model: User,
                attributes: ['id','userName','nickName','picture']
            }
        ],
        where: {
            userId,
            followerId: {
                [Sequelize.Op.ne]: userId     //不等于userId
            }
        }
    })


    let userList = result.rows.map(item => {
        let user = item.user.dataValues;
        user = formatUser(user);
        return user
    });

    return {
        count: result.count,
        userList
    }
}


/**
 * 关注
 * @param{number} userId 用户id
 * @param{number} followerId  被关注用户id
 * */

async function addFollower(userId,followerId){
    const result = await UserRelation.create({
        userId,
        followerId
    })

    return result.dataValues
}

async function deleteFollower(userId,followerId){
    const result = await UserRelation.destroy({
        where:{
            userId,
            followerId
        }
    })

    console.log(result);

    return result > 0
}

/**
 * 获取@ 我 的用户微博数量
 * @param{number} userId 用户id
 * */
async function getAtRelationCount(userId){
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return result.count;
}

module.exports = {
    getUsersByFollower,
    addFollower,
    deleteFollower,
    getFollowerByUser,
    getAtRelationCount
}