<template>
  <div class="liuQihao" v-if="loading">
    <div class="issue" ref="issue">
      <div class="lotteryTime">
        <p>{{this.$store.state.choice_no}}期</p>
        <p>{{countDown | openTimeDown}}</p>
      </div>
      <div class="lotteryMsg">
        <div @click="lottery_msg" class="pastLottery">
          <span>{{this.history.win_info.qihao}}期开奖号码</span>
          <i class="iconfont" ref="msg_tri">&#xe601;</i>
        </div>
        <div class="openNumberLHC">
          <div class="opNumber">
            <em
              :class="this.common.color(this.history.win_info.number1)"
            >{{this.history.win_info.number1}}</em>
            <span>{{this.history.win_info.number1_sx}}</span>
          </div>
          <div class="opNumber">
            <em
              :class="common.color(this.history.win_info.number2)"
            >{{this.history.win_info.number2}}</em>
            <span>{{this.history.win_info.number2_sx}}</span>
          </div>
          <div class="opNumber">
            <em
              :class="common.color(this.history.win_info.number3)"
            >{{this.history.win_info.number3}}</em>
            <span>{{this.history.win_info.number3_sx}}</span>
          </div>
          <div class="opNumber">
            <em
              :class="common.color(this.history.win_info.number4)"
            >{{this.history.win_info.number4}}</em>
            <span>{{this.history.win_info.number4_sx}}</span>
          </div>
          <div class="opNumber">
            <em
              :class="common.color(this.history.win_info.number5)"
            >{{this.history.win_info.number5}}</em>
            <span>{{this.history.win_info.number5_sx}}</span>
          </div>
          <div class="opNumber">
            <em
              :class="common.color(this.history.win_info.number6)"
            >{{this.history.win_info.number6}}</em>
            <span>{{this.history.win_info.number6_sx}}</span>
          </div>
          <div class="opNumber">
            <i>+</i>
            <span></span>
          </div>
          <div class="opNumber">
            <em
              :class="common.color(this.history.win_info.number7)"
            >{{this.history.win_info.number7}}</em>
            <span>{{this.history.win_info.number7_sx}}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 往期开奖号码 -->
    <div class="alreadyLottery" v-if="this.lotteryMsg">
      <!-- 六合彩 -->
      <table>
        <tr class="tableHead">
          <th>期号</th>
          <th>开奖号码</th>
          <th>开奖日期</th>
        </tr>
        <tr class="headNull">
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr v-for="(item, index) in liuhehistory" :key="index">
          <td>{{item.qihao}}</td>
          <td>
            <span class="lhc-box">
              <div class="openBox">
                <em class="lhc-num" :class="common.color(item.number1)">{{item.number1}}</em>
                <span>{{item.number1_sx}}</span>
              </div>
              <div class="openBox">
                <em class="lhc-num" :class="common.color(item.number2)">{{item.number2}}</em>
                <span>{{item.number2_sx}}</span>
              </div>
              <div class="openBox">
                <em class="lhc-num" :class="common.color(item.number3)">{{item.number3}}</em>
                <span>{{item.number3_sx}}</span>
              </div>
              <div class="openBox">
                <em class="lhc-num" :class="common.color(item.number4)">{{item.number4}}</em>
                <span>{{item.number4_sx}}</span>
              </div>
              <div class="openBox">
                <em class="lhc-num" :class="common.color(item.number5)">{{item.number5}}</em>
                <span>{{item.number5_sx}}</span>
              </div>
              <div class="openBox">
                <em class="lhc-num" :class="common.color(item.number6)">{{item.number6}}</em>
                <span>{{item.number6_sx}}</span>
              </div>
              <div class="openBox">
                <i>+</i>
                <span></span>
              </div>
              <div class="openBox">
                <em class="lhc-num" :class="common.color(item.number7)">{{item.number7}}</em>
                <span>{{item.number7_sx}}</span>
              </div>
            </span>
          </td>
          <td>{{item.create_time | timeFilter}}<p>{{item.create_time | getLocalTime}}</p></td>
        </tr>
      </table>
    </div>
    <!-- 遮罩层 -->
    <div class="shadeQihao" v-if="lotteryMsg" @click="cancel" @touchmove.prevent></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lotteryMsg: false,
      history: {},
      liuhehistory: {},
      countDown:0,
      loading:false,
      result:false,
      // 数字滚动定时器
      numRoll:null,
      // 倒计时结束请求开奖呢结果
      requestOpen:true,
      // 请求倒计时延时器
      outTime:null,
      // 倒计时请求完成
      timeDone:false,
      p:49,
    };
  },
  watch: {
    timeDone(){
      this.countDownTime()
    },
    requestOpen(data){
      if(data){
         clearInterval(this.numRoll);
      }else{
        this.inTheLottery(this.p)
      }
    }
  },
  methods: {
    inTheLottery(p) {
      this.numRoll = setInterval(
        function(p) {
          for (let i = 0; i < this.openResult.length; i++) {
            if (this.openResult[i] < p) {
              let newNum = (this.openResult[i] += 1);
              this.$set(this.openResult, i, newNum);
            } else {
              this.$set(this.openResult, i, 0);
            }
          }
        }.bind(this),
        150
      );
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.numRoll);
      })
    },
    // 上一期开奖结果和当前期开奖时间
    open_time() {
      this.$api.openliuhe({ wanfa_type: this.$store.state.gameType.game_type }).then(res => {
        this.history = res.data.data;
        this.countDown = res.data.data.second;
        this.$store.commit("choice_no", res.data.data.qihao);
        this.loading=true
        this.timeDone=true
      });
    },
    openlishi() {
      this.$api.openlishi({ page: 1, pageSize: 20 }).then(res => {
        this.liuhehistory = res.data.data;
        console.log(this.liuhehistory)
      });
    },
    // 倒计时结束请求下期开奖倒计时
    openDownTime(){
      this.$api.openliuhe({ wanfa_type: data }).then(res => {
        if(res.data.data.second==0){
          this.outTime=setTimeout(()=>{
            this.openDownTime()
          },1000)
        }else{
          this.history = res.data.data;
          this.countDown = res.data.data.second;
          this.$store.commit("choice_no", res.data.data.qihao);
          this.loading=true
        }
      });
    },
    // 倒计时结束请求开奖结果
    requestResult(){
      this.$api.openliuhe({ wanfa_type: data }).then(res => {
        this.history = res.data.data;
        this.countDown = res.data.data.second;
        this.$store.commit("choice_no", res.data.data.qihao);
        if(res.data.data.qihao-1==res.data.data.win_info.qihao){
          this.history = res.data.data;
          this.openlishi()
          this.requestOpen=true
        }else{
          this.openDown=setTimeout(()=>{
            this.requestResult()
          },5000)
        }
        this.$once('hook:beforeDestroy', () => {
            clearTimeout(this.openDown);
        })
      });
    },
    //   点击查看往期开奖
    lottery_msg() {
      if (this.lotteryMsg) {
        this.$refs.msg_tri.style.transform = "rotate(0deg)";
        this.lotteryMsg = false;
        document.body.style.overflow ="scroll";
      } else {
        this.$refs.msg_tri.style.transform = "rotate(180deg)";
        this.lotteryMsg = true;
        document.body.style.overflow="hidden"
      }
    },
    // 倒计时
    countDownTime() {
      if (this.countDown > 0) {
        this.countDown--;
      } else {
        this.countDown = 0;
        this.requestOpen = false;
        this.openDownTime();
        this.requestResult()
      }
      this.time = setTimeout(() => {
        this.countDownTime();
      }, 1000);
      this.$once("hook:beforeDestroy", () => {
        clearTimeout(this.time);
      });
    },
    // 点击遮罩层
    cancel() {
      this.lotteryMsg = false;
      this.$refs.msg_tri.style.transform = "rotate(0deg)";
      document.body.style.overflow ="scroll";
    }
  },
  filters: {
    // 时间过滤
    getLocalTime(Timestamp) {
      function add0(m) {
        return m < 10 ? "0" + m : m;
      }
      var time = new Date(Timestamp*1000);
      var h = time.getHours();
      var mm = time.getMinutes();
      return add0(h) + ":" + add0(mm)
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
    },
    timeFilter(timestamp){
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = (date.getDate()+1 < 10 ? '0'+(date.getDate()+1) : date.getDate()+1);      
      return Y+M+D;
    }
  },
  created() {
    this.open_time();
    this.openlishi();
  },
};
</script>

