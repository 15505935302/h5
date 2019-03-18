<template>
  <div id="voucher">
    <oneHead class="head_">
      <ButtonTab>
        <ButtonTabItem  @on-item-click="newWin_request" :class="{redwrith:newWinShow==true}">
          <span>团队报表</span>
        </ButtonTabItem>
        <ButtonTabItem  @on-item-click="yesterWin_request"  :class="{writhred:newWinShow==true}">
          <span>下级报表</span>
        </ButtonTabItem>
      </ButtonTab>
      <label slot="right" @click="newdata=true">筛选</label>
    </oneHead>
    <div class="main child-view">
      <div class="search">
        <i class="iconfont ">&#xe64c;</i>
        <input type="search" placeholder="请输入下级代理账号" v-model="account">
        <span @click.stop="searchaccount">搜索</span>
      </div>
      <!-- 团队报表 -->
      <div v-show='newWinShow'>
        <div class="ag-top">
          <div class="name-num">
            <div v-if="account" class="lt">{{account}} 的团队报表</div>
            <div v-else class="lt">我的团队报表</div>
            <div class="rt">下级人数(人): {{data.sub_agent_people}}</div>
          </div>
          <div class="bet-bonus">
            <div>
              <span>{{data.bet_money}}</span>
              <p>投注金额 (元)</p>
            </div>
            <div>
              <span class="mred">{{data.win_money}}</span>
              <p>中奖金额 (元)</p>
            </div>
            <div>
              <span class="mred">{{data.gift_money}}</span>
              <p>活动礼金 (元)</p>
            </div>
          </div>
        </div>
        <div class="ag-mid">
          <div class="cc1">
            <div>
              <span>{{data.team_profit_money}}</span>
              <p>团队返佣 (元)</p>
            </div>
          </div>
          <div class="cc2">
            <div>
              <span>{{data.win_lost_money}}</span>
              <p>团队盈亏 (元)</p>
            </div>
          </div>
          <div class="cc3">
            <div>
              <span>{{data.share_profit_money}}</span>
              <p>返点佣金 (元)</p>
            </div>
          </div>
          <div class="method">
            团队盈亏计算公式：中奖-投注+活动+团队返佣
          </div>
        </div>
        <div class="ag-bot">
          <div class="bet-bonus">
            <div>
              <span >{{data.recharge_money}}</span>
              <p>充值金额 (元)</p>
            </div>
            <div>
              <span class="mred">{{data.withdrawals_money}}</span>
              <p>提现金额 (元)</p>
            </div>
            <div>
              <span class="mred">{{data.team_balance}}</span>
              <p>团队余额 (元)</p>
            </div>
          </div>
        </div>
        <div class="ag-bot">
          <div class="bet-bonus">
            <div>
              <span>{{data.first_recharge_people}}</span>
              <p>首充人数 (人)</p>
            </div>
            <div>
              <span>{{data.register_people}}</span>
              <p>注册人数 (人)</p>
            </div>
            <div>
              <span>{{data.bet_people}}</span>
              <p>投注人数 (人)</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 下级报表 -->
      <div v-show='yesterdayWinShow' class="subdetailed">
        <div class="sub-top">
            <span>账号</span>
            <span>等级</span>
            <span>投注</span>
            <span>{{showsort}}</span>
        </div>
        <div class="sub-contai" :class="{fullPageMsg:data.list==''}">
            <ul>
               <li class="sub-contai-li" v-for="(item, index) in data.list" :key="index" :class="{liheight:subdetails==index}" @click="subdetails==index?subdetails=-1:subdetails=index">
                <i class="iconfont" :class="{jiandu:subdetails == index}">&#xe601;</i>
                <span class='blue'>{{item.account}}</span>
                <span>{{item.user_level}}</span>
                <span>{{item.bet_money}}</span>
                <span v-if="showsort=='盈亏'" :class="{mred:item.win_lost_money>=0,green:item.win_lost_money<0}">{{item.win_lost_money}}</span>
                <span v-else-if="showsort=='投注'" :class="{mred:item.bet_money>=0,green:item.bet_money<0}">{{item.bet_money}}</span>
                <span v-else-if="showsort=='中奖'" :class="{mred:item.win_money>=0,green:item.win_money<0}">{{item.win_money}}</span>
                <span v-else-if="showsort=='返佣'" :class="{mred:item.share_profit_money>=0,green:item.share_profit_money<0}">{{item.share_profit_money}}</span>
                <span v-else-if="showsort=='礼金'" :class="{mred:item.gift_money>=0,green:item.gift_money<0}">{{item.gift_money}}</span>
                <span v-else-if="showsort=='充值'" :class="{mred:item.recharge_money>=0,green:item.recharge_money<0}">{{item.recharge_money}}</span>
                <span v-else-if="showsort=='提现'" :class="{mred:item.withdraw_money>=0,green:item.withdraw_money<0}">{{item.withdraw_money}}</span>
                  <ul class="sub-contai-li-ul" v-if='subdetails == index'> 
                    <li>
                      <span>充值金额</span><span>{{item.recharge_money}}</span>
                    </li>
                    <li>
                      <span>提现金额</span><span>{{item.withdraw_money}}</span>
                    </li>
                    <li>
                      <span>返点佣金</span><span>{{item.share_profit_money}}</span>
                    </li>
                    <li>
                      <span>活动礼金</span><span>{{item.gift_money}}</span>
                    </li>
                    <li>
                      <span>中奖金额</span><span>{{item.win_money}}</span>
                    </li>
                    <li>
                      <span>个人盈亏</span><span>{{item.win_lost_money}}</span>
                    </li>
                      <button @click="subreport(item.account)">他的团队报表</button>
                  </ul>
               </li>
            </ul>
            <div class="PageMsg" v-show="data.list==''">暂无记录</div>
        </div>
      </div>
      <div  v-show='newWinShow' class="bot-tip">以上是代理的团队数据（即他的所有下级的数据汇总）</div>
      <div  v-show='newWinShow' class="word-explain" @click="explain=true">名词解释</div>
      <div class="explain" v-show='explain'>
        <div class="title">名词解释
          <i class="iconfont" @click="explain=false" >&#xe8a3;</i>
        </div>
        <p>
          <span>投注金额：</span>该代理的所有下级的投注总额
        </p>
        <p>
          <span>中奖金额：</span>该代理的所有下级的中奖总额
        </p>
        <p>
          <span>活动礼金：</span>该代理的所有下级的活动礼金总额
        </p>
        <p>
          <span>团队返佣：</span>该代理的所有下级的返佣收益总额
        </p>
        <p>
          <span>团队盈亏：</span>该代理的所有下级的盈亏总额
        </p>
        <p>
          <span>返点佣金：</span>该代理从他的团队中获得的返佣收益
        </p>
        <p>
          <span>充值金额：</span>该代理的所有下级的充值总额
        </p>
        <p>
          <span>提现金额：</span>该代理的所有下级的提现总额
        </p>
        <p>
          <span>团队余额：</span>该代理的所有下级的总余额
        </p>
      </div>
      <div v-show='newdata'>
        <div class="blackBg" @click="newdata=false"></div>
        <div class="filter">
          <div class="tp" @click="teamdata($event)">
            <span data-id=1 :class="{active:col==1}">今天</span>
            <span data-id=2  :class="{active:col==2}">昨天</span>
            <span data-id=3  :class="{active:col==3}">本月</span>
            <span data-id=4  :class="{active:col==4}">上月</span>
          </div>
          <div  v-if="yesterdayWinShow" class="tp" @click="sort($event)">
            <span data-id='betMoney' :class="{active:sortcol=='betMoney'}">投注</span>
            <span data-id='winMoney'  :class="{active:sortcol=='winMoney'}">中奖</span>
            <span data-id='winLostMoney'  :class="{active:sortcol=='winLostMoney'}">盈亏</span>
            <span data-id='rechargeMoney'  :class="{active:sortcol=='rechargeMoney'}">充值</span>
            <span data-id='withdrawMoney' :class="{active:sortcol=='withdrawMoney'}">提现</span>
            <span data-id='shareProfitMoney'  :class="{active:sortcol=='shareProfitMoney'}">返佣</span>
            <span data-id='giftMoney'  :class="{active:sortcol=='giftMoney'}">礼金</span>
          </div>
          <div v-if="yesterdayWinShow" class="tp" @click="ascdesc($event)">
            <span data-id='asc' :class="{active:ascd=='asc'}">升序</span>
            <span data-id='desc' :class="{active:ascd=='desc'}">降序</span>
          </div>
          <div  v-if="yesterdayWinShow" class="tp" @click="submit">
            <button class="button">确定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import oneHead from "../components/one_head";
