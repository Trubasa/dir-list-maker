# dir-list-maker

> 生成树状的项目结构，并且可添加备注，方便新人接受或者理解项目。使用技术：vue，element-ui，nodejs。[demo](https://trubasa.github.io/dir-list-maker/dist/)

## 安装

``` bash
# 安装依赖
npm install
```

## 生成目录结构文件

修改项目下tools/dirListMaker/readDir.js文件的指定路径rootPath，改为你实际需要生成树状结构的项目绝对地址
```javascript
let rootPath = 'F:/svn_project/project-goodOrder/wx_app/foodOrder'
```
修改项目下tools/dirListMaker/markRule.js文件，配置备注设置
在终端运行命令生成dirList.json到static目录下
```javascript
const ruler = {
  menu: '菜单页面',
  utils: '工具集，一些公用的方法都放在这里',
  templates: "模板,功能与组件类似，但偏重于显示，不包含太多处理逻辑",
  components: "组件"
  //...
}
```

``` bash
npm run dir
```
在dirList.json已经包含文件目录信息

## 查看目录结构

``` bash
npm run dev
```
会将生成的dirList.json进行友好地展示

## 部署生成的目录结构
``` bash
npm run build
```
将项目进行打包，生成dist目录，将dist直接放到静态服务器里，即可直接访问
