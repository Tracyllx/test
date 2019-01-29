Page({
    
    data: {
        isT: false,
        username: '',
        userphone: ''
    },
    
    onLoad: function(options) {

    },

    bindViewTap: function() {
        if (this.data.isT) {
            wx.redirectTo({
                url: './confirm?username=' + this.data.username + '&userphone=' + this.data.userphone
            })
        }
    },

    nameInput: function(e) {
        this.setData({
            username: e.detail.value,
            isT: e.detail.value !== '' && this.data.userphone !== ''
        })
    },

    phoneInput: function (e) {
        var regs = /^1(3|4|5|7|8)[0-9]{9}$/;
        var val = Number(e.detail.value);
        if (e.detail.value.length == 11) {
            if (regs.test(val)) {
                this.setData({
                    userphone: val,
                    isT: this.data.username !== ''
                });
            } else {
                wx.showToast({
                    title: '请输入正确的手机号！',
                    icon: 'none'
                });
            }
        }
    }
})