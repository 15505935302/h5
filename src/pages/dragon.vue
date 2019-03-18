<template>
  <div id="dragon">
    <Head>
      <span slot="pageName">长龙助手</span>
      <i class="iconfont right" slot="right" @click="directions">&#xe623;</i>
    </Head>
    <LotteryMsg v-on:betMsg="betMsg"></LotteryMsg>
    <WeBet v-if="betShow" :dragon="true"></WeBet>
    <div v-else class="wanfaContent">
      <dragon v-for="(item, index) in wanfaList" :key="index" :dragonMsg="item"></dragon>
    </div>
    <FooterBet></FooterBet>
    <!-- 说明弹出框 -->
    <div class="popState" v-if="state">
      <h5>长龙说明</h5>
      <section class="content">
        <div style="text-align: left;">
          <p>长龙助手是对“快3”、“时时彩”以及“北京赛车”和“游艇”的“大小单双”开奖结果进行统计监测，每期出现“大、小、单、双”的概率为1/2，如果连续3期及以上的开奖 结果相同，将称之为“长龙”，通常会采用倍投的方式进行“斩龙”或“顺龙”。</p>
          <h4>
            <img src="../../static/img/prompt.svg">&nbsp; 什么叫斩龙？
          </h4>
          <p>如连续开6期“单”，可以选择“双”进行投注。这样的投注方案称之为“斩龙”；</p>
          <h4>
            <img src="../../static/img/prompt.svg">&nbsp; 什么叫顺龙？
          </h4>
          <p>如连续开6期“单”，继续选择“单”进行投注。这样的投注方案称之为“斩龙”；</p>
          <h4>
            <img src="../../static/img/prompt.svg">&nbsp; 什么是倍投?
          </h4>
          <p>倍投是指一种成倍的投注方式，是为保障能够在“斩 龙”或“顺龙”的过程中持续盈利的一种押注方式。</p>
        </div>
      </section>
      <footer @click="cenl">我知道了</footer>
    </div>
    <!-- 遮罩层 -->
    <div class="shade" v-if="state" @touchmove.prevent></div>
  </div>
</template>

<script>
import Head from "../components/header";
import LotteryMsg from "../playingSort/LotteryMsg";
// 已投注信息
import WeBet from "../playingSort/WeBet";
import FooterBet from "../components/foot_dragon";
import dragon from "../playingSort/dragonchild";
export default {
  components: {
    Head,
    LotteryMsg,
    WeBet,
    FooterBet,
    dragon
  },
  data() {
    return {
      // 显示已投注
      betShow: false,
      wanfaList: {},
      state: false,
      // 刷新延时器
      refreshTime: null
    };
  },
  watch: {
    refresh(data) {
      if (data) {
        this.refreshRequest();
      }
    }
  },
  computed: {
    refresh() {
      return this.$store.state.openResult;
    }
  },
  methods: {
    // 长龙助手说明
    directions(e) {
      this.state = true;
      this.$store.commit("playingShow", true);
    },
    cenl(e) {
      document.body.style.overflow = "scroll";
      this.state = false;
    },
    // 查看已投注信息
    betMsg(data) {
      this.betShow = data;
    },
    dragonlis() {
      this.$api.dragonlist().then(res => {
        this.wanfaList = res.data.data.data;
      });
    },
    // 倒计时结束刷新请求结果
    refreshRequest() {
      this.$api.dragonlist().then(res => {
        if (res.data.result_code == 0) {
          this.$set(this.$data, "wanfaList", res.data.data.data);
          this.$store.commit("openResult", false);
          clearTimeout(this.refreshTime);
        } else {
          this.refreshTime = setTimeout(() => {
            this.refreshRequest();
          }, 5000);
        }
        this.$once("hook:beforeDestroy", () => {
          clearTimeout(this.refreshTime);
        });
      });
    }
  },
  mounted() {
    this.dragonlis();
  },
  filters: {
    timechoose(data) {
      let min = Math.floor(data / 60);
      let sec = data % 60;
      if (min < 10) {
        min = "0" + min;
      }
      if (sec < 10) {
        sec = "0" + sec;
      }
      return min + ":" + sec;
    }
  }
};
</script>

<style scoped lang='less'>
.wanfaContent {
  margin-top: 91px;
}
.shade {
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background-color: #000;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
}
.popState {
  position: fixed;
  width: 70%;
  height: 50%;
  z-index: 105;
  top: 20%;
  left: 15%;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  h5 {
    height: 12%;
    background-color: #fe504f;
    text-align: center;
    line-height: 1rem;
    font-size: 15px;
    letter-spacing: 5px;
    color: #fff;
  }
  .content {
    padding: 10px;
    box-sizing: border-box;
    height: 76%;
    overflow-y: scroll;
    h4 {
      color: #fe504f;
      line-height: 30px;
      img {
        max-width: 0.5rem;
        max-height: 0.5rem;
        margin-left: 5px;
        margin-bottom: -5px;
      }
    }
    p {
      text-indent: 25px;
    }
  }
  footer {
    height: 12%;
    text-align: center;
    color: #fe504f;
    border-top: 1px solid #ddd;
    line-height: 1rem;
    font-size: 14px;
  }
}
#dragon {
  background-color: #f5f5f5;
  .right {
    text-align: center;
  }
}
.bluebac {
  background: #5d75fe;
}
.yellbac {
  background: #ffc730;
}
.redbac {
  background: #fe504f;
  p {
    color: #fff !important;
  }
}
.playContent .bet {
  position: relative;
}
.texeleft {
  text-align: left;
}
.weui-dialog__bd img {
  width: 10px;
  height: 10px;
}
i {
  font-style: normal;
}
.timefont {
  color: #fe504f;
}
</style>
