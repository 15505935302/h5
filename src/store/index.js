import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);


const state = {
  // 保存登录token
  token: localStorage.getItem('access_token') || '',
  user: JSON.parse(localStorage.getItem('loginTime')) || '',
  // 玩法切换显示
  playingShow: false,
  // 玩法名称
  wanfaName:0,
  // 玩法子类
  wanfachild:0,
  // 玩法名称（中文）
  wanfa:"",
  // 二级子玩法菜单（中文）
  childWanfa:"",
  // 地址显示
  addressShow: false,
  // PK10历史开奖信息
  PK10history:{},
  // 投注提交信息
  betStr:[],
  // 投注选项长度
  numLength:Number,
  // 各个位数有几个号码
  leng:Number,
  // 投注单价
  everyBetRental: 2,
  // 已投注信息
  beted: [],
  // 彩种期号类型名称
  gameType:{},
  // 投注期号
  choice_no:'',
  // 投注单位切换
  unit: 1,
  // 所有彩种
  lottery:[],
  // 机选随机号码
  random:[],
  // 投注信息
  betMsg:{},
  // 投注记录查询暂存
  betobjarr:{},
  // 投注记录查询信息暂存
  betobjdata:{},
  // 修改密保问题选择
  revploblem:false,
  // 长龙下注信息
  betdetails:{},
  // 长龙下注信息
  betcontent:{},
  // 长龙助手倒计时结束请求开奖结果
  openResult:false,
  // 最近投注隐藏footbet
  footbet:true,
  // 存储中奖信息
  winMsg:{}
}
const getters = {
  // token: state => state.token,
  // getBetData:state=> state.betStr
}
const mutations = {
  winMsg(state,obj){
    state.winMsg=obj
  },
  // 最近投注隐藏footbet
  footbet(state,bool){
    state.footbet=bool
  },
  // 长龙刷新信息
  openResult(state,bool){
    state.openResult=bool
  },
  // 长龙下注信息
  betdetails(state,obj){
    state.betdetails=obj
  },
  // 长龙下注信息
  betcontent(state,obj){
    state.betcontent=obj
  },
  // 修改密保问题选择
  revploblem(state,bol){
    state.revploblem=bol
  },
  // 投注记录查询暂存
  betobjdata(state,obj){
    state.betobjdata=obj
  },
  // 投注记录查询暂存
  betobjarr(state,obj){
    state.betobjarr=obj
  },
  // 投注信息
  betMsg(state,obj){
    state.betMsg=obj
  },
  // 机选随机号码
  random(state,random){
    state.random=random
  },
  // 用户信息更变后更新用户信息
  user(state,obj){
    state.user=obj
  },
  playingShow(state, boole) {
    state.playingShow = boole
  },
  // 玩法名称储存用作判断
  wanfaName(state,num){
    state.wanfaName=num
  },
  wanfachild(state,num){
    state.wanfachild=num
  },
  wanfa(state,name){
    state.wanfa=name
  },
  childWanfa(state,name){
    state.childWanfa=name
  },
  // 玩法名称储存用作判断
  lottery(state,name){
    state.lottery=name
  },
  // 玩法名称储存用作判断
  lottery(state,name){
    state.lottery=name
  },
  // 头部地区显示
  addressShow(state, boole) {
    state.addressShow = boole
  },
  beted(state,arr){
    state.beted=arr
  },
  // 点进彩种获取彩种类型
  gameType(state,obj){
    state.gameType=obj
  },
  // 彩种最新一期期号
  choice_no(state,str){
    state.choice_no=str
  },
  // PK10历史开奖信息
  PK10history(state,obj){
    state.PK10history=obj
  },
   // 投注单位切换
  unit(state,num){
    state.unit=num
    if(num==1){
      state.everyBetRental=2
    }else if(num==2){
      state.everyBetRental=0.2
    }
  }, 
  // 添加投注金额单位信息
  betStr(state,obj){
    for(let i=0,len=obj.length;i<len;i++){
        obj[i].unit_type=state.unit
    }
    state.betStr.push(obj)
  },
  // 添加提交投注信息
  liubet(state,obj){
    state.betStr.push(obj)
  },
  // 投注选项长度获取
  numLength(state,num){
    state.numLength=num
  },
  // 按位数随机号码，获取各个位数共有几个号码
  leng(state,num){
    state.leng=num
  },
  // 房间删除单个投注
  delBet(state,index){
    state.betStr.splice(index,1)
  },
  // 清除所有投注
  clearCount(state) {
    state.betStr.splice(0,state.betStr.length)
  },
  // 用户头像变化
  user_photo(state, str) {
    state.user_photo = str
  },
  // 保存本次登录时间
  loginTime(state,obj){
    state.loginTime=obj
  },
}
const actions = {
  login({
    commit
  }, user) {
    return new Promise((resolve) => {
      axios({
          url: 'http://47.100.234.151:8099/user/login',
          data: user,
          method: 'POST'
        })
        .then(res => {
          if (res.data.result_code == 1) {
            resolve(res)
          } else if (res.data.result_code == 0) {
            const access_token = res.data.data.access_token
            const curTime = new Date().getTime();
            const loginMsg=JSON.stringify(res.data.data)
            localStorage.setItem('access_token', JSON.stringify({data:access_token,time:curTime}))
            localStorage.setItem('loginTime', loginMsg)
            axios.defaults.headers.common['Authorization'] = access_token
            resolve(res)
          }
        })
    })
  },
  register({
    commit
  }, user) {
    return new Promise((resolve) => {
      axios({
          url: 'http://47.100.234.151:8099/user/register',
          data: user,
          method: 'POST'
        })
        .then(res => {
          if (res.data.result_code == 1) {
            resolve(res)
          } else if (res.data.result_code == 0) {
            const access_token = res.data.data.access_token
            const curTime = new Date().getTime();
            const loginMsg=JSON.stringify(res.data.data)
            localStorage.setItem('access_token', JSON.stringify({data:access_token,time:curTime}))
            localStorage.setItem('loginTime', loginMsg)
            axios.defaults.headers.common['Authorization'] = access_token
            resolve(res)
          }
        })
    })
  }
}
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
