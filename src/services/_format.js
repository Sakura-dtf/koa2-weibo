/**
 * @description 数据格式化
 * @author me
 * */

const moment = require('moment');
const {REG_FOR_AT_WHO} = require("../config/constant");

function _formatUserPicture(obj) {
    if(null == obj.picture){
        obj.picture = '/images/1.jpg';
    }
    return obj;
}


//格式化时间

function _formatDate(date) {
    return moment(new Date(date)).format('MMMM Do YYYY, h:mm:ss a')
}


/**
 * 格式化用户信息
 * @param{Array|Object} list
 * */

function formatUser(list) {
    if(null == list){
        return list;
    }

    if(list instanceof Array){
        //用户列表
        return list.map(_formatUserPicture);
    }

    //单个对象
    return  _formatUserPicture(list);

}


/**
 * 格式化数据的时间
 * @param {Object} obj 数据
 */
function _formatDBTime(obj) {
    obj.createdAtFormat = _formatDate(obj.createdAt)
    obj.updatedAtFormat = _formatDate(obj.updatedAt)
    return obj
}


/**
 * 格式化微博内容
 * @param {Object} obj 数据
 */
function _formatContent(obj) {
    obj.contentFormat = obj.content;
    //格式化 @

    //‘哈喽 @张三-zhangsan 你好’
    //替换成‘哈喽<a herf="/profile/zhangsan">张三</a> 你好’
    obj.contentFormat = obj.contentFormat.replace(
        REG_FOR_AT_WHO,
        (matchStr,nickName,userName) => {
            return `<a href="/profile/${userName}">@${nickName}</a>`
        }
    )

    return obj
}
/**
 * 格式化微博信息
 * @param {Array|Object} list 微博列表或者单个微博对象
 */
function formatBlog(list) {
    if (list == null) {
        return list
    }

    if (list instanceof Array) {
        // 数组
        return list.map(_formatDBTime).map(_formatContent);
    }
    // 对象
    let result = list
    result = _formatDBTime(result);
    result = _formatContent(result);
    return result
}


module.exports = {
    formatUser,
    formatBlog
}