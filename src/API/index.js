import axios from 'axios'
import qs from "qs"
import app from "../main"
// axios.create({
//   baseURL: 'http://47.100.234.151:8099', // 服务器地址
//   timeout: 5000 // 请求超时时间
// });
axios.defaults.baseURL='http://47.100.234.151:8099';
const access_token = JSON.parse(localStorage.getItem('access_token'))
if (access_token) {
  var requestObj = {
    'Content-Type': 'application/x-www-form-urlencoded',
    "Authorization": access_token.data
  }
} else {
  var requestObj = {
    'Content-Type': 'application/x-www-form-urlencoded',
  }
}
axios.interceptors.request.use(
  config => {
    app.$vux.loading.show();
    config.data = {
      ...config.data,
      client_from: 'phone'
    }
    config.data = qs.stringify(config.data);
    config.params = {
      ...config.params,
      client_from: 'phone'
    }
    config.headers = requestObj
    return config;
  }, error => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  res => { //成功请求到数据
    app.$vux.loading.hide();
    //这里根据后端提供的数据进行对应的处理
    if (res.status === 200) {
      return res;
    } else {
      app.$vux.toast.show({ //常规错误处理
        type: 'warn',
        text: res.data.result_desc
      });
    }
  },
  error => { //响应错误处理
    app.$vux.loading.hide();
    app.$vux.toast.show({
      type: "warn",
      text: "通讯失败"
    })
    return Promise.reject(error)
  }
)


