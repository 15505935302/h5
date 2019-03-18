<template>
    <div id="set_hubs">
      <Head>
        <span slot="pageName">帮助指南</span>
      </Head>
      <div>
        <ul>
          <li v-for="(item, index) in lists" :key="index" @click="lis($event,item)" :data-id = index>
            <span>{{item.title}}</span>
            <i class="iconfont">&#xe655;</i>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import Head from "../components/header";
    export default {
    name: "set_hubs",
    data (){
      return{
            lists:[
              {
                title:"如何注册",
                content:'点击网站右上角＂用户注册＂按钮，就可以进入用户注册页面；<br>按照提示，填写注册信息，即可完成注册；<br>账号为4-16位字符，支持数字和字母；<br>密码为6-16位字符，支持数字、字母、符号；<br>注册完成后，系统将随机分配一张头像，可以在我的账户中修改头像和设置昵称；<br>',
              },
              {
                title:"如何购彩",
                content:'购彩前需要先进行充值，账户有余额才可以进行购彩投注；<br>充值完成后，可进入＂购彩大厅＂选择您喜欢的彩票进行投注；<br>彩票投注页面，提供了＂玩法说明＂＂走势图＂，可以帮您更快了解＂玩法规则＂和＂开奖走势＂投注完成后，可以进入＂我的账户＂＂投注记录＂，查看您的投注明细，查看是否中奖；<br>投注完成后，需等开奖后，才能查看是否中奖；<br>投注成功后，系统将自动从您的账户余额扣除对应投注金额，如果中奖，奖金会自动添加到您的账户余额；<br>可以进入＂我的账户＂＂交易明细＂，查看您的账户交易明细；<br>',
              },
              {
                title:"如何充值",
                content:'账号登录后，点击网站右上角＂充值＂按钮，就可以进入充值页面；<br>目前网站提供了多种主流充值方式，如＂银行转账＂＂快捷支付＂＂支付宝＂＂微信支付＂ "QQ钱包"等；<br>如实填写充值信息，并提交充值订单，1-5分钟左右，刷新账户余额，即可到账；<br>点击＂我的账户＂＂交易明细＂可查看每日的交易明细；<br>大额充值建议使用＂银行转账＂；<br>',
              },
              {
                title:"如何提现",
                content:'中奖后如何提现？点击网站右上角＂提现＂按钮，就可以进入提现页面；<br>选择您绑定的银行卡，填写您要提现的金额，并输入＂安全密码＂；<br>提现订单提交后，3-5分钟左右即可到账，可登陆银行查看银行账户余额；<br>点击＂我的账户＂＂交易明细＂可查看每日的交易明细；<br>提现之前需先设置＂安全密码＂和绑定您要用来提现的银行卡；<br>提现金额不能大于可提现金额；<br>为了提供更好的服务体验，降低广大用户提现订单的处理时间，每日最多只允许提现5次，建议用户合理安排每日的提现时间和次数；<br>',
              },
              {
                title:"手机如何购彩",
                content:'直接在手机浏览器输入网址，即可登录手机版，无需下载；<br>手机版随时随地可以进行投注，更加便捷，建议广大用户使用手机版进行投注；<br>建议使用＂谷歌＂＂苹果＂＂UC＂浏览器，操作体验更佳；<br>',
              },
              {
                title:"在线客服时间",
                content:'在线客服提供全天24小时咨询服务，全年无休；<br>在游戏中遇到任何问题，欢迎随时咨询我们的在线客服，我们竭诚为您提供最高品质的咨询服务；<br>',
              },
              {
                title:"什么是安全密码",
                content:'安全密码不同于登陆密码，是另外要设置的一个密码；<br>安全密码一般用于提现、绑定银行卡等操作，可以保障账户资金安全；<br>为了账户安全，设置安全密码时建议不要跟登陆密码相同；<br>',
              },
              {
                title:"每日提现次数",
                content:'为了提供更好的服务体验，降低广大用户提现订单的处理时间，每日最多只允许提现5次，建议用户合理安排每日的提现时间和次数；<br>',
              },
              {
                title:"如何绑定银行卡",
                content:'进入＂我的账户＂＂银行卡管理＂可以绑定您要用来提现的银行卡；<br>绑定银行卡前，需先设置安全密码；<br>银行卡最多只允许绑定5张；<br>银行卡绑定支持所有主流银行；<br>为了用户资金安全，已成功提现的银行卡将自动锁定，无法删除和修改；<br>如想弃用银行卡，可联系在线客服禁用该银行卡；<br>',
              },
              {
                title:"账户安全",
                content:'为了广大用户的账户安全，网站的＂安全中心＂提供了多项提升账户安全系数的功能；<br>新用户注册完成后，请及时进入＂安全中心＂设置安全密码，绑定＂密保问题＂；<br>用户忘记密码时，可通过以上功能，找回密码；<br>',
              },
              {
                title:"什么是可提现金额",
                content:'可提现金额计算规则如下：<br>为防止洗黑钱等行为，您的每一笔充值，有效投注金额需达到充值金额的50%才可以全额提现，有效投注金额不包含撤单的投注金额。',
              },
            ],

      }
    },
    components:{
        Head,
    },
    methods:{
      lis(e,item){
        if(e.target!=e.currentTaregt){
           this.$router.push({
              name: 'set_help_details',
              params: {
                item: item
              }
            })
        }
      }
    },
    mounted(){
      this.data = JSON.parse(localStorage.getItem('loginTime'))
      console.log(this.data)
    }
    }
</script>

<style scoped lang='less'>
  #set_hubs{
    background: #f5f5f5;
    padding-top: 50px;
  }
  .serve i{
    color: white;
    font-size: 20px;
    line-height: 30px;
  }
  #set_hubs ul{
    list-style: none;
    padding-left:15px;
    box-sizing: border-box;
    background-color: white;
    width: 100%;
    line-height: 30px;
  }
  #set_hubs ul li{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding: 8px 10px 8px 0;
    font-size: 13px;
  }
  #set_hubs ul li i,.setting i{
    color: #ddd;
    font-size: 16px;
  }
  #set_hubs ul li>div,.setting>div{
    display: flex;
    align-items: center;
  }
  #set_hubs ul li>div .serve i,.setting .serve i{
    font-size: 15px;
    line-height: 20px;
    color: white;
  }
  
</style>
