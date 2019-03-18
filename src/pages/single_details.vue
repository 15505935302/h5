<template>
  <div class="singleDetails">
    <Head>
      <span slot="pageName">注单详情</span>
      <span slot="right" class="right">&#x3000;&nbsp;
        <!-- <span @click="backout(betMsg)">撤单</span> -->
        <span v-if="betMsg.result_status!=='中奖'" @click="backout(betMsg)">撤单</span>
        <span v-else @click="giveRed">发炫耀红包</span>
      </span>
    </Head>
    <template v-if="betMsg.choice_no">
      <div class="qihao">
        <img :src="common.img(betMsg.game_type)" alt>
        <div class="nameTime">
          <div>
            <span>{{betMsg.game_type | wanfa}}</span>
            <p>第{{betMsg.choice_no}}期</p>
          </div>
          <div>
            <span>￥ {{betMsg.point}}</span>
            <p class="betTime">{{betMsg.create_time | getLocalTime}}</p>
          </div>
        </div>
      </div>
      <div class="bonus">
        <div>
          <span>派送奖金</span>&#x3000;&nbsp;
          <span  class="red">
            <template v-if="betMsg.get_point">
              ￥{{betMsg.get_point}}元
            </template>
            <template v-else>
              ￥0.00元
            </template>
          </span>
        </div>
        <div>
          <span>开奖号码</span>&#x3000;&nbsp;
          <span v-if="betMsg.get_result">{{betMsg.get_result}}</span>
          <span v-else>--</span>
        </div>
      </div>
      <div class="oddNumber">
        <span>投注单号</span>&#x3000;&nbsp;
        <span>{{betMsg.order_no}}</span>
        <span class="copy" :data-clipboard-text="betMsg.order_no" @click="copy">复制</span>
      </div>
      <ul>
        <li>投注明细</li>
        <li>
          <div>
            <span>{{betMsg.dragon_bet}}</span>&#x3000;
            <span>￥{{betMsg.point}}</span>
            <p>{{betMsg.result_type}}</p>
          </div>
          <div v-if="betMsg.is_zhong==1">
            <span>￥{{betMsg.get_point}}</span>
          </div>
          <div v-else-if="betMsg.is_zhong==0">
            <span  class="black">未中奖</span>
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <div class="qihao">
        <img v-if="betMsg.imgid" :src="imgurl(betMsg.imgid)" alt>
        <img v-else :src="common.img(betMsg.game_type)" alt>
        <div class="nameTime">
          <div>
            <span v-if="betMsg.lottery_name">{{betMsg.lottery_name}}</span>
            <span v-else>{{betMsg.base_wan_fa_name}}</span>
            <p v-if="betMsg.start_issue">第{{betMsg.start_issue}}期</p>
            <p v-else>第{{betMsg.qihao}}期</p>
          </div>
          <div>
            <span>
                ￥{{betMsg.total_bet_money || betMsg.money}}元                
            </span>
            <p class="betTime">{{betMsg.create_time}}</p>
          </div>
        </div>
      </div>
      <div class="oddNumber">
        <span>投注单号</span>&#x3000;&nbsp;
        <span>{{betMsg.order_no}}</span>
        <span class="copy" :data-clipboard-text="betMsg.order_no" @click="copy">复制</span>
      </div>
      <div v-if="betMsg.issue_list"  class="oddNumber">
        <span>追号方案</span>&#x3000;&nbsp;
        <span>{{betMsg.chasing_log_bet_content_list[0].bet_content}}({{betMsg.chasing_log_bet_content_list[0].wanfa_name}})</span>
      </div>
      <div v-else  class="oddNumber">
        <span>开奖号码</span>&#x3000;&nbsp;
        <span v-if="betMsg.kaijiang_num">{{betMsg.kaijiang_num}}</span>
        <span v-else-if="betMsg.kaijiang_num">{{betMsg.kaijiang_num}}</span>
        <span v-else>--</span>
      </div>
      <div v-if="betMsg.imgid" class="oddNumber">
        <span>追号进度</span>&#x3000;&nbsp;
        <span>已{{betMsg.already_pursued}}追期/总{{betMsg.total_issue}}期</span>
      </div>
      <div v-if="betMsg.imgid" class="oddNumber">
        <span>追号金额</span>&#x3000;&nbsp;
        <span>￥{{betMsg.total_bet_money}}</span>
      </div>
      <div  class="oddNumber">
        <span>派送奖金</span>&#x3000;&nbsp;
        <span class="red">
          <template v-if="betMsg.bonus || betMsg.total_win_money">
            ￥{{betMsg.total_win_money || betMsg.bonus}}元
          </template>
          <template v-else>
            ￥0.00元
          </template>
        </span>
      </div>
      <div v-if="betMsg.imgid" class="oddNumber">
        <span>中奖即停</span>&#x3000;&nbsp;
        <span v-if="betMsg.zjjt==1">是</span>
        <span v-else>否</span>
      </div>
      <ul>
        <template v-if="betMsg.issue_list">
          <li>追号明细</li>
          <li v-for="(item, index) in betMsg.issue_list" :key="index">
            <div>
              <span>{{item.open_number}}</span>&#x3000;
              <span>￥{{item.bet_money}}</span>
              <p>{{item.chasing_log_bet_content_list[0].wanfa_name}}</p>
            </div>
            <div v-if="item.status==0">
              <span class="gray">等待开奖</span>
            </div>
            <div v-else-if="item.status==1">
              <span>￥{{item.win_money}}</span>
            </div>
            <div v-else-if="item.status==2">
              <span class="black">未中奖</span>
            </div>
            <div v-else-if="item.status==3">
              <span>取消</span>
            </div>
            <div v-else-if="item.status==4">
              <span>失败</span>
            </div>
            <div v-else-if="item.status==5">
              <span class="gray">追号停止</span>
            </div>
          </li>
        </template>
        <template v-else>
          <li>投注明细</li>
          <li v-for="(item, index) in betMsg.bet_list" :key="index">
            <div>
              <span>{{item.bet_content}}</span>&#x3000;
              <span>￥{{item.bet_money}}</span>
              <p>{{item.wanfa_name}}</p>
            </div>
            <div v-if="item.status==0">
              <span class="gray">等待开奖</span>
            </div>
            <div v-else-if="item.status==1">
              <span>￥{{item.win_money}}</span>
            </div>
            <div v-else-if="item.status==2">
              <span class="black">未中奖</span>
            </div>
            <div v-else-if="item.status==3">
              <span>取消</span>
            </div>
            <div v-else-if="item.status==4">
              <span>失败</span>
            </div>
          </li>
        </template>
      </ul>
    </template>
  </div>