import { ButtonTab, ButtonTabItem } from "vux";
import request from "../API";
export default {
  components: {
    oneHead,
    ButtonTab,
    ButtonTabItem
  },
  data() {
    return {
      newWinShow:true,
      yesterdayWinShow:false,
      newdata:false,
      explain:false,
      data:'',
      col:1,
      account:'',
      result_desc:'',
      subdetails:-1,
      ascd:"asc",
      sortcol:'winLostMoney',
      sortname:'盈亏',
      showsort:'盈亏',
      showmoney:'win_lost_money'
    }
  },
  methods: {
    newWin_request() {
      this.yesterdayWinShow = false;
      this.newWinShow = true;
      this.teamstatistics(this.GetDateStr(0,0),this.GetDateStr(0,0))
    },
    yesterWin_request() {
      this.yesterdayWinShow = true;
      this.newWinShow = false;
      this.substatistics(this.GetDateStr(0,0),this.GetDateStr(0,0))
    },
    // 团队报表获取
    teamstatistics(stadata,enddata,account){
      if(!account){
        this.account=""
      }
      let obj = {
        start_time:stadata,
        end_time:enddata,
        account:account,
      }
      this.$api.teamstatistics(obj).then(res=>{
        console.log(res)
          this.result_desc = res.data.result_desc
          if(res.data.result_code==1){
            this.showToast("text",res.data.result_desc)
           }else{
             this.data = res.data.data
           }
      })
    },
    // 下级报表获取
    substatistics(stadata,enddata){
      let obj = {
        start_time:stadata,
        end_time:enddata,
        account:this.account,
        page:1,
        pageSize:15,
        sort:this.sortcol,
        order_by:this.ascd,
      }
      this.$api.substatistics(obj).then(res=>{
          this.result_desc = res.data.result_desc
          console.log(this.data)
          console.log(res)
          if(res.data.result_code==1){
            this.showToast("text",res.data.result_desc)
           }else{
             this.data = res.data.data
           }
      })
    },
    subreport(account){
      this.teamstatistics(this.GetDateStr(0,0),this.GetDateStr(0,0),account)
      this.account = account
      this.yesterdayWinShow = false;
      this.newWinShow = true;
    },
    // 搜索框点击
    searchaccount(){
      if(this.yesterdayWinShow){
        this.substatistics(this.GetDateStr(0,0),this.GetDateStr(0,0))
      }else{
        this.teamstatistics(this.GetDateStr(0,0),this.GetDateStr(0,0),this.account)
      }
    },
    teamdata(e){
      if(e.target!=e.currentTarget){
        if(this.yesterdayWinShow){
          this.col = e.target.dataset.id
        }else{
          if(e.target.dataset.id == 1){
            this.col = 1
            this.newdata = false
            this.teamstatistics(this.GetDateStr(0,0),this.GetDateStr(0,0))
          }else if (e.target.dataset.id == 2){
            this.col = 2
            this.newdata = false
            this.teamstatistics(this.GetDateStr(-1,0),this.GetDateStr(-1,0))
          }else if (e.target.dataset.id == 3){
            this.col = 3
            this.newdata = false
            this.teamstatistics(this.GetDateStr(0,0,true),this.GetDateStr(0,0))
          }else if (e.target.dataset.id == 4){
            this.col = 4
            this.newdata = false
            this.teamstatistics(this.GetDateStr(0,-1,true),this.GetDateStr(0,0,true))
          }
        }
        
      }
    },
    //升降序
    ascdesc(e){
      if(e.target != e.currentTarget){
        this.ascd = e.target.dataset.id
      }
    },
    sort(e){
      if(e.target != e.currentTarget){
        this.sortcol = e.target.dataset.id
        this.sortname = e.target.innerText
      }
    },
    submit(){
      if(this.col == 1){
        this.substatistics(this.GetDateStr(0,0),this.GetDateStr(0,0))
      }else if (this.col == 2){
        this.substatistics(this.GetDateStr(-1,0),this.GetDateStr(-1,0))
      }else if (this.col == 3){
        this.substatistics(this.GetDateStr(0,0,true),this.GetDateStr(0,0))
      }else if (this.col == 4){
        this.substatistics(this.GetDateStr(0,-1,true),this.GetDateStr(0,0,true))
      }
      this.showsort = this.sortname
      this.newdata = false
    },
    GetDateStr(AddDayCount,yue,day) { 
      var dd = new Date(); 
      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
      var y = dd.getFullYear(); 
      var m = dd.getMonth()+1+yue;//获取当前月份的日期 
      if(m == 0){
         y = y-1
         m = 12
      } else if(m==-1){
        y = y-1
        m = 11
      }
      if(day){
        var d=1
      }else{
        var d = dd.getDate(); 
      }
      return y+"-"+m+"-"+d;
    },
  },
  mounted(){
    this.teamstatistics(this.GetDateStr(0,0),this.GetDateStr(0,0))
  }
}
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.child-view {
  position: absolute;
  width: 100%;
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}
.main {
  font-size: inherit;
}
.head_ span {
  width: 70px;
  display: inline-block;
  font-size: 12px;
}
.head_ label {
  display: inline-block;
  font-size: 12px;
}
.search {
    height: 50px;
    background: #F5F5F5;
    padding: 10px 15px 10px 15px;
    position: relative;
}.search input {
    width: 80%;
    text-align: left;
    height: 30px;
    font-size: 13px;
    color: #B5B5B5;
    display: block;
    float: left;
    border: none;
    -webkit-appearance: none;
    border: 1px solid #DDDDDD;
    padding: 0 30px;
    border-radius: 5px;
    position: relative;
}.search .iconfont{
  position:absolute;
  left: 25px;
  z-index: 2;
  height: 30px;
  line-height: 30px;
}.search span {
    display: inline-block;
    color: #ffffff;
    height: 30px;
    width: 60px;
    border-radius: 5px;
    line-height: 30px;
    background-color: #3C97EB;
    text-align: center;
    font-size: 13px;
    margin-left: 10px;
}.ag-top {
    height: 100px;
    background: #fff;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
}.ag-top .name-num {
    height: 40px;
    font-size: 14px;
    padding: 8px 6px;
    border-bottom: 1px solid #dddddd;
}.ag-top .name-num .lt {
    float: left;
    margin-left: 1em;
    padding-left: 1em;
    border-left: 2px solid #e23539;
    border-radius: 2px;
}.ag-top .name-num .rt {
    padding: .15em 1em 0 0;
    float: right;
    color: #e2383c;
    font-size: 12px;
}.bet-bonus div {
    float: left;
    width: 33%;
    height: 50px;
    font-size: 14px;
    text-align: center;
    margin-top: 5px;
    border-left: 1px solid #dddddd;
}.bet-bonus div p {
    font-size: 12px;
    color: #888888;
}.bet-bonus div span {
    color: #333333;
}.ag-mid {
    margin-top: 10px;
    height:120px;
    background: #fff;
}.ag-mid .cc1 {
    text-align: right;
}.ag-mid .cc1, .ag-mid .cc3 {
    width: 30%;
}.ag-mid .cc1, .ag-mid .cc2, .ag-mid .cc3 {
    float: left;
    color: #fff;
}.ag-mid .cc1 div {
    background: #71A6DD;
}.ag-mid .cc1 div, .ag-mid .cc3 div {
    margin-top: 15px;
    width: 70px;
    height: 70px;
}.ag-mid .cc1 div, .ag-mid .cc2 div, .ag-mid .cc3 div {
    padding-top:15px;
    text-align: center;
    border-radius: 50%;
    display: inline-block;
}.ag-mid .cc1 div p, .ag-mid .cc3 div p {
    font-size: 8px;
}.ag-mid .cc1 div span, .ag-mid .cc3 div span {
    margin: 2.2em 0 .1em;
    font-size: 14px;
}.ag-mid .cc2 {
    text-align: center;
    width: 40%;
}.ag-mid .cc2 div {
    width: 5.5em;
    height: 5.5em;
    background: #fb5136;
    margin-top: .5em;
}.ag-mid .cc2 div p {
    font-size: 8px;
}.ag-mid .cc2 div span {
    font-size: 14px;
}.ag-mid .cc3 div {
    background: #fb9311;
}.ag-mid .method {
    font-size: 10px;
    text-align: center;
    position: relative;
    padding-top: .3em;
    color: #666;
    clear: both;
}.ag-bot {
    margin-top: 10px;
    height: 60px;
    background: #fff;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
}.bot-tip {
    color: #333333;
    font-size: 12;
    text-align: center;
    padding: 15px 0 .2em;
}.word-explain {
    color: #3C97EB;
    font-size: 12px;
    text-align: center;
    padding: 5px 0 10px;
}.mred{
    color: #e20606 !important;
}.blackBg {
    background: rgba(0,0,0,.4);
    top: 50px;
}.blackBg {
    top: 50px;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 11;
}.filter {
    background: #fff;
    width: 100%;
    position: fixed;
    top: 50px;
    z-index: 15;
    padding: 0 .5em .1em;
    margin: 0 auto;
}.filter .tp {
    font-size: 14px;
    padding-top: 1em;
    width: 90%;
    margin-left: 6%;
    margin-right: 3%;
    border-bottom: 1px solid #ddd;
}.filter .tp span {
    color: #777;
    text-align: center;
    border: 1px solid #ddd;
    display: inline-block;
    width: 18.5%;
    margin: 0 2.5% 1em;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
}.filter .tp span:active {
    border-color: #e53333;
}.filter .tp span.active {
    border-color: #e53333;
}.explain {
    position: fixed;
    box-shadow: 0 0 8px #d0d0d0;
    background: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 15px  20px;
}.explain .title {
    font-size: 15px;
    text-align: center;
    color: #3C97EB;
    padding: .5em 0;
    position: relative;
}.explain .title i {
    right: -.7em;
    top: 0;
    font-size: 15px;
    position: absolute;
    display: inline-block;
    padding: .48em .9em;
    color: #333;
}.explain p {
    font-size: 12px;
    color: #333;
    padding-bottom: 3px;
}.explain span {
    color: #E54B55;
}.sub-top {
    height: 30px;
    background: #F6ECED;
    margin-top: .5em;
    border-top: 1px solid #dddddd;
    padding: 0 30px;
    border-bottom: 1px solid #dddddd;
    span{
      width:25%;
      line-height: 30px;
      text-align: center;
      float: left;
      color: #666666;
      font-size: 12px;
    }
}
.sub-contai{
    background: #f5f5f5;
    ul{
      .sub-contai-li{
       background: #fff;
       border-bottom: 1px solid #ddd;
       padding: 0 30px;
       height: 35px;
        i{
        height: 30px;
        position:absolute;
        font-size: 10px;
        line-height: 30px;
        color: #666;
        transform: rotate(-90deg);
        text-align: left;
        left: 20px;
        }
        .jiandu{
        transform: rotate(0deg);
        }
        span{
        width:25%;
        line-height: 30px;
        text-align: center;
        float: left;
        color: #666666;
        font-size: 12px;
        display: block;
        }
        .sub-contai-li-ul{
          display: block;
          margin: 0px 20px 10px 20px;
          padding-top: 35px;
          li{
            width: 100%;
            height: 35px;
            padding: 0 20px;
            display: flex;
            -webkit-justify-content: flex-end;
            justify-content: space-around;
            border-bottom: 1px solid #ddd;
            span{
              text-align: left;
            }
          }
          button{
            display: block;
            border: 1px solid #ddd;
            margin: 10px auto;
            width: 100px;
            height: 30px;
            font-size: 12px;
            color: #3C97EB;
            background: #fff;
            border-radius: 3px;
          }
        }
      }
    }
}.blue{
  color: #3C97EB !important;
}.green{
 color: #5BB960 !important;
}.fullPageMsg{
   background:#f5f5f5 !important;
   border-bottom: nono !important;
}.PageMsg{
  width: 100%;
  text-align: center;
  line-height: 30px;
  color: #999;
  padding: 0 20px;
  font-size: 14px;
}
li{
  list-style: none;
}
.liheight{
  height: 100% !important;
  // border-bottom: none !important;
}
.writhred{
  color: #fff !important;
  background: none !important;
}
.redwrith{
  color: #E54B55 !important;
  background: #fff;
}
.button{
width: 90%;
height: 35px;
background: #E54B55;
color: #FFF;
outline: none;
border-radius: 5px;
font-size: 14px;
border: none;
margin: 0 5%;
margin-bottom: 15px;
}
</style>
