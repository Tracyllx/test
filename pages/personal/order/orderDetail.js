/**
 * @author llk
 */
Page({
    data: {
        orderStatusArr: ['', '待付款', '待使用', '已取消', '退款中', '已退款', '已使用', '已取票'],
        dialogShow: false, //是否显示提示弹出框
        dialogTxt: '', //提示弹窗提示文字内容
        orderDetail: '', //订单详情
        minute1: "0",
        minute2: "0",
        second1: "0",
        second2: "0",
        orderId: '', //该订单id
        orderTime: '', //下单时间
        orderUseTime: 0, //得到订单可用的时间
    },
    onLoad: function(options) {
        // this.setData({
        //     orderId: options.orderId,
        // });
        // this.getNewTime();
    },
    onShow: function() {
        // this.getOrderDetail();
    },

    // 查看商家
    gotoOrgn: function() {
        const orgnId = this.data.orderDetail.orgnId;
        const productType = this.data.orderDetail.product_type;
        if (productType == 9) {
            wx.redirectTo({
                url: '../hotelDetail/hotelDetail?orgnId=' + orgnId + '&productType=9',
            });
        } else {
            wx.redirectTo({
                url: '../scenicSpotDetail/scenicSpotDetail?orgnId=' + orgnId + '&productType=' + productType,
            });
        }
    },

    // 按钮操作
    orderButton: function(e) {
        const typeName = e.currentTarget.dataset.type;
        const orderId = this.data.orderId;
        const orgnId = this.data.orderDetail.orgnId;
        const productId = this.data.orderDetail.product_id;
        const productType = this.data.orderDetail.product_type;
        if (typeName === 'onemore') {
            if (productType == 9) {
                wx.redirectTo({
                    url: '../hotelDetail/hotelDetail?orgnId=' + orgnId + '&productType=9',
                });
            } else if (productType == 12 || productType == 13 || productType == 14) {
                wx.navigateTo({
                    url: '../personalProDetail/personalProDetail?productId=' + productId,
                });
            } else {
                wx.redirectTo({
                    url: '../scenicSpotDetail/scenicSpotDetail?orgnId=' + orgnId + '&productType=' + productType,
                });
            }
        } else if (typeName === 'continue') {
            wx.navigateTo({
                url: '../payOrder/payOrder?orderId=' + orderId,
            });
        } else if (typeName === 'cancel') {
            this.setData({
                dialogShow: true,
                dialogTxt: '取消'
            });
        } else if (typeName === 'delete') {
            this.setData({
                dialogShow: true,
                dialogTxt: '删除'
            });
        } else if (typeName === 'refund') {
            wx.setStorageSync('refundInfomation', {
                orgnName: this.data.orderDetail.orgnName,
                productName: this.data.orderDetail.productName,
                amount: Number(this.data.orderDetail.amount).toFixed(2),
                ticketNum: this.data.orderDetail.ticketNum,
                refund_desc: this.data.orderDetail.refund_desc,
            });
            wx.navigateTo({
                url: '../applicationRefund/applicationRefund?orderId=' + orderId + '&productType=' + productType,
            });
        }
    },

    // 提示对话框中的按钮操作
    dialogButton: function(e) {
        var typeName = e.currentTarget.dataset.type;
        if (typeName === 'cancel') {
            this.setData({
                dialogShow: false
            });
        } else if (typeName === 'confirm') {
            if (this.data.dialogTxt === '取消') {
                this.cancelOrder();
            } else if (this.data.dialogTxt === '删除') {
                this.deleteOrder();
            }
        }
    },

    // 取消订单
    cancelOrder: function() {
        var that = this;
        util.HttpRequst(true, "ztc/order/cancelOrder", 1, wx.getStorageSync("sessionId"), {
            'orderId': this.data.orderId,
        }, "GET", function(res) {
            if (res.code == 200) {
                that.setData({
                    dialogShow: false,
                });
                that.getOrderDetail(); //更新订单详情
            } else if (res.code == 500) {
                wx.showModal({
                    title: '提示',
                    content: '' + res.msg
                });
            } else {
                console.log(res);
            }
        });
    },

    // 删除订单
    deleteOrder: function() {
        var that = this;
        util.HttpRequst(true, "ztc/order/deleteOrder", 1, wx.getStorageSync("sessionId"), {
            'orderId': this.data.orderId,
        }, "GET", function(res) {
            if (res.code == 200) {
                that.setData({
                    dialogShow: false,
                });
                wx.navigateBack(); //返回
            } else if (res.code == 500) {
                wx.showModal({
                    title: '提示',
                    content: '' + res.msg
                });
            } else {
                console.log(res);
            }
        });
    },

    // 获取订单详情信息
    getOrderDetail: function() {
        var that = this;
        const weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        util.HttpRequst(false, "ztc/order/orderDetail", 1, wx.getStorageSync("sessionId"), {
            "orderId": this.data.orderId,
        }, "GET", function(res) {
            if (res.code == 200) {
                var order_detail = res.detail;
                that.getAddress(order_detail.product_addr); //获取入园地址
                order_detail.orderDateWeek = weeks[new Date(order_detail.orderDate).getDay()]; //使用时间，周几
                that.setData({
                    orderDetail: order_detail,
                    orderTime: order_detail.createTime
                });
                if (order_detail.orderStatus == 2) {
                    // 如果是支付了的话没有倒计时
                } else {
                    that.areaTime(); //启动倒计时
                }
            } else if (res.code == 500) {
                wx.showModal({
                    title: '提示',
                    content: '' + res.msg
                });
            } else {
                console.log(res);
            }
        })
    },

    // 高德地图获取地址详细信息
    getAddress: function(location) {
        var that = this;
        amapFun.getRegeo({
            location: location,
            success: function(data) {
                //成功回调 获取详细地址
                that.data.orderDetail.productAddress = data[0].regeocodeData.formatted_address;
                that.setData({
                    orderDetail: that.data.orderDetail
                });
            },
            fail: function(info) {
                //失败回调
                console.log(info)
            }
        });
    },

    // 获取当前日期
    getNewTime: function() {
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        month = month > 10 ? month : "0" + month;
        day = day > 10 ? day : "0" + day
        var str = year + "-" + month + "-" + day;
        this.setData({
            newDateTime: str,
            hour: hour,
            Minutes: minute
        });
    },

    // 函数：剩余时间
    areaTime: function() {
        var that = this;
        var arr = this.data.orderTime;
        var date = new Date(Number(arr.substr(0, 4)), Number(arr.substr(4, 2)) - 1, Number(arr.substr(6, 2)), Number(arr.substr(8, 2)), Number(arr.substr(10, 2)), Number(arr.substr(12, 2)));
        var order_time = Date.parse(date);
        // console.log("获取订单时间：" + order_time);
        var nowTime = Date.parse(new Date());
        // console.log("现在的时间：" + nowTime);

        var differ_time = nowTime - order_time;
        var leftTime = 1800000 - differ_time;
        var d = new Date(leftTime);
        if (leftTime < 0) {
            console.log("该订单已超时");
        } else {
            var interval = setInterval(function() {
                var m = d.getMinutes();
                var s = d.getSeconds();
                that.setData({
                    "minute1": parseInt(m / 10)
                });
                that.setData({
                    "minute2": parseInt(m % 10)
                });
                that.setData({
                    "second1": parseInt(s / 10)
                });
                that.setData({
                    "second2": parseInt(s % 10)
                });
                if (m == 0 && s == 0) {
                    clearInterval(interval);
                    return;
                }
                d.setSeconds(s - 1);
            }, 1000);
        }
    },
})