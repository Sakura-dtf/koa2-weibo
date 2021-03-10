const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
const path = require('path');


const { REDIS_CONF } = require('./config/db');
const {SESSION_SECRET_KEY} = require('./config/secretKeys')

const AtAPIRouter = require('./routes/api/blog-at');
const squareAPIRouter = require('./routes/api/blog-square');
const profileAPIRouter = require('./routes/api/blog-profile')
const blogHomeAPIRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog');
const utilsAPIRouter = require('./routes/api/utils')
const userViewRouter = require('./routes/view/user');
const userAPIRouter = require('./routes/api/user')
const errorViewRouter = require('./routes/view/error');

// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(path.join(__dirname,'..', 'uploadFiles')))


app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))


app.keys = [SESSION_SECRET_KEY];  //密钥
app.use(session({
  key: 'weibo.sid',  //cookie的name 默认是 koa:sid
  prefix: 'weibo:sess',  //redis key 的前缀  默认是 koa:sess
  cookie: {
    path: '/',
    httpOnly: true,  //只允许服务端修改
    maxAge: 24 * 60 * 60 * 1000  //一天时间的过期时间
  },
  // ttl: 24 * 60 * 60 * 1000,
  store: redisStore({
    port: REDIS_CONF.port,
    host: REDIS_CONF.host,
    auth_pass: REDIS_CONF.password
  })
}))



// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes

app.use(AtAPIRouter.routes(),AtAPIRouter.allowedMethods())
app.use(squareAPIRouter.routes(),squareAPIRouter.allowedMethods())
app.use(profileAPIRouter.routes(),profileAPIRouter.allowedMethods())
app.use(blogHomeAPIRouter.routes(),blogHomeAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(),blogViewRouter.allowedMethods())
app.use(utilsAPIRouter.routes(),utilsAPIRouter.allowedMethods())
app.use(userViewRouter.routes(),userViewRouter.allowedMethods())
app.use(userAPIRouter.routes(),userAPIRouter.allowedMethods())
app.use(errorViewRouter.routes(),errorViewRouter.allowedMethods()) //404页面放最后面



let onerrorConf = {
  redirect: '/error'
}
onerror(app,onerrorConf)



// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
