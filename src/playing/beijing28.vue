<template>
    <div id="playing_28" :sutest="this.$store.state.gameType.game_type">
        <PlayHead v-if="loading" :gameList="gameList[this.$store.state.wanfaName]"></PlayHead>
        <PlayingChoose v-if="this.$store.state.playingShow" :gameList='gameList'></PlayingChoose>
        <LotteryMsg v-on:betMsg="betMsg"></LotteryMsg>
        <WeBet v-if="betShow"></WeBet>
        <template v-else>
          <openNumber></openNumber>
          <!-- 和值/特殊玩法 -->
          <BetMsg v-if="loading" :gameList="gameList[this.$store.state.wanfaName]"></BetMsg>
          <FooterBet v-if="this.$store.state.footbet" :gameList="gameList[this.$store.state.wanfaName]"></FooterBet>
        </template>
    </div>
</template>

<script>
import PlayHead from "../components/play_head";
import FooterBet from "../components/foot_bet";
import PlayingChoose from "../playingSort/playingChoose";
// 开奖信息
import LotteryMsg from "../playingSort/LotteryMsg";
// 投注信息（和值）
import BetMsg from "../playingSort/BetMsg";
// 已投注信息
import WeBet from "../playingSort/WeBet";
import openNumber from "../components/openNumber"
export default {
  components: {
    PlayHead,
    FooterBet,
    PlayingChoose,
    LotteryMsg,
    BetMsg,
    WeBet,
    openNumber
  },
  data() {
    return {
      select: 0,
      gameList: [],
      // 是否加载完毕
      loading: false,
      // 显示已投注
      betShow: false,
      lotteryMsg: {},
    };
  },
  methods: {
    // 查看已投注信息
    betMsg(data) {
      this.betShow = data;
    },
    // 投注数据请求
    betRequest() {
      this.$api.game({ game_type: this.$store.state.gameType.game_type }).then(res => {
        this.gameList = res.data.data;
        this.loading = true;
      });
    }
  },
  mounted() {
    this.betRequest()
    this.$store.commit("footbet", true)
  },
};
</script>

<style lang="less">
#playing_28 {
  height: 100%;
  width: 100%;
}
</style>
