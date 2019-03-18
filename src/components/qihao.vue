<template>
  <div class="issue" v-if="loading">
    <div class="lotteryQihao">
      <div class="qihao">
        <div class="lotteryTime">
          <p>{{this.$store.state.choice_no}}期</p>
          <p class="countDown">{{countDown | openTimeDown}}</p>
        </div>
        <div class="lotteryMsg">
          <div @click.stop="lottery_msg" class="pastLottery">
            <span>
              {{this.common.timeQihao(this.$store.state.choice_no,this.$store.state.gameType.remarks)}}
              期开奖号码
            </span>
            <i class="iconfont" ref="msg_tri">&#xe601;</i>
          </div>
          <div class="lotteryNum">
            <template
              v-if="this.$store.state.gameType.game_type == 7 ||this.$store.state.gameType.game_type == 30 ||this.$store.state.gameType.game_type == 3"
            >
              <div class="ball" v-for="(item, index) in openResult" :key="index">
                <img :src="imgUrl(item)" :class="{small_size:openResult.length>6}">
              </div>
            </template>
            <div v-else class="ball" v-for="(item, index) in openResult" :key="index">
              <animated :value="item" :class="{small_size:openResult.length>6}"></animated>
            </div>
          </div>
        </div>
      </div>
      <!-- 往期开奖号码 -->
      <div class="alreadyLottery" v-if="this.lotteryMsg">
        <table>
          <tr class="tableHead">
            <th>期号</th>
            <th>开奖号码</th>
            <th
              v-if="this.$store.state.gameType.game_type == 7 ||this.$store.state.gameType.game_type == 30 ||this.$store.state.gameType.game_type == 3"
            >和值</th>
            <th v-else>开奖时间</th>
            <th
              v-if="this.$store.state.gameType.game_type == 7 ||this.$store.state.gameType.game_type == 30 ||this.$store.state.gameType.game_type == 3"
            >大小</th>
            <th
              v-if="this.$store.state.gameType.game_type == 7 ||this.$store.state.gameType.game_type == 30 ||this.$store.state.gameType.game_type == 3"
            >形态</th>
          </tr>
          <tr class="headNull">
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <template v-if="openNum.open_time">
            <tr v-for="(item, index) in this.openNum.open_time" :key="index">
              <td>{{item.game_num}}</td>
              <td>
                <template
                  v-if="$store.state.gameType.game_type == 7 ||$store.state.gameType.game_type == 30 ||$store.state.gameType.game_type == 3"
                >
                  <span v-for="(id, index) in item.my_result" :key="index" class="redmargin">
                    <img :src="imgUrl(id)" alt>
                  </span>
                </template>
                <template v-else>
                  <span v-for="(id, index) in item.my_result" :key="index" class="redball">{{id}}</span>
                </template>
              </td>
              <td
                v-if="$store.state.gameType.game_type == 7 ||$store.state.gameType.game_type == 30 ||$store.state.gameType.game_type == 3"
              >{{item.game_result}}</td>
              <td v-else>{{item.open_time | getLocalTime}}</td>
              <td
                v-if="$store.state.gameType.game_type == 7 ||$store.state.gameType.game_type == 30 ||$store.state.gameType.game_type == 3"
              >
                <span
                  :class="[item.game_result_desc[0]=='大' || item.game_result_desc[0]=='双'?'dashuang':'xiaodan']"
                >{{item.game_result_desc[0]}}</span>
              </td>
              <td
                v-if="$store.state.gameType.game_type == 7 ||$store.state.gameType.game_type == 30 ||$store.state.gameType.game_type == 3"
              >
                <span
                  :class="[item.game_result_desc[2]=='大' || item.game_result_desc[2]=='双'?'dashuang':'xiaodan']"
                >{{item.game_result_desc[2]}}</span>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr v-for="(item, index) in this.elseOpenEnd" :key="index">
              <td>{{item.qihao}}</td>
              <td>
                <span v-for="(id, index) in item.numbers" :key="index" class="redball">
                  <template>{{id}}</template>
                </span>
              </td>
              <td>{{item.create_time | getLocalTime}}</td>
            </tr>
          </template>
        </table>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="qihaoshade" v-if="this.lotteryMsg" @click="cancel" @touchmove.prevent></div>
  </div>
