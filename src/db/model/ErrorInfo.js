/**
 * @description 失败信息集合，包括errno和message
 * @author me
 * */


module.exports = {

    //用户名存在
    registerUserNameExistInfo: {
        errno: 1001,
        message: '用户名存在'
    },

    //注册失败
    registerFailInfo: {
        errno: 1002,
        message: '注册失败,请重试'
    },
    //用户名不存在
    registerUserNameNotExistInfo: {
        errno: 1003,
        message: '用户名未存在'
    },
    loginFailInfo: {
        errno: 1004,
        message: '登录失败，用户名或密码错误'
    },
    loginCheckFailInfo: {
        errno: 1005,
        message: '您尚未登录'
    },
    changePasswordFailInfo: {
        errno: 1006,
        message: '修改密码失败，请重试'
    },
    uploadFileSizeFailInfo: {
        errno: 1007,
        message: '上传文件尺寸过大'
    },
    changeInfoFailInfo: {
        errno: 1008,
        message: '修改基本信息失败'
    },
    jsonSchemaFileInfo: {
        errno: 1009,
        message: '数据格式校验错误'
    },
    deleteUserFailInfo: {
        errno: 1010,
        message: '删除用户失败'
    },
    createBlogFailInfo: {
        errno: 1011,
        message: '创建微博失败'
    },
    addFollowerFailInfo: {
        errno: 1012,
        message: '添加关注失败'
    },
    deleteFollowerFailInfo: {
        errno: 1013,
        message: '添加关注失败'
    },

}