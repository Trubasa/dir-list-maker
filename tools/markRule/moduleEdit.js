/**
 * Created by Trubasa 1141521502@qq.com on 2018/9/26.
 */
// const path='F:/svn_project/project-goodOrder/wx_app/foodOrder'
const title = "moduleEdit"
const path = 'F:/svn_project/distribution-web'
const ruler = {
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
  "index.js":"可配置开发模式的代理服务，实现前后端分离开发。配置打包后的文件名等。",
  src:'源码',
  components:"组件",
  pages:"页面",
  store:"Vuex的配置，管理全局变量",
  router:"vue-router的配置，管理spa的路由，可查看该文件确定所有页面的跳转路径与对应文件",
  "App.vue":"页面主文件，所有编写的页面代码最终通过该文件挂载到index.hml上",
  "main.js":"spa应用的主文件，在该文件里引入各种依赖",
  static:"静态资源目录",
  gaodeMap:'项目里使用的高德地图，来自于该目录下',
  "home.vue":"首页",
  "map.vue":"(废弃)",
  "myContent.vue":"",
  "myPage.vue":"",
  "vicinity.vue":"附近的店铺",
  "shopProfile.vue":"店铺详情",
  "goodDetail.vue":"商品详情",
  "myAddress.vue":"地址管理",
  "shoppingCart.vue":"购物车",
  "shop.vue":"商城",
  "search.vue":"搜索页（废除）",
  "orderMake.vue":"下订",
  "allOrder.vue":"我的订单",
  "earning.vue":"我的收益",
  "subordinate.vue":"我的下级",
  "manageOrder.vue":"订单管理（经销商）",
  "apply.vue":"代理申请",
  "audit.vue":"代理审核（经销商）",
  "changeBoss.vue":"更改经销商，代理更换经销商，填写相关信息的页面",
  "myCustomer.vue":"我推广的用户",
  "qrCodeByServer.vue":"我的二维码",
  "allCustomer.vue":"平台用户",
  "B2BorderMake.vue":"b2b下订",
  "selectBoss.vue":"选择经销商，用户进入微店的时候，若没有所属经销商的时候可在该页面选择",
}

module.exports = {
  title,
  path,
  ruler
}
