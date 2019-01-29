Page({
    data: {
        userInfo: ''
    },
    onLoad: function(options) {
        this.setData({
            userInfo: options.userInfo ? JSON.parse(options.userInfo) : ''
        })
    },
    bindViewTap: function() {
        wx.navigateTo({
            url: '/pages/personal/vip_info1/index'
        })
    },
})