var util = require('../../../utils/util.js');
Page({
    data: {
        myWallet: 0,
        inputVal: '',
        focus: true,
        disableBtn: true,
    },
    onLoad: function(options) {
        this.setData({
            myWallet: options.myWallet || 0
        });
    },

    bindInput: function(e) {
        var val = e.detail.value;
        // if (val.indexOf('.') == 0) {
        //     val = '0.'; // 小数点在第一位时，强制改为 0.；如：输入 .2，则结果显示 0.2
        // }
        // if ((val.slice(val.indexOf('.') + 1)).indexOf('.') >= 0) {
        //     val = val.slice(0, val.length - 1); // 有且仅有一个小数点；如：输入 2.3.，则结果显示 2.3
        // }
        // if (val.indexOf('.') > 0 && val.slice(val.indexOf('.') + 1).length > 2) {
        //     val = val.slice(0, val.indexOf('.') + 3); // 存在小数点时，保留小数点后两位
        // }
        if (val.indexOf('0') == 0) {
            val = ''; // 第一位数不能为 0 
        }
        this.setData({
            inputVal: val
        });
    },

    getAll: function() {
        if (this.data.myWallet != 0) {
            var num = String(this.data.myWallet)
            if (num.indexOf('.') > 0) {
                num = num.split('.')[0];
            }
            this.setData({
                inputVal: num
            });
        } else {
            wx.showToast({
                title: '金额不能为零！',
            })
        }
    },
})