<style lang="less">
i {
  font-style: inherit;
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
.openNumberLHC {
  // margin-top: 0.2em;
  line-height: 15px;
}
.openAnimal,
.openNumberLHC,
.waitNumberKL8,
.waitNumberLHC {
  text-align: center;
}
.openNumberLHC .opNumber {
  text-align: center;
  display: inline-block;
  position: relative;
}
.openNumberLHC em {
  font-size: 8px;
  color: #fff;
  width: 16px;
  height: 16px;
  line-height: 15px;
  border-radius: 50%;
  background: #dc3b40;
  margin: 0 1px;
  font-style: inherit;
  position: relative;
}
.openAnimal em,
.openNumberLHC em,
.waitNumberKL8 em,
.waitNumberLHC em {
  display: inline-block;
  vertical-align: top;
  text-align: center;
}
.openNumberLHC .opNumber span {
  font-size: 10px;
  color: #333333;
  width: 16px;
  height: 16px;
  line-height: 15px;
  font-style: inherit;
  position: absolute;
  left: 0;
}
// 遮罩层
.shadeQihao {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  top: 0;
  left: 0;
  z-index: 90;
}
.liuQihao {
  .issue {
    background-color: #fff;
    width: 100%;
    position: relative;
    z-index: 95;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    text-align: center;
    .lotteryTime {
      box-sizing: border-box;
      width: 50%;
      padding: 16px;
      color: #888;
      flex-grow: 1;
      p:nth-child(2) {
        color: #e54b55;
        font-size: 17px;
      }
    }
    .lotteryMsg {
      border-left: 1px solid #ddd;
      padding: 12px 12px 30px 12px;
      flex-grow: 1;
      box-sizing: border-box;
      width: 50%;
      height: 100%;
      .pastLottery {
        height: 20px;
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
    }
  }
  .alreadyLottery {
    position: absolute;
    text-align: center;
    z-index: 101;
    width: 100%;
    background-color: #fff;
    height: 490px;
    overflow-y: scroll;
    box-shadow: 0px 5px 10px 1px #999;
    table {
      position: relative;
      width: 100%;
      .tableHead{
        width: 100%;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        position: fixed;
        border-bottom: 1px solid #ddd;
        background-color: #fff;
        height: 30px;
        z-index: 1;
        margin-top: -2px;
        th {
          font-size: 12px;
          font-weight: 400;
          color: #888;
          line-height: 30px;
        }
      }
      tr {
        height: 30px;
        td {
          span {
            font-size: 12px;
            display: inline-block;
            text-align: center;
            position: relative;
            vertical-align: middle;
            width: 80%;
            margin: 0 10%;
          }
          .openBox {
            float: left;
            text-align: center;
            width: 12.5%;
            padding: 0 3px;
            box-sizing: border-box;
          }
          .item > span .lhc-num {
            color: #fff;
          }
          .item > span em {
            display: inline-block;
            width: 10%;
            text-align: center;
            color: #ea0808;
          }
          .openBox em {
            font-size: 1em;
            color: #fff;
            width: 20px;
            height: 20px;
            display: inline-block;
            line-height: 20px;
            border-radius: 50%;
          }
          .openBox span {
            color: #107dab;
            display: block;
          }
          em {
            font-style: inherit;
          }
          i {
            font-style: inherit;
          }
        }
      }
    }
  }
}
</style>
