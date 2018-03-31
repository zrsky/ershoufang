// pages/mycar/mycar.js
var util = require('../../utils/util.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startdate: '2016-09-01',
    enddate:'2017-09-01',
    currentTime:null,
    page: 1,
    size: 20,
    cars:[],
    loading:true,
    hasMore:true,
    type: 'in_theaters',
    isSeller:true
  },
  formSubmit:function(e){
  console.log("提交：",e.detail.value);
  },
  bindStartDateChange: function (e) {
    this.setData({
      startdate: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    this.setData({
      enddate: e.detail.value
    })
  },
  loadMore: function loadMore() {
    var self = this;
    if (!this.data.hasMore) return;
    this.setData({ subtitle: '加载中...', loading: true });
    return app.car.find(this.data.type, this.data.page++, this.data.size).then(function (d) {
      if (d.subjects.length) {
        self.setData({ subtitle: d.title, cars: self.data.cars.concat(d.subjects), loading: false });
      } else {
        self.setData({ subtitle: d.title, hasMore: false, loading: false });
      }
    }).catch(function (e) {
      self.setData({ subtitle: d.title, loading: false });
      console.error(e);
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取当前时间
    var currentTime = util.formatTime(new Date());
    this.setData({ currentTime: currentTime, enddate: currentTime, isSeller:this.data.isSeller});
    console.log("seller:",this.data.isSeller);
    var self = this;
    console.log("options:" + JSON.stringify(options));
    this.data.title = options.title || this.data.title;
    this.data.type = options.type || this.data.type;
    this.loadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})