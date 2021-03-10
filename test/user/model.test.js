/**
 * @description user model test
 * @author me
 * */

const { User } = require('../../src/db/model/index');

test('User 模型的各个属性，符合预期', () => {
    const user = User.build({
        //build 会构建一个内存的User 实例，不会提交到数据库中
        userName: 'zhangsan',
        password: '123123',
        nickName: '张三',
        //gender: 3, //默认3
        picture: '/xxx.png',
        city: '北京'
    })

    //验证属性

    expect(user.userName).toBe('zhangsan');
    expect(user.password).toBe('123123');
    expect(user.nickName).toBe('张三');
    expect(user.gender).toBe(3);
    expect(user.picture).toBe('/xxx.png');
    expect(user.city).toBe('北京');
})
