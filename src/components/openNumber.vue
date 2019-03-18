<template>
  <div class="openRedult">
    <div class="issue" ref="issue">
      <div class="lotteryTime">
        <p>{{this.$store.state.choice_no}}期</p>
        <p>{{countDown | openTimeDown}}</p>
      </div>
      <div class="lotteryMsg" v-if="loading">
        <div @click="lottery_msg" class="pastLottery">
          <span>{{this.$store.state.choice_no-1}}期开奖号码</span>
          <i class="iconfont" ref="msg_tri">&#xe601;</i>
        </div>
        <div class="lotteryNum">
          <div class="ball" v-for="(item, index) in openResult" :key="index">
            <div
              :class="[{numBall:!isNaN(item)},{greenBall:index%2==0 && index==openResult.length-1 && color==2,redBallbac:index%2==0 && index==openResult.length-1 && color==1,blueBall:index%2==0 && index==openResult.length-1 && color==3,grayBall:index%2==0 && index==openResult.length-1 && color==4}]"
            >{{ item}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 往期开奖号码 -->
    <div class="alreadyLottery" v-if="this.lotteryMsg">
      <table>
        <tr>
          <th>期号</th>
          <th>开奖号码</th>
          <th>和值</th>
          <th>大小</th>
          <th>形态</th>
        </tr>
        <tr v-for="(item, index) in openNum.open_time" :key="index">
          <td>{{item.game_num}}</td>
          <td>
            <span  v-for="(item, index) in item.get_result" :key="index" :class="{redBall:item!='+'&&index<5 }">
              <template v-if="index<5">
                {{item}}
              </template>
            </span>
          </td>
          <td><span class="sumBall openball" :class="{redBallbac:item.color==1,greenBall:item.color==2,blueBall:item.color==3,grayBall:item.color==4}">{{item.get_result | openreshe}}</span></td>
          <td class="bigSamll"><span :class="[item.result_type.substr(0,1)=='大' || item.result_type.substr(0,1)=='双'?'dashuang':'xiaodan']">{{item.result_type.substr(0,1)}}</span></td>
          <td class="bigSamll"><span :class="[item.result_type.substr(2,1)=='大' || item.result_type.substr(2,1)=='双'?'dashuang':'xiaodan']">{{item.result_type.substr(2,1)}}</span></td>
        </tr>
      </table>
    </div>
    <!-- 遮罩层 -->
    <div class="shadeQihao" v-if="this.lotteryMsg" @click="cancel" @touchmove.prevent></div>
  </div>
</template>
<script>
import Bus from "../store/bus.js";
import animated from "../components/animated";
import open from "../mixins/openResult.js";

export default {
  components: {
    animated
  },
  mixins: [open],
  data() {
    return {
      res:'',
      openNum:'',
    };
  },
  filters: {
    filter(data) {
      if (data != "+" && data != "=") {
        if (data > 9) {
          return data;
        } else {
          return "0" + String(data);
        }
      } else {
        return data;
      }
    },
    openres(data){
        data = data.split("=")[0]
        return data;
    },
    openreshe(data){
        data = data.split("=")[1]
        return data;
    }
  },
  beforeCreate() {
    Bus.$on("gameType", data => {
      this.openTime(data.game_type);
    });
  },
  beforeDestroy() {
    Bus.$off();
  },
};
</script>

<style lang="less" scpoed>
.numBall {
  background-image: url(../assets/img/web/ic_ball_red.png);
  font-size: 14px;
  color: #fff;
  width: 23px;
  height: 23px;
  background-size: 100%;
  background-repeat: no-repeat;
}
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
.color {
  color: #333 !important;
  font-size: 14px !important;
  font-weight: 700;
  margin-left: 1px;
}
.openRedult {
  .issue {
    background-color: #fff;
    width: 100%;
    // position: fixed;
    position: relative;
    z-index: 100;
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
      p:nth-child(2) {
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
      .lotteryNum {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: auto;
        .ball {
          position: relative;
          width: 20px;
          img {
            width: 20px;
            vertical-align: -15px;
          }
          span {
            position: absolute;
            font-size: 11px;
            color: #fff;
            top: calc(50% - 11px);
            left: calc(50% - 7px);
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
    table {
      width: 100%;
      box-shadow: 0px 5px 10px 1px #999;
      tr {
        height: 35px;
        th {
          border-bottom: 1px solid #ddd;
          font-size: 12px;
          font-weight: 400;
          color: #888;
          line-height: 30px;
        }
        td{
          border-bottom: 1px solid #ddd;
          span{
            font-size: 12px;
            width: 0.5rem;
            height: 0.65rem;
            color: #fff;
            background-size:100% 100%;
            vertical-align:text-top;
            line-height: 0.5rem;
            background-repeat: no-repeat;
          }
        }
        .bigSamll{
          span{
            display: block;
            width: 0.5rem;
            height: 0.5rem;
            color: #fff;
            background-size: 15px 15px;
            border-radius: 3px;
            text-align: center;
            margin: 0 auto;
          }
        }
      }
    }
  }
}
.redBall {
  display: inline-block;
  background-image: url("../assets/img/web/ic_ball_red.png");
  color: #fff;
  background-repeat: no-repeat;
  background-size:100% 100%;
  text-align: center;
}
.dashuang{
  background: #F8B551;
}
.xiaodan{
  background: #3C97EB;
}
.sumBall{
  display: inline-block;
}
.greenBall {
  background-image: url(../assets/img/web/ic_ball_green.png) !important;
}
.redBallbac {
  background-image: url(../assets/img/web/ic_ball_red.png) !important;
}
.blueBall {
  background-image: url(../assets/img/web/ic_ball_blue.png) !important;
}
.grayBall {
  background-image: url(../assets/img/web/ic_ball_gray.png) !important;
}
</style>
