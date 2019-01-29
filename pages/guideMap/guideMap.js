const util = require('../../utils/util.js');
Page({
    data: {
        // path: util.baseUrl + 'html/haiquanwan/gaodeMap.html',
        // path: util.baseUrl + 'html/haiquanwan/baiduMap.html',
        path: util.baseUrl + 'html/haixinsha/map.html',
        shareImg: util.baseUrl + 'html/haiquanwan/img/tc_img3.png',
    },

    onLoad: function() {
        wx.showLoading({
            title: '加载中...',
            mask: true,    
        })
    },
    bindload: function() {
        wx.hideLoading()
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function (res) {
        const that = this;
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '2018中国森林旅游节',
            path: '/pages/guideMap/guideMap',
            imageUrl: '../../image/share.jpg',
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log('转发失败');
            }
        }
    },
})