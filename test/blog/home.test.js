/**
 * @description 首页 api test
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


test('创建一条微博，应该成功', async () => {

    const content = '单元测试的微博内容' + Date.now();
    const image = '/xxx.png';
    //开始测试

    const res = await server
        .post('/api/blog/create')
        .send({
            content,
            image
        })
        .set('cookie',COOKIE);
    expect(res.body.errno).toBe(0)
})


test('个人主页，加载第一页数据，应该成功',async () =>{
    const res = await server
        .get('/api/blog/loadMore/0')
        .set('cookie',COOKIE);
    expect(res.body.errno).toBe(0);
    const data = res.body.data
    expect(data).toHaveProperty('isEmpty')
    expect(data).toHaveProperty('blogList')
    expect(data).toHaveProperty('pageSize')
    expect(data).toHaveProperty('pageIndex')
    expect(data).toHaveProperty('count')
})


