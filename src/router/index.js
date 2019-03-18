// 主版面---------------------
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/home.vue'
import Live from "../pages/live.vue"
import Activity from "../pages/activity.vue"
import dragon from "../pages/dragon.vue"
import ActivityDetails from "../pages/activitydetails.vue"
import Found from '../pages/found.vue'
import FoundUser from '../pages/founduser.vue'
import User from '../pages/user.vue'
// 所有彩种
import AllLottery from '../pages/all_lottery.vue'
// 互动大厅
import interactiveHall from "../pages/InteractiveHall"
// 我的---------------------------------
import recharge from '../pages/recharge.vue'
import todaypandl from '../pages/todaypandl.vue'
import agentcenter from '../pages/agentcenter.vue'
import agentbetrecord from '../pages/agentbetrecord.vue'
import agentintro from '../pages/agentintro.vue'
import agentmember from '../pages/agentmember.vue'
import agentreport from '../pages/agentreport.vue'
import agenttraderecord from '../pages/agenttraderecord.vue'
import agentmanageinvite from '../pages/agentmanageinvite.vue'
import agentrebatedetail from '../pages/agentrebatedetail.vue'
import withdraw from '../pages/withdraw.vue'
import rechargecompany from '../pages/rechargecompany.vue'
import News from '../pages/News.vue'
import Newscontent from '../pages/newscontent.vue'
import Personal from '../pages/personal.vue'
import Betting from '../pages/betting.vue'
import Detailed from '../pages/detailed.vue'
import Set from '../pages/set.vue'
import Set_hubs from '../pages/set_hubs.vue'
import Set_password from '../pages/set_password.vue'
import set_revpassword from '../pages/set_revpassword.vue'
import Set_problem from '../pages/set_problem.vue'
import Set_verifyPassword from '../pages/set_verifyPassword.vue'
import Set_securityProlem from '../pages/set_securityProlem.vue'
import Set_testSecurity from '../pages/set_testSecurity.vue'
import Set_bankManage from '../pages/set_bankManage.vue'
import set_addbankManage from '../pages/set_addbankManage.vue'
import set_about from '../pages/set_about.vue'
import set_help from '../pages/set_help.vue'
import set_help_details from '../pages/set_help_details.vue'
import service from '../pages/service.vue'
import Lower_user from '../pages/lower_user.vue'

// 登录
import Login from '../pages/login.vue'
// 注册
import Register from '../pages/register.vue'

// 玩法---------------------------------------------------

// 投注房间
import BetRoom from '../playing/betRoom.vue'

// 北京28投注选项信息
import Beijing28 from '../playing/beijing28.vue'
// 六合彩
import liuhecai from "../playing/liuhecai.vue"
// 分分彩
import fenfencai from "../playing/fenfencai.vue"
// 11选5
import xuan5 from "../playing/xuan5.vue"
// 单注详情
import SingleDetails from '../pages/single_details.vue'
// PK10投注选项信息
import PK10 from '../playing/PK10.vue'
// 江苏快三
import JSkuai3 from '../playing/JSkuai3.vue'
// 时时彩
import Shishicai from "../playing/Shishicai.vue"
// 福彩3d
import fucai from "../playing/fucai.vue"


Vue.use(Router)

