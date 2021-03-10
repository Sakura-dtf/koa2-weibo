/**
 * @description 通用 API
 * @author me
 * */


const {loginCheck} = require("../../middlewares/loginChecks");
const router = require('koa-router')();
const koaForm = require('formidable-upload-koa');
const {saveFile} = require("../../controller/utils");

router.prefix('/api/utils');


//上传图片

router.post('/upload',loginCheck,koaForm(),async (ctx,next) => {
    const file = ctx.req.files['file'];  //获取文件

    console.log(file);

    const {size,path,name,type} = file;
    //controller

    if(!file){
        return //返回404
    }

    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path
    })
})

module.exports = router;