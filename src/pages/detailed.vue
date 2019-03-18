<template>
  <div id="found">
    <oneHead class="head_">
        <p>交易记录</p>
        <label slot="right"  @click="choose = !choose">筛选</label>
    </oneHead>
    <div class="alllott" v-show="choose">
        <ul @click="timer($event)">
          <li :class="{active:time==0}" data-id = 0>今天</li>
          <li :class="{active:time==1}" data-id = 1>昨天</li>
          <li :class="{active:time==7}" data-id = 7>七天</li>
        </ul>
        <ul>
          <template v-if="kin==1">
            <li v-for="(item, index) in statusType" @click="color($event,item.type)" :key="index" :class="{active:lott==index}"  :data-id = index>
            {{item.name}}
            </li>
          </template>
          <template v-if="kin==2">
            <li v-for="(item, index) in type1" @click="color($event,item.type)" :key="index" :class="{active:lott==index}"  :data-id = index>
            {{item.name}}
            </li>
          </template>
          <template v-if="kin==3">
            <li v-for="(item, index) in type2" @click="color($event,item.type)" :key="index" :class="{active:lott==index}"  :data-id = index>
            {{item.name}}
            </li>
          </template>
        </ul>
        <button @click="account()">确定</button>
    </div>
    <div class="detailed">
      <ul>
        <div class="betLi">
          <ul @click="kind($event)">
            <li data-id = 1 :class="{active:kin == 1}">账户明细</li>
            <li data-id = 2 :class="{active:kin == 2}">充值记录</li>
            <li data-id = 3 :class="{active:kin == 3}">提现金额</li>
          </ul>
        </div>
        <div class="betList">
          <ul>
            <template v-if="kin==1">
              <li v-for="(item, index) in data.list" :key="index">
                <div>
                  <p>{{item.point_desc}}</p>
                  <p>{{item.create_time}}</p>
                </div>
                <span class="spanRight" :class="[item.point>=0?'red':'green']">￥{{item.point}}</span>
              </li>
            </template>
            <template v-if="kin==2">
              <li v-for="(item, index) in data.list" :key="index">
                <div>
                  <p v-if="item.status==0">待支付</p>
                  <p v-if="item.status==1">成功付款</p>
                  <p v-if="item.status==2">失败</p>
                  <p>{{item.create_time}}</p>
                </div>
                <span class="spanRight" :class="[item.status==1?'red':'spanRight']">￥{{item.recharge_fee}}</span>
              </li>
            </template>
            <template v-if="kin==3">
              <li v-for="(item, index) in data.list" :key="index">
                <div>
                  <p v-if="item.status==0">未处理</p>
                  <p v-if="item.status==1">已处理</p>
                  <p v-if="item.status==2">处理失败</p>
                  <p>{{item.create_time}}</p>
                </div>
                <span class="spanRight" :class="[item.point>=0?'red':'green']">￥{{item.fee}}</span>
              </li>
            </template>
            
          </ul>
          <div v-if="pagemore" @click="seemore()" class="fullPageMsg">
            <p>点击查看更多</p>
          </div>
          <div v-else  class="fullPageMsg">
            <p>没有更多了</p>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
  import oneHead from "../components/one_head"
  export default {
    components:{
      oneHead,
    },
    data(){
      return {
        choose:false,
        time:0,
        kin:1,
        lott:0,
        endtime:'',
        data:'',
        page:1,
        pagemore:true,
        type1:[
            {name:"全部"},
            {name:"充值中"},
            {name:"充值成功"},
            {name:"充值失败"},
        ],
        type2:[
            {name:"全部"},
            {name:"处理中 "},
            {name:"提现成功"},
            {name:"提现失败"},
        ],
        statusType:[
          {
            "name":"全部",
            "type":0,
          },
          {
            "name":"充值入款",
            "type":1,
          },
          {
            "name":"提现扣款",
            "type":2,
          },
          {
            "name":"投注扣款",
            "type":3,
          },
          {
            "name":"每日加奖",
            "type":4,
          },
          {
            "name":"奖金派送",
            "type":5,
          },
          {
            "name":"晋级奖励",
            "type":6,
          },
          {
            "name":"追号返款",
            "type":7,
          },
          {
            "name":"投注撤单",
            "type":8,
          },
          {
            "name":"返点佣金",
            "type":9,
          },
          {
            "name":"其他优惠",
            "type":10,
          },
          {
            "name":"和局返款",
            "type":11,
          },
          {
            "name":"红包临朐",
            "type":12,
          },
          {
            "name":"红包发放",
            "type":13,
          },
          {
            "name":"红包退回",
            "type":14,
          },
        ]
      }
    },
    methods:{
      // 日期切换
      timer(e){
        if(e.target!=e.currentTarget){
          this.endtime=''
          this.time = e.target.dataset.id
          if(e.target.dataset.id==1){
            this.endtime = this.GetDateStr(e.target.dataset.id)
           }
        }
      },
      // 类型
      color(e,id){
          this.lott = e.target.dataset.id
      },
      //账户1  提现2  充值3 
      kind(e){
        if(e.taeget!= e.currentTarget){
            this.kin = e.target.dataset.id
            this.lott = 0
            this.account()
        }
      },
      // 点击查看更多
      seemore(){
        this.page++
        this.account()
      },
      account(){
        this.pagemore = true
        this.$vux.loading.show({
          text: 'Loading'
        })
        this.choose =false
        let  obj = {
          "type":this.kin,
          "statusType":this.lott,
          "page":1,
          "pageSize":this.page*20,
          "start_time":this.GetDateStr(this.time),
          "end_time": this.endtime
        }
        this.$api.accountdetails(obj).then(res=>{
          console.log(res)
          this.$vux.loading.hide({
            text: 'Loading'
          })
          if(res.data.result_code==0){
              this.data=res.data.data
              if(this.data.list.length<this.page*20){
                this.pagemore = false
              }
          }else{
            this.confirm({
              title: '提示',
              content: "查看失败，请稍后再试",
              confirmText: '确定',
              cancelText: '取消',
              showCancelButton:false,
            })
          }
        })
      },
      // 日期
      GetDateStr(AddDayCount) { 
        var dd = new Date(); 
        dd.setDate(dd.getDate()-AddDayCount);//获取AddDayCount天前的日期 
        var y = dd.getFullYear(); 
        var m = dd.getMonth()+1;//获取当前月份的日期 
        if(m == 0){
          y = y-1
          m = 12
        } else if(m==-1){
          y = y-1
          m = 11
        }
        var d = dd.getDate(); 
        return y+"-"+m+"-"+d;
      },
    },
    mounted(){
      this.account()
    }
  }
