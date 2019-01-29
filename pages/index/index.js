//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
    data: {
        bannerImg: util.baseUrl + 'html/haiquanwan/img/tc_img3.png',
        motto: 'demo',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../logs/logs'
        })
    },
    onLoad: function() {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                    app.globalData.userInfo = res.userInfo
                    this.setData({
                        userInfo: res.userInfo,
                        hasUserInfo: true
                    })
                }
            })
        }
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
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
            title: '珠海海泉湾度假区是香港中旅集团继成功开发建设深圳华侨城、世界之窗、锦绣中华之后的又一力作',
            path: '/pages/index/index',
            imageUrl: that.data.bannerImg,
            success: function (res) {
                console.log(res);
            },
            fail: function (res) {
                console.log('转发失败');
            }
        }
    },
})