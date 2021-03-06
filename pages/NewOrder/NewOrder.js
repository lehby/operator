Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: "长的帅",
    array: [
      '立即出发',
      '09:00',
      '09:30',
      '10:00',
      '10:30',
      '11:00',
      '11:30',
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '14:00',
      '14:30',
      '15:00',
      '15:30',
      '16:00',
      '16:30',
      '17:00',
      '17:30',
      '18:00',
      '18:30',
      '19:00',
      '19:30',
      '20:00',
    ], //预定时间弹框
    array2: [
      '今天',
      '明天'
    ],
    index: 0,
    index1: 0,
    navbar: ['新增订气', '新增维修'],
    currentTab: 0,
    goodsModal: false, //控制商品弹框按钮
    isgoods: false, //控制商品列表的显示隐藏
    //订单表单信息++++++++++++++++

    // 用气编号
    Gasnumber: "",
    // 名字
    Subscribers: "",
    // 电话
    telephone: "",
    // 地址
    address: "",

    // 维修订单信息————————————————————————————————

    // 用气编号
    MaintenanceNumber: "",
    // 维修名称
    MaintenanceName: "",
    // 维修电话
    MaintenanceTelephone: "",
    // 维修地址
    RepairAddress: "",
    //问题描述
    MaintenanceDescription: "",

    // 点击后的保修
    // RepairLabel: [],
    // 渲染的保修列表
    // guaranteeList: [],
    goodslist: [{
        Name: "商品1",
        Price: 120,
        Quantity: 0, //计数
        PrceType: "公斤",
      },
      {
        Name: "商品2",
        Price: 120,
        Quantity: 0, //计数
        PrceType: "公斤",
      },
      {
        Name: "商品3",
        Price: 120,
        Quantity: 0, //计数
        PrceType: "瓶",
      },
      {
        Name: "商品4",
        Price: 120,
        Quantity: 0, //计数
        PrceType: "公斤",
      },
      {
        Name: "商品5",
        Price: 120,
        Quantity: 0, //计数
        PrceType: "瓶",
      }
    ],
    goods: [],
    Quantity: 0,
    Price: 0,
    problemlist: [ //维修问题
      {
        problem: "气质问题",
        state: false,
        background: "#EEE",
        color: "#666",
      },
      {
        problem: "灶具问题",
        state: false,
        background: "#EEE",
        color: "#666",
      },
      {
        problem: "漏气问题",
        state: false,
        background: "#EEE",
        color: "#666",
      },
      {
        problem: "钢瓶阀门问题",
        state: false,
        background: "#EEE",
        color: "#666",
      },
    ],
  },
  Discoloration(e) {
    const index = e.target.dataset.index;
    let state = this.data.problemlist[index].state;
    let problemlist = this.data.problemlist
    if (state === false) {
      problemlist[index].state = true;
      problemlist[index].background = "#154CC0";
      problemlist[index].color = "#fff";
      this.setData({
        problemlist
      })
    } else {
      problemlist[index].state = false;
      problemlist[index].background = "#EEE";
      problemlist[index].color = "#666";
      this.setData({
        problemlist
      })
    }
  },


  //导航控制
  navbarTap: function(e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  /**
   * 商品弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function() {},
  /**
   * 商品隐藏模态对话框
   */
  goodsHideModal: function() {
    this.setData({
      showgoods: false
    });
  },
  /**
   * 商品对话框取消按钮点击事件
   */
  goodsCancel: function() {
    this.goodsHideModal();
  },
  /**
   * 商品对话框确认按钮点击事件
   */
  goodsConfirm: function() {
    let goodslist = this.data.goodslist;
    let goods = [];
    for (let i = 0; i < goodslist.length; i++) {
      if (goodslist[i].Quantity > 0) {
        goods.push(goodslist[i])
      }
    }
    console.log(goods)
    this.setData({
      isgoods: true,
      goods: goods
    })
    this.goodsHideModal();
  },
  /**
   * 商品点击显示弹框
   */
  ongoods() {
    this.setData({
      showgoods: true,
    })
  },
  /**
   * 用户点击商品减1
   */
  subtracttap: function(e) {
    const index = e.target.dataset.index;
    const goodslist = this.data.goodslist;
    const Quantity = goodslist[index].Quantity;
    if (Quantity <= 0) {
      return;
    } else {
      goodslist[index].Quantity--;
      this.setData({
        goodslist: goodslist
      });
    }
    this.calculateTotal();
  },
  /**
   * 用户点击商品加1
   */
  addtap: function(e) {
    const index = e.target.dataset.index;
    const goodslist = this.data.goodslist;
    const Quantity = goodslist[index].Quantity;
    goodslist[index].Quantity++;
    this.setData({
      goodslist: goodslist
    });
    this.calculateTotal();
  },
  /**
   * 计算商品总数
   */
  calculateTotal: function() {
    let goodslist = this.data.goodslist;
    let Count = 0;
    let Price = 0;
    for (let i = 0; i < goodslist.length; i++) {
      let good = goodslist[i];
      Count += good.Quantity;
      Price += good.Quantity * good.Price;
    }
    this.setData({
      Quantity: Count,
      Price: Price
    })
  },


  //预约时间Picker索引值
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //预约那天Picker索引值
  bindDayPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },


  // 获取所有输入框里的值++++++++++++++++++++++
  // 获取订气订单用气编号
  Gasnumber: function(e) {
    this.setData({
      Gasnumber: e.detail.value
    })
  },
  // 获取订购人
  Subscribers: function(e) {
    this.setData({
      Subscribers: e.detail.value
    })
  },
  // 获取订单用户电话
  telephone: function(e) {
    this.setData({
      telephone: e.detail.value
    })
  },
  // 获取订气订单地址
  address: function(e) {
    this.setData({
      address: e.detail.value
    })
  },

  // 收索电话用气编号——————————————————————————————————
  collecting: function() {
    let TelePhone = this.data.telephone
    let gasnumber = this.data.Gasnumber
    if (TelePhone == "" || gasnumber == "") {      
      wx.showToast({            
        title:'内容不能为空',
        image:'../../imgs/1111.png',
        duration:  2000        
      })    
    } else {

    }
    console.log(TelePhone, gasnumber)
  },

  // 订气订单提交
  ConfirmSuccess: function() {
    console.log(this.data.Gasnumber)
    console.log(this.data.Subscribers)
    console.log(this.data.telephone)
    console.log(this.data.address)
  },




  // 获取维修订单输入框里的值++++++++++++++++++++++++++++++
  // 获取用气编号维修
  MaintenanceNumber: function(e) {
    this.setData({
      MaintenanceNumber: e.detail.value
    })
  },
  // 获取维修人姓名
  MaintenanceName: function(e) {
    this.setData({
      MaintenanceName: e.detail.value
    })
  },
  // 获取申报人电话
  MaintenanceTelephone: function(e) {
    this.setData({
      MaintenanceTelephone: e.detail.value
    })
  },
  // 获取维修地址
  RepairAddress: function(e) {
    this.setData({
      RepairAddress: e.detail.value
    })
  },
  // 获取维修描述
  MaintenanceDescription: function(e) {
    this.setData({
      RepairAddress: e.detail.value
    })
  },
  // 收索维修订单
  collectingCable: function() {
    let phone = this.data.MaintenanceTelephone
    let Number = this.data.MaintenanceNumber
  },

  // 提交维修表单
  Submit: function() {
    console.log(this.data.RepairAddress)
    console.log(this.data.MaintenanceTelephone)
    console.log(this.data.MaintenanceName)
    console.log(this.data.MaintenanceNumber)
  },


  // 底部导航跳转
  Booting: function() {
    wx.redirectTo({
      url: '/pages/OrderList/OrderList',
    })
  },
  Repair: function() {
    wx.redirectTo({
      url: '/pages/RepairOrder/RepairOrder',
    })
  },
  Statistics: function() {
    wx.redirectTo({
      url: '/pages/Statistics/Statistics',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})