var util = require("../../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:{},
    title:"",
    url:"",
    totalCount:0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = options.url;
    this.data.title = options.title
    this.data.url = url;
    this.getMoreData(url);
  },

  onReady:function(event){
    wx.setNavigationBarTitle({
      title: this.data.title
    })
  },


  getMoreData: function(url){
    var that = this;
    wx.request({
      url: url,
      header: {
        "content-type": "application/xml;"
      },
      success: function(res){
        
        var movies = util.processData(res.data);
        var totalMovies = {};
        if(!that.data.isEmpty){
          totalMovies = that.data.movies.concat(movies);
        }else{
          totalMovies = movies;
          that.data.isEmpty = false;
        }
        that.setData({ movies: totalMovies});
        that.data.totalCount += 20;
        wx.hideNavigationBarLoading();
      }
    })
  },

  onReachBottom: function(event){
    var url = this.data.url;
    var reqUrl = url + "?start="+this.data.totalCount+"&count=20";
    this.getMoreData(reqUrl);
    wx.showNavigationBarLoading();
  },

  onPullDownRefresh:function(event){
    var refreshUrl = this.data.url+"?start=0&count=20";
    this.data.isEmpty = true;
    this.getMoreData(refreshUrl);
    wx.showNavigationBarLoading();
  },

  onMovieTap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../detail/detail?id=' + id,
    })
  }
})