/**
 * @description @ 用户关系，数据模型
 * @author me
 * */


const seq = require('../seq');

const { BOOLEAN , INTEGER } = require('../type');


const AtRelation = seq.define('atRelation',{
    userId:{
        type: INTEGER,
        allowNull: false,
        comment: '用户 id'
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: '微博 id'
    },
    isRead:{
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: '是否已读'
    }
})

module.exports = AtRelation