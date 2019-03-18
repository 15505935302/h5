<template>
    <div class="shiShiCai" v-if="loading">
        <PlayHead v-if="this.$store.state.wanfaName==4" :gameList="gameList[this.$store.state.wanfaName].lists[this.$store.state.wanfachild]"></PlayHead>
        <PlayHead v-else  :gameList="gameList[this.$store.state.wanfaName]"></PlayHead>
        <PlayingChoose v-if="this.$store.state.playingShow" :gameList='gameList'></PlayingChoose>
        <LotteryMsg v-on:betMsg="betMsg"></LotteryMsg>
        <WeBet v-if="betShow"></WeBet>
        <template v-else>
            <Qihao></Qihao>
            <UnitNum v-if="this.$store.state.wanfaName==0" :gameList="gameList[this.$store.state.wanfaName]"></UnitNum>
            <PK10Num v-else-if="this.$store.state.wanfaName==1" :gameList="gameList[this.$store.state.wanfaName]"></PK10Num>
            <PK10Top v-else-if="this.$store.state.wanfaName==2 || this.$store.state.wanfaName==3" :gameList="gameList[this.$store.state.wanfaName]"></PK10Top>
            <PK1053 v-else-if="this.$store.state.wanfaName==4" :gameList="gameList[this.$store.state.wanfaName].lists[this.$store.state.wanfachild]" :firstMenu="gameList[this.$store.state.wanfaName]"></PK1053>
        </template>
        <FooterBet v-if="this.$store.state.footbet" :gameList="gameList[this.$store.state.wanfaName]"></FooterBet>
    </div>
</template>

<script>
import PlayHead from "../components/play_head";
import FooterBet from "../components/foot_bet";
import PlayingChoose from "../playingSort/playingChoose";
// 已投注信息
import WeBet from "../playingSort/WeBet";
// 开奖信息
import LotteryMsg from "../playingSort/LotteryMsg";
// 猜双面
import UnitNum from "../playingSort/unitNum"
// 猜数字
import PK10Num from "../playingSort/PK10_num"
// 和值
import PK10Top from "../playingSort/PK10_top";
// 投注信息（不定胆）
import PK1053 from "../playingSort/PK10_53"
import Qihao from "../components/qihao";

export default {
    components:{
        PlayHead,
        FooterBet,
        PlayingChoose,
        LotteryMsg,
        WeBet,
        UnitNum,
        PK10Num,
        PK10Top,
        PK1053,
        Qihao
    },
    data() {
        return {
            loading:false,
            gameList:[],
            // 显示已投注
            betShow: false,
        }
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
}
</script>

<style lang="less" scoped>
    .shiShiCai{
        height: 100%;
        width: 100%;
    }
</style>
