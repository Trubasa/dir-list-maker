/**
 * Created by Trubasa 1141521502@qq.com on 2018/9/26.
 */
const fs = require('fs');
const path = require('path');
let markRule = null;
const ignoreRule = require('./ignoreRule')

let savePath = path.resolve('static')
let dirListPath='/dirList'
let rulePath=path.resolve(__dirname,'../markRule')

let page = {
  getRuleList(){ //获取匹配规则列表
    let list=fs.readdirSync(rulePath);
    return list;
  },
  calculateList(){
    let list=fs.readdirSync(savePath+dirListPath);
    let ary=list.map((ele)=>{
      let data=JSON.parse(fs.readFileSync(savePath+dirListPath+'/'+ele).toString())
        ele={
          name:data.title,
          fileName:ele
        }
        return ele;
    });

    fs.writeFile(savePath+'/dirList.json',JSON.stringify(ary,null,2),function (err) {
      if (err) {
        return console.error(err);
      }
      console.log('dirList.json生成成功');
    })
  },
  saveDirList(saveName,data,resolve,reject){ //保存目录结构
    fs.writeFile(savePath + dirListPath+'/'+saveName+'.json', data, function (err) {
      if (err) {
        return console.error(err);
        if(reject){
          reject()
        }
      }
      console.log(saveName+'.json生成成功');
      if(resolve){
        resolve()
      }
    })

  },
  readDir(path) {  // 递归遍历目录
    let dirList = fs.readdirSync(path);

    dirList = dirList.map((ele, index) => {
      let thisPath = path + '/' + ele;
      let pathInfo = fs.statSync(thisPath)  //路径信息
      let isDir = pathInfo.isDirectory();

      let isIgnore = ignoreRule(ele);
      if (isIgnore) { //如果是要忽略的文件，则返回false
        return false;
      } else {
        dirList[index] = {
          name: ele,
          isDir: isDir,
          remark: markRule.ruler[ele] ? markRule.ruler[ele] : ''
        }
        if (isDir) {
          dirList[index].children = page.readDir(thisPath)
        }
        return dirList[index]
      }
    });
    dirList = dirList.filter((ele) => {  // 通过filter方法过滤到值为false 元素，这里为什么不直接在forEach使用splice(index,1)来删除元素，因为splice删除会影响原数组，同时会影响到foreach的结果
      return Boolean(ele)
    })
    dirList = dirList.sort(function (a, b) { //排序，文件夹排上
      var num1 = a.isDir ? 1 : 0
      var num2 = b.isDir ? 1 : 0
      return num2 - num1;
    })
    return dirList;
  }
}


let list=page.getRuleList(); //获取规则列表
let savePromise=[]

list.forEach((ele)=>{// 根据列表加载规则 ，生成目录结构，保存成json文件
  let thisPath = rulePath + '/' + ele;
  markRule=require(thisPath); //加载规则
  let dirList = page.readDir(markRule.path)
  let data={
    title:markRule.title,
    list:dirList
  }
  let saveName=ele.replace(/\..*/igm,'');

  savePromise.push(new Promise((resolve,reject)=> {
    page.saveDirList(saveName,JSON.stringify(data, null, 2),resolve,reject)
  }))

})
Promise.all(savePromise).then(function (results) {
  console.log('文件已经全部生成',results); // 获得一个Array: ['P1', 'P2']
  page.calculateList();  // 计算所有生成的json文件
});




console.log('finish')
