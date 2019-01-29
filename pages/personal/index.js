//index.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')
Page({
    data: {
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        baseUrl: util.baseUrl,
        isHomePage: false,
        isMyCenter: true,
        showCheckCode: false,//是否显示核票码
        gridData: [{
                "id": 1,
                "title": "我的订单",
                "icon": "../../image/my/icon1.png"
            },
            {
                "id": 2,
                "title": "核票码",
                "icon": "../../image/my/icon2.png"
            },
            {
                "id": 3,
                "title": "消费码",
                "icon": "../../image/my/icon3.png"
            },
            {
                "id": 4,
                "title": "绑定设备",
                "icon": "../../image/my/icon4.png"
            },
            {
                "id": 5,
                "title": "优惠券",
                "icon": "../../image/my/icon5.png"
            },
            {
                "id": 6,
                "title": "消费账单",
                "icon": "../../image/my/icon6.png"
            },
        ],
    },
    changeHomePageHight: function() {
        wx.redirectTo({
            url: '../guideMap/guideMap',
        });
    },
    changeMyCenterHight: function() {},
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
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    bindViewTap: function (e) {
        const index = e.currentTarget.dataset.id;
        if (index == 1) {
            //会员信息
            wx.navigateTo({
                url: '/pages/personal/vip_info/index?userInfo=' + JSON.stringify(this.data.userInfo)
            })
        } else if (index == 2) {
            //我的钱包
            wx.navigateTo({
                url: '/pages/personal/wallet/index'
            })
        }
    },
    gotoTap: function(e) {
        const index = e.currentTarget.dataset.id;
        if (index == 1) {
            //我的订单
            wx.navigateTo({
                url: '/pages/personal/order/orderList'
            })
        } else if (index == 2) {
            //核票码
            this.setData({
                showCheckCode: !this.data.showCheckCode
            })
        } else if (index == 3) {
            //消费码
            wx.navigateTo({
                url: '/pages/personal/resume_code/index'
            })
        } else if (index == 4) {
            //绑定设备
            wx.navigateTo({
                url: '/pages/personal/devices/index'
            })
        } else if (index == 5) {
            //优惠券
            wx.navigateTo({
                url: '/pages/personal/coupon/index'
            })
        } else if (index == 6) {
            //消费账单
            wx.navigateTo({
                url: '/pages/personal/wallet_detail/index'
            })
        }
    }
})