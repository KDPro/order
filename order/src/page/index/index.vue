<template>
  <div>
    <or-header :title="'用餐人数'"></or-header>
    <div class="index">
      <ul>
        <li v-for="(item,index) in 18" >
          <span
            :class="{active:index==changeActs}"
            @click="changeAct(index)"
          >{{index+1}}人</span>
        </li>
      </ul>
      <div class="btnG clear">
        <div class="jumpBtn" @click="toOrder(false)">跳过</div>
        <div class="confBtn" @click="toOrder(true)">确定</div>
      </div>
    </div>
  </div>
</template>
<script>
    export default require('./indexCtr.js');
</script>
<style scoped>
  .index {
    display: flex;
    flex-flow: row wrap;
    padding:30px 30px;
  }
  .index ul {
    width:100%;
    display: flex;
    flex-flow: row wrap;
  }
  .index ul li {
    flex: 1;
    min-width:33%;
    text-align: center;
    margin-bottom:30px;
  }
  .index ul li span{
    display: inline-block;
    width:80%;
    height:35px;
    text-align: center;
    line-height: 35px;
    border-radius: 35px;
    border:1px solid rgba(97,97,97,.2);
    font-size:16px;
    letter-spacing: 1px;
  }
  .index ul li span.active {
    background-color: #fe8a2d;
    border:1px solid #fe8a2d;
    color:white;
  }
  .btnG {
    width:100%;
    margin-top:30px;
  }
  .btnG div {
    width:40%;
    height:40px;
    float:left;
    margin-left:3%;
    border-radius:40px;
    background:-webkit-linear-gradient(left,#fe7f0f, #ff4900);
    text-align: center;
    line-height: 40px;
    color:white;
    font-size: 16px;
    letter-spacing: 1px;
  }
  .btnG .jumpBtn {
    box-sizing: border-box;
    border:1px solid rgba(97,97,97,.4);
    background: white;
    color:#333;
  }
  .btnG .confBtn {
    float: right;
    margin-right:3%;
  }
</style>
