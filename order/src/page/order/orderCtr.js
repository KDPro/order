/**
 * Created by kdkjPC on 2018/1/23.
 */
import BScroll from 'better-scroll'
export default {
  data(){
    return {
      leftMenu:[],
      rightVegetable:[],
      delayTime:[
        {time:"立即上菜",times:0},
        {time:"10分钟",times:10},
        {time:"20分钟",times:20},
        {time:"30分钟",times:30},
        {time:"1小时",times:60}
        ],
      delay:{time:"立即上菜",times:0},
      menuId:null,
      optionAct:false,
      total:0
    }
  },
  methods:{
    /**
     * 点击当前，菜品列表 获取 菜
     * @param index
     */
    changeAct(index){
      this.menuId = index;
      this.$g({
        point:this,
        url:'/FoodShelves/selectFoodShelves',
        params:{
          className:this.menuId,
          storeId:this.$common.getAll().storeId
        },
        callback:(res)=>{
          this.$set(this,"rightVegetable",res.data);
          this.reRightVege(res.data);
          this.$nextTick(()=> {
            if(!this.Scroll) {
              this.Scroll = new BScroll(this.$refs.vegeBox, {
                click: true
              });
            }else {
              this.Scroll.refresh();
            }
          });
        }
      });
    },
    /**
     * 当前菜品加数量
     * @param index
     */
    add(index){
      var count = this.rightVegetable[index].needCount;
      if(count) {
        if(count >= this.rightVegetable[index].stock) {
          this.$mint.Toast({
            message: '这个菜库存不够啦，不能再点了',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        this.rightVegetable[index].needCount = count+1;
      }else {
        if(this.rightVegetable[index].stock <= 0) {
          this.$mint.Toast({
            message: '这个菜库存不够啦，不能再点了',
            position: 'bottom',
            duration: 1500
          });
          return;
        }
        this.rightVegetable[index].needCount = 1;
      }
      this.$set(this.rightVegetable, index, this.rightVegetable[index]);
      this.storeM(index);
    },
    /**
     * 当前菜品减数量
     * @param index
     */
    sub(index){
      var count = this.rightVegetable[index].needCount;
      this.rightVegetable[index].needCount = count-1;
      this.$set(this.rightVegetable, index, this.rightVegetable[index]);
      this.storeM(index);
    },
    showTime(){
      this.optionAct = !this.optionAct;
    },
    textChange(item){
      this.delay = item;
      this.$common.setALL("delay",this.delay);
    },
    toSearch(){
      this.$router.push({ path: '/search' })
    },
    /**
     * 确认订单
     */
    toConfirm(){
      this.$common.setALL("time",new Date().getTime());
      this.$router.push({ path: '/confirmOrder' })
    },
    /**
     * 将商品id，count，price存在vuex里面，为了遍历方便  存储结构为json
     * @param index
     */
    storeM(index){
      var fAP = this.$common.accMul(this.rightVegetable[index].needCount,this.rightVegetable[index].foodPrice);
      this.$store.commit('increment',{
        foodId:this.rightVegetable[index].foodId,
        needCount:this.rightVegetable[index].needCount,
        foodPrice:this.rightVegetable[index].foodPrice,
        foodAllPrice:fAP,
        foodName:this.rightVegetable[index].foodName
      });
      this.$store.commit('remove');
      this.$common.setALL("shopCar",this.$store.state.shopCar);
      this.$store.commit('accountTotal',this);
      this.$common.setALL("total",this.$store.state.total);
    },
    /**
     * 判断此商品是否被选择过 以及选择的个数
     * @param arr
     */
    reRightVege(arr){
      var shopCar = this.$store.state.shopCar;
      arr.map(function(ele,index){
        var thatEle = ele,thatIndex = index;
        for(var key in shopCar) {
          if(thatEle.foodId == shopCar[key].foodId) {
            thatEle.needCount = shopCar[key].needCount;
          }
        }
      });
    }
  },
  mounted(){
    if(this.$common.getAll().shopCar) {
      this.$store.state.shopCar = this.$common.getAll().shopCar;
      this.$store.state.total = this.$common.getAll().total;
    }
    if(this.$common.getAll().delay) {
      this.delay = this.$common.getAll().delay;
    }else {
      this.$common.setALL("delay",this.delay);
    }
        this.$g({
          point:this,
          url:'/ftype/s_bean',
          params:{
            storeId:this.$common.getAll().storeId

          },
          callback:(res)=> {
            this.$set(this,"leftMenu",res.data);
            this.menuId = res.data[0].id;
            /**
             * 存储当前菜 的菜品类 方便返回用户看见
             */
            if(this.$store.state.className) {
              this.changeAct(this.$store.state.className);
              this.$store.state.className = '';
            }else {
              this.changeAct(this.menuId);
            }
            this.$nextTick(()=> {
              if(!this.Scroll) {
                this.Scroll = new BScroll(this.$refs.ulBox, {
                  click: true
                });
                this.Scroll = new BScroll(this.$refs.vegeBox, {
                  click: true
                });
              }else {
                this.Scroll.refresh();
              }
            });
          }
        });
  }
}
