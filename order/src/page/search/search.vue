<template>
  <div>
    <or-header :title="'搜索菜品'" :isReturn="true"></or-header>
    <div class="search" ref="search">
      <i class="iconfont icon-sousuo"></i>
      <input type="text" placeholder="搜索喜欢的菜品" @keyup="search" v-model="value" class="seaInput">
      <div class="searchBox" :class="{hide:value==''}" ref="searchBox">
        <ul class="searchRea content">
          <li v-for="(item,index) in searchList" @click="yesOrder(item,index)">{{item.foodName}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
    export default require('./searchCtr');
</script>
<style scoped>
  .hide {
    display:none;
  }
  .search {
    width:100%;
    height:100%;
    box-sizing: border-box;
    padding:25px 35px 0 35px;
    position:relative;
  }
  .search i {
    position:absolute;
    font-size:25px;
    font-weight: bold;
    color: #fc7713;
    margin-left:15px;
    margin-top:8px;
    z-index:0;
  }
  .seaInput {
    width:100%;
    height:40px;
    border:1px solid #a3a3a3;
    border-radius: 40px;
    text-indent:50px;
  }
  .seaInput:focus {
    outline: none;
  }
  .searchRea {
    width:100%;
    height:auto;
    padding:0 20px;
    box-sizing: border-box;
    text-indent: 5px;
  }
  .searchRea li {
    padding:10px 0;
    border-bottom:1px solid rgba(97,97,97,.2);
  }
  .searchBox {
    width:100%;
    max-height:400px;
    box-shadow: 0 0 10px 1px rgba(97,97,97,.3);
    border-radius: 5px;
    margin-top:10px;
    overflow: hidden;
  }
</style>
