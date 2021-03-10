/**
 * @description 用户关系 test
 * @author me
 */


/**
 * @description 个人主页 test
 * @author me
 */


const server = require('../server')

const {getFans,getFollowers} = require('../../src/controller/user-relation')

let COOKIE = '';

const testUser ={
    lisiId: 2,
    lisiUserName: 'lisi'
}

const User = {
    userId: 1,
    userName: 'zhangsan '
}




test('登录，应该成功', async () => {
    const res = await server
        .post('/api/user/login')
        .send({
            userName: 'zhangsan',
            password: '123456'
        })
    expect(res.body.errno).toBe(0)

    // 获取 cookie
    COOKIE = res.headers['set-cookie'].join(';');
})

//先让张三取消关注李四（为了避免选择张三关注了李四）
test('无论如何，先取消关注，应该成功', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({userId: testUser.lisiId})
        .set('cookie',COOKIE);

    expect(1).toBe(1);
})

//添加关注

test('张三关注李四，应该成功',async () => {
    const res = await server
        .post('/api/profile/follow')
        .send({userId: testUser.lisiId})
        .set('cookie',COOKIE);
    console.log(33333)
    console.log(res.body);
    expect(res.body.errno).toBe(0)
})

//获取fans

test('获取李四的粉丝，应该有张三', async () => {
    const result = await getFans(testUser.lisiId);
    const { count,  userList: fansList} = result.data
    console.log(result)
    console.log(result.data);
    const hasUserName = fansList.some( fanInfo => {
        return fanInfo.userName === User.userName
    })
    expect(count > 0).toBe(true);
    expect(hasUserName).toBe(true);
})

test('获取张三的关注人，应该有李四',async () => {
    const result = await getFollowers(User.userId);
    const { count, followerList} = result.data;
    console.log(result.data);
    const hasUserName = followerList.some( followerInfo => {
        return followerInfo.userName === testUser.lisiUserName
    })
    expect(count > 0).toBe(true);
    expect(hasUserName).toBe(true);
})


//获取@ 列表

test('获取张三的@ 列表，应该成功', async () => {
    const res = await server
        .get('/api/user/getAtList')
        .set('cookie',COOKIE)
    const atList = res.body;
    const hasUserName = atList.some(item => {
        //昵称 - userName
        return item.indexOf(`- ${testUser.lisiUserName}`)>0;
    })
    expect(hasUserName).toBe(true);
})


//取消关注

test('张三取消关注李四，应该成功', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({userId: testUser.lisiId})
        .set('cookie',COOKIE);

    expect(res.body.errno).toBe(0);
})