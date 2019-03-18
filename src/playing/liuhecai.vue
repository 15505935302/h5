<template>
    <div v-if="loading" id="playing_28">
        <template v-if="this.$store.state.wanfaName==0 || this.$store.state.wanfaName==1 || this.$store.state.wanfaName==4 || this.$store.state.wanfaName==6">
          <PlayHead :gameList="gameList[this.$store.state.wanfaName]"></PlayHead>
        </template>
        <template v-else>
          <template v-if="gameList[this.$store.state.wanfaName].lists">
            <PlayHead :gameList="gameList[this.$store.state.wanfaName].lists[this.$store.state.wanfachild]" ></PlayHead>
          </template>
          <template v-else>
            <PlayHead :gameList="gameList[this.$store.state.wanfaName].list[this.$store.state.wanfachild]" ></PlayHead>            
          </template>
        </template>
        <PlayingChoose v-if="this.$store.state.playingShow" :gameList='gameList'></PlayingChoose>
        <LotteryMsg v-on:betMsg="betMsg"></LotteryMsg>
        <WeBet v-if="betShow"></WeBet>
        <template v-else>
          <liuheQihao></liuheQihao>
          <template v-if="this.$store.state.wanfaName==0 || this.$store.state.wanfaName==1 || this.$store.state.wanfaName==4 || this.$store.state.wanfaName==6">
            <!-- 特码 -->
            <liuhecaitema :gameList="gameList[this.$store.state.wanfaName]"></liuhecaitema>
          </template>
          <template v-else-if="this.$store.state.wanfaName==7 || this.$store.state.wanfaName==10">
            <!-- 加name组件 -->
            <liuhecainame :gameList="gameList[this.$store.state.wanfaName]"></liuhecainame>
          </template>
          <template v-else-if="this.$store.state.wanfaName==8 || this.$store.state.wanfaName==9 || this.$store.state.wanfaName==3">
            <!-- 加name组件 -->
            <liuhecainame :gameList="gameList[this.$store.state.wanfaName].lists[this.$store.state.wanfachild]"  :gamees="gameList[this.$store.state.wanfaName]"></liuhecainame>
          </template>
          <template v-else>
            <!-- 特码 -->
            <liuhecaitema  :gameList="gameList[this.$store.state.wanfaName].lists[this.$store.state.wanfachild]" ></liuhecaitema>
          </template>
          <FooterBet v-if="this.$store.state.footbet" :gameList="gameList[this.$store.state.wanfaName]"></FooterBet>
        </template>
    </div>
</template>

<script>
import PlayHead from "../components/play_head";
import FooterBet from "../components/foot_bet";
import PlayingChoose from "../playingSort/playingChoose";
// 投注信息（猜双面）
import liuhecaitema from "../playingSort/liuhecaitema";
// 投注信息（猜双面）
import liuhecainame from "../playingSort/liuhecainame";
// 开奖信息
import LotteryMsg from "../playingSort/LotteryMsg";
// 已投注信息
import WeBet from "../playingSort/WeBet";
import liuheQihao from "../components/liuhecaiqihao"
export default {
  components: {
    PlayHead,
    FooterBet,
    PlayingChoose,
    LotteryMsg,
    WeBet,
    liuhecaitema,
    liuhecainame,
    liuheQihao,
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
      listma:[
        {name:"鼠"},
        {name:"牛"},
        {name:"虎"},
        {name:"兔"},
        {name:"龙"},
        {name:"蛇"},
        {name:"马"},
        {name:"羊"},
        {name:"猴"},
        {name:"鸡"},
        {name:"狗"},
        {name:"猪"},
      ],
      listnum:[
        {name:"01"},
        {name:"02"},
        {name:"03"},
        {name:"04"},
        {name:"05"},
        {name:"06"},
        {name:"07"},
        {name:"08"},
        {name:"09"},
        {name:"10"},
        {name:"11"},
        {name:"12"},
        {name:"13"},
        {name:"14"},
        {name:"15"},
        {name:"16"},
        {name:"17"},
        {name:"18"},
        {name:"19"},
        {name:"20"},
        {name:"21"},
        {name:"22"},
        {name:"23"},
        {name:"24"},
        {name:"25"},
        {name:"26"},
        {name:"27"},
        {name:"28"},
        {name:"29"},
        {name:"30"},
        {name:"31"},
        {name:"32"},
        {name:"33"},
        {name:"34"},
        {name:"35"},
        {name:"36"},
        {name:"37"},
        {name:"38"},
        {name:"39"},
        {name:"40"},
        {name:"41"},
        {name:"42"},
        {name:"43"},
        {name:"44"},
        {name:"45"},
        {name:"46"},
        {name:"47"},
        {name:"48"},
        {name:"49"},
      ],
      listend:[
        {name:"0"},
        {name:"1"},
        {name:"2"},
        {name:"3"},
        {name:"4"},
        {name:"5"},
        {name:"6"},
        {name:"7"},
        {name:"8"},
        {name:"9"},
      ]
    };
  },
  methods: {
    // 查看已投注信息
    betMsg(data) {
      this.betShow = data;
    },
    // 投注数据请求
    betRequest() {
      this.$api.gameliuhe({ game_type: this.$store.state.gameType.game_type }).then(res => {
        this.gameList = res.data.data;
        this.loading = true;
        this.gameList[7].listma = this.listma
        this.gameList[10].listma = this.listnum
        for(let i = 0,len = this.gameList[8].lists.length;i<len;i++){
          this.gameList[8].lists[i].listma = this.listma
        }
        for(let i = 0,len = this.gameList[9].lists.length;i<len;i++){
          this.gameList[9].lists[i].listma = this.listend
        }
        for(let i = 0,len = this.gameList[3].lists.length;i<len;i++){
          this.gameList[3].lists[i].listma = this.listnum
        }
        this.$store.commit("wanfa",this.gameList[0].name)
        this.loading=true
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
