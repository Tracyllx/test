//index.js
//获取应用实例
const app = getApp()

const util = require('../../../utils/util.js')
Page({
    data: {
        baseUrl: util.baseUrl,
    motto: 'Hello World'
  },

  //事件处理函数
  bindViewTap: function() {
    
    //
    // wx.navigateTo({
    //   url: '/pages/personal/order/order_refund_detail'
    // })


  },
  
  onLoad: function () {

  }

})
