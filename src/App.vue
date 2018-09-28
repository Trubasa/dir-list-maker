<template>
  <div id="app">
    <div class="search_bar">

      <div class="project_title">
        <el-select v-model="selectValue" placeholder="请选择需要查看的项目" @change="getDirList">
          <el-option
            style="display: block;"
            v-for="item in options"
            :key="item.fileName"
            :label="item.name"
            :value="item.fileName">
          </el-option>
        </el-select>

      </div>


      <el-input
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>
    </div>


    <el-tree
      class="filter-tree"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      ref="tree2">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <i v-if="data.isDir" class="iconfont icon-wenjian1"></i>
        <span>{{ node.label }}</span>
        <span v-if="data.remark">  ---  {{data.remark}}</span>
      </span>
    </el-tree>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        selectValue:'',
        options:[],
        filterText: '',
        data2: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    mounted(){

      var that=this;
      this.getDirDir();


    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },

    methods: {
      getDirDir(){
        var that=this;
        fetch('static/dirList.json',{
          method:'get'
        }).then(function(res) {
          return res.json()
        }).then(function (data) {
          console.log(data);
          that.options=data
        }).catch(function(err) {
          // 出错了;等价于 then 的第二个参数,但这样更好用更直观 :(
        });
      },
      getDirList(fileName){
        var that=this;
        fetch('static/dirList/'+fileName,{
          method:'get'
        }).then(function(res) {
          return res.json()
        }).then(function (data) {
          console.log(data);
          var list=that.dataTransform(data.list)
          that.data2=list;
        }).catch(function(err) {
          // 出错了;等价于 then 的第二个参数,但这样更好用更直观 :(
        });

      },
      dataTransform(list){
        list=list.map((ele)=>{
          ele.label=ele.name;
          if(ele.children){
            ele.children=this.dataTransform(ele.children)
          }
          return ele;
        });

        return list;
      },
      filterNode(value, data) {
        if (!value) return true;
        // return data.label.indexOf(value) !== -1;

        var flag=false;
        var str=new RegExp(value,'igm');
        if(data.remark){
          flag=(str.test(data.remark)||str.test(data.label))?true:false
        }else{
          flag=(str.test(data.label))?true:false
        }
        return flag
      }
    },


  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    padding: 116px 0px 10px;
  }

  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  /*li {
    display: inline-block;
    margin: 0 10px;
  }*/

  a {
    color: #42b983;
  }
  .search_bar{
    position: fixed;
    box-sizing: border-box;
    padding: 10px;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 10;
  }
  .project_title{
    padding-bottom: 10px ;
  }
</style>
