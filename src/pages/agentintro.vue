<template>
  <div id="voucher">
    <Head>
      <span slot="pageName">代理说明</span>
    </Head>
    <div class="main child-view">
      <img src="http://a.img-alicdn.com/Images/Common/agentIntro_mobile.jpg" alt width="100%">
      <div class="agentIntroDes">
        <h3>如何赚取返点佣金？</h3>
        <div class="agentIntroP">
          <p>可获得的返点佣金，取决于自身返点与下级返点的差值，如自身返点3，下级返点1，你将能获得下级投注金额2%的返佣，即下级投注100元，你将会获得2元；</p>
        </div>
        <h3>如何为下级开户？</h3>
        <div class="agentIntroP">
          <p>点击下级开户 &gt;&gt; 为下级设置返点 &gt;&gt; 生成邀请码 &gt;&gt; 发送邀请码给下级 &gt;&gt; 下级即可注册；</p>
        </div>
        <h3>如何查看下级发展？</h3>
        <div class="agentIntroP">
          <p>点击下级管理，就能查看您所有下级账号；</p>
          <p>点击团队报表、下级投注记录、下级交易记录查看代理的发展情况；</p>
        </div>
        <h3>如何查看自身返点和赔率？</h3>
        <div class="agentIntroP">
          <p>点击下级开户，可查看自身返点；</p>
          <p>点击下级开户 &gt;&gt; 返点赔率表，可查看返点对应赔率；</p>
        </div>
        <h3>温馨提示：</h3>
        <div class="agentIntroP">
          <p>为下级设置的返点不同赔率也不同，返点越低，赔率就越低，建议为下级设置的返点不要过低；</p>
          <p>如果您为下级开设的是代理类型的账号，那么您的下级就能继续发展下级；</p>
          <p>如果您为下级开设的是玩家类型的账号，那么您的下级只能投注，不能再发展下级，也看不到代理中心；</p>
          <p>建议开设的下级是代理类型，无论发展了几级，您都能获得返佣。</p>
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
      infoagent: {}
    };
  },
  methods: {
    //个人代理信息
    apiFunction() {
      this.$api.infoagent().then(res => {
        this.infoagent = res.data.data;
        console.log(res);
        console.log(this.infoagent);
      });
    }
  },
  mounted() {
    this.apiFunction();
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
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}
.main {
  font-size: inherit;
  padding-top: 50px;
  .agentIntroDes{
  width: 94%;
  margin: 0 3%;
  h3{
  font-size: 14px;
  color: #EE4549
  }
  p{
    font-size: 14px;
    text-align: left;

  }
}
}
em,i {
  font-style: normal;
}
</style>
