// pages/welcome.js
Page({

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getUserInfo({
      success: function (res) {
        that.setData({userInfo:res.userInfo});
      }
    });
  },

  begin:function(event) {
    wx.switchTab({
      url: '../posts/posts',
    });
  }
})