</template>
 
<script>
import animated from "../components/animated";
import Bus from "../store/bus.js";
export default {
  components: {
    animated
  },
  data() {
    return {
      lotteryMsg: false,
      // 开奖结果
      openResult: [],
      openNum: [],
      // 分分彩开奖结果
      elseOpenEnd: [],
      loading: false,
      // 开奖倒计时
      countDown: 0,
      // 倒计时函数
      time: null,
      // 倒计时结束请求开奖结果延时器
      openDown: null,
      // 请求到开奖结果状态
      result: false,
      // 数字滚动定时器
      numRoll: null,
      // 倒计时结束请求开奖呢结果
      requestOpen: true,
      // 请求倒计时延时器
      outTime: null,
      // 倒计时请求完成
      timeDone: false
    };
  },
  watch: {
    timeDone() {
      this.countDownTime();
    },
    requestOpen(data) {
      if (data) {
        clearInterval(this.numRoll);
      } else {
        this.inTheLottery(this.p);
      }
    }
  },
  methods: {
    // 开奖号码图片
    imgUrl(id) {
      return "../../static/img/the_dice_" + id + ".png";
    },
    inTheLottery(p) {
      if (
        this.$store.state.gameType.game_type == 30 ||
        this.$store.state.gameType.game_type == 7 ||
        this.$store.state.gameType.game_type == 3
      ) {
        this.numRoll = setInterval(
          function(p) {
            for (let i = 0; i < this.openResult.length; i++) {
              if (this.openResult[i] < 6 && this.openResult[i] > 0) {
                let newNum = (this.openResult[i] += 1);
                this.$set(this.openResult, i, newNum);
              } else {
                this.$set(this.openResult, i, 1);
              }
            }
          }.bind(this),
          150
        );
      } else {
        this.numRoll = setInterval(
          function(p) {
            for (let i = 0; i < this.openResult.length; i++) {
              if (this.openResult[i] < 9) {
                let newNum = (this.openResult[i] += 1);
                this.$set(this.openResult, i, newNum);
              } else {
                this.$set(this.openResult, i, 0);
              }
            }
          }.bind(this),
          150
        );
      }
      this.$once("hook:beforeDestroy", () => {
        clearInterval(this.numRoll);
      });
    },
    cancel() {
      this.lotteryMsg = false;
      this.$refs.msg_tri.style.transform = "rotate(0deg)";
      document.body.style.overflow = "scroll";
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
    // 页面初始化请求开奖结果
    openTime() {
      let _this = this;
      if (this.$store.state.gameType.type == 0) {
        this.$api
          .getLotteryInfo({ baseWanFaID: this.$store.state.gameType.id })
          .then(res => {
            if (res.data.result_code == 0) {
              let str = res.data.data.win_info.numbers;
              this.countDown = res.data.data.second;
              this.$store.commit("choice_no", res.data.data.qihao);
              this.numWith(str);
              let beforeQihao = this.common.timeQihao(
                res.data.data.qihao,
                this.$store.state.gameType.remarks,
                this.$store.state.gameType.game_type
              );
              this.loading = true;
              this.timeDone = true;
              if (res.data.data.win_info.qihao != beforeQihao) {
                this.requestOpen = false;
                this.requestResult();
              }
            } else {
              this.confirm({
                title: "提示",
                content: res.data.result_desc,
                confirmText: "确定",
                cancelText: "取消",
                showCancelButton: false,
                onConfirm: () => {
                  _this.$router.push({
                    path: "/"
                  });
                }
              });
            }
          });
      } else {
        this.$api
          .open({ game_type: this.$store.state.gameType.game_type })
          .then(res => {
            if (res.data.result_code == 0) {
              this.openNum = res.data.data;
              let str = this.openNum.first_result.my_result;
              this.countDown = res.data.data.seconds;
              this.numWith(str);
              for (
                let i = 0, len = this.openNum.open_time.length;
                i < len;
                i++
              ) {
                this.openNum.open_time[i].my_result = this.openNum.open_time[
                  i
                ].my_result.split(",");
              }
              let beforeQihao = this.common.timeQihao(
                res.data.data.game_num,
                this.$store.state.gameType.remarks
              );
              this.loading = true;
              this.timeDone = true;
              this.$store.commit("choice_no", res.data.data.game_num);
              if (res.data.data.first_result.game_num != beforeQihao) {
                this.requestOpen = false;
                this.requestResultRoom();
              }
            } else {
              this.confirm({
                title: "提示",
                content: res.data.result_desc,
                confirmText: "确定",
                cancelText: "取消",
                showCancelButton: false,
                onConfirm: () => {
                  _this.$router.push({
                    path: "/"
                  });
                }
              });
            }
          });
      }
    },
    // 倒计时结束请求下期倒计时
    openDownTime() {
      if (this.$store.state.gameType.type == 0) {
        this.$api
          .getLotteryInfo({ baseWanFaID: this.$store.state.gameType.id })
          .then(res => {
            this.$store.commit("choice_no", res.data.data.qihao);
            if (res.data.data.seconds == 0) {
              this.outTime = setTimeout(() => {
                this.openDownTime();
              }, 1000);
            }
            this.countDown = res.data.data.second;
          });
      } else {
        this.$api
          .open({ game_type: this.$store.state.gameType.game_type })
          .then(res => {
            this.$store.commit("choice_no", res.data.data.game_num);
            if (res.data.data.seconds == 0) {
              this.outTime = setTimeout(() => {
                this.openDownTime();
              }, 1000);
            }
            this.countDown = res.data.data.seconds;
          });
      }
    },
    // 倒计时结束请求开奖结果(直投)
    requestResult() {
      this.$api
        .getLotteryInfo({ baseWanFaID: this.$store.state.gameType.id })
        .then(res => {
          let beforeQihao = this.common.timeQihao(
            res.data.data.qihao,
            this.$store.state.gameType.remarks,
            this.$store.state.gameType.game_type
          );
          if (res.data.data.win_info.qihao == beforeQihao) {
            let str = res.data.data.win_info.numbers;
            this.numWith(str);
            clearTimeout(this.openDown);
            this.openEnd();
            this.requestOpen = true;
          } else {
            this.openDown = setTimeout(() => {
              this.requestResult();
            }, 5000);
          }
          this.$once("hook:beforeDestroy", () => {
            clearTimeout(this.openDown);
          });
        });
    },
    // 倒计时结束请求开奖结果(房间)
    requestResultRoom() {
      this.$api
        .open({ game_type: this.$store.state.gameType.game_type })
        .then(res => {
          let beforeQihao = this.common.timeQihao(
            res.data.data.game_num,
            this.$store.state.gameType.remarks
          );
          if (res.data.data.first_result.game_num == beforeQihao) {
            this.openNum = res.data.data;
            let str = res.data.data.first_result.my_result;
            this.numWith(str);
            for (let i = 0, len = this.openNum.open_time.length; i < len; i++) {
              this.openNum.open_time[i].my_result = this.openNum.open_time[
                i
              ].my_result.split(",");
            }
            clearTimeout(this.requestResultRoom);
            this.openEnd();
            this.requestOpen = true;
          } else {
            this.openDown = setTimeout(() => {
              this.requestResultRoom();
            }, 5000);
          }
        });
    },
    // 倒计时
    countDownTime() {
      if (this.countDown > 0) {
        this.countDown--;
      } else {
        this.countDown = 0;
        this.requestOpen = false;
        this.openDownTime();
        if (this.$store.state.gameType.type == 0) {
          this.requestResult();
        } else {
          this.requestResultRoom();
        }
      }
      this.time = setTimeout(() => {
        this.countDownTime();
      }, 1000);
      this.$once("hook:beforeDestroy", () => {
        clearTimeout(this.time);
      });
    },
    // 历史开奖结果
    openEnd() {
      this.$api
        .kjLog({ baseWanFaID: this.$store.state.gameType.id, page: 5 })
        .then(res => {
          this.elseOpenEnd = res.data.data;
          for (let i = 0, len = this.elseOpenEnd.length; i < len; i++) {
            this.elseOpenEnd[i].numbers = this.elseOpenEnd[i].numbers.split(
              ","
            );
          }
        });
    },
    // 开奖结果字符串处理
    numWith(str) {
      this.openResult = str.split(",");
      this.openResult = this.openResult.map(Number);
    }
  },
  filters: {
    // 时间过滤
    getLocalTime(Timestamp) {
      function add0(m) {
        return m < 10 ? "0" + m : m;
      }
      var time = new Date(Timestamp);
      var h = time.getHours();
      var mm = time.getMinutes();
      var s = time.getSeconds();
      return add0(h) + ":" + add0(mm) + ":" + add0(s);
    },
    // 开奖倒计时过滤
    openTimeDown(result) {
      var h =
        Math.floor(result / 3600) < 10
          ? "0" + Math.floor(result / 3600)
          : Math.floor(result / 3600);
      var m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      var s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);
      return (result = h + ":" + m + ":" + s);
    }
  },
  created() {
    if (
      this.$store.state.gameType.game_type == 7 ||
      this.$store.state.gameType.game_type == 30 ||
      this.$store.state.gameType.game_type == 3
    ) {
      this.p = 6;
    }
    this.openEnd();
    this.openTime();
  }
};
</script>
 
