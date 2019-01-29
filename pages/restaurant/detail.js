const util = require('../../utils/util.js');
Page({
    data: {
        imgUrl: util.baseUrl + 'html/haiquanwan/img/tc_img1.png',
        dinnerInfo: ''
    },
    onLoad: function (options) {
        this.setData({
            dinnerInfo: wx.getStorageSync('dinnerInfo') || ''
        })
    },
    gotoUrl: function (e) {
        const index = e.currentTarget.dataset.index;
        if (index === 'detail') {
            wx.redirectTo({
                url: './detail',
            })
        } else if (index === 'index') {
            wx.redirectTo({
                url: '../guideMap/guideMap',
            })
        }
    }
})