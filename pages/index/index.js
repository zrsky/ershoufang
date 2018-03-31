//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasInfo:true,//是否发布过车源
    title:'',
    subtitle:'加载中...',
    type:'/api/index/lists',
    page:1,
    size:20,
    cars:[],
    loading:true,
    hasMore:true,
    isSeller:false,//是否卖家
    itemList:['修改为已售','发布到朋友圈','编辑'], //操作表数据
    userInfo: {}//登录信息
  },
  loadMore:function loadMore(){
    var self = this;
    if(!this.data.hasMore) return;
    this.setData({subtitle:'加载中...',loading:true});
    return app.car.find(this.data.type,this.data.page++,this.data.size).then(function(d){
      if(d.subjects.length){
        self.setData({cars:self.data.cars.concat(d.subjects),loading:false});
      }else{
        self.setData({hasMore:false,loading:false});
      }
    }).catch(function(e){
      self.setData({loading:false});
      console.error(e);
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      self.setData({
        userInfo: userInfo
      })
      console.log("userinfo:",JSON.stringify(userInfo));
    })
    console.log("options:"+JSON.stringify(options));
    this.data.title = options.title||this.data.title;
    this.data.type = options.type||this.data.type;
    // 显示还是隐藏
    app.car.findCar("info").then(function(d){
      console.log()
      // self.setData({hasInfo:d.data.hasInfo});
    }).catch(function(e){
      console.error(e);
    })
    this.loadMore();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // wx.setNavigationBarTitle({ title: this.data.title + '二手车批发神器' });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('页面显示了');
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
    this.setData({ cars: [], page: 1 ,hasMore:true});
    this.loadMore().then(function () {
      return app.wechat.original.stopPullDownRefresh();
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.loadMore();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  relCar:function(){
    console.log('aaa');
    wx.switchTab({
      url: '../releasecar/releasecar'
      // url:'../mycar/mycar'
    })
  },
  // 操作
  getOption:function(e){
    var self = this;
    var id = e.currentTarget.id;
    console.log('id:',id);
    wx.showActionSheet({
      itemList: self.data.itemList,
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }

    })
  },
  getDelete:function(e){
    console.log(JSON.stringify(e));
  }

})
