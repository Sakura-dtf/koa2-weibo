/**
 * @description 微博 model test
 * @author me
 * */

const { Blog } = require('../../src/db/model/index');

test('微博blog 模型的各个属性，符合预期', () => {
    const blog = Blog.build({
        //build 会构建一个内存的User 实例，不会提交到数据库中
        userId: 1,
        content: '微博内容',
        image: '/test.png'
    })

    //验证属性

    expect(blog.userId).toBe(1);
    expect(blog.content).toBe('微博内容');
    expect(blog.image).toBe('/test.png');
})