const request = {
  // 首页所有玩法获取
  wanfa() {
    return axios({
      method: 'get',
      url: '/home/wanfa'
    })
  },
  // 获取首页轮播图
  banner() {
    return axios({
      method: 'post',
      url: '/banner/list',
      data: {
        place: 1
      }
    })
  },
  // 撤单
  backout(params) {
    return axios({
      method: "post",
      url: "/user/cancel/bet/order",
      data: params
    })
  },
  // 用户页
  userDetails(data) {
    return axios({
      method: 'get',
      url: '/user/details',
      params: data
    })
  },
  // 用户更新
  update(data) {
    return axios({
      method: 'get',
      url: '/user/update',
      params: data
    })
  },
  // 默认头像
  photo(params) {
    return axios({
      method: 'post',
      url: '/default/photo',
      data: params
    })
  },
  //用户等级
  userLevel(data) {
    return axios({
      method: 'get',
      url: '/user/level/list',
      params: data
    })
  },
  //用户等级头衔
  userLevelName(data) {
    return axios({
      method: 'get',
      url: '/user/level/bonus',
      params: data
    })
  },
  //长龙助手列表
  dragonlist(data) {
    return axios({
      method: 'get',
      url: '/dragon/list',
      params: data
    })
  },
  //长龙助手投注
  dragonadd(params) {
    return axios({
      method: 'post',
      url: '/room/point/add',
      data: params
    })
  },
  //长龙助手投注记录
  dragonchoicelog(params) {
    return axios({
      method: 'post',
      url: '/dragon/choicelog/list',
      data: params
    })
  },
  // 投注详情
  game(params) {
    return axios({
      method: 'post',
      url: '/room/bili/list',
      data: params
    })
  },
  // 投注详情
  gameliuhe(params) {
    return axios({
      method: 'post',
      url: '/lhc/allwanfa/list',
      data: params
    })
  },
  // 其他直投彩种投注参数
  wanfalist(params) {
    return axios({
      method: 'post',
      url: '/lottery/wanfa/list',
      data: params
    })
  },
  // 开奖记录及倒计时
  open(params) {
    return axios({
      method: 'post',
      url: '/room/open/info',
      data: params
    })
  },
  // 六合彩开奖记录及倒计时
  openliuhe(params) {
    return axios({
      method: 'post',
      url: '/Home/Order/getLotteryInfo',
      data: params
    })
  },
  // 六合彩历史开奖记录
  openlishi(params) {
    return axios({
      method: 'post',
      url: '/Home/Index/getWins',
      data: params
    })
  },
  homecontent(params) {
    return axios({
      method: 'get',
      url: '/home/content',
      data: params
    })
  },
  // 直投开奖倒计时和上期开奖结果
  getLotteryInfo(params) {
    return axios({
      method: 'post',
      url: '/lottery/Order/getLotteryInfo',
      data: params
    })
  },
  // 直投往期开奖记录
  kjLog(params) {
    return axios({
      method: 'post',
      url: '/lottery/kjLog',
      data: params
    })
  },
  // 投注记录
  allBet(data) {
    return axios({
      method: 'get',
      url: '/user/bet/record/status',
      params: data
    })
  },
  // 追号记录
  chasing(data) {
    return axios({
      method: 'get',
      url: '/dragon/chasing/list',
      params: data
    })
  },
  // 账户明细
  accountdetails(data) {
    return axios({
      method: 'get',
      url: '/user/trade/record/list',
      params: data
    })
  },
  // 今日盈亏
  todaypandl(data) {
    return axios({
      method: 'get',
      url: '/user/today/profitLoss',
      params: data
    })
  },
  // 房间投注提交
  roomSubmit(params) {
    return axios({
      method: 'post',
      url: '/room/point/add/list',
      data: params
    })
  },
  // 房间投注提交
  directSubmit(params) {
    return axios({
      method: 'post',
      url: '/lottery/Order/subBet',
      data: params
    })
  },
  // 追号投注提交
  afterNo(params) {
    return axios({
      method: 'post',
      url: '/dragon/addChasing',
      data: params
    })
  },
  // 六合彩模块提交投注
  subBet(params) {
    return axios({
      method: 'post',
      url: '/lhc/subBet',
      data: params
    })
  },
  //活动中心
  activity(data) {
    return axios({
      method: 'get',
      url: '/user/bet/bonus',
      params: data
    })
  },
  //最新中奖用户信息
  bestnewuser(params) {
    return axios({
      method: 'post',
      url: '/newest/winRank',
      data: params
    })
  },
  yesterdayWin(params) {
    return axios({
      method: 'post',
      url: '/yesterday/winRank',
      data: params
    })
  },
  //领取加奖金额
  getamount(data) {
    return axios({
      method: 'get',
      url: '/user/bet/bonus/draw',
      params: data
    })
  },
  //领取加奖金额
  getuserLevel(data) {
    return axios({
      method: 'get',
      url: '/user/level/bonus/draw',
      params: data
    })
  },
  //消息、站内信
  notice(params) {
    return axios({
      method: 'post',
      url: '/notice/list',
      data: params
    })
  },
  //系统公告
  systemNotice(params) {
    return axios({
      method: 'post',
      url: '/system/notice/list',
      data: params
    })
  },
  //获取支付列表
  pay(data) {
    return axios({
      method: 'get',
      url: '/pay/list',
      params: data
    })
  },
  //获取支付
  recharge(params) {
    return axios({
      method: 'post',
      url: '/recharge/pay',
      data: params
    })
  },
  //线下转账
  xianxia(params) {
    return axios({
      method: 'post',
      url: '/account/user/add',
      data: params
    })
  },
  //获取支付二维码图片
  qrcode(params) {
    return axios({
      method: 'post',
      url: '/recharge/qrcode',
      data: params
    })
  },
  //获取可提现信息
  withdraw(data) {
    return axios({
      method: 'get',
      url: '/user/available/withdraw',
      params: data
    })
  },
  // 每日加奖比例表
  ratelist(data) {
    return axios({
      method: 'get',
      url: '/user/bonus/rate/list',
      params: data
    })
  },
  //提现
  withdrawals(params) {
    return axios({
      method: 'post',
      url: '/withdrawals/add',
      data: params
    })
  },
  //团队报表
  teamstatistics(data) {
    return axios({
      method: 'get',
      url: '/agent/team/statistics',
      params: data
    })
  },
  //下级报表
  substatistics(data) {
    return axios({
      method: 'get',
      url: '/agent/sub/statistics',
      params: data
    })
  },
  //个人代理信息
  infoagent(data) {
    return axios({
      method: 'get',
      url: '/agent/info',
      params: data
    })
  },
  //个人代理  返佣明细
  recordlist(data) {
    return axios({
      method: 'get',
      url: '/agent/info/record/list',
      params: data
    })
  },
  //个人代理 下级开户 邀请码
  inviteCode(params) {
    return axios({
      method: 'post',
      url: '/agent/inviteCode/add',
      data: params
    })
  },
  //个人代理  邀请码列表
  inviteCodelist(params) {
    return axios({
      method: 'post',
      url: '/agent/inviteCode/list',
      data: params
    })
  },
  //个人代理  删除邀请码
  delinviteCode(params) {
    return axios({
      method: 'post',
      url: '/agent/inviteCode/del',
      data: params
    })
  },
  //个人代理  下级管理列表
  sublist(data) {
    return axios({
      method: 'get',
      url: '/agent/sub/list',
      params: data
    })
  },
  //个人代理  下级投注明细
  subbetlist(data) {
    return axios({
      method: 'get',
      url: '/agent/sub/bet/record/list',
      params: data
    })
  },
  //个人代理  下级交易明细
  subtradelist(data) {
    return axios({
      method: 'get',
      url: '/agent/sub/trade/record/list',
      params: data
    })
  },
  //用户登录
  login(params) {
    return axios({
      method: 'post',
      url: '/user/login',
      data: params
    })
  },
  //安全密码设置
  veripassword(params) {
    return axios({
      method: 'post',
      url: '/user/validate/security/pwd',
      data: params
    })
  },
  //找回安全密码
  findpassword(params) {
    return axios({
      method: 'post',
      url: '/user/security/find/withdrawPassword',
      data: params
    })
  },
  //密保问题获取
  securityquestion(data) {
    return axios({
      method: 'get',
      url: '/user/security/question/list',
      params: data
    })
  },
  //密保问题设置
  securityadd(params) {
    return axios({
      method: 'post',
      url: '/user/security/answer/add',
      data: params
    })
  },
  //根据账号获取设置的密保问题
  securityanswer(data) {
    return axios({
      method: 'get',
      url: '/user/security/answer/account',
      params: data
    })
  },
  //根据账号修改的密保问题
  validate(params) {
    return axios({
      method: 'post',
      url: '/user/security/answer/validate',
      data: params
    })
  },
  //根据密保问题修改的密保问题
  problemupdate(params) {
    return axios({
      method: 'post',
      url: '/user/security/answer/update',
      data: params
    })
  },
  //获取银行卡列表
  userinfobank(data) {
    return axios({
      method: 'get',
      url: '/userinfobank/list',
      params: data
    })
  },
  //添加银行卡
  addbank(params) {
    return axios({
      method: 'post',
      url: '/userinfobank/add',
      data: params
    })
  },
  //修改银行卡
  bankup(params) {
    return axios({
      method: 'post',
      url: '/userinfobank/update',
      data: params
    })
  },
}

export default request
