const util = require('../../utils/util.js');
Page({
    data: {
        // path: util.baseUrl + 'html/haiquanwan/gaodeMap.html',
        // path: util.baseUrl + 'html/haiquanwan/baiduMap.html',
        path: util.baseUrl + 'html/haixinsha/zuping/tijiao.html',
        userName: '',
        mobile: '', 
        date: '请选择你丢失的时间',
    },

    userNameInput: function (e) {
        this.setData({
            userName: e.detail.value
        })
    },

    mobileInput: function (e) {
        this.setData({
            mobile: e.detail.value
        })
    },
    Todetail: function () {
        wx.navigateTo({
            url: '../zupingdetail/zupingdetail',
        })
    },
    btnclick: function () {
        var userName = this.data.userName;
        var mobile = this.data.mobile;
        var phonetel = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        var name = /^[u4E00-u9FA5]+$/;
        if (userName == '') {
            wx.showToast({
                title: '请输入用户名',
                icon: 'succes',
                duration: 1000,
                mask: true
            })

            return false
        } else if (mobile == '') {
            wx.showToast({
                title: '手机号不能为空',
            })

            return false
        }
        else if (mobile.length != 11) {
            wx.showToast({
                title: '手机号长度有误！',
                icon: 'success',
                duration: 1500
            })
            return false;
        }

        var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!myreg.test(mobile)) {
            wx.showToast({
                title: '手机号有误！',
                icon: 'success',
                duration: 1500
            })
            return false;
        }
        return true;


    },

})