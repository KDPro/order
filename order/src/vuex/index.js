/**
 * Created by kdkjPC on 2018/1/23.
 */
export default {
  state: {
    shopCar: {},
    total:0
  },
  mutations: {
    increment (state,payLoad) {
      var index = payLoad.foodId;
      state.shopCar[index] = payLoad;
    },
    remove(state){
      for(var key in state.shopCar) {
        if(state.shopCar[key].needCount == 0) {
          delete state.shopCar[key];
        }
      }
    },
    accountTotal(state,point) {
      var cart = state.shopCar;
      var allT = 0;
      for(var key in cart) {
        var singleP = point.$common.accMul(cart[key].foodPrice,cart[key].needCount);
        allT = point.$common.accAdd(allT,singleP);
      }
      state.total = allT;
    }
  }
}
