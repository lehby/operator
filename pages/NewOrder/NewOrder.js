// pages/NewOrder/NewOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      '08:00-09:00',
      '09:00-10:00',
      '10:00-11:00',
      '11:00-12:00',
      '12:00-13:00',
      '13:00-14:00',
      '14:00-15:00',
      '15:00-16:00',
      '16:00-17:00',
      '17:00-18:00',
      '18:00-19:00',
      '19:00-20:00',
    ],//预定时间弹框
    array2:
      [
        '今天',
        '明天'
      ],
    index: 0,
    index1: 0,
    navbar: ['新增订气', '新增维修'],
    currentTab: 0,
    goodsModal: false,//控制商品弹框按钮
    isgoods: false,//控制商品列表的显示隐藏
    goodslist: [
      {
        Name: "商品1",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "公斤",
      },
      {
        Name: "商品2",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "公斤",
      },
      {
        Name: "商品3",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "瓶",
      },
      {
        Name: "商品4",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "公斤",
      },
      {
        Name: "商品5",
        Price: 120,
        Quantity: 0,//计数
        PrceType: "瓶",
      }
    ],
    goods: [],
    Quantity: 0,
    Price: 0,
    problemlist: [//维修问题
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
    let problemlist=this.data.problemlist
    if (state === false) {
      problemlist[index].state=true;
      problemlist[index].background="#154CC0";
      problemlist[index].color="#fff";
      this.setData({
        problemlist
      })
    } else {
      problemlist[index].state=false;
      problemlist[index].background="#EEE";
      problemlist[index].color="#666";
      this.setData({
        problemlist
      })
    }
  },
  //导航控制
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  /**
   * 商品弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 商品隐藏模态对话框
   */
  goodsHideModal: function () {
    this.setData({
      showgoods: false
    });
  },
  /**
   * 商品对话框取消按钮点击事件
   */
  goodsCancel: function () {
    this.goodsHideModal();
  },
  /**
   * 商品对话框确认按钮点击事件
   */
  goodsConfirm: function () {
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
  subtracttap: function (e) {
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
  addtap: function (e) {
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
  calculateTotal: function () {
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

  ///确认提交点击事件
  ConfirmSuccess() {

  },
  //预约时间Picker索引值
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  //预约那天Picker索引值
  bindDayPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index1: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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