<style lang="less" scoped>
.qihaoshade {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  top: 0;
  left: 0;
  z-index: 90;
}
.small_size {
  font-size: 10px !important;
  top: calc(50% - 6px) !important;
  left: calc(50% - 5.5px) !important;
  width: 16px !important;
}
.issue {
  .lotteryQihao {
    position: relative;
    width: 100%;
    z-index: 98;
    .qihao {
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      align-items: center;
      border-bottom: 1px solid #ddd;
      border-top: 1px solid #ddd;
      text-align: center;
      .lotteryTime {
        box-sizing: border-box;
        width: 50%;
        padding: 10px;
        color: #888;
        flex-grow: 1;
        font-size: 12px;
        .countDown {
          color: #e54b55;
          font-size: 17px;
        }
      }
      .lotteryMsg {
        border-left: 1px solid #ddd;
        padding: 10px;
        flex-grow: 1;
        box-sizing: border-box;
        width: 50%;
        .pastLottery {
          font-size: 12px;
          color: #888;
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 0 5px;
          box-sizing: border-box;
          i {
            display: inline-block;
            font-size: 8px;
            transition: all 300ms;
          }
        }
        .lotteryNum {
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin: auto;
          .ball {
            position: relative;
            margin: 1.5px;
            img {
              width: 23px;
              vertical-align: -15px;
            }
            span {
              position: absolute;
              font-size: 14px;
              color: #fff;
              top: calc(50% - 15px);
              left: calc(50% - 4px);
            }
          }
        }
      }
    }
  }
  .alreadyLottery {
    position: fixed;
    text-align: center;
    z-index: 100;
    width: 100%;
    background-color: #fff;
    height: 398px;
    overflow-y: scroll;
    table {
      width: 100%;
      .tableHead {
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 0 25px 0 30px;
        position: fixed;
        border-bottom: 1px solid #ddd;
        background-color: #fff;
        height: 30px;
        z-index: 1;
        margin-top: -1.5px;
        th {
          // padding: 0 10px;
          font-size: 12px;
          font-weight: 400;
          color: #888;
          line-height: 30px;
          &:nth-child(2){
            padding-left: 60px;
          }
        }
      }
      .headNull {
        height: 27px !important;
      }
      tr {
        height: 35px;
        padding: 0 10px;
        td {
          padding: 0 10px;
          border-bottom: 1px solid #ddd;
          span {
            text-align: center;
          }
          .redball {
            display: inline-block;
            background-image: url("../assets/img/web/ic_ball_red.png");
            font-size: 12px;
            color: #fff;
            width: 20px;
            height: 25px;
            line-height: 20px;
            background-repeat: no-repeat;
            background-size: 100% 100%;
            text-align: center;
          }
          .redmargin {
            margin: 0 10px !important;
          }
        }
      }
    }
  }
}
.dashuang {
  display: block;
  width: 15px;
  height: 15px;
  color: #fff;
  background: #f8b551;
  background-size: 15px 15px;
  border-radius: 3px;
  text-align: center;
  line-height: 15px;
}
.xiaodan {
  display: block;
  width: 15px;
  height: 15px;
  border-radius: 3px;
  color: #fff;
  background: #3c97eb;
  background-size: 15px 15px;
  text-align: center;
  line-height: 15px;
}
</style>