Page({
    data: {
        activeIdx: 2,
        list: [{
            num: 50,
            sell: 30.00
        }, {
            num: 100,
            sell: 50.00
        }, {
            num: 200,
            sell: 100.00
        }, {
            num: 400,
            sell: 200.00
        }, {
            num: 1000,
            sell: 500.00
        }, {
            num: 2000,
            sell: 1000.00
        }]
    },
    bindViewTap: function() {
        wx.navigateBack({
            delta: 2
        })
    },
    onLoad: function() {

    },
    chooseTap: function(e) {
        const index =  e.currentTarget.dataset.index;
        this.setData({
            activeIdx: index
        })
    }
})