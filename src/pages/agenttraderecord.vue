<template>
  <div id="voucher">
    <oneHead class="head_">
      下级交易明细
      <label slot="right" @click="newdata=true">筛选</label>
    </oneHead>
    <div class="main child-view">
      
      <div id="leftTabBox">
        <div class="hd">
          <ul @click="statusType($event)">
            <li data-id="1" :class="{on:status==1}">账户明细</li>
            <li data-id="2" :class="{on:status==2}">提现记录</li>
            <li data-id="3" :class="{on:status==3}">充值记录</li>
          </ul>
        </div>
        <div class="bd dontSelect">
          <div class="scrollBox">
            <div class="touchScroll">
              <div class="fullPageMsg">
                <p>暂无记录</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="newdata">
        <div class="blackBg" @click="newdata=false"></div>
        <div class="filter">
          <div class="tp" @click="teamdata($event)">
            <span data-id="1" :class="{active:col==1}">今天</span>
            <span data-id="2" :class="{active:col==2}">昨天</span>
            <span data-id="3" :class="{active:col==3}">七天</span>
          </div>
          <div class="tp bot">
            <span v-for="(item, index) in statuslist"  @click="choosed($event,item.id)" :key="index" data-id="index" :class="{active:choose==item.id}">
              {{ item.name }}
            </span>
          </div>
          <button @click="subtradelist">筛选</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import oneHead from "../components/one_head";
import { ButtonTab, ButtonTabItem } from "vux";
import request from "../API";
export default {
  components: {
    oneHead,
    ButtonTab,
    ButtonTabItem
  },
  data() {
    return {
      newdata: false,
      explain: false,
      data: "",
      status:1,
      choose: 0,
      col: 0,
      account: "",
      result_desc: "",
      subdetails: "",
      wanfalist:'',
      stadata:this.GetDateStr(0,0),
      enddata:this.GetDateStr(0,0),
      statuslist:[
        {name:"全部",id:0},
        {name:"充值入款",id:1},
        {name:"提现扣款",id:2},
        {name:"投注扣款",id:3},
        {name:"每日加奖",id:4},
        {name:"奖金派送",id:5},
        {name:"晋级奖励",id:6},
        {name:"追号返款",id:7},
        {name:"投注撤单",id:8},
        {name:"返点佣金",id:9},
        {name:"其他优惠",id:10},
        {name:"和局返款",id:11},
        {name:"红包临朐",id:12},
        {name:"红包发放",id:13},
        {name:"红包退回",id:14},
      ]
    };
  },
  methods: {
    // 搜索框点击
    searchaccount(){
      if(this.account){
        this.subtradelist()
      }
    },
    // 日期选择
    teamdata(e){
      if(e.target!=e.currentTarget){
        if(e.target.dataset.id == 1){
          this.col = 1
          this.stadata=this.GetDateStr(0,0)
          this.enddata=this.GetDateStr(0,0)
        }else if (e.target.dataset.id == 2){
          this.col = 2
          this.stadata=this.GetDateStr(-1,0)
          this.enddata=this.GetDateStr(-1,0)
        }else if (e.target.dataset.id == 3){
          this.col = 3
          this.stadata=this.GetDateStr(-7,0)
          this.enddata=this.GetDateStr(0,0)
        }
      }
    },
    //中奖类型选择
    statusType(e){
      if(e.target!=e.currentTarget){
        this.status = e.target.dataset.id
        this.subtradelist()
      }
    },
    //彩种类型选择
    choosed(e,index){
        this.choose = index 
    },
    // 日期
    GetDateStr(AddDayCount,yue,day) { 
      var dd = new Date(); 
      dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期 
      var y = dd.getFullYear(); 
      var m = dd.getMonth()+1+yue;//获取当前月份的日期 
      if(m == 0){
         y = y-1
         m = 12
      } else if(m==-1){
        y = y-1
        m = 11
      }
      if(day){
        var d=1
      }else{
        var d = dd.getDate(); 
      }
      return y+"-"+m+"-"+d;
    },
    subtradelist(){
      let obj = {
        type :this.status,
        statusType:this.choose,
        page:1,
        pageSize:15,
        start_time:this.stadata,
        end_time:this.enddata,
        account:this.account,
      }
      this.newdata = false
      this.$api.subtradelist(obj).then(res=>{
        if(res.data.result_code==1){
          this.showToast("text",res.data.result_desc)
        }else{
          console.log(res)
        }
      })
    },
  },
  mounted() {
    this.subtradelist()
  }
};
</script>

<style scoped lang="less">
* {
  box-sizing: border-box;
}
.child-view {
  position: absolute;
  width: 100%;
  transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
}
.main {
  font-size: inherit;
}
.head_ span {
  width: 70px;
  display: inline-block;
  font-size: 12px;
}
.head_ label {
  display: inline-block;
  font-size: 12px;
}
.search {
  height: 50px;
  background: #f5f5f5;
  padding: 10px 15px 10px 15px;
  position: relative;
}
.search input {
  width: 80%;
  text-align: left;
  height: 30px;
  font-size: 13px;
  color: #b5b5b5;
  display: block;
  float: left;
  border: none;
  -webkit-appearance: none;
  border: 1px solid #dddddd;
  padding: 0 30px;
  border-radius: 5px;
  position: relative;
}
.search .iconfont {
  position: absolute;
  left: 25px;
  z-index: 2;
  height: 30px;
  line-height: 30px;
}
.search span {
  display: inline-block;
  color: #ffffff;
  height: 30px;
  width: 60px;
  border-radius: 5px;
  line-height: 30px;
  background-color: #3c97eb;
  text-align: center;
  font-size: 13px;
  margin-left: 10px;
}
.blackBg {
  background: rgba(0, 0, 0, 0.4);
  top: 50px;
}
.blackBg {
  top: 50px;
  left: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 11;
}
.filter {
  background: #fff;
  width: 100%;
  position: fixed;
  top: 50px;
  z-index: 15;
  padding: 0 0.5em 0.1em;
  margin: 0 auto;
}
.filter  button{
  background: #e53333;
  width: 60%;
  top: 50px;
  height: 30px;
  margin: 10px 20%;
  font-size: 16px;
  color: #fff;
  margin-bottom: 20px;
  border-radius: 5px;
}
.filter .tp {
  font-size: 14px;
  padding-top: 1em;
  width: 90%;
  margin-left: 6%;
  margin-right: 3%;
}
.filter .tp span {
  color: #777;
  text-align: center;
  border: 1px solid #ddd;
  display: inline-block;
  width: 30%;
  margin: 0 1.2% 1em;
  border-radius: 5px;
  height: 30px;
  line-height: 28px;
}
.filter .tp span:active {
  border-color: #e53333;
}
.filter .tp span.active {
  border-color: #e53333;
}#leftTabBox{
  border-top:1px solid #dddddd;
  .hd{
    height: 40px;
    padding: 0 15px;
    background-color: #fff;
    li{
      width: 33.3%;
      float: left;
      font-size: 14px;
      line-height: 40px;
      color: #333;
      text-align: center;
      list-style: none;
    }
    li.on{
      border-bottom: 2px solid #e53333;
    }
  }
}.dontSelect{
  padding: 20px;
  .fullPageMsg{
    text-align: center;
    width: 100%;
    font-size: 14px;
    color: #333;
  }
}.bot{
  border-top: 1px solid #dddddd;
}
</style>
