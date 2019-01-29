const util = require('../../utils/util.js');
Page({
    data: {
        index: 0,
        baseUrl: util.baseUrl,
        imgUrl: util.baseUrl + 'html/haiquanwan/img/hb_yy.png',
        imgUrlNo: util.baseUrl + 'html/haiquanwan/img/hb_no.png',
        imgUrlHas: util.baseUrl + 'html/haiquanwan/img/hb_has.png',
    },
    onLoad: function (options) {
        
    },

    yaoyiyao: function() {
        const random = Math.floor(Math.random() * 10 + 1);
        console.log(random)
        if (random % 2 == 0) {
            this.setData({
                index: 2
            })
        } else {
            this.setData({
                index: 1
            })
        }
    },

    closeTap: function() {
        this.setData({
            index: 0
        })
    },

    gotoList: function() {
        wx.navigateTo({
            url: './couponList',
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
})