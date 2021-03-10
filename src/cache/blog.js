/**
 * @description 微博缓存
 * @author me
 * */


const {get,set} = require('./_redis')

const { getBlogListByUser } = require('../services/blog');

const KEY_PREFIX = 'weibo:square'  //redis key 前缀

/**
 * 获取广场缓存列表
 * @param{number} pageIndex 页数
 * @param{number} pageSize 每页数量
 * */

async function getSquareCacheList(pageIndex,pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

    //获取缓存

    const cacheResult = await get(key)
    if(null != cacheResult){
        //获取成功
        return cacheResult;
    }

    //没有缓存,则读取数据库
    const result = await getBlogListByUser(pageIndex, pageSize)

    //设置缓存 过期时间
    set(key,result,60);


    return result
}


module.exports = {
    getSquareCacheList
}