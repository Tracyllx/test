Page({
    data: {
        myWallet: 666.99
    },
    bindViewTap: function (e) {
        const index = e.currentTarget.dataset.index;
        if (index == 1) {
            //消费明细
            wx.navigateTo({
                url: '/pages/personal/wallet_detail/index'
            })
        } else if (index == 2) {
            //我要充值
            wx.navigateTo({
                url: '/pages/personal/wallet_recharge/index'
            })
        } else if (index == 3) {
            //我要提现
            wx.navigateTo({
                url: '/pages/personal/wallet_withdraw/index?myWallet=' + this.data.myWallet
            })
        }

    },
})