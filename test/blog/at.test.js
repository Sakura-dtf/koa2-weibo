/**
 * @description 微博 at test
 * @author me
 */


const server = require('../server')


let COOKIE = '';

let BLOG_ID = '';


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

test('张三创建一条微博，@李四 ，应该成功',async () => {
    const content = '单元测试自动创建的微博 @李四 - lisi';
    const res = await server
        .post('/api/blog/create')
        .send({
            content
        })
        .set('cookie',COOKIE);
    expect(res.body.errno).toBe(0);
    BLOG_ID = res.body.data.id
})

