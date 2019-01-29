const util = require('../../utils/util.js')
var pageData = {
    data: {
        bannerImg: util.baseUrl + 'html/haiquanwan/img/tc_img3.png',
        yuyueImg: util.baseUrl + 'html/haiquanwan/img/yuyue_w.png',
        gotoImg: util.baseUrl + 'html/haiquanwan/img/goto_w.png',
        innerAudioContext: '',
        blockSize: 12,
        blockColor: '#fff',
        backgroundColor: '#E7E7E7',
        activeColor: '#39B6A3',
        isStart: false,
        // ---------------------------------------------------------------------------------------------------
        current: {
            poster: util.baseUrl + 'html/haiquanwan/img/player_icon.png',
            name: '云霄飞车',
            author: '海泉湾',
            src: util.baseUrl + 'html/haiquanwan/guid.mp3',
        },
        audioAction: {
            method: 'pause'
        }
    },
    onLoad: function(options) {

    },

    btnTap: function(e) {
        const index = e.currentTarget.dataset.index;
        if (index === 'yuyue') {
            wx.navigateTo({
                url: '../scheduleDetail/scheduleDetail',
            })
        } else if (index == 'goto') {
            wx.openLocation({
                latitude: 22.070463,
                longitude: 113.115775,
                name: '海泉湾云霄飞车',
            });
        }
    },

    // 查看地图（导航）
    openTheMap: function() {
        if (this.data.detailObj.location) {
            
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },

    audioPlayed: function(e) {
        console.log('audio is played')
    },
    audioTimeUpdated: function(e) {
        this.duration = e.detail.duration;
    },

    timeSliderChanged: function(e) {
        if (!this.duration)
            return;

        var time = this.duration * e.detail.value / 100;

        this.setData({
            audioAction: {
                method: 'setCurrentTime',
                data: time
            }
        });
    },
    playbackRateSliderChanged: function(e) {
        this.setData({
            audioAction: {
                method: 'setPlaybackRate',
                data: e.detail.value
            }
        })
    },

    playAudio: function() {
        this.setData({
            audioAction: {
                method: 'play'
            }
        });
    },
    pauseAudio: function() {
        this.setData({
            audioAction: {
                method: 'pause'
            }
        });
    }
}
for (var i = 1; i < 5; ++i) {
    (function(index) {
        pageData[`slider${index}change`] = function(e) {
            console.log(`slider${index}发生change事件，携带值为`, e.detail.value)
        }
    })(i);
}
Page(pageData)