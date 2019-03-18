<template>
    <div v-if="loading" id="playing_28" :sutest="this.$store.state.gameType.game_type">
        <PlayHead :gameList="gameList[this.$store.state.wanfaName].lists[this.$store.state.wanfachild]" ></PlayHead>
        <PlayingChoose v-if="this.$store.state.playingShow" :gameList='gameList'></PlayingChoose>
        <LotteryMsg v-on:betMsg="betMsg"></LotteryMsg>
        <WeBet v-if="betShow"></WeBet>
        <template v-else>
          <Qihao></Qihao>
          <PK10Size v-if="this.$store.state.wanfaName==0" :gameList="gameList[this.$store.state.wanfaName].lists[this.$store.state.wanfachild]" :firstMenu="gameList[this.$store.state.wanfaName]"></PK10Size>
          <PK10Num v-else :gameList="gameList[this.$store.state.wanfaName].lists[this.$store.state.wanfachild]" :firstMenu="gameList[this.$store.state.wanfaName]"></PK10Num>
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
// 已投注信息
import WeBet from "../playingSort/WeBet";
// 猜数字
import PK10Num from "../playingSort/PK10_num"
// 大小单双
import PK10Size from "../playingSort/PK10_size";
import Qihao from "../components/qihao";


export default {
  components: {
    PlayHead,
    FooterBet,
    PlayingChoose,
    LotteryMsg,
    WeBet,
    PK10Num,
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
  width: 100%;
  height: 100%;
}
</style>
