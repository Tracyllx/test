Page({
    data: {
        rentInfo: '',
        name: '',
        phone: ''
    },
    onLoad: function(options) {
        const rentInfo = wx.getStorageSync('rentInfo');
        rentInfo.total = Number(rentInfo.price + rentInfo.rented).toFixed(2);
        this.setData({
            rentInfo: rentInfo,
            name: options.username,
            phone: options.userphone
        });
    },
    confirmTap: function() {
        wx.showToast({
            title: '调起微信支付！',
            icon: 'none'
        })
    }
})