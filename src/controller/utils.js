/**
 * @description utils controller
 * @author me
 * */

const path = require('path');
const {uploadFileSizeFailInfo} = require("../db/model/ErrorInfo");
const {ErrorModel, SuccessModel} = require("../db/model/ResModel");
const MAX_SIZE = 1024 * 1024 * 1024   //最大体积是 1M

const fse = require('fs-extra');


const DIST_FOLDER_PATH = path.join(__dirname,'..','..','uploadFiles')

//是否需要创建目录
fse.pathExists(DIST_FOLDER_PATH).then( exist => {
    if(!exist) {
        fse.ensureDir(DIST_FOLDER_PATH);
    }
})


/**
 * 保存文件
 * @param{string} name 文件名
 * @param{string} type 文件类型
 * @param{number} size 文件体积大小
 * @param{string} filePath 文件路径
 * */

async function saveFile({name,type,size,filePath}) {


    if(size > MAX_SIZE){
        await fse.remove(filePath); //删除文件
        return new ErrorModel(uploadFileSizeFailInfo)
    }
    //移动文件

    const fileName = Date.now() + '.' + name; //防止重名

    const distFilePath = path.join(DIST_FOLDER_PATH,fileName); //目的地址

    await fse.move(filePath,distFilePath);  //移动文件

    return new SuccessModel({
        url: '/' + fileName
    })

}


module.exports = {
    saveFile
}