<template>
    <div class="head">
      <header>
        <span class="return" @click="returnLink">
        <i v-if="isReturn" class="iconfont icon-zuojiantou"></i>
        </span>
        <span>{{title}}</span>
      </header>
      <div class="header"></div>
    </div>
</template>
<script>
    export default {
      props:{
          title:{
            type:String,
            default:"点餐系统"
          },
          isReturn:{
            type:Boolean,
            default:false
          }
      },
      data(){
        return {

        }
      },
      methods:{
        returnLink(){
          this.$router.go(-1);
        }
      }
    }
</script>
<style>
  header {
    width:100%;
    height:50px;
    background-color: black;
    box-sizing: border-box;
    padding:0 15px;
    font-size:16px;
    color:rgba(255,255,255,.8);
    text-align: center;
    line-height: 50px;
    letter-spacing: 2px;
    position:fixed;
    top:0;
  }
  .header {
    display: block;
    width: 100%;
    height:50px;
  }
  .return{
    position:absolute;
    left:15px;
    top:1px;
  }
  .return i {
    font-size:24px;
  }
</style>
