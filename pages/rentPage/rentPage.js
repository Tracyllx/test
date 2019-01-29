Page({
    data: {
        currentIdx: 0,
        list: [{
            imgUrl: 'img1.png',
            name: '对讲机',
            useNote: '用途：信号强，联系，求助',
            price: 10,
            rented: 200,
            sellNum: 434,
            styleW: 104 * 0.4,
            styleH: 337 * 0.4
        }, {
            imgUrl: 'img2.png',
            name: '充电宝',
            useNote: '用途：手机充电',
            price: 20,
            rented: 100,
            sellNum: 523,
            styleW: 67 * 0.9,
            styleH: 102 * 0.9
        }, {
            imgUrl: 'img3.png',
            name: '雨伞',
            useNote: '用途：遮阳',
            price: 10,
            rented: 100,
            sellNum: 302,
            styleW: 96 * 0.9,
            styleH: 84 * 0.9
        }, {
            imgUrl: 'img4.png',
            name: '自行车',
            useNote: '自行车自行车自行车自行车',
            price: 50,
            rented: 500,
            sellNum: 102,
            styleW: 109 * 0.9,
            styleH: 106 * 0.9
        }, {
            imgUrl: 'img5.png',
            name: '帐篷',
            useNote: '帐篷帐篷帐篷帐篷',
            price: 50,
            rented: 300,
            sellNum: 40,
            styleW: 109 * 0.9,
            styleH: 76 * 0.9
        }]
    },

    onLoad: function(options) {

    },

    showBig: function(e) {
        const index = e.currentTarget.dataset.index;
        this.setData({
            currentIdx: index
        });
    },

    bindViewTap: function() {
        wx.setStorageSync('rentInfo', this.data.list[this.data.currentIdx]);
        wx.navigateTo({
            url: './rent_now',
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})