const util = require('../../../utils/util.js')
Page({
    data: {
        baseUrl: util.baseUrl,
    },
    bindViewTap: function() {

        wx.navigateBack({
            delta: 2
        })

    },
})