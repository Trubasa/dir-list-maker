# dir-list-maker

> 生成树状的项目结构，并且可添加备注，方便新人接受或者理解项目。支持筛选。

使用技术：vue，element-ui，nodejs。[例子demo](https://trubasa.github.io/dir-list-maker/dist/)

## 安装

``` bash
# 安装依赖
npm install
```

## 生成目录结构文件

在tools/markRule目录下的添加配置文件，请使用英文命名，不要添加特使符号的js文件
```javascript
const title = "在线商城项目"   // 项目名
const path = 'F:/svn_project/distribution-web'   // 该项目所在绝对地址
const ruler = {   // 备注规则
  "patch.css":"覆盖样式，有时候在项目源码里写上的样式在打包后会失效，则可在这里协商",
  qrCode:"生成二维码使用的插件",
  testJson:"测试时用到的一些数据静态数据",
  api:'网络请求全局处理方法',
  assets:"放一些通用的工具、样式、文件",
  "bus.js":"vue项目里，用于垮组件层级进行数据传递",
  "common.js":"可复用的一些方法",
  "myComponents.js":"用于注册自己编写的vue组件与页面",
  build:'开发、打包配置',
  config:'开发、打包配置',
  //......
 }
```
如果有需要，可配置tools/dirListMaker/ignoreRule.js文件，过滤掉不需要显示的文件或者目录，默认过滤掉隐藏文件和node_module文件夹

在终端运行命令生成文件目录结构的.json文件到到static/dirList目录下,文件名与markRule里的文件名一致
``` bash
npm run dir
```


## 查看目录结构

``` bash
npm run dev
```
会将生成的目录结构的.json文件进行友好地展示

## 部署生成的目录结构
``` bash
npm run build
```
将项目进行打包，生成dist目录，将dist直接放到静态服务器里，即可直接访问
