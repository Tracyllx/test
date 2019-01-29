const util = require('../../utils/util.js');
Page({
    data: {
        radioList: [
            { name: 'man', value: '先生', checked: 'true' },
            { name: 'women', value: '女士' },
        ],
        usersex: 'man',
        username: '',
        userphone: '',
        peoplenum: '',
        startDate: '2018-09-27',
        endDate: '2025-12-31',
        choosedate: '2018-09-27',
        timearray: ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'],
        timeidx1: 0,
        timeidx2: 1,
    },
    onLoad: function (options) {
        var idx = 0;
        const nowDate = util.formatTime(new Date()).split(' ')[0];
        this.setData({
            startDate: nowDate,
            choosedate: nowDate,
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },

    radioChange: function (e) {
        this.setData({
            usersex: e.detail.value
        })
    },

    bindPickerChange: function (e) {
        const val = e.detail.value;
        const index = e.currentTarget.dataset.index;
        if (index == 1) {
            this.setData({
                choosedate: val
            })
        } else if (index == 2) {
            this.setData({
                timeidx1: val,
                timeidx2: Number(val) + 1 >= this.data.timearray.length - 1 ? this.data.timearray.length - 1 : Number(val) + 1,
            })
        } else if (index == 3) {
            this.setData({
                timeidx1: Number(val) - 1 <= 0 ? 0 : Number(val) - 1,
                timeidx2: val,
            })
        }
    },

    submitTap: function() {
        wx.setStorageSync('dinnerInfo', {
            peoplenum: this.data.peoplenum,
            choosedate: this.data.choosedate,
            time: this.data.timearray[this.data.timeidx1] + '-' + this.data.timearray[this.data.timeidx2]
        });
        wx.navigateTo({
            url: './success',
        })
    },

    nameInput: function(e) {
        const val = e.detail.value;
        this.setData({
            username: val
        })
    },

    phoneInput: function (e) {
        const val = e.detail.value;
        this.setData({
            userphone: val
        })
    },

    numInput: function (e) {
        const val = e.detail.value;
        this.setData({
            peoplenum: val
        })
    }
})