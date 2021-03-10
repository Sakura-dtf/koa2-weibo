/**
 * @description 数据模型入口文件
 * @author me
 * */

const User = require('./User');
const Blog = require('./Blog');
const AtRelation = require('./AtRelation');
const UserRelation = require('./UserRelation');



Blog.belongsTo(User, {
    foreignKey: 'userId'
})


UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})


User.hasMany(UserRelation, {
    foreignKey: 'userId'
})



//外键因为被占用，数据库没有外键，但是sequelize还是可以连表查询
Blog.belongsTo(UserRelation,{
    foreignKey: 'userId',
    targetKey: 'followerId'
})

Blog.hasMany(AtRelation,{
    foreignKey: 'blogId'
})


module.exports = {
    User,
    Blog,
    UserRelation,
    AtRelation
}