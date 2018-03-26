/**
 * Created by kdkjPC on 2018/1/25.
 */
import BScroll from 'better-scroll'
export default {
  data(){
    return {
      time:"",
      seat:"",
      people:"",
      delay:"立即上菜",
      total:0,
      orderList:[]
    }
  },
  methods:{
    /**
     * 转换时间格式
     * @returns {string}
     */
    transTime(){
      var time = this.$common.getAll().time;
      time = new Date(time);
      var year = time.getFullYear();
      var month = time.getMonth() > 10 ? (time.getMonth() + 1) : '0' + (time.getMonth() + 1);
      var day = time.getDate() > 10 ? time.getDate() : '0' + time.getDate();
      var hour = time.getHours() > 10 ? time.getHours() : '0' + time.getHours();
      var minutes = time.getMinutes() > 10 ? time.getMinutes() : '0' + time.getMinutes();
      var seconds = time.getSeconds() > 10 ? time.getSeconds() : '0' + time.getSeconds();
      return (year + "-" + month + "-" + day + "  " + hour + ":" + minutes + ":" + seconds);
    },
    /**
     *将shopCar里面的数据，转换成后台需要的格式
     */
    shopCarArray(){
      var shopCarArr = [];
      for(var key in this.$common.getAll().shopCar) {
        shopCarArr.push(this.$common.getAll().shopCar[key]);
      }
      console.log(shopCarArr)
      return shopCarArr;
    },
    /**
     * 延时时间转换
     */
    timeChange(){
      return new Date(parseInt(this.$common.getAll().delay.times)*60*1000 + parseInt(new Date().getTime()));
    },
    confirm(){
      this.$p({
        point:this,
        url:"/orderList/placeAnOrder",
        params:{
          foodShelvesVOList:this.shopCarArray(),
          diningTable:this.$common.getAll().diningTable,
          peopleNumber:this.$common.getAll().people,
          servingTime:this.timeChange()
        },
        callback:(res)=> {
          var id = this.$common.getAll().id;
          this.$common.removeStorage("order"+id);
          this.$store.state.shopCar = {};
          this.$store.state.total = 0;
          this.$router.push({ path: '/',query:{id:id}})
        }
      });
    }
  },
  mounted(){
    this.time = this.transTime();
    var p = this.$common.getAll();
    this.seat = p.diningTable.seat;
    this.people = p.people;
    this.delay = p.delay.time;
    this.total = p.total;
    this.orderList = p.shopCar;
    this.$nextTick(()=> {
      if (!this.Scroll) {
        this.Scroll = new BScroll(this.$refs.orderList, {
          click: true
        });
      } else {
        this.Scroll.refresh();
      }
    });
    /**
     * 查询 以后可能使用
     */
    // this.$g({
    //   point: this,
    //   url: '/orderList/selectOrderList',
    //   params: {
    //     orderId:this.$common.getAll().orderId
    //   },
    //   callback: (res) => {
    //     this.$set(this,"orderList",res.data.list);
    //     this.$nextTick(()=> {
    //       if (!this.Scroll) {
    //         this.Scroll = new BScroll(this.$refs.orderList, {
    //           click: true
    //         });
    //       } else {
    //         this.Scroll.refresh();
    //       }
    //     });
    //   }
    // });
  }
}
