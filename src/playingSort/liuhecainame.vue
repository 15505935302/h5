<template>
  <div class="betMsg">
    <div class="betSelect">
      <div class="hint">
        <img src="../assets/img/web/提示.svg" alt>
        <p>{{gameList.wanfa_dec}}
          <i class="redcolor">赔率：
            <template v-if="gameList.min_bili==gameList.max_bili">
              {{gameList.min_bili}}
            </template>
            <template v-else>
              {{gameList.min_bili}}~{{gameList.max_bili}}  
            </template>
          </i>
        </p>
      </div>
      <!-- 六合彩 -->
      <div class="selectPlay">
        <template v-if="$store.state.wanfaName==7 || $store.state.wanfaName==10">
          <div
            class="playList"
            v-for="item in gameList.listma"
            :key="item.id"
            @click="bet($event)"
            :data-wanfa_id="gameList.list[$store.state.wanfachild].id"
            :data-wanfa_type="gameList.list[$store.state.wanfachild].wanfa_parentname+','+gameList.list[$store.state.wanfachild].wanfa_name"
            :data-wanfa_name="item.name"
            :data-numbers="item.name"
            :data-min_select="gameList.list[$store.state.wanfachild].min_select"
            ref="betPro"
          >
            <span
              class="biliName"
              :class="common.fontcolor(item.name)"
            >{{item.name}}</span>
            <p v-if="gameList.name == '合肖' || gameList.name == '全不中'" class="bili">赔率{{gameList.list[$store.state.wanfachild].a_odds}}</p>
            <p v-else class="bili">赔率{{gameList.list[0].odd}}</p>
          </div>
        </template>
        <template v-else>
          <div
            class="playList"
            v-for="item in gameList.listma"
            :key="item.id"
            @click="bet($event)"
            :data-wanfa_id="gameList.list[0].id"
            :data-wanfa_type="gameList.list[0].wanfa_parentname+','+gameList.list[0].wanfa_name"
            :data-wanfa_name="item.name"
            :data-numbers="item.name"
            :data-min_select="gameList.list[0].min_select"
            ref="betPro"
          >
            <span
              class="biliName"
              :class="common.fontcolor(item.name)"
            >{{item.name}}</span>
            <p v-if="gameList.name == '合肖' || gameList.name == '全不中'" class="bili">赔率{{gameList.list[$store.state.wanfachild].a_odds}}</p>
            <p v-else class="bili">赔率{{gameList.list[0].odd}}</p>
          </div>
        </template>
      </div>      
    </div>
  </div>
</template>

<script>
import Bus from "../store/bus.js";
export default {
  props: ["gameList"],
  data() {
    return {
      addBet: [],
      betNo:[],
      betStr:{},
      length:0,
    };
  },
  watch:{
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
      for(let i=0;i<random.length;i++){
        let bet=betEle[random[i]]
        this.common.budingBet(bet,this.addBet,this.betStr,bet.dataset.min_select,this.$store.state.gameType.type,this.$store.state.gameType)   
      }
    },
    // 投注
    bet(e) {
      let bet = e.currentTarget;
      this.common.budingBet(bet,this.addBet,this.betStr,bet.dataset.min_select,this.$store.state.gameType.type,this.$store.state.gameType)
    },
    // 投注数据长度
    dataLength() {
      this.length=this.gameList.listma.length
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
    this.dataLength()
    this.$store.commit("betMsg",this.gameList)
  },
  mounted() {
    Bus.$on("clearBet", () => {
      this.addBet = [];
      this.clearAll();
    });
    Bus.$on("gameType", data => {
      this.open_time(data.game_type);
    });
    this.$store.commit("wanfa",this.gameList.list[0].wanfa_parentname)
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
.green {
  color: #5bb960 !important;
}
.blue {
  color: #468ef0 !important;
}
.red {
  color: #EE4549!important;
}
.playList{
  border: 0.025rem solid #ddd;
  width: 1.875rem;
  height: 1rem;
  border-radius: 0.075rem;
  color: #888;
  margin: 0.1875rem;
}
.liured{
    background: #EE4549!important;
    background: linear-gradient(180deg,#ff3034 30%,#ea0505)!important;
}
.liublue {
    background: #579EEE!important;
    background: linear-gradient(180deg,#219ffd 30%,#0385e5)!important;
}
.liugreen {
    background: #4BD858!important;
    background: linear-gradient(180deg,#1dd05f 30%,#22a353)!important;
}
.redcolor{
  color: #EE4549 !important;
  font-style: normal;
  margin-left: 5px;
}
</style>
