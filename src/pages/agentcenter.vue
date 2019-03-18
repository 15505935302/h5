<template>
  <div id="voucher">
    <Head>
      <span slot="pageName">代理中心</span>
    </Head>
    <div class="main child-view" s="[object Object]">
      <div class="ag-sum">
        <p class="p1">我的下级 (人)</p>
        <p class="p2">{{infoagent.subAgentPeople}}</p>
        <p class="p1">累计返佣（元）：{{infoagent.totalShareProfit}}</p>
        <router-link tag='em' to='/agentrebatedetail'>返佣明细</router-link>
      </div>
      <div class="rb-ty">
        <div>
          <p>昨日返佣 (元)</p>
          <span>{{infoagent.yesterdayShareProfit}}</span>
        </div>
        <div>
          <p>今日返佣 (元)</p>
          <span>{{infoagent.todayShareProfit}}</span>
        </div>
      </div>
      <div class="ag-bot">
        <div>
          <router-link to="/agentintro" class="ag-part ml">
            <img src="../../static/img/dirsecpition.svg">
            <p>代理说明</p>
          </router-link>
        </div>
        <div>
          <router-link to="/agentmanageinvite" class="ag-part mr">
            <img src="../../static/img/addfriend.svg">
            <p>下级开户</p>
          </router-link>
        </div>
        <div>
          <router-link to="/agentreport" class="ag-part ml">
            <img src="../../static/img/lineorder.svg">
            <p>代理报表</p>
          </router-link>
        </div>
        <div>
          <router-link to="/agentmember" class="ag-part mr">
            <img src="../../static/img/vipmeber.svg">
            <p>下级管理</p>
          </router-link>
        </div>
        <div>
          <router-link to="/agentbetrecord" class="ag-part ml">
            <img src="../../static/img/todayorder.svg">
            <p>下级投注明细</p>
          </router-link>
        </div>
        <div>
          <router-link to="/agenttraderecord" class="ag-part mr">
            <img src="../../static/img/canteen.svg">
            <p>下级交易明细</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "../components/header";
export default {
  components: {
    Head
  },
  data() {
    return {
        infoagent:{},
    };
  },
  methods: {
    //个人代理信息
    apiFunction(){
      this.$api.infoagent().then(res=>{
        this.infoagent=res.data.data
        console.log(res)
        console.log(this.infoagent)
      })
    }
  },
  mounted() {
    this.apiFunction()
  }
};
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.child-view {
    position: absolute;
    width: 100%;
    transition: all .2s cubic-bezier(.55,0,.1,1);
}.main {
    font-size: inherit;
    padding-top: 50px;

}.ag-sum {
    position: relative;
    width: 100%;
    background: linear-gradient(0deg,#B53840,#E54B55);
    color: #fff;
    padding: 20px 0 20px 20px;
}.ag-sum .p1 {
    margin-bottom: 3px;
}.ag-sum p {
    font-size: 14px;
}blockquote, figure, form, h1, h2, h3, h4, h5, h6, p {
    margin: 0;
}.ag-sum .p2 {
    font-size: 18px!important;
    margin-bottom: .05em;
}.ag-sum em {
    height: 2.45em;
    line-height: 2.55em;
    font-size: 12px;
    right: 0;
    top: 42px;
    text-align: center;
    width: 6.1em;
    border-radius: 3em 0 0 3em;
    display: block;
    position: absolute;
    background: linear-gradient(90deg,#B53840,#E54B55);
}em, i {
    font-style: inherit;
}.rb-ty {
    height: 50px;
    width: 100%;
    background: #E54B55;
    color: #fff;
    margin-bottom: 5px;
}.rb-ty div {
    width: 50%;
    float: left;
    text-align: center;
    margin-top: 10px;
}.rb-ty div p {
    font-size: 14px;
    line-height: 14px;
}.rb-ty div span {
    font-size: 14px;
}.ag-bot{
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: space-around;
    justify-content: space-around;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}.ag-bot div {
    border-radius: 5px;
    border: 1px #dddddd solid;
    background-color: #ffffff;
    width: 45%;
    display: inline-block;
    margin: 5px 1.5%;
}.ag-bot div a{
    width: 100%;
    text-align: left;
    padding-left:25%;
    height:70px;
}.ag-part {
    display: inline-block;
    text-align: center;
    font-size: 12px;
    color: #505050;
    padding: 1em 0 .7em;
}a {
    background: transparent;
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
    color: inherit;
}.ag-part .i1 {
    color: #0fa5e8;
}.ag-part img {
    display: block;
    float: left;
    width: 23px;
    height: 23px;
    margin-top: 10px;
}.ag-part p {
    display: inline-block;
    line-height: 50px;
}.ag-part .i1 {
    color: rgb(254, 155, 194);
}.ag-part .i2 {
    color: rgb(249, 199, 61);
}.ag-part .i3 {
    color: rgb(219, 239, 220);
}.ag-part .i4 {
    color: rgb(32, 160, 255);
}.ag-part .i5 {
    color: rgb(6, 193, 174);
}.ag-part .i6 {
    color: rgb(204, 226, 249);
}
</style>
