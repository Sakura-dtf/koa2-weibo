/**
 * @description 个人主页 test
 * @author me
 */


const server = require('../server')


let COOKIE = '';


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
    console.log(COOKIE);
})


test('个人主页，加载第一页数据，应该成功',async () =>{
    const res = await server
        .get('/api/profile/loadMore/zhangsan/0')
        .set('cookie',COOKIE);
    expect(res.body.errno).toBe(0);

    const data = res.body.data

    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})