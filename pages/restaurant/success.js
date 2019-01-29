const util = require('../../utils/util.js');
Page({
    data: {

    },
    onLoad: function(options) {

    },
    gotoUrl: function(e) {
        const index = e.currentTarget.dataset.index;
        if (index === 'detail') {
            wx.redirectTo({
                url: './detail',
            })
        } else if (index === 'index') {
          wx.redirectTo({
              url: '../guideMap/guideMap',
          })
        }
    }
})