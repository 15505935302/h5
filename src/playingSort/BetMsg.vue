<template>
  <div class="betMsg">
    <!-- 往期开奖号码 -->
    <div class="alreadyLottery" v-if="this.lotteryMsg">
      <!-- 其他彩种 -->
      <table>
        <tr>
          <th>期号</th>
          <th>开奖号码</th>
          <th>和值</th>
          <th>大小</th>
          <th>形态</th>
        </tr>
        <tr v-for="(item, index) in history.open_time" :key="index">
          <td>{{item.game_num}}</td>
          <td>{{item.get_result}}</td>
          <td>{{item.get_result}}</td>
          <td>{{item.result_type}}</td>
          <td>{{item.result_type.substr(2,1)}}</td>
        </tr>
      </table>
    </div>
    <div class="betSelect">
      <div class="hint">
        <img src="../assets/img/web/提示.svg" alt>
        <p>{{gameList.wanfa_dec}}<span class="redcolor">赔率:{{gameList.list[0].bili}}~{{gameList.list[gameList.list.length-1].bili}}</span></p>
      </div>
        <div class="selectPlay">
          <div
            class="playList"
            v-for="item in gameList.list"
            :key="item.id"
            @click="bet($event)"
            :data-bili_id="item.id"
            :data-wanfa_type="gameList.name"
            :data-bili_name="item.bili_name"
            ref="betPro">
            <span
              class="biliName"
              :class="{green:item.bili_name=='绿',blue:item.bili_name=='蓝'}"
            >{{item.bili_name}}</span>
            <p class="bili">赔率{{item.bili}}</p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Bus from "../store/bus.js";
// 期号开奖号码（带+和=）
export default {
  props: ["gameList"],
  data() {
    return {
      lotteryMsg: false,
      num: [],
      history: {},
      liuhehistory: {},
      loading: false,
      addBet: [],
      openResult: [],
      length:0
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
    // 开奖记录以及倒计时
    open_time(data) {
      if (this.gameList.wanfa_type == 1) {
        this.$api.openliuhe({ wanfa_type: data }).then(res => {
          this.history = res.data.data;
          this.$store.commit("choice_no", res.data.data.qihao);
          this.loading = true;
        });
      } else {
        this.$api.open({ game_type: data }).then(res => {
          this.history = res.data.data;
          for(let i=0,len=this.history.open_time.length;i<len;i++){
            this.history.open_time[i].get_result = this.history.open_time[i].get_result.split("=")
          }
          this.loading = true;
          let str = this.history.first_result.get_result;
          this.numWith(str);
          this.$store.commit("choice_no", res.data.data.game_num);
          this.loading = true;
        });
      }
    },
    // 开奖结果字符串处理
    numWith(str) {
      this.num = str.split("=")[0].split("+");
      this.num.push(this.num[0] * 1 + this.num[1] * 1 + this.num[2] * 1);
    },
    // 往期开奖信息点击显示
    lottery_msg() {
      if (this.lotteryMsg) {
        this.$refs.msg_tri.style.transform = "rotate(0deg)";
        this.lotteryMsg = false;
        document.body.style.overflow = "scroll";
      } else {
        this.$refs.msg_tri.style.transform = "rotate(180deg)";
        this.lotteryMsg = true;
        document.body.style.overflow = "hidden";
      }
    },
    cancel() {
      this.lotteryMsg = false;
      this.$refs.msg_tri.style.transform = "rotate(0deg)";
      document.body.style.overflow = "scroll";
    },
    // 机选
    random(random) {
      let betEle = this.$refs.betPro;
      let bet=betEle[random[0]]
      this.common.bet(bet, this.addBet, this.$store.state.unit);
    },
    // 投注
    bet(e) {
      let bet = e.currentTarget;
      this.common.bet(bet, this.addBet, this.$store.state.unit);
    },
    // 清空投注
    clearAll() {
      let bet = this.$refs.betPro;
      for (let i = 0; i < this.$refs.betPro.length; i++) {
        bet[i].classList.remove("betActive");
      }
    },
    // 投注数据长度
    dataLength() {
      if(this.gameList.lists){
        this.length=this.gameList.lists.list.length
      }else{
        this.length=this.gameList.list.length
      }
      this.$store.commit("numLength", this.length);
    },
  },
  filters: {
    getLocalTime(Timestamp) {
      var time = new Date(Timestamp);
      var h = time.getFullYear();
      var mm = time.getMonth() + 1;
      var s = time.getDate();
      return h + "." + mm + "." + s;
    }
  },
  created() {
    this.open_time(this.$store.state.gameType.game_type);
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
    this.$store.commit("wanfa",this.gameList.name)
  },
};
</script>

<style scoped lang="less">
.playList{
  border: 0.025rem solid #ddd;
  width: 1.875rem;
  height: 1rem;
  border-radius: 0.075rem;
  color: #888;
  margin: 0.1875rem;
}

.redcolor{
  color: #EE4549 !important;
  font-style: normal;
  margin-left: 5px;
}
</style>
