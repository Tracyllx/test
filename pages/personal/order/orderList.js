/**
 * @author llk
 */
const util = require('../../../utils/util.js')
Page({
    data: {
        baseUrl: util.baseUrl,
        orderStatusArr: ['', '待付款', '已付款', '已取消', '退款中', '已退款', '已核销', '已取票'],
        dialogShow: false, //是否显示提示弹出框
        dialogTxt: '', //提示弹窗提示文字内容
        dialogIndex: '', //提示弹窗中，用于删除、取消订单
        navActive: 1, //1全部，2待付款，3已付款，4退款/售后
        lastLoadTime: 0, //上一次加载的时间
        loadMoreIs: false, //监控是否是下拉加载更多
        dataList: [], //列表
        page: 1, //当前页数
        limit: 10, //每页显示的条数
        totalPage: 0, //总页数
        totalCount: 0, //总条数
        navActive: 1,
    },
    onLoad: function(options) {

    },
    onShow: function() {
        this.setData({
            lastLoadTime: 0, //上一次加载的时间
            loadMoreIs: false, //监控是否是下拉加载更多
            dataList: [], //列表
            page: 1, //当前页数
            limit: 10, //每页显示的条数
            totalPage: 0, //总页数
            totalCount: 0, //总条数
        });
        this.getDataList();
    },

    // 点击导航栏
    navTap: function(e) {
        var index = e.currentTarget.dataset.index;
        this.setData({
            navActive: index,
            page: 1,
            loadMoreIs: false,
            dataList: [],
        });
        this.getDataList();
    },

    // 查看订单详情
    gotoDetail: function(e) {
        const index = e.currentTarget.dataset.index;
        const orderId = this.data.dataList[index].orderId;
        const orderStatus = this.data.dataList[index].orderStatus;

        // orderStatus: 1 待付款
        // orderStatus: 2 待使用
        // orderStatus: 3 已取消
        // orderStatus: 4 退款中
        // orderStatus: 5 已退款
        // orderStatus: 6 已使用
        // orderStatus: 7 已取票

        if (orderStatus == 2) {
            wx.navigateTo({
                url: '/pages/personal/order/order_waitUse'
            });
        } else if (orderStatus == 1) {
            wx.navigateTo({
                url: '/pages/personal/order/order_pay'
            });
        } else if (orderStatus == 6) {
            wx.navigateTo({
                url: '/pages/personal/order/order_used'
            });
        } else if (orderStatus == 5) {
            wx.navigateTo({
                url: '/pages/personal/order/order_refunded'
            });
        }

    },

    // 按钮操作
    orderButton: function(e) {
        const index = e.currentTarget.dataset.index;
        const typeName = e.currentTarget.dataset.type;
        const orderId = this.data.dataList[index].orderId;
        const orgnId = this.data.dataList[index].orgnId;
        const productId = this.data.dataList[index].productId;
        const productType = this.data.dataList[index].product_type;
        if (typeName === 'onemore') {
            // if (productType == 9) {
            //     wx.navigateTo({
            //         url: '../hotelDetail/hotelDetail?orgnId=' + orgnId + '&productType=9',
            //     });
            // } else if (productType == 12 || productType == 13 || productType == 14) {
            //     wx.navigateTo({
            //         url: '../personalProDetail/personalProDetail?productId=' + productId,
            //     });
            // } else {
            //     wx.navigateTo({
            //         url: '../scenicSpotDetail/scenicSpotDetail?orgnId=' + orgnId + '&productType=' + productType,
            //     });
            // }
        } else if (typeName === 'continue') {
            // wx.navigateTo({
            //    url: '/pages/personal/order/order_waitUse'
            // });
            wx.navigateTo({
                url: '/pages/personal/order/order_pay'
            });

        } else if (typeName === 'cancel') {
            // this.setData({
            //     dialogIndex: index,
            //     dialogShow: true,
            //     dialogTxt: '取消'
            // });
        } else if (typeName === 'delete') {
            // this.setData({
            //     dialogIndex: index,
            //     dialogShow: true,
            //     dialogTxt: '删除'
            // });
        }
    },

    // 提示对话框中的按钮操作
    dialogButton: function(e) {
        var typeName = e.currentTarget.dataset.type;
        // if (typeName === 'cancel') {
        //     this.setData({
        //         dialogShow: false
        //     });
        // } else if (typeName === 'confirm') {
        //     if (this.data.dialogTxt === '取消') {
        //         this.cancelOrder(this.data.dialogIndex);
        //     } else if (this.data.dialogTxt === '删除') {
        //         this.deleteOrder(this.data.dialogIndex);
        //     }
        // }
    },

    // 获取订单列表
    getDataList: function() {
        var that = this;
        // var params = {
        //     type: this.data.navActive,
        //     page: this.data.page,
        //     limit: this.data.limit,
        // }

        // orderStatus: 1 待付款
        // orderStatus: 2 待使用
        // orderStatus: 3 已取消
        // orderStatus: 4 退款中
        // orderStatus: 5 已退款
        // orderStatus: 6 已使用
        // orderStatus: 7 已取票

        var list = [];

        // 待使用 
        var photos = [];
        photos.push(this.data.baseUrl + 'html/haiquanwan/img/pageUI/orderPhotos/item1.png');
        var item2 = {
            photos: photos,
            product_type: 9,
            orgnName: '山水时尚酒店',
            productName: '标准大床房',
            ticketNum: 1,
            startDate: '2018-08-14',
            endDate: '2018-08-15',
            // limitTime: '2018-09-20', 
            amount: 54,
            orderStatus: 2
        };
        // list.push(item2);

        // 待付款
        photos = [];
        photos.push(this.data.baseUrl + 'html/haiquanwan/img/pageUI/orderPhotos/item2.png');
        var item1 = {
            photos: photos,
            product_type: 1,
            orgnName: '大河马水上乐园',
            // productName: '标准大床房',
            ticketNum: 2,
            // startDate: '2018-10-01',
            // endDate: '2018-10-03',
            // limitTime: '2018-09-20', 
            amount: 164,
            orderStatus: 1
        };
        // list.push(item1);

        // 已使用
        photos = [];
        photos.push(this.data.baseUrl + 'html/haiquanwan/img/pageUI/orderPhotos/item3.png');
        var item6 = {
            photos: photos,
            product_type: 1,
            orgnName: '大丰门漂流',
            // productName: '标准大床房',
            ticketNum: 2,
            // startDate: '2018-10-01',
            // endDate: '2018-10-03',
            // limitTime: '2018-09-20', 
            amount: 456,
            orderStatus: 6
        };
        // list.push(item6);

        // 已退款
        photos = [];
        photos.push(this.data.baseUrl + 'html/haiquanwan/img/pageUI/orderPhotos/item4.png');
        var item5 = {
            photos: photos,
            product_type: 1,
            orgnName: '百万葵园',
            // productName: '标准大床房',
            ticketNum: 2,
            // startDate: '2018-10-01',
            // endDate: '2018-10-03',
            // limitTime: '2018-09-20', 
            amount: 456,
            orderStatus: 5
        };
        // list.push(item5);

        if (this.data.navActive == 1) { //全部
            list.push(item2);
            list.push(item1);
            list.push(item6);
            list.push(item5);
        } else if (this.data.navActive == 2) { //待付款
            list.push(item1);
        } else if (this.data.navActive == 3) { //待使用
            list.push(item2);
        } else if (this.data.navActive == 4) { //退款、售后
            list.push(item6);
            list.push(item5);
        }

        that.setData({
            dataList: list,
            totalPage: 1,
            totalCount: 4,
        });

    },

    // 加载更多
    loadMore: function(e) {
        var that = this;
        var currentTime = e.timeStamp; //得到当前加载的时间
        var lastTime = this.data.lastLoadTime; //得到上一次加载的时间
        if (currentTime - lastTime < 300) {
            console.log("时间间隔太短，不能算下拉加载");
            return;
        }
        var newPage = this.data.page + 1;
        if (that.data.totalPage >= newPage) {
            this.setData({
                page: newPage,
                lastLoadTime: currentTime,
                loadMoreIs: true
            });
            this.getDataList();
        }
    },

    // 取消订单
    cancelOrder: function(index) {
        // var that = this;
        // var list = this.data.dataList;
        console.log("cancelOrder");

    },

    // 删除订单
    deleteOrder: function(index) {
        // var that = this;
        // var list = this.data.dataList;
        console.log("deleteOrder");

    },
})