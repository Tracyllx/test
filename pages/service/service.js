const util = require('../../utils/util.js');
Page({
    data: {
        imgUrl: util.baseUrl + 'html/haiquanwan/img/service_img.png',
        showCall: false
    },
    onLoad: function (options) {

    },
    callNumber: function () {
        wx.makePhoneCall({
            phoneNumber: '400 9690 196' //仅为示例，并非真实的电话号码
        })
    },
    showPhone: function() {
        this.setData({
            showCall: !this.data.showCall,
        })
    },
    bindcontact: function(e) {
        console.log(e)
    }
})