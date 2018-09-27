/**
 * Created by Trubasa 1141521502@qq.com on 2018/9/26.
 */
const fs = require('fs');
const path = require('path');
const markRule = require('./markRule')

let savePath = path.resolve('static')

let page = {
  readDir(path) {
    let dirList = fs.readdirSync(path);

    dirList = dirList.map((ele, index) => {
      let thisPath = path + '/' + ele;
      let pathInfo = fs.statSync(thisPath)  //路径信息
      let isDir = pathInfo.isDirectory();

      let isIgnore = /^\..*$/igm.test(ele);
      if (isIgnore) { //如果是要忽略的文件，则返回false
        return false;
      } else {
        dirList[index] = {
          name: ele,
          isDir: isDir,
          remark: markRule[ele] ? markRule[ele] : ''
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


let rootPath = 'F:/svn_project/project-goodOrder/wx_app/foodOrder'

let dirList = page.readDir(rootPath)

fs.writeFile(savePath + '/dirList.json', JSON.stringify(dirList, null, 2), function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('dirList.json生成成功');
})

console.log('finish')
