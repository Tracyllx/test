var util = require('../../../utils/util.js');
Page({
    data: {
        list: [{
            name: '活动手续费',
            time: '2018-08-09 14:50',
            money: -1.72
        }, {
            name: '充值',
            time: '2018-08-09 08:50',
            money: +200
        }, {
            name: '提现',
            time: '2018-08-07 10:50',
            money: -100.24
        }, {
            name: '活动入账：用户参加月饼团购活动...',
            time: '2018-08-05 00:00',
            money: +10.90
        }],
    },
    onLoad: function(options) {

    },
})