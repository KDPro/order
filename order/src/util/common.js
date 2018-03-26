/**
 * Created by kdkjPC on 2018/1/29.
 */
import Vue from 'vue'
export default {
  /**除法函数，用来得到精确的除法结果
   说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
   调用：accDiv(arg1,arg2)
   返回值：arg1除以arg2的精确结果**/
  accDiv: function (arg1, arg2) {
    var t1 = 0,
      t2 = 0,
      r1, r2;
    try {
      t1 = arg1.toString().split(".")[1].length
    } catch (e) {
    }
    try {
      t2 = arg2.toString().split(".")[1].length
    } catch (e) {
    }
      r1 = Number(arg1.toString().replace(".", ""))
      r2 = Number(arg2.toString().replace(".", ""))
      return this.accMul((r1 / r2), Math.pow('', t2 - t1));
  },

  /**乘法终极解决方法**/
  accMul: function (arg1, arg2) {
    var m = 0,
      s1 = arg1.toString() || 0,
      s2 = arg2.toString() || 0;
    try {
      m += s1.split(".")[1].length
    } catch (e) {
    }
    try {
      m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
  },


  /**加法运算终极解决办法**/
  accAdd: function (arg1, arg2) {
    var r1, r2, m, c;
    try {
      r1 = arg1.toString().split(".")[1].length
    } catch (e) {
      r1 = 0
    }
    try {
      r2 = arg2.toString().split(".")[1].length
    } catch (e) {
      r2 = 0
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
      var cm = Math.pow(10, c);
      if (r1 > r2) {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", "")) * cm;
      }
      else {
        arg1 = Number(arg1.toString().replace(".", "")) * cm;
        arg2 = Number(arg2.toString().replace(".", ""));
      }
    }
    else {
      arg1 = Number(arg1.toString().replace(".", ""));
      arg2 = Number(arg2.toString().replace(".", ""));
    }
    return this.accDiv((arg1 + arg2), m);
  },

  /**减法终极解决方法**/
  accSub: function (arg1, arg2) {
    return this.accAdd(arg1, -arg2);
  },

  /**cookie
   * 这是有设定过期时间的使用示例：
   *s20是代表20秒
   *h是指小时，如12小时则是：h12
   *d是天数，30天则：d30
   */


  /**
   * 设置cookie
   */
  setCookie: function (name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
  },
  /**
   * 获取cookie
   */
  getCookie: function (name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  },
  /**
   * 删除单个cookie
   */
  delCookie: function (name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  /**
   * 清除所有cookie
   */
  clearCookie: function () {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;)
        document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  },
  /**
   * 判断是否存在storage
   */
  isLocalStorageSupported: function () {
    var testKey = 'test',
      storage = window.sessionStorage;
    try {
      storage.setItem(testKey, 'testValue');
      storage.removeItem(testKey);
      return true;
    } catch (error) {
      return false;
    }
  },

  /**
   * 解决safari无痕模式storage报错的bug
   * 获取cookie里面或者localstorage里面的数据
   * @param name  需要获取的值得key
   * @returns {*}
   */
  getStorage: function (name) {
    if (this.isLocalStorageSupported()) {
      return localStorage.getItem("" + name);
    } else {
      return this.getCookie("" + name);
    }
  },
  /**
   * 设置cookie里面或者localstorage里面的数据
   * @param name  需要设置的值得key
   * @param str   需要设置的对应key的值
   * @returns {*}
   */
  setStorage: function (name, str) {
    if (this.isLocalStorageSupported()) {
      localStorage.setItem("" + name, str);
    } else {
      this.setCookie("" + name, str, "d30");
    }
  },
  /**
    清除localstorage或者cookie
   *不传递参数时 清除所有值：
   */
  removeStorage:function(name) {
    if (this.isLocalStorageSupported()) {
      if(name) {
        localStorage.removeItem(name)
      }else {
        localStorage.clear();
      }

    } else {
      if(name) {
        this.delCookie(name);
      }else {
        this.clearCookie();
      }
    }
  },
  /**
   * 将本项目所有数据存在order当中
   * @param name  需要设置的值得key
   * @param str   需要设置的对应key的值
   * @returns {*}
   */
  setALL:function(name,str){
    var id = this.getStorage("id");
    if(!this.getStorage('order'+id)) {
      var order = {};
      order = JSON.stringify(order);
      this.setStorage("order"+id,order)
    }
    var orderJson = JSON.parse(this.getStorage("order"+id));
    orderJson[name] = str;
    this.setStorage("order"+id,JSON.stringify(orderJson));
  },
  /**
   * 获取order
   */
  getAll:function() {
    var id = this.getStorage("id");
    return JSON.parse(this.getStorage("order"+id));
  }
}
