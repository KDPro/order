<template>
  <div class="order">
    <or-header :title="'点餐页面'"></or-header>
    <div class="orderTop">
      <div class="left">
        <div class="search" @click="toSearch">
          <i class="iconfont icon-sousuo"></i>
          搜索
        </div>
        <div class="ulBox" ref="ulBox">
          <ul class="content">
            <li v-for="(item,index) in leftMenu"
                :class="{liActive:item.id==menuId}"
                @click="changeAct(item.id)"
            >{{item.name}}</li>
          </ul>
        </div>

      </div>
      <div class="right">
        <div class="tit">热销</div>
        <div class="vegeBox" ref="vegeBox">
          <ul class="content">
            <li v-for="(item,index) in rightVegetable">
              <div class="rightImg"><img :src="item.img" alt=""></div>
              <div class="rightCon">
                <p class="rightTit">{{item.foodName}}</p>
                <p class="rightNum">库存: <span>{{item.stock}}</span></p>
                <p class="rightDes">{{item.description}}</p>
                <p class="rightPrice">
                  <span>￥{{item.foodPrice}}</span>
                  <span class="addAndSub">
                    <i class="iconfont icon-jian"
                       :class="[{iconYes:item.needCount>0}]"
                       @click="sub(index)"></i>
                    <span
                      :class="{hide:(!item.needCount||item.needCount<=0)}"
                    >{{item.needCount}}</span>
                    <i class="iconfont icon-jia"
                    @click="add(index)">

                    </i>
                  </span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="orderBottom">
      <div class="delay">
        <span>延时上菜 :</span>
         <div class="select" @click="showTime" :class="{selectAct:optionAct}">
           <span>{{delay.time}}</span>
            <ul class="option" :class="{optionAct:optionAct}">
              <li v-for="item in delayTime" @click="textChange(item)">{{item.time}}</li>
            </ul>
         </div>
      </div>
      <div class="total clear">
        <span class="totalSum">总计: <span>￥{{$store.state.total}}</span></span>
        <div class="button" @click="toConfirm">确认菜品</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default require('./orderCtr.js');
</script>
<style scoped>
  .order {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
  }
  .orderTop {
    flex: 1;
    display: flex;
  }
  .left {
    width: 25%;
    height: 100%;
    background-color: #f4f4f4;
    text-align: center;
    color: rgb(122, 122, 122);
    display:flex;
    flex-direction: column;
  }
  .search {
    padding: 15px 0;
    border-bottom: 1px solid #c2c2c2;
  }
  .search i {
    vertical-align: middle;
  }
  .left .ulBox {
    flex: 1;
    overflow:hidden;
  }
  .left ul {
    margin: 0;
    padding: 0;
  }
  .left ul li {
    box-sizing: border-box;
    border-bottom: 1px solid #c2c2c2;
    padding: 15px 0;
    position: relative;
  }
  .left ul li.liActive {
    background-color: white;
  }
  .left ul li.liActive:after {
    content: "";
    display:block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 5px;
    background: -webkit-linear-gradient(#fe7f0f, #ff4900); /* Safari 5.1 - 6.0 */
    background: linear-gradient(#fe7f0f, #ff4900); /* 标准的语法 */
  }
  .right {
    flex: 1;
    background-color: white;
    padding:0 0 0 10px;
    display:flex;
    flex-direction: column;
  }
  .right .tit {
    width:100%;
    border-bottom:1px solid #feb183;
    padding:10px 0;
    color:#333;
    font-size:14px;
    font-weight: bold;
  }
  .right .vegeBox {
    flex: 1;
    overflow:hidden;
  }
  .right ul {
    margin: 0;
    padding: 0;
  }
  .right ul li {
    padding:10px 15px 10px 0;
    border-bottom:1px solid #ececec;
    display: flex;
  }
  .right ul li .rightImg {
    width:35%;
    padding-bottom:35%;
    border-radius: 10px;
    background-color: rebeccapurple;
    position:relative;
  }
  .right ul li .rightImg img {
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    border-radius: 10px;
  }
  .rightCon {
    flex: 1;
    padding:0 0 0 15px;
    display: flex;
    flex-direction: column;
  }
  .rightTit {
    font-weight: bold;
    flex: 1;
  }
  .rightNum,.rightDes {
    color:#747474;
    font-size:12px;
    flex: 1;
  }
  .rightPrice {
    font-size:16px;
    font-weight: bold;
    color:#ff4900;
    flex: 1;
  }
  .addAndSub {
    float:right;
    margin-top:-1px;
    font-weight: 100;
    position:relative;
  }
  .addAndSub:after {
    display: block;
    content:"";
    clear: both;
  }
  .addAndSub i {
    font-size:22px;
    float: left;
  }
  .addAndSub span {
    color:#333;
    font-weight: bold;
    text-align: center;
    font-size:14px;
    float: left;
    width:20px;
    margin-top:2px;
    opacity: 1;
    -webkit-transition:all .5s linear;
    transition: all .5s linear;
  }
  .addAndSub .hide {
    opacity: 0;
    transition: all 0s linear;
  }
  .addAndSub .icon-jian {
    -webkit-transform: rotate(90deg);
    transform:rotate(90deg);
    position:absolute;
    top:0;
    right:0;
    opacity: 0;
    z-index:-1;
    -webkit-transition:all 0s linear;
  }
  .addAndSub .iconYes {
    -webkit-transform: rotate(0deg);
    transform:rotate(0deg);
    right:44px;
    opacity: 1;
    z-index:0;
    -webkit-transition:all .5s linear;
  }
  .orderBottom {
    width: 100%;
    height:auto;
    box-shadow: -1px 0 15px 1px #b6b5b5;
    padding:0 15px;
    box-sizing: border-box;
  }
  .orderBottom .delay {
    padding:10px 0 10px 15px;
    border-bottom:1px solid #d3d3d3;
  }
  .select {
    width:100px;
    height:30px;
    display:inline-block;
    vertical-align: middle;
    border-radius: 4px;
    border:1px solid #b0b0b0;
    position:relative;
    margin-left:5px;
  }
  .select span {
    line-height:30px;
    margin-left:20px;
  }
  .select:after {
    display:block;
    content: "\25BC";
    position:absolute;
    color:#616161;
    top:5px;
    right:5px;
  }
  .selectAct:after {
    display:block;
    content: "\25B2";
    position:absolute;
    top:5px;
    right:5px;
  }
  .option {
    width:100%;
    height:auto;
    border-radius:4px;
    box-shadow: 0 3px 10px 3px rgba(97,97,97,.5);
    position:absolute;
    bottom:40px;
    left:0;
    background-color: white;
    padding:0px 10px 10px 10px;
    text-align: center;
    box-sizing: border-box;
    display:none;
  }
  .optionAct {
    display:block;
  }
  .option:after {
    display:block;
    content: "\25BC";
    position:absolute;
    bottom:-13px;
    left:43%;
    color:white;
  }
  .option li {
    padding:10px 0;
    border-bottom:1px solid rgba(97,97,97,.2)
  }
  .total {
    padding:10px 0 10px 15px;
  }
  .totalSum {
    float: left;
    font-weight: bold;
    font-size:16px;
    margin-top:10px;
  }
  .totalSum span {
    color:#ff4900;
  }
  .total .button {
    float: right;
    width:120px;
    height:40px;
    border-radius:40px;
    background:-webkit-linear-gradient(#fe7f0f, #ff4900);
    text-align: center;
    line-height: 40px;
    color:white;
    font-size: 16px;
    letter-spacing: 1px;
  }


</style>
