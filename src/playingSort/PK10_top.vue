<template>
    <div class="betMsg">
      <div class="betSelect">
          <div class="hint">
              <img src="../assets/img/web/提示.svg" alt="">
              <p>{{gameList.wanfa_dec}}<i class="redcolor">赔率：{{gameList.list[0].bili}}~{{gameList.list[gameList.list.length-1].bili}}</i></p>
          </div>
          <div class="selectPlay" :status="length">
              <div v-for="(item,index) in gameList.list" :key="index" @click="bet($event)" ref="betPro"
                :data-bili_id="item.id"
                :data-wanfa_type="gameList.name"
                :data-bili_name="item.bili_name">
                  <span>{{item.bili_name}}</span>
                  <p class="power">赔率{{item.bili}}</p>
              </div>
          </div>
        </div>
    </div>
</template>

<script>

import Bus from "../store/bus.js"
export default {
  props:['gameList'],
  data() {
    return {
      addBet: [],
      length: 0,
      betArr:[]
    };
  },
  watch: {
    gameList(data){
      this.$store.commit("betMsg",this.gameList)
      this.length=0
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
    // 往期开奖信息点击显示
    lottery_msg() {
      if (this.lotteryMsg) {
        this.$refs.msg_tri.style.transform = "rotate(0deg)";
        this.lotteryMsg = false;
      } else {
        this.$refs.msg_tri.style.transform = "rotate(180deg)";
        this.lotteryMsg = true;
      }
    },
    // 机选
    random(random) {
      let betEle = this.$refs.betPro;
      let bet=betEle[random[0]]
      this.common.bet(bet,this.addBet,this.$store.state.unit)
    },
    // 投注选择
    bet(e) {
      let bet = e.currentTarget;
      this.common.bet(bet,this.addBet,this.$store.state.unit)
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
  mounted() {
    console.log(this.gameList)
    this.$store.commit("betMsg",this.gameList)
    this.dataLength();
    Bus.$on("clearBet", () => {
      this.addBet = [];
      this.clearAll();
    });
    this.$store.commit("wanfa",this.gameList.name)
  },
};
</script>

<style scoped lang="less">
.betMsg {
  .betSelect {
    .selectPlay {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      div {
        width: 22%;
        height: 40px;
        border: 1px solid #ddd;
        border-radius: 3px;
        color: #888;
        margin-bottom: 12px;
        span {
          color: #e54b55;
        }
        p{
          font-size: 9px;
        }
      }
    }
  }
}

.redcolor{
  color: #EE4549 !important;
  font-style: normal;
  margin-left: 5px;
}
</style>
