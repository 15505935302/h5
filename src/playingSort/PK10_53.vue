<template>
  <div class="betMsgs">
    <div class="betSelect">
      <div class="hint">
        <img src="../assets/img/web/提示.svg" alt>
        <p>{{gameList.wanfa_dec}}<i class="redcolor">赔率：{{gameList.list[0].bili}}</i>
        </p>
      </div>
      <div class="selectPlay" :status="length">
          <div class="playList">
            <span>{{gameList.name}}</span>
            <div>
              <div
                v-for="(item, index) in gameList.list" :key="index" @click="bet($event)"
                :data-betNumbers="item.bili_name"
                :data-bili_id="item.id"
                :data-wanfa_id="gameList.wanfa_id"
                :data-wanfa_type="gameList.name"
                :data-bili_name="item.bili_name"
                :data-numbers="item.wanfa_name"
                :data-index="index"
                ref="betPro"
              >{{item.bili_name || item.wanfa_name}}</div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../store/bus.js"
export default {
  props:['gameList',"firstMenu"],
  data() {
    return {
      length:0,
      addBet:[],
      betStr:{},
      // 最小投注
      minBet:""
    };
  },
  watch: {
    gameList(){
      this.$store.commit("betMsg",this.gameList)
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
        this.common.budingBet(bet,this.addBet,this.betStr,this.minBet,this.$store.state.gameType.type)
      }
    },
    // 投注
    bet(e) {
      let bet = e.currentTarget;
      switch(bet.dataset.wanfa_type){
        case "后三一码":
          this.minBet=1
          break
        case "后三二码":
          this.minBet=2
          break
        case "前三一码":
          this.minBet=1
          break
        case "前三二码":
          this.minBet=2
          break
        case "后五二码":
          this.minBet=2
          break
        case "后五三码":
          this.minBet=3
          break
        case "前五二码":
          this.minBet=2
          break
        case "前五三码":
          this.minBet=3
          break
        case "一码不定胆":
          this.minBet=1
          break
        case "二码不定胆":
          this.minBet=2
          break
        case "组三":
          this.minBet=2
          break
        case "组六":
          this.minBet=3
          break
        case "任选二":
          this.minBet=2
          break
        case "任选三":
          this.minBet=3
          break
        case "任选四":
          this.minBet=4
          break
        case "任选五":
          this.minBet=5
          break
        case "任选六":
          this.minBet=6
          break
        case "任选七":
          this.minBet=7
          break
        case "任选八":
          this.minBet=8
          break
        default:
      }
      this.common.budingBet(bet,this.addBet,this.betStr,this.minBet,this.$store.state.gameType.type)
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
    // 清空投注
    clearAll() {
      let bet = this.$refs.betPro;
      for (let i = 0; i < this.$refs.betPro.length; i++) {
        bet[i].classList.remove("betActive");
      }
    },
  },
  mounted() {
    this.$store.commit("betMsg",this.gameList)
    this.dataLength();
    Bus.$on("clearBet", () => {
      this.addBet = [];
      this.betStr={}
      this.clearAll();
    });
    if(this.firstMenu){
      this.$store.commit('wanfa',this.firstMenu.name)
    }else{
      this.$store.commit("wanfa",this.gameList.name)
    }
  },
};
</script>

<style lang="less" scoped>
.betMsgs {
  &>.betSelect {
    .hint {
      display: flex;
      padding: 12px;
      img {
        width: 15px;
        height: 15px;
        margin-right: 10px;
      }
      p {
        color: #333;
        font-size: 12px;
        line-height: 15px;
        span {
          color: #e54b55;
        }
      }
    }
    .selectPlay {
      .playList {
        margin-left: 10px;
        padding: 10px;
        display: flex;
        &>span {
          display: inline-block;
          width: 60px;
          height: 20px;
          border-radius: 2px;
          color: #666;
          font-size: 10px;
          background-color: #f5f5f5;
          text-align: center;
          line-height: 20px;
          margin: 10px 5px 0 0;
        }
        &>div{
            display: flex;
            flex-wrap: wrap;
            div {
                text-align: center;
                font-size: 14px;
                width: 35px;
                height: 35px;
                margin: 5px;
                line-height: 35px;
                border-radius: 50%;
                border: 1px solid #ddd;
                color: #e54b55;
            }
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
