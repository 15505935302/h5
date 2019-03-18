<template>
  <div class="betMsg">
    <div class="betSelect">
      <div class="hint">
        <img src="../assets/img/web/提示.svg">
        <p>
          {{gameList.wanfa_dec || gameList.lists[0].wanfa_dec}}
          <i
            class="redcolor"
          >赔率：{{gameList.wanfa_odds || gameList.maxBili}}</i>
        </p>
      </div>
      <div class="selectPlay" :status="length">
        <div class="playList" v-for="(item, first) in gameList.lists" :key="first">
          <span>{{item.name}}</span>
          <div>
            <div
              v-for="(bili, second) in item.list"
              :key="second"
              @click="bet($event)"
              :data-bili_id="bili.id"
              :data-wanfa_id="item.wanfa_id  || gameList.wanfa_id"
              :data-wanfa_type="gameList.name"
              :data-bili_name="bili.bili_name"
              :data-numbers="bili.wanfa_name"
              :data-min_select="item.min_select"
              :data-index="first"
              ref="betPro"
            >{{bili.bili_name || bili.wanfa_name}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from "../store/bus.js";
export default {
  props: ["gameList", "firstMenu"],
  data() {
    return {
      // 添加投注数组
      betNo: [],
      // 投注数据数组
      betId: [],
      // 随机投注数组
      randomArr: [],
      // 组选投注数组
      numArr: [],
      // 组选投注对象
      zuxuanStr: {},
      length: 0,
      betStr: "",
      // 每个位数包含多少个数
      leng: 0,
      // 确定投注后重置数组状态
      reset: 0
    };
  },
  watch: {
    gameList(data) {
      this.$store.commit("betMsg", this.gameList);
      this.dataLength();
      this.betNo = [];
      this.betId = [];
      this.addArr();
    },
    reset(data) {
      this.dataLength();
      this.betNo = [];
      this.betId = [];
      this.addArr();
    },
    randomCount(data) {
      this.betNo = [];
      this.betId = [];
      for (let i = 0, len = this.gameList.lists.length; i < len; i++) {
        let nameArr = [];
        let idArr = [];
        this.betNo.push(nameArr);
        this.betId.push(idArr);
      }
      this.random(data);
    }
  },
  computed: {
    randomCount() {
      return this.$store.state.random;
    }
  },
  methods: {
    // 机选
    random(random) {
      let betEle = this.$refs.betPro;
      let tens = Math.floor(random[0] / this.$store.state.leng);
      if (
        this.$store.state.wanfa == "大小单双" ||
        this.$store.state.wanfa == "直选"
      ) {
        for (let i = 0; i < betEle.length; i++) {
          for (let j = 0; j < random.length; j++) {
            if (i === j * this.$store.state.leng + random[j]) {
              let bet = betEle[j * this.$store.state.leng + random[j]];
              bet.classList.add("betActive");
              this.betNo[j].push(bet.dataset.numbers);
              this.common.fucaiBet(bet, this.betNo, this.$store.state.wanfa);
            }
          }
        }
      } else if (this.$store.state.wanfa == "定位胆") {
        let bet = betEle[random[0]];
        bet.classList.add("betActive");
        this.betNo[tens].push(bet.dataset.numbers || bet.dataset.bili_name);
        this.common.fucaiBet(bet, this.betNo, this.$store.state.wanfa);
      } else if (
        this.$store.state.wanfa == "前二" ||
        this.$store.state.wanfa == "前三" ||
        this.$store.state.wanfa == "前一"
      ) {
        // 11选5
        if (this.$store.state.childWanfa == "直选") {
          for (let i = 0; i < random.length; i++) {
            let bet = betEle[i * this.$store.state.leng + random[i]];
            bet.classList.add("betActive");
            this.betNo[i].push(bet.dataset.numbers);
            this.common.fucaiBet(bet, this.betNo, this.$store.state.wanfa);
          }
        } else {
          this.numArr = [];
          for (let i = 0; i < random.length; i++) {
            let bet = betEle[random[i]];
            this.common.budingBet(
              bet,
              this.numArr,
              this.zuxuanStr,
              bet.dataset.min_select,
              this.$store.state.gameType.type
            );
          }
        }
      } else {
        for (let i = 0; i < betEle.length; i++) {
          for (let j = 0; j < random.length; j++) {
            if (i === j * this.$store.state.leng + random[j]) {
              let bet = betEle[random[j]];
              bet.classList.add("betActive");
              this.betNo[tens].push(bet.dataset.bili_name);
              this.betId[tens].push(bet.dataset.bili_id + "|");
              this.common.pk10bet(bet, this.betNo, this.betId);
            }
          }
        }
      }
    },
    // 投注
    bet(e) {
      let bet = e.currentTarget;
      if (
        bet.dataset.wanfa_type == "直选" ||
        bet.dataset.wanfa_type == "定位胆" ||
        bet.dataset.wanfa_type == "总和" ||
        bet.dataset.wanfa_type == "前三" ||
        bet.dataset.wanfa_type == "后三" ||
        bet.dataset.wanfa_type == "前二" ||
        bet.dataset.wanfa_type == "后二"
      ) {
        if (bet.className != "betActive") {
          bet.classList.add("betActive");
          this.betNo[bet.dataset.index].push(bet.dataset.numbers);
        } else {
          this.common.removeArr(
            this.betNo[bet.dataset.index],
            bet.dataset.numbers
          );
          bet.classList.remove("betActive");
        }
        this.common.fucaiBet(bet, this.betNo, this.$store.state.wanfa);
      } else if (bet.dataset.wanfa_type == "组选") {
        // 11选5组选
        this.common.budingBet(
          bet,
          this.numArr,
          this.zuxuanStr,
          bet.dataset.min_select,
          this.$store.state.gameType.type
        );
      } else {
        if (bet.className != "betActive") {
          this.betNo[bet.dataset.index].push(bet.dataset.bili_name);
          this.betId[bet.dataset.index].push(bet.dataset.bili_id + "|");
          bet.classList.add("betActive");
        } else {
          this.common.removeArr(
            this.betNo[bet.dataset.index],
            bet.dataset.bili_name
          );
          this.common.removeArr(
            this.betId[bet.dataset.index],
            bet.dataset.bili_id + "|"
          );
          bet.classList.remove("betActive");
        }
        this.common.pk10bet(bet, this.betNo, this.betId);
      }
    },
    dataLength() {
      this.length = 0;
      for (var i = 0, len = this.gameList.lists.length; i < len; i++) {
        for (
          var j = 0, leng = this.gameList.lists[i].list.length;
          j < leng;
          j++
        ) {
          this.length++;
        }
      }
      this.leng = j;
      this.$store.commit("numLength", this.length);
      this.$store.commit("leng", this.leng);
    },
    // 清空投注
    clearAll() {
      this.randomArr = [];
      let bet = this.$refs.betPro;
      for (let i = 0; i < this.$refs.betPro.length; i++) {
        bet[i].classList.remove("betActive");
      }
    },
    // 按位数进行对应数组添加
    addArr() {
      for (let i = 0, len = this.gameList.lists.length; i < len; i++) {
        let nameArr = [];
        let idArr = [];
        this.betNo.push(nameArr);
        this.betId.push(idArr);
      }
    }
  },
  mounted() {
    console.log(this.gameList);
    this.$store.commit("betMsg", this.gameList);
    this.dataLength();
    Bus.$on("clearBet", count => {
      this.reset = count;
      this.betNo = [];
      this.betId = [];
      this.clearAll();
    });
    this.addArr();
    if (this.firstMenu) {
      this.$store.commit("wanfa", this.firstMenu.name);
    } else {
      this.$store.commit("wanfa", this.gameList.name);
    }
  }
};
</script>

<style lang="less" scoped>
.betMsg {
  .betSelect {
    .selectPlay {
      height: 88%;
      overflow-y: scroll;
      .playList {
        margin-left: 10px;
        padding: 10px;
        display: flex;
        min-height: 40px;
        & > span {
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
        & > div {
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

.redcolor {
  color: #ee4549 !important;
  font-style: normal;
  margin-left: 5px;
}
</style>