</script>

<style>
  .head_ span{
    width: 70px;
    display: inline-block;
    font-size: 12px;
  }
  .head_ label{
    display: inline-block;
    font-size: 12px;
  }
  .betLi{width: 100%;height: 40px;border-bottom: 1px solid #DDDDDD;background-color: #fff}
  .betLi ul{width: 85%;margin: 0 auto;background-color: #fff}
  .betLi ul li{width: 33.3%;height: 40px;float: left;list-style: none;line-height: 40px;text-align: center;}
  .betLi ul li {color: #888;font-size: 14px;height: 40px;display: inline-block;font-family: PingFangSC-Regular}
  .betLi ul .active{color: #E54B55;border-bottom: 1px solid #E54B55;box-sizing: border-box}
  .betList li{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 15px;
    color: #333;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
  }
  .betList li p:first-child{font-size: 15px;color: #333;}
  .betList li p:first-child span{font-size: 12px;}
  .betList li p span{padding-left: 20px;}
  .betList li p:last-child{font-size: 12px;color: #888;}
  .betList li span.spanRight{font-size: 14px;}
  .fullPageMsg{text-align: center;padding: 20px;font-size: 14px;color: #888;}

   .alllott{
    position:absolute;
    top: 50px;
    width: 100%;
    background: #fff;
  }.alllott ul{
    background: #fff;
    display: block;
    margin: 0px 10px;
    padding: 5px 0
  }.alllott ul:nth-of-type(1){
    border-bottom: 1px solid #ddd;
  }
  .alllott ul li{
    border: 1px solid #ddd;
    height: 25px;
    font-size: 12px;
    text-align: center;
    width: 80px;
    display: inline-block;
    list-style: none;
    line-height: 25px;
    margin: 5px 5px;
  }
  .alllott ul .active{
      background: #E54B55 !important;
      color: #fff;
  }.alllott button{
      background: #E54B55 !important;
      color: #fff;
      width: 100px;
      height: 30px;
      margin: 10px auto;
      box-sizing: border-box;
      border: none;
      margin-bottom: 20px;
      display: block;
      font-size: 12px;
  }
  .red{
    color: #E54B55;
  }
  .green{
    color: #5BB960;
  }
</style>

