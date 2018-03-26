<template>
  <div class="confirms">
    <or-header :title="'订单确定'" :isReturn="true"></or-header>
    <div class="orderCon">
      <div class="orderDetail">
        <h3>订单详情</h3>
        <p>
          下单时间 : {{time}}
        </p>
        <p>
          <span>用餐桌号 : {{seat}}</span>
          <span>用餐人数 : {{people}}</span>
        </p>
        <p>
          <span>延时时间 : {{delay}}</span>
          <span>应付总额 : <strong style="color:#f96819">￥{{total}}</strong></span>
        </p>
      </div>
      <div class="orderList" ref="orderList">
        <ul class="content">
          <li v-for="item in orderList">
            <span>{{item.foodName}}</span>
            <span>x{{item.needCount}}</span>
            <span>￥{{item.foodAllPrice}}</span>
          </li>
        </ul>
      </div>
      <div class="orderPay">
        <div class="button" @click="confirm">确定下单</div>
      </div>
    </div>
  </div>
</template>
<script>
    export default require('./confirmOrderCtr.js');
</script>
<style scoped>
  .confirms {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .orderCon {
    width: 100%;
    height:100%;
    box-sizing: border-box;
    border:10px solid #f2f2f2;
    display: flex;
    flex-direction: column;
  }
  .orderDetail {
    height:auto;
    padding:15px 15px 0;
    border-bottom:5px solid #f2f2f2;
  }
  .orderDetail h3 {
    color:#f96819;
    font-size: 15px;
    letter-spacing: 1px;
    margin-bottom:5px;
  }
  .orderDetail p {
    padding:10px 0;
    border-bottom:1px solid rgba(97,97,97,.2);
    display: flex;
  }
  .orderDetail p:last-child {
    border:none;
  }
  .orderDetail p span:first-child {
    flex: 3;
    text-align: left;
  }
  .orderDetail p span:last-child {
    flex: 2;
    text-align: right;
  }
  .orderList {
    flex: 1;
    padding:0 15px;
    border-bottom:5px solid #f2f2f2;
    overflow: hidden;
  }
  .orderList ul {
    margin:0;
    padding:0;
  }
  .orderList ul li {
    padding:15px 0;
    border-bottom:1px solid rgba(97,97,97,.2);
    display: flex;
  }
  .orderList ul li span {
    flex: 1;
    text-align: center;
  }
  .orderList ul li span:first-child {
    text-align: left;
  }
  .orderList ul li span:last-child {
    text-align: right;
  }
  .orderPay {
    padding:20px 0;
    width:100%;
    height:auto;
  }
  .orderPay .button {
    width:80%;
    height:40px;
    margin:0 auto;
    border-radius:40px;
    background:-webkit-linear-gradient(left,#fe7f0f, #ff4900);
    text-align: center;
    line-height: 40px;
    color:white;
    font-size: 16px;
    letter-spacing: 1px;
  }
</style>
