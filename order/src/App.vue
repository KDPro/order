<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
  * {
    margin:0;
    padding:0;
  }
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  body,html{
    width:100%;
    height:100%;
    font-size:14px;
    font-family: "Microsoft YaHei";
  }
  .clear:after {
    content: "";
    display: block;
    clear: both;
  }
  #app {
    width:100%;
    height:100%;
  }

</style>
