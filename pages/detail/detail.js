const util = require('../../utils/util.js');
Page({
    data: {
        // path: util.baseUrl + 'html/haiquanwan/gaodeMap.html',
        // path: util.baseUrl + 'html/haiquanwan/baiduMap.html',
        path: util.baseUrl + 'html/haixinsha/detail.html',
       
    },

    onLoad: function () {
        wx.showLoading({
            title: '加载中...',
            mask: true
        })
    },
    bindload: function () {
        wx.hideLoading()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
       return {
           title:'2018中国森林旅游节'
       }
    },
})