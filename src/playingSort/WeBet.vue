<template>
  <div class="weBet">
    <div class="tableHead">
      <span>彩种期号</span>
      <span>投注金额</span>
      <span>奖金</span>
      <span>操作</span>
    </div>
    <table>
      <template v-if="dragon">
        <tr v-for="(item, index) in betMsg.data" :key="index">
          <td>
            <span>{{item.game_type | wanfa}}</span>
            <p>{{item.choice_no}}</p>
          </td>
          <td>{{item.point}}</td>
          <td>
            <span style="color:#E54B55">{{item.get_point}}</span>
          </td>
          <td>
            <router-link :to="{name:'SingleDetails',params:{data:item}}">查看</router-link>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="(item, index) in betMsg" :key="index">
          <td>
            <span>{{item.base_wan_fa_name}}</span>
            <p>{{item.qihao}}</p>
          </td>
          <td>{{item.money}}</td>
          <td>
            <span :class="{gray:item.status==0,black:item.status==2,red:item.status==1}">
              <template v-if="item.status==1">{{item.bonus}}</template>
              <template v-else>{{item.result_status}}</template>
            </span>
          </td>
          <td>
            <router-link :to="{name:'SingleDetails',params:{data:item}}">查看</router-link>
          </td>
        </tr>
      </template>
    </table>
    <div v-if="bet" @click="more()" class="moretd">
      仅显示最近{{20}}条普通投注，
      <p>查看更多</p>
    </div>
    <div v-else class="moretd">暂无记录，请前往投注</div>
  </div>
</template>

<script>
export default {
  props: ["dragon"],
  data() {
    return {
      page_no: 1,
      page_size: 10,
      status_type: 0,
      betMsg: [],
      bet: true
    };
  },
  methods: {
    weRequest() {
      if (this.dragon) {
        this.$api.dragonchoicelog({ page_no: 1, page_size: 20 }).then(res => {
          this.betMsg = res.data.data;
          console.log(res);
          if (this.betMsg.length == 0) {
            this.bet = false;
          }
        });
      } else {
        this.$api
          .allBet({
            page_no: 1,
            page_size: 20,
            game_type: this.$store.state.gameType.game_type,
            status_type: 0
          })
          .then(res => {
            this.betMsg = res.data.data;
            console.log(res);
            if (this.betMsg.length == 0) {
              this.bet = false;
            }
          });
      }
    },
    more() {
      this.$router.push({
        path: "/betting"
      });
    }
  },
  filters: {
    wanfa(data) {
      let wanfaObj = {
        7: "江苏快三",
        3: "北京快三",
        30: "安徽快三",
        9: "新加坡28",
        1: "北京28",
        2: "加拿大28",
        4: "重庆时时彩",
        10: "天津时时彩",
        21: "东京1.5分彩",
        14: "分分彩",
        5: "北京赛车",
        6: "幸运飞艇",
        25: "11选5",
        11: "六合彩",
        13: "排列3",
        15: "排列5",
        12: "福彩3D"
      };
      return wanfaObj[data];
    }
  },
  mounted() {
    this.weRequest();
  }
};
</script>

<style scoped lang="less">
.gray {
  color: #888;
}
.black {
  color: #333;
}
.red {
  color: #e54b55;
}
.weBet {
  height: 87%;
  overflow-y: scroll;
  .tableHead {
    position: fixed;
    width: 100%;
    background-color: #eee;
    display: flex;
    justify-content: space-around;
    text-align: center;
    span {
      width: 25%;
      font-weight: 400;
      padding: 9px 0;
    }
  }
  table {
    margin-top: 37px;
    border-collapse: collapse;
    text-align: center;
    font-size: 12px;
    color: #333;
    width: 100%;
    tr {
      td {
        padding: 13px;
        width: 25%;
        border-bottom: 1px solid #ddd;
        a {
          color: #3c97eb;
        }
      }
    }
  }
}
.moretd {
  text-align: center;
  height: 20px;
  width: 100%;
  margin: 20px 0;
  p {
    display: inline;
    color: #3c97eb;
  }
}
</style>
