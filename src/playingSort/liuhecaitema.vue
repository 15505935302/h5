<template>
  <div class="betMsg">
    <div class="betSelect">
      <div class="hint">
        <img src="../assets/img/web/提示.svg" alt>
        <p>{{gameList.wanfa_dec}}
          <i class="redcolor">赔率：
            <template v-if="gameList.min_bili">
              {{gameList.min_bili}}~{{gameList.max_bili}}
            </template>
            <template v-else>
              {{gameList.list[$store.state.wanfachild].odd}}
            </template>
          </i>
        </p>
      </div>
      <!-- 六合彩 -->
        <div class="selectPlay">
          <div class="playList"
            v-for="item in gameList.list"
            :key="item.id"
            @click="bet($event)"
            :data-wanfa_id="item.id"
            :data-wanfa_type="gameList.name"
            :data-wanfa_name="item.wanfa_name"
            ref="betPro"
          >
            <span
              class="biliName"
              :class="common.fontcolor(item.wanfa_name)"
            >{{item.wanfa_name}}</span>
            <p class="bili">赔率{{item.odd}}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Bus from "../store/bus.js";
import liuheQihao from "../components/liuhecaiqihao"
export default {
  props: ["gameList"],
  components:{
    liuheQihao
  },
  data() {
    return {
      addBet: [],
      length:0,
    };
  },
  watch: {
    gameList(){
      this.$store.commit("betMsg",this.gameList)
      this.dataLength()
    },
    randomCount(data){
      this.addBet=[]
      this.random(data)
    }
  },
  computed: {
    randomCount(){
      return this.$store.state.random
    }
  },
  methods: {
    // 机选
    random(random) {
      let betEle = this.$refs.betPro;
      let bet=betEle[random[0]]
      this.common.bet(bet, this.addBet,this.$store.state.gameType);
    },
    // 投注
    bet(e) {
      let bet = e.currentTarget;
      this.common.bet(bet, this.addBet,this.$store.state.gameType);
    },
    // 投注数据长度
    dataLength() {
      this.length=this.gameList.list.length
      this.$store.commit("numLength", this.length);
    },
    // 清空投注
    clearAll() {
      let bet = this.$refs.betPro;
      for (let i = 0; i < this.$refs.betPro.length; i++) {
        bet[i].classList.remove("betActive");
      }
    }
  },
  created() {
    console.log(this.gameList)
    this.dataLength()
    this.$store.commit("betMsg",this.gameList)
  },
  mounted() {
    Bus.$on("clearBet", () => {
      this.addBet = [];
      this.clearAll();
    });
  },
};
</script>

<style scoped lang="less">
.betActive {
  background-color: #e54b55 !important;
  color: #fff !important;
  .biliName {
    color: #fff !important;
  }
}
.playList{
  border: 0.025rem solid #ddd;
  width: 1.875rem;
  height: 1rem;
  border-radius: 0.075rem;
  color: #888;
  margin: 0.1875rem;
}
.green {
  color: #5bb960 !important;
}
.blue {
  color: #468ef0 !important;
}
.red {
  color: #EE4549!important;
}

.redcolor{
  color: #EE4549 !important;
  font-style: normal;
  margin-left: 5px;
}
</style>
