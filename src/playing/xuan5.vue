<template>
    <div id="playing_28" :sutest="this.$store.state.gameType.game_type" v-if="loading">
        <template v-if="this.$store.state.wanfaName==5">
             <PlayHead :gameList="gameList[this.$store.state.wanfaName]"></PlayHead>
        </template>
        <template v-else>
              <PlayHead :gameList="gameList[this.$store.state.wanfaName].lists[this.$store.state.wanfachild]" ></PlayHead>
        </template>
        <PlayingChoose v-if="this.$store.state.playingShow" :gameList='gameList'></PlayingChoose>
        <LotteryMsg v-on:betMsg="betMsg"></LotteryMsg>
        <WeBet v-if="betShow"></WeBet>
        <template v-else>
          <Qihao></Qihao>
          <template v-if="this.$store.state.wanfaName==0 || this.$store.state.wanfaName==4">
            <pk1053  :gameList="gameList[this.$store.state.wanfaName].lists[this.$store.state.wanfachild]" :firstMenu="gameList[this.$store.state.wanfaName]"></pk1053>
          </template>
          <template v-else-if="this.$store.state.wanfaName==5">
            <PK10Size  :gameList="gameList[this.$store.state.wanfaName]"></PK10Size>
          </template>
          <template v-else>
            <PK10Size :gameList="gameList[this.$store.state.wanfaName].lists[this.$store.state.wanfachild]" :firstMenu="gameList[this.$store.state.wanfaName]"></PK10Size>
          </template>
          <FooterBet v-if="this.$store.state.footbet" :gameList="gameList[this.$store.state.wanfaName]"></FooterBet>
        </template>
    </div>
</template>

<script>
import PlayHead from "../components/play_head";
import FooterBet from "../components/foot_bet";
import PlayingChoose from "../playingSort/playingChoose";
import PK10Size from "../playingSort/PK10_size"
import pk1053 from "../playingSort/PK10_53";
import LotteryMsg from "../playingSort/LotteryMsg";
import WeBet from "../playingSort/WeBet";
import Qihao from "../components/qihao";

export default {
  components: {
    PlayHead,
    FooterBet,
    PlayingChoose,
    LotteryMsg,
    WeBet,
    pk1053,
    PK10Size,
    Qihao
  },
  data() {
    return {
      gameList: [],
      // 是否加载完毕
      loading: false,
      // 显示已投注
      betShow: false,
      lotteryMsg: {},
      thrid:false,
    };
  },
  methods: {
    // 查看已投注信息
    betMsg(data) {
      this.betShow = data;
    },
    // 投注数据请求
    betRequest() {
      this.$api.wanfalist({ baseWanfaId: this.$store.state.gameType.id }).then(res => {
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

<style lang="less" scoped>
#playing_28 {
  height: 100%;
  width: 100%;
}
</style>
