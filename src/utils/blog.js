/**
 * @description 微博数据相关的工具方法
 * @author me
 * */

const ejs= require('ejs');
const fs = require('fs');
const path = require('path');


const BLOG_LIST_TPL = fs.readFileSync(
    path.join(__dirname,'..','views','widgets','blog-list.ejs')
).toString();

/**
 *  返回html字符串
 * @param{Array} blogList
 * @param {boolean} canReply
 * */

function getBlogListStr(blogList = [],canReply = false) {
    return ejs.render(BLOG_LIST_TPL,{
        blogList,
        canReply
    })
}

module.exports = {
    getBlogListStr
}