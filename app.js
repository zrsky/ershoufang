
/**
 * WeChat API 模块
 * @type {Object}
 * 用于将微信官方`API`封装为`Promise`方式
 * > 小程序支持以`CommonJS`规范组织代码结构
 */
var wechat = require('./utils/wechat.js');

/**
 * Douban API 模块
 * @type {Object}
 */
var car = require('./utils/car.js');

var url = "https://ershouche.test.91xinxiang.com/api/index/lists.html";
App({
  data:{
    name:'car',
    version:'0.1.0',
    currentCity:'新乡'
  },
  wechat:wechat,
  car:car,

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    // 登录
    wx.login({
      success: res => {
        var code = res.code;
        console.log("code:" + code);
        if (code) {
          console.log('获取用户登录凭证：' + code);

          // --------- 发送凭证 ------------------
          wx.request({
            url: 'https://ershouche.test.91xinxiang.com/api/common/login',
            data: { code: code },
            header: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-Requested-With': 'xmlhttprequest' },
            success: res => {
              console.log("res:" + JSON.stringify(res));
              wx.setStorage({
                key: 'token',
                data: res.data.data,
              })
            }
          })
  } else {
    console.log('获取用户登录态失败：' + res.errMsg);
  }
}
    })

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    console.log("aaa:",this.globalData.userInfo);
  },
  getUserInfo: function (cb) {
    
  },
  globalData: {
    userInfo: null
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  }
})
