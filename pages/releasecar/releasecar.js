// pages/component/page/tools/tools.js
import WxValidate from '../../utils/WxValidate.js';
var tcity = require('../common/city.js');
Page({

  /**
   * 页面的初始数据
   */
 data: {
    date: '2018-09-01',
    date1: '2017-09-01',
    color: ['黑','白','银','红'],
    standard: ['国三','国四','国五'],
    year: ['无', new Date().getFullYear() - 1 + '年', new Date().getFullYear() + '年', new Date().getFullYear() + 1 + '年', new Date().getFullYear() + 2 + '年'],
    index: 0,
    sIndex: 0,
    yIndex:0,
    multiArray: [['北京'],['北京市'],['东城区']],
    multiIndex: [0,0,0],
    cityData: [],
    category: [
      {id:1, need:true,title:'一口价', placeholder:'请填写批发价',prefix:'万元',name:'price'},
      { id:2, need: true, title: '车辆新款', placeholder: '例: 大众迈腾1.8T领先型' ,name:'title'},
      { id:3,need: true, type: "date", title: '上牌日期', placeholder: '2018-03-27' ,name:'card_date'},
      { id:4, need: true, type: "date1", title: '出厂日期', placeholder: '2018-03-27', name:'build_date' },
      { id:5, need: true, title: '实际里程', placeholder: '请输入实际里程',prefix:'万公里', name:'mileage' },
      { id:6, need: true, title: '车况描述', placeholder: '请结合4s店保养记录如实描述车况, 否则描述不准确会影响您的诚信', name:'description' },
      { id:7, need: true, title: '联系电话', placeholder: '请输入联系电话', name:'mobile' },
    ],
    category1: [
      { id: 1, need: false, title: '新车指导价', placeholder: '请填写新车指导价', prefix: '万元',name:'guidance' },
      { id: 2, need: false, title: '车辆配置', placeholder: '例: 自动挡、天窗、带底盘升降等',name:'detail' },
      { id: 3, need: false, title: '汽车排量', placeholder: '请输入汽车排量',name:'output_valume' },
      { id: 4, need: false, type: 'standard', title: '排放标准', placeholder: '国三',name:'standard_id' },
      { id: 5, need: false, type: 'address', title: '车所在地', placeholder: '河南省，新乡市，红旗区', },
      { id: 6, need: false, type:'year', title: '保险时间', placeholder: '无',name:'insurance_time' },
      { id: 7, need: false, title: '过户次数', placeholder: '请输入过户次数',name:'transfer_numbers' },
      { id: 8, need: false, title: '钥匙几把', placeholder: '请输入钥匙几把',name:'key_numbers' },
      { id: 9, need: false, title: '保养记录', placeholder: '请输入保养记录',name:'maintanance_logs' },
    ],
    imageList: [],
    imageList1: [],
 },
 bindDateChange: function (e) {
   console.log('picker发送选择改变，携带值为', e.detail.value)
   this.setData({
     date: e.detail.value
   })
 },
 bindDateChange1: function (e) {
   console.log('picker发送选择改变，携带值为', e.detail.value)
   this.setData({
     date1: e.detail.value
   })
 },
 bindColorChange: function (e) {
   console.log('picker发送选择改变，携带值为', e.detail.value)
   this.setData({
     index: e.detail.value
   })
 },
 bindStandardChange: function (e) {
   console.log('picker发送选择改变，携带值为', e.detail.value)
   this.setData({
     sIndex: e.detail.value
   })
 },
 bindYearChange: function (e) {
   console.log('picker发送选择改变，携带值为', e.detail.value)
   this.setData({
     yIndex: e.detail.value
   })
 },
 bindMultiPickerChange: function (e) {
   console.log('picker发送选择改变，携带值为', e.detail.value)
   this.setData({
     multiIndex: e.detail.value
   })
 },
 bindMultiPickerColumnChange: function(e) {
   console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
   var that = this;
   var data = {
     multiArray: this.data.multiArray,
     multiIndex: this.data.multiIndex
   };
   data.multiIndex[e.detail.column] = e.detail.value;
   if(e.detail.column==0) {
     that.data.cityData.forEach((item, index) => {
       if (data.multiIndex[0] == index) {
         data.multiArray[1] = [];
         if (that.data.cityData[index].subs) {
           data.multiIndex[1] = 0;
           that.data.cityData[index].subs.forEach((item1, index1) => {
             data.multiArray[1].push(item1.name);
             data.multiArray[2] = [];
             if (that.data.cityData[index].subs[0].subs) {
               that.data.multiIndex[2] = 0
               that.data.cityData[index].subs[0].subs.forEach((item2, index2) => {
                 data.multiArray[2].push(item2.name);
               })
             }

           })
         }
         
       }
     })
   } else if (e.detail.column == 1) {
     that.data.cityData.forEach((item, index) => {
         if (that.data.cityData[data.multiIndex[0]].subs) {
           that.data.cityData[data.multiIndex[0]].subs.forEach((item1, index1) => {
            if(data.multiIndex[1] == index1) {             
              if (that.data.cityData[data.multiIndex[0]].subs[index1].subs) {
                data.multiArray[2] = [];                
                that.data.cityData[data.multiIndex[0]].subs[index1].subs.forEach((item2, index2) => {
                  data.multiIndex[2] = 0;
                  data.multiArray[2].push(item2.name);
                })
              }
            }
           })
         }

      //  }
     })
   }
   this.setData(data);
 },
 chooseImageTap: function () {
   let _this = this;
   wx.showActionSheet({
     itemList: ['从相册中选择', '拍照'],
     itemColor: "#f7982a",
     success: function (res) {
       if (!res.cancel) {
         if (res.tapIndex == 0) {
           _this.chooseWxImage('album')
         } else if (res.tapIndex == 1) {
           _this.chooseWxImage('camera')
         }
       }
     }
   })

 },
 chooseWxImage: function (type) {
   var that = this
   if (this.data.imageList.length >= 9) {
     this.showModal({msg:'上传图片数量不能大于9张'})
     return;
   }
   wx.chooseImage({
     count: 9,
     sizeType: ['original', 'compressed'],
     sourceType: [type],
     success: function (res) {
       console.log(res)
       that.setData({
         imageList: that.data.imageList.concat(res.tempFilePaths)
       })
     }
   })
 },
 chooseImageTap1: function () {
   let _this = this;
   wx.showActionSheet({
     itemList: ['从相册中选择', '拍照'],
     itemColor: "#f7982a",
     success: function (res) {
       if (!res.cancel) {
         if (res.tapIndex == 0) {
           _this.chooseWxImage1('album')
         } else if (res.tapIndex == 1) {
           _this.chooseWxImage1('camera')
         }
       }
     }
   })

 },
   chooseWxImage1: function (type) {
   var that = this
   
   wx.chooseImage({
     count: 1,
     sizeType: ['original', 'compressed'],
     sourceType: [type],
     success: function (res) {
       console.log(res)
       that.setData({
         imageList1: res.tempFilePaths
       })
     }
   })
 },
 previewImage: function (e) {
   var current = e.target.dataset.src

   wx.previewImage({
     current: current,
     urls: this.data.imageList
   })
 },
 previewImage1: function (e) {
   var current = e.target.dataset.src

   wx.previewImage({
     current: current,
     urls: this.data.imageList1
   })
 },
//  模态框
 showModal(error) {
   wx.showModal({
     content: error.msg,
     showCancel: false,
   })
 },
//  表单提交
 formSubmit: function (e) {
   console.log('form发生了submit事件，携带数据为：', e.detail.value)
   var p_id, c_id, a_id;
   p_id = this.data.cityData[this.data.multiIndex[0]].id;
   c_id = this.data.cityData[this.data.multiIndex[0]].subs[this.data.multiIndex[1]].id;
   a_id = this.data.cityData[this.data.multiIndex[0]].subs[this.data.multiIndex[1]].subs[this.data.multiIndex[2]].id;
  //  出厂日期
   var buildDate = e.detail.value.build_date.replace('-','');
  //  上牌日期
   var cardDate = e.detail.value.card_date.replace('-', '');
   if(buildDate >= cardDate) {
     this.showModal({msg:'出牌日期不能大于上牌日期'})
   }
   // 传入表单数据，调用验证方法
   if (!this.WxValidate.checkForm(e)) {
     const error = this.WxValidate.errorList[0]
     this.showModal(error)
     return false
   }

   this.showModal({
     msg: '提交成功',
   })
 },
//  formReset: function () {
//    console.log('form发生了reset事件')
//  },
 initValidate() {
   // 验证字段的规则
   const rules = {
     price: {
       required: true,
       number:true,
     },
     title: {
       required: true,
       assistance: true,
     },
    //  card_data: {
    //    required: true,
      
    //  },
    //  build_date: {
    //    required: true,

    //  },
     mileage: {
       required: true,
       number: true,
     },
     description: {
       required: true,
       description: true,
     },
     mobile: {
       required: true,
       tel: true,
     },
    //  color_id: {
    //    required: true,
    //  },
     guidance: {
      //  required: true,
       number:true,
     },
     detail: {
      //  required: true,
     },
     output_valume: {
      //  required: true,
     },
     standard_id: {
      //  required: true,
     },
     insurance_time: {
      //  required: true,
     },
     transfer_numbers: {
      //  required: true,
       number: true,
     },
     key_numbers: {
      //  required: true,
       number: true,
     },
     maintanance_logs: {
      //  required: true,
     },
   }

   // 验证字段的提示信息，若不传则调用默认的信息
   const messages = {
     price: {
       required: '请填写批发价',
       number:'批发价只能填写数字'
     },
     title: {
       required: '请填写车辆新款类型',
     },
    //  card_data: {
    //    required: '请输入邮箱',
    //    email: '请输入正确的邮箱',
    //  },
     mileage: {
       required: '请输入实际里程',
       number: '实际里程只能填写数字',
     },
     description: {
       required: '请输入车况描述',
      //  description: '车况描述是必填字段'
     },
     mobile: {
       required: '请输入联系电话',
       tel: '请输入正确的手机号',
     },
     guidance: {
      //  required: '请输入新车指导价',
       number:'新车指导价只能填写数字'
     },
     transfer_numbers: {
      //  required: '请输入过户次数',
      number: '过户次数只能填写数字',
     },
     key_numbers: {
       number: '钥匙几把只能填写数字',
     },
   }

   // 创建实例对象
   this.WxValidate = new WxValidate(rules, messages)

   // 自定义验证规则
   
 },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //初始化地区
    var that = this;
    tcity.init(that);
    let provinces = [];
    let citys = [];
    let areas = [];
    console.log(this.data.cityData)
    this.data.cityData.forEach((item, index) => {
      provinces.push(item.name);
    })
    for (var i = 0; i < this.data.cityData[0].subs.length; i++) {
      citys.push(this.data.cityData[0].subs[i].name);
      for (var j = 0; j < this.data.cityData[0].subs[i].subs.length; j++) {
        areas.push(this.data.cityData[0].subs[i].subs[j].name);
      }
    }

    this.setData({
      multiArray: [provinces, citys, areas]
    })
    // 初始化验证表单
    this.initValidate()
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