const router =  new Router({
  routes: [{
      path: '/',
      component: Home,
      meta: {
        navShow: true,
        cname: '一级页面'
      }
    },
    {
      path: '/live',
      component: Live,
      meta: {
        navShow: true,
        cname: '一级页面'
      }
    },
    {
      path: '/activity',
      component: Activity,
      meta: {
        navShow: true,
        cname: '一级页面'
      }
    },
    {
      path:'/interactiveHall',
      component:interactiveHall,
      name:"互动大厅",
      meta:{
        navShow:false,
        cname:'一级页面'
      }
    },
    {
      path: '/dragon',
      component: dragon,
      name: "dragon",
      meta: {
        navShow: false,
        cname: '一级页面'
      }
    },
    {
      path: '/activitydetails',
      component: ActivityDetails,
      name: "ActivityDetails",
      meta: {
        navShow: false,
        cname: '二级页面'
      }
    },
    {
      path: '/found',
      component: Found,
      meta: {
        navShow: true,
        cname: '一级页面'
      }
    },
    {
      path: '/founduser',
      component: FoundUser,
      name: "FoundUser",
      meta: {
        navShow: false,
        cname: '一级页面'
      }
    },
    {
      path: '/user',
      component: User,
      name: "User",
      meta: {
        navShow: true,
        cname: '一级页面',
        auth: true
      }
    },
    {
      path: '/service',
      component: service,
      name: "service",
      meta: {
        navShow: false,
        cname: '一级页面',
        auth: true
      }
    },
    // 登录
    {
      path: '/login',
      component: Login,
      name: "Login",
      mate: {
        navShow: false,
        cname: '登录页面'
      }
    },
    // 注册
    {
      path: '/register',
      component: Register,
      mate: {
        navShow: false,
        cname: '注册页面'
      }
    },
    // 更多彩种
    {
      path: '/allLottery',
      component: AllLottery,
      name: "AllLottery",
      meta: {
        navShow: false,
        cname: '二级页面'
      }
    },
    // 充值
    {
      path: '/recharge',
      component: recharge,
      name: "recharge",
      meta: {
        navShow: false,
        cname: '二级页面'
      }
    },
    // 提现
    {
      path: '/withdraw',
      component: withdraw,
      name: "withdraw",
      meta: {
        navShow: false,
        cname: '二级页面'
      }
    },
    // 充值公司入账
    {
      path: '/rechargecompany',
      component: rechargecompany,
      name: "rechargecompany",
      meta: {
        navShow: false,
        cname: '二级页面'
      }
    },
   
    // 投注房间
    {
      path:'/betroom',
      component:BetRoom,
      name:"BetRoom",
      meta:{
        navShow:false,
        cname:"下注房间"
      }
    },
    // 北京28
    {
      path: '/beijing28',
      component: Beijing28,
      name: "北京28",
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true
      }
    },
    // 加拿大28
    {
      path: '/jianada28',
      component: Beijing28,
      name: "加拿大28",
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true
      }
    },
    // 新加坡28
    {
      path: '/xinjiapo28',
      component: Beijing28,
      name: "新加坡28",
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true
      }
    },
    // 重庆时时彩
    {
      path: '/CQshishicai',
      component: Shishicai,
      name: "重庆时时彩",
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true
      }
    },
    // 重庆时时彩
    {
      path: '/TJshishicai',
      component: Shishicai,
      name: "天津时时彩",
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true
      }
    },
    {
      path: '/DJ1.5fen',
      component: fenfencai,
      name: "东京1.5分彩",
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true
      }
    },
    // PK10
    {
      path: '/BJPK10',
      component: PK10,
      name: "北京赛车",
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true
      },
    },
    // 幸运飞艇
    {
      path: '/XUPK10',
      component: PK10,
      name: "幸运飞艇",
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true
      },
    },
    // 江苏快三
    {
      path: '/JSkuai3',
      component: JSkuai3,
      name: '江苏快三',
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true,
      },
    },
    // 北京快三
    {
      path: '/BJkuai3',
      component: JSkuai3,
      name: '北京快三',
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true,
      },
    },
    // 安徽快3
    {
      path: '/AHkuai3',
      component: JSkuai3,
      name: '安徽快三',
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true,
      },
    },
    // 六合彩
    {
      path: '/liuhecai',
      component: liuhecai,
      name: '六合彩',
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true,
      },
    },
    // 分分彩
    {
      path: '/fenfencai',
      component: fenfencai,
      name: '分分彩',
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true,
      },
    },
    // 11选5
    {
      path: '/xuan5',
      component: xuan5,
      name: '11选5',
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true,
      },
    },
    // 福彩3D
    {
      path: '/fucai',
      component: fucai,
      name: '福彩3D',
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true,
      },
    },
    // 排列3
    {
      path: '/pailie3',
      component: fucai,
      name: '排列3',
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true,
      },
    },
    // 排列5
    {
      path: '/pailie5',
      component: fucai,
      name: '排列5',
      meta: {
        navShow: false,
        cname: '玩法页面',
        auth: true,
      },
    },
    // 注单详情
    {
      path: '/SingleDetails',
      name: 'SingleDetails',
      component: SingleDetails
    },
    // 我的消息
    {
      path: '/news',
      component: News,
      name: "News",
      meta: {
        navShow: false,
        cname: '我的消息'
      }
    },
    // 我的公告
    {
      path: '/newscontent',
      component: Newscontent,
      name: "Newscontent",
      meta: {
        navShow: false,
        cname: '我的消息'
      }
    },
    // 我的资料
    {
      path: '/personal',
      component: Personal,
      name: "Personal",
      meta: {
        navShow: false,
        cname: '我的资料'
      }
    },
    // 投注记录
    {
      path: '/betting',
      component: Betting,
      name: "betting",
      meta: {
        navShow: false,
        cname: '投注记录'
      }
    },
    // 交易明细
    {
      path: '/detailed',
      component: Detailed,
      name: "Detailed",
      meta: {
        navShow: false,
        cname: '交易明细'
      }
    },
    // 今日盈亏
    {
      path: '/todaypandl',
      component: todaypandl,
      name: "todaypandl",
      meta: {
        navShow: false,
        cname: '今日盈亏'
      }
    },
    // 代理中心
    {
      path: '/agentcenter',
      component: agentcenter,
      name: "agentcenter",
      meta: {
        navShow: false,
        cname: '代理中心'
      }
    },
    // 代理中心  下级开户
    {
      path: '/agentmanageinvite',
      component: agentmanageinvite,
      name: "agentmanageinvite",
      meta: {
        navShow: false,
        cname: '代理中心'
      }
    },
    // 代理中心 返佣明细
    {
      path: '/agentrebatedetail',
      component: agentrebatedetail,
      name: "agentrebatedetail",
      meta: {
        navShow: false,
        cname: '代理中心'
      }
    },
    // 代理中心  下级投注明细
    {
      path: '/agentbetrecord',
      component: agentbetrecord,
      name: "agentbetrecordagentbetrecord",
      meta: {
        navShow: false,
        cname: '代理中心'
      }
    },
    // 代理中心 代理说明
    {
      path: '/agentintro',
      component: agentintro,
      name: "agentintro",
      meta: {
        navShow: false,
        cname: '代理中心'
      }
    },
    // 代理中心 下级管理
    {
      path: '/agentmember',
      component: agentmember,
      name: "agentmember",
      meta: {
        navShow: false,
        cname: '代理中心'
      }
    },
    // 代理中心 代理报表
    {
      path: '/agentreport',
      component: agentreport,
      name: "agentreport",
      meta: {
        navShow: false,
        cname: '代理中心'
      }
    },
    // 代理中心   下级交易明细
    {
      path: '/agenttraderecord',
      component: agenttraderecord,
      name: "agenttraderecord",
      meta: {
        navShow: false,
        cname: '代理中心'
      }
    },
    //设置
    {
      path: '/set',
      component: Set,
      name: "set",
      meta: {
        navShow: false,
        cname: '设置'
      }
    },
    // 设置-安全中心
    {
      path: '/set_hubs',
      component: Set_hubs,
      name: "set_hubs",
      meta: {
        navShow: false,
        cname: '安全中心'
      }
    },
    // 设置- 密码
    {
      path: '/set_password',
      component: Set_password,
      name: "set_password",
      meta: {
        navShow: false,
        cname: '密码'
      }
    },
    //找回 密码
    {
      path: '/set_revpassword',
      component: set_revpassword,
      name: "set_revpassword",
      meta: {
        navShow: false,
        cname: '密码'
      }
    },
    // 设置- 问题
    {
      path: '/set_problem',
      component: Set_problem,
      name: "set_problem",
      meta: {
        navShow: false,
        cname: '问题'
      }
    },
    // 设置- 验证安全密码
    {
      path: '/set_verifyPassword',
      component: Set_verifyPassword,
      name: "set_verifyPassword",
      meta: {
        navShow: false,
        cname: '验证安全密码'
      }
    },
    // 设置- 验证密保问题
    {
      path: '/set_securityProlem',
      component: Set_securityProlem,
      name: "set_securityProlem",
      meta: {
        navShow: false,
        cname: '验证密保问题'
      }
    },
    // 设置- 验证密保
    {
      path: '/set_testSecurity',
      component: Set_testSecurity,
      name: "set_testSecurity",
      meta: {
        navShow: false,
        cname: '验证密保'
      }
    },
    // 设置- 银行卡管理
    {
      path: '/set_bankManage',
      component: Set_bankManage,
      name: "set_bankManage",
      meta: {
        navShow: false,
        cname: '银行卡管理'
      }
    },
    // 设置- 添加银行卡
    {
      path: '/set_addbankManage',
      component: set_addbankManage,
      name: "set_addbankManage",
      meta: {
        navShow: false,
        cname: '银行卡添加'
      }
    },
    // 设置- 帮助指南
    {
      path: '/set_help',
      component: set_help,
      name: "set_help",
      meta: {
        navShow: false,
        cname: '帮助指南'
      }
    },
    // 设置- 帮助指南详情
    {
      path: '/set_help_details',
      component: set_help_details,
      name: "set_help_details",
      meta: {
        navShow: false,
        cname: '帮助指南'
      }
    },
    // 设置- 关于
    {
      path: '/set_about',
      component: set_about,
      name: "set_about",
      meta: {
        navShow: false,
        cname: '关于'
      }
    },
    // 下级用户
    {
      path: '/lower_user',
      component: Lower_user,
      name: "lower_user",
      meta: {
        navShow: false,
        cname: '下级用户'
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  let access_token=JSON.parse(localStorage.getItem('access_token'))
  if (to.matched.some(res => res.meta.auth)) { // 判断是否需要登录权限
    if (access_token) { // 判断是否登录
      next()
    } else { // 没登录则跳转到登录界面
      next({
        path: '/login',
      })
    }
  } else {
    next()
  }
})

export default router
