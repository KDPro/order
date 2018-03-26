/**
 * Created by kdkjPC on 2018/1/25.
 */
import BScroll from 'better-scroll'
export default {
  data(){
    return {
      value:"",
      searchList:[],
      isYes:false,
    }
  },
  methods:{
    search(){
      if(this.value.length == 0) {
        this.searchList = [];
        return ;
      }
      this.$g({
        point:this,
        url:'/FoodShelves/selectFoodShelves',
        params:{
          foodName:this.value,
          storeId:this.$common.getAll().storeId
        },
        callback:(res)=>{
          this.searchList = res.data.list;
          this.$nextTick(()=> {
            if(!this.Scroll) {
              this.Scroll = new BScroll(this.$refs.searchBox, {
                click: true
              });
            }else {
              this.Scroll.refresh();
            }
          });
        }
      });
    },
    yesOrder(item,index){
      var shopCar = this.$common.getAll().shopCar;
      var foodId = item.foodId;
      var count = 1;
      if(shopCar && shopCar[foodId]) {
        if(item.stock<=0) {
          this.$mint.Toast({
            message: '这个菜库存不够啦，请重新搜索',
            position: 'bottom',
            duration: 1500
          });
          return ;
        }
        count = parseInt(this.$common.getAll().shopCar[foodId].needCount) + 1;
      }
      var fAP = this.$common.accMul(count,item.foodPrice);
      this.$store.commit('increment', {
        foodId: item.foodId,
        needCount: count,
        foodPrice: item.foodPrice,
        foodAllPrice:fAP,
        foodName: item.foodName
      });
      this.$store.state.className = item.className;
      this.$common.setALL("shopCar",this.$store.state.shopCar);
      this.$store.commit('accountTotal',this);
      this.$common.setALL("total",this.$store.state.total);
      this.$router.push({ path: '/order' })
    }
  },
  mounted(){

  }
}
