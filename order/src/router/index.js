// 引入模块
const Index = () => import('@/page/index/index'),
      Order = () => import('@/page/order/order'),
      Search = () => import('@/page/search/search'),
      ConfirmOrder = () => import('@/page/confirmOrder/confirmOrder')




export default [{
    path: '/',
    name: 'index',
    component:Index
  },{
    path:'/order',
    name:'order',
    component:Order
  },{
    path:'/search',
    name:'search',
    component:Search
  },{
    path:'/confirmOrder',
    name:'confirmOrder',
    component:ConfirmOrder
  }
  ]
