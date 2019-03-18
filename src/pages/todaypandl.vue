<template>
  <div id="voucher">
    <Head>
      <span slot="pageName">今日盈亏</span>
    </Head>
    <div class="main child-view" >
      <!---->
      <div class="ag-top">
        <div class="earn">
          <p>个人盈亏 (元)</p>
          <span>{{data.profit_loss}}</span>
        </div>
        <div class="tip"><i class="iconfont">&#xe600;</i>盈亏计算公式：中奖-投注+活动+返佣</div>
      </div>
      <div class="ag-bot">
        <div class="bet-bonus">
          <div>
            <p>投注金额 (元)</p>
            <span class="mred">{{data.bet_point}}</span>
          </div>
          <div>
            <p>中奖金额 (元)</p>
            <span class="mred">{{data.get_point}}</span>
          </div>
          <div>
            <p>活动礼金 (元)</p>
            <span class="mred">{{data.activity_gift_point}}</span>
          </div>
        </div>
      </div>
      <div class="ag-bot">
        <div class="bet-bonus">
          <div>
            <p>充值金额 (元)</p>
            <span class="mred">{{data.recharge_point}}</span>
          </div>
          <div>
            <p>提现金额 (元)</p>
            <span class="mred">{{data.withdrawals_logs_point}}</span>
          </div>
          <div>
            <p>返点佣金 (元)</p>
            <span class="mred">{{data.agent_profit_point}}</span>
          </div>
        </div>
      </div>
      <div class="ag-bot">
        <div class="bet-bonus">
          <div>
            <p>红包领取 (元)</p>
            <span class="mred">{{data.get_red_pack_money}}</span>
          </div>
          <div>
            <p>红包发放 (元)</p>
            <span class="mred">{{data.send_red_pack_money}}</span>
          </div>
          <div>
            <p>红包退回 (元)</p>
            <span class="mred">{{data.return_red_pack_money}}</span>
          </div>
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
      data: {}
    };
  },
  methods: {
      todaypandl(){
          this.$vux.loading.show({
            text: 'Loading'
          })
          this.$api.todaypandl().then(res=>{
            this.$vux.loading.hide({
              text: 'Loading'
            })
            if(res.data.result_code==0){
              this.data = res.data.data            
            }else{
              this.confirm({
                title: '提示',
                content: "查看失败，请稍后再试",
                confirmText: '确定',
                cancelText: '取消',
                showCancelButton:false,
              })
            }
          })
      }
  },
  mounted() {
      this.todaypandl()
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
    height: auto;
}.main {
    font-size: inherit;
    padding-top: 50px;
}.ag-top {
    position: relative;
    height: 150px;
    width: 100%;
    background: linear-gradient(180deg,#E54B55,#e02f2f);
    color: #fff;
}.ag-top .earn {
    text-align: center;
    height: 120px;
}.ag-top .tip {
    height: 2.6em;
    background: linear-gradient(95deg,#f79112,#ec5639);
    font-size: 12px;
    line-height: 2.7em;
    position: relative;
}.ag-top .earn p {
    font-size: 18px;
    padding: 32px 0 .1em;
}blockquote, figure, form, h1, h2, h3, h4, h5, h6, p {
    margin: 0;
}.ag-top .earn span {
    font-size: 14px;
}.ag-bot {
    margin-top: 8px;
    height: 80px;
    background: #fff;
}.bet-bonus div {
    float: left;
    width: 33%;
    text-align: center;
    margin-top: 1.3em;
    border-left: 1px solid #f0f0f0;
}.bet-bonus div p {
    margin-bottom: .3em;
    color: #777;
    font-size: 15px;
}.bet-bonus div span {
    font-size: 15px;
}.mred {
    color: #e20606;
}
</style>
