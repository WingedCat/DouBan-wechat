// pages/movies/movies.js
var util = require("../../utils/util.js")
var app = getApp();

Page({

data: {
  inTheaters:{},
  comingSoon:{},
  top250:{},
  searchResult:{},
  containerShow:true,
  searchPanelShow:false
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    var top250Url = app.globalData.doubanBase + '/v2/movie/top250?start=0&count=3';
    var inTheatersUrl = app.globalData.doubanBase + '/v2/movie/in_theaters?start=0&count=3';
    var comingSoonUrl = app.globalData.doubanBase + '/v2/movie/coming_soon?start=0&count=3';

    this.getMovieListData(inTheatersUrl, "正在热映", "inTheaters", app.globalData.doubanBase + '/v2/movie/in_theaters');
    this.getMovieListData(comingSoonUrl, "即将上映", "comingSoon", app.globalData.doubanBase + '/v2/movie/coming_soon');
    this.getMovieListData(top250Url, "TOP250", "top250", app.globalData.doubanBase + '/v2/movie/top250');
  },

  getMovieListData: function (url, categoryTitle,key,moreUrl) {
    var that = this;
    wx.request({
      url: url,
      header:{
        "content-type":"application/xml;" 
      },
      method: 'GET',
      success: function(res) {
        that.processDoubanData(res.data, categoryTitle, key,moreUrl);
      }
    })
  },

  processDoubanData: function (data, categoryTitle, key, moreUrl){
    var movies = util.processData(data); 
    var readyData = {};
    readyData[key] = {
      title: categoryTitle,
      moreUrl: moreUrl,
      movies:movies
    };
    this.setData(readyData);
  },

  onMoreTap:function(event){
    var url = event.currentTarget.dataset.url;
    var title = event.currentTarget.dataset.title;
    wx.navigateTo({
      url: 'more/more?url='+url+'&title='+title,
    })
  },

  onBindFocus:function(){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    });
  },

  onCancelImgTap:function(){
    this.setData({
      containerShow: true,
      searchPanelShow: false
    });
  },

  onBindBlur: function (event) {
    var that = this;
    var text = event.detail.value;
    var searchUrl = "http://t.yushu.im/v2/movie/search?q=" + text;
    wx.request({
      url: searchUrl,
      method: 'GET',
      success: function (res) {
        that.processDoubanData(res.data, "", "searchResult", "");
      }
    })
  },

  onMovieTap: function (event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'detail/detail?id='+id,
    })
  }
})