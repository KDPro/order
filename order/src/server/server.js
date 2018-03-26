/**
 * Created by kdkjPC on 2018/1/23.
 */
/**
 * 公用的server 方法
 */
export default {
  /**
   * 查询数据 并且赋值
   * @param  {[type]} options.url          查询的url
   * @param  {[type]} options.params       后台所需要的数据
   * @param  {[type]} options.type         后台所需要请求方式，get或者post方式
   * @param  {[type]} options.point        point 指向，必传项，传递this 指向vue实例对象
   * @param  {[type]} options.load         是否需要加载动画 不需要传入false，需要传入ture 默认为true
   * @return {[type]} options.callback     回调函数，执行成功后所需要的操作
   */
  g:({point,url,params,callback,load}) => {
    if(load||load==undefined) {
      point.$mint.Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
    }
    point.$axios({
      method:"get",
      url:url,
      params:params
    }).then(function(res){
      //如果动画为true，返回之后需要关闭动画
      if(load||load==undefined){
         point.$mint.Indicator.close();
      }

       if(res.data.code == 0) {
         if(callback) {
            callback(res.data);
         }
       }else {
         point.$mint.Toast({
           message:res.data.msg,
           position: 'bottom',
           duration: 2000
         });
       }
    },function(errRes) {
        if(load||load==undefined){
          point.$mint.Indicator.close();
        }
        console.log(errRes);
        point.$mint.Toast("网络可能出错了，请刷新后重试！");
    })
  },
  p:({point,url,params,callback,load})=>{
    if(load||load==undefined) {
      point.$mint.Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
    }
    point.$axios({
      method:"post",
      url:url,
      data:params
    }).then(function(res){
      //如果动画为true，返回之后需要关闭动画
      if(load||load==undefined){
        point.$mint.Indicator.close();
      }

      if(res.data.code == 0) {
        if(callback) {
          callback(res.data);
        }
      }else {
        point.$mint.Toast({
          message:res.data.msg,
          position: 'bottom',
          duration: 2000
        });
      }
    },function(errRes) {
      if(load||load==undefined){
        point.$mint.Indicator.close();
      }
      console.log(errRes);
      point.$mint.Toast("网络可能出错了，请刷新后重试！");
    })
  }
}