</template>

<script>
import Head from "../components/header";
import Clipboard from "clipboard";
export default {
  components: {
    Head
  },
  data() {
    return {
      betMsg: {}
    };
  },
  methods: {
    // 发炫耀红包
    giveRed(){
      this.$store.commit('winMsg',this.betMsg)
      this.$router.push({
        name:"互动大厅",
        params:this.betMsg
      })
    },
    // 撤单
    backout(betMsg){
      let obj={
        game_type:betMsg.game_type,
        order_no:betMsg.order_no
      }
      this.$api.backout(obj).then((res)=>{
        if(res.data.result_code==0){
          this.showToast("text","撤单成功")
          for(let i =0,len=this.betMsg.bet_list.length;i<len;i++){
            this.betMsg.bet_list[i].status = 3
          }
        }else{
          this.showToast("text",res.data.result_desc)
        }
      })
    },
    imgurl(id) {
      if (id > 9) {
        return "../../static/img/tb-" + id + ".png";
      } else {
        return "../../static/img/tb-0" + id + ".png";
      }
    },
    // 复制邀请码
    copy() {
      var clipboard = new Clipboard(".copy");
      clipboard.on("success", e => {
        this.showToast("text","复制成功")
        // 释放内存
        clipboard.destroy();
      });
      clipboard.on("error", e => {
        // 不支持复制
        this.showToast("text","该浏览器不支持自动复制")
        // 释放内存
        clipboard.destroy();
      });
    },
  },
  filters:{
     // 时间过滤
    getLocalTime(Timestamp) {
      function add0(m) {
        return m < 10 ? "0" + m : m;
      }
      var date = new Date(Timestamp);
      var Y = date.getFullYear();
      var M = date.getMonth()+1
      var D = date.getDate()+1     
      var h = date.getHours();
      var mm = date.getMinutes();
      return add0(Y)+"-"+add0(M)+"-"+add0(D)+" "+add0(h) + ":" + add0(mm)
    },
    wanfa(data){
      let wanfaObj={
        7:"江苏快三",
        3:"北京快三",
        30:"安徽快三",
        9:"新加坡28",
        1:"北京28",
        2:"加拿大28",
        4:"重庆时时彩",
        10:"天津时时彩",
        21:"东京1.5分彩",
        14:"分分彩",
        5:"北京赛车",
        6:"幸运飞艇",
        25:"11选5",
        11:"六合彩",
        13:"排列3",
        15:"排列5",
        12:"福彩3D",
      }
      return wanfaObj[data]
    }
  },
  created() {
    this.betMsg = this.$route.params.data;
    const clipboard = new Clipboard(".btn");
  }
};
</script>

<style lang="less" scoped>
.gray{
  color:#888 !important;
}
.black{
  color: #333 !important;
}
.red{
  color: #E54B55 !important;
}
.right {
  font-size: 14px;
  width: 20px;
  text-align: right;
  span{
    position: absolute;
    top: 14px;
    right: 15px;
    width: 80px;
  }
}
.lotteryState {
  font-size: 16px;
  color: #5bb960;
}
.singleDetails {
  height: 100%;
  margin-top: 50px;
  background-color: #f5f5f5;
  .qihao {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 15px 8px;
    img {
      width: 38px;
      height: 38px;
      margin-right: 11px;
    }
    .nameTime {
      display: flex;
      flex-grow: 1;
      justify-content: space-between;
      & > div {
        width: 50%;
        span {
          font-size: 14px;
          color: #333;
        }
        p {
          font-size: 12px;
          color: #888;
          line-height: 15px;
        }
      }
      & > div:nth-child(2) {
        text-align: right;
        span {
          color: #fe504f;
        }
      }
    }
  }
  .bonus {
    background-color: #fff;
    padding-left: 14px;
    div {
      font-size: 14px;
      color: #333;
      padding: 13px 0;
    }
    & > div:nth-child(1) {
      border-bottom: 1px solid #ddd;
    }
  }
  .oddNumber {
    background-color: #fff;
    font-size: 14px;
    color: #333;
    padding: 13px 14px;
    border-top: 1px solid #ddd;
    .copy {
      display: block;
      float: right;
      color: #3c97eb;
    }
  }
  ul {
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    margin-top: 10px;
    list-style: none;
    li:nth-child(1) {
      border-bottom: 1px solid #ddd;
      padding: 11px 0 11px 15px;
    }
    li:nth-child(n + 2) {
      margin-left: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 15px 5px 0;
      border-bottom: 1px solid #ddd;
      div:nth-child(1) {
        font-size: 10px;
        color: #888;
        span:nth-child(1) {
          color: #333;
          font-size: 14px;
        }
      }
      div:nth-child(2) {
        font-size: 12px;
        span {
          color: #fe504f;
        }
      }
    }
  }
}

.red {
  color: #e54b55;
}
.green {
  color: #5bb960;
}
</style>
