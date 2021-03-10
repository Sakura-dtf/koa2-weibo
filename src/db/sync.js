/**
 * @description sequelize 同步
 * @author me
 * */

const seq = require('./seq');

//引用数据模型
require('./model/index');

//测试连接
seq.authenticate().then( () => {
    console.log('auth ok');
}).catch( () => {
    console.log('auth err')
})


//执行同步

seq.sync({force: true}).then( () => {
    console.log('ok')
    process.exit();
})