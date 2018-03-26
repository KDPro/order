/**
 * Created by kdkjPC on 2018/1/23.
 */
export default {
  data(){
    return {
      changeActs:null,
      storeId:null
    }
  },
  methods:{
    changeAct(index){
      this.changeActs = index;
    },
    toOrder(tf) {
        this.$common.setALL("id",this.$route.query.id);
        if(tf) {
          if (this.changeActs != null) {
            this.$common.setALL("people",this.changeActs +1);
            this.$router.push({path: '/order'})
          } else {
            this.$mint.Toast({
              message: "请选择用餐人数",
              position: 'bottom',
              duration: 2000
            });
          }
        }else {
          if (this.changeActs == null) {
            this.$common.setALL("people",null);
          }
          this.$router.push({path: '/order'})
        }

      }
    },
    created(){
        console.log(this.$route.query.id);
        this.$common.setStorage("id",this.$route.query.id);
        if(this.$common.getAll()) {
          this.changeActs = this.$common.getAll().people -1;
        }

        this.$g({
          point: this,
          url: '/dining/s_id',
          params: {
            id: this.$route.query.id
          },
          callback: (res) => {
            this.$common.setALL("storeId",res.data.storeId);
            this.$common.setALL("diningTable",res.data);
          }
      });
    }
}
