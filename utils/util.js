const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

const baseUrl = "https://hi.cxtrip.cc/cxyTicket/";//开发环境

// const baseUrl = "https://wechat.cxtrip.cc/preproduct/";//体验版环境

// const baseUrl = "https://wechat.cxtrip.cc/cxyTicket/";//正式环境
//sessionChoose 1是带sessionID的GET方法  2是不带sessionID的GET方法, 3是带sessionID的Post方法,4是不带sessionID的Post方法
//ask是是否要进行询问授权，true为要，false为不要
//sessionChoose为1,2,3,4,所以paramSession下标为0的则为空
function HttpRequst(loading, url, sessionChoose, sessionId, params, method, ask, callBack) {
    if (loading == true) {
        wx.showToast({
            title: '数据加载中',
            icon: 'loading'
        });
    }
    var paramSession = [{},
    { 'content-type': 'application/json', 'Cookie': 'JSESSIONID=' + sessionId },
    { 'content-type': 'application/json' },
    { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'JSESSIONID=' + sessionId },
    { 'content-type': 'application/x-www-form-urlencoded' }]
    wx.request({
        url: baseUrl + url,
        data: params,
        dataType: "json",
        header: paramSession[sessionChoose],
        method: method,
        success: function (res) {
            if (loading == true) {
                wx.hideToast();//隐藏提示框
            }
            if (res.data.code == 5000) {
                console.log('code:', res.data.code);
                wxLogin(loading, url, sessionChoose, sessionId, params, method, ask, callBack);
            }
            callBack(res.data);
        },
        complete: function () {
            if (loading == true) {
                wx.hideToast();//隐藏提示框
            }
        }
    })
}

function wxLogin(loading, url, sessionChoose, sessionId, params, method, ask, callBack) {
    const newStamp = new Date().getTime();
    const oldStamp = wx.getStorageSync('UTILTIMESTAMP');
    if (oldStamp && newStamp - oldStamp < 2000) { // 防止2秒内多次调用 wx.login() 方法
        console.log('小于2秒');
    } else {
        console.log(newStamp - oldStamp);
        wx.setStorageSync('UTILTIMESTAMP', newStamp);
        wx.login({
            success: function (res) {
                var code = res.code;//得到code
                HttpRequst(true, "ztc/product/login", false, "", { "code": code }, "GET", false, function (res) {
                    if (res.code == 200) {
                        console.log('set sessionId')
                        wx.setStorageSync('sessionId', res.sessionId);
                        if (res.isNeedUserInfo == true) {//用户从未授权用户信息过就进入这里
                            console.log('该用户从未授权')
                            // wx.navigateTo({
                            //     url: '../authorization/authorization',
                            // });
                        } else {//用户之前已授权用户信息
                            HttpRequst(loading, url, sessionChoose, wx.getStorageSync("sessionId"), params, method, ask, callBack);
                        }
                    }
                })
            }
        });
    }
}

function newSaveUser(result, callBack) {
    wx.request({
        url: baseUrl + "ztc/product/saveUser",
        data: { "encryptedData": result.encryptedData, "iv": result.iv },
        dataType: "json",
        header: { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'JSESSIONID=' + wx.getStorageSync('sessionId') },
        method: "POST",
        success: function (res) {
            // console.log(res.data)
            if (res.data.code == 200) {
                callBack();
            }
        },
        complete: function () {

        }
    })
}

function newLogin(callBack) {
    wx.login({
        success: res => {
            const code = res.code;
            wx.request({
                url: baseUrl + "ztc/product/login",
                data: { "code": code },
                dataType: "json",
                header: { "content-type": "application/json" },
                method: "GET",
                success: function (res) {
                    if (res.data.code == 200) {
                        console.log('newLogin set sessionId')
                        wx.setStorageSync('sessionId', res.data.sessionId);
                        callBack(res.data.isNeedUserInfo);
                    }
                },
                complete: function () {

                }
            })
        }
    })
}




module.exports = {
    formatTime: formatTime,
    baseUrl: baseUrl
}
