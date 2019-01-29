Page({
    data: {

    },

    onLoad: function(options) {
        console.log(options)
        wx.openLocation({
            latitude: Number(options.lat),
            longitude: Number(options.lon),
            name: options.name,
        });
    }
})