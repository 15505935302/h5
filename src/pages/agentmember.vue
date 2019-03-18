<template>
  <div id="voucher">
    <Head>
      <span slot="pageName">下级管理</span>
    </Head>
    <div class="main child-view">
      <div class="search">
        <i class="iconfont ">&#xe64c;</i>
        <input type="search" placeholder="请输入下级代理账号" v-model="account">
        <span @click.stop="searchaccount">搜索</span>
      </div>
      <div v-show='newWinShow'>
        <div class="ag-top">
          <div class="name-num">
            <div v-if="subUserId" class="lt">{{subUserId}} 的下级</div>
            <div v-else class="lt">我的下级</div>
            <div class="rt"  @click="sortTypelist($event)"><button data-id='1'  :class="{'red':sortType==1}">注册时间</button><button  data-id='2'  :class="{'red':sortType==2}">等级</button></div>
          </div>
        </div>
      </div>
      <div  class="subdetailed">
        <div class="sub-contai" :class="{fullPageMsg:data.list==''}">
            <ul>
               <li class="sub-contai-li" v-for="(item, index) in data.list" :key="index" :class="{liheight:subdetails==index}" @click="subdetails==index?subdetails=-1:subdetails=index">
                <i class="iconfont" :class="{jiandu:subdetails == index}">&#xe601;</i>
                <span class='blue'>{{item.account}}</span>
                <span>下级人数：{{item.sub_count}}人</span>
                  <ul class="sub-contai-li-ul" v-if='subdetails == index'> 
                    <li>
                      <span>累计返佣</span><span>{{item.agent_profit_mooney}}元</span>
                    </li>
                    <li>
                      <span>当前余额</span><span>{{item.balance }}元</span>
                    </li>
                    <li>
                      <span>注册时间</span><span>{{item.register_time | capitalize}}</span>
                    </li>
                    <li>
                      <span>最后登录</span><span>{{item.login_time | capitalize}}</span>
                    </li>
                    <li>
                      <span>玩家类型</span><span v-if="item.agent_type==1">{{item.agent_level}}级代理</span><span v-if="item.agent_type==2">会员</span>
                    </li>
                    <div class="flexdiv">
                      <button @click.stop="view(item)">查看返点</button>
                      <button @click.stop="viewsub(item)" >查看下级</button>
                    </div>
                  </ul>
               </li>
            </ul>
            <div class="PageMsg" v-show="data.list==''">暂无记录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "../components/header";
export default {
  components: {
    Head,
  },
  data() {
    return {
      newWinShow:true,
      yesterdayWinShow:false,
      newdata:false,
      explain:false,
      data:'',
      col:1,
      account:'',
      subdetails:-1,
      sortType:'1',
      subUserId:'',
    }
  },
  filters:{
    //时间过滤
    capitalize: function (value) {
      var date = new Date(parseInt(value));
        var tt = [date.getFullYear(), ((date.getMonth()+1)<10?'0'+(date.getMonth()+1):date.getMonth()+1), (date.getDate()<10?'0'+date.getDate():date.getDate())].join('-') + '  ' +[(date.getHours()<10?'0'+date.getHours():date.getHours()), (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()), (date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds())].join(':');
        return tt;
    }
  },
  methods: {
    //查看下级
    viewsub(id){
      this.subUserId=id.account
      this.account=''
      this.sublist(id.user_id,id.agent_type)
    },
    // 查看返点
    view(item){
      let str=""
          str+="快三分润："+item.kuai_three_profit+"<br>"
          str+="时时彩分润："+item.shishicai_profit+"<br>"
          str+="11选5分润："+item.eleven_five_profit+"<br>"
          str+="28分润："+item.twenty_eight_profit+"<br>"
          str+="六合彩分润："+item.lhc_profit+"<br>"
          str+="低频彩分润："+item.low_frequency_profit+"<br>"
          str+="福彩分润："+item.fucai_profit+"<br>"
          str+="排列分润："+item.array_profit+"<br>"
          str+="Pk10分润："+item.pk_ten_profit+"<br>"
        this.confirm({
          title: '返点详情',
          content: str,
          confirmText: '我知道了',
          showCancelButton:false,
        })
    },
    // 下级报表获取
    sublist(subUserId,agentType){
      if(!subUserId){
        this.subUserId=""
      }
      if(!agentType){
        agentType=0
      }
      let obj = {
        agentType:agentType,
        page:'1',
        pageSize:'15',
        account:this.account,
        sortType:this.sortType,
        subUserId:subUserId,
      }
      console.log(obj)
      this.$api.sublist(obj).then(res=>{
          console.log(this.data)
          console.log(res)
          if(res.data.result_code==1){
            this.showToast("text",res.data.result_desc)
           }else{
             this.data = res.data.data
             for(let i=0,len=this.data.list.length;i<len;i++){
             }
           }
      })
    },
    // 搜索框点击
    searchaccount(){
       this.sublist()
    },
    // 排序
    sortTypelist(e){
      if(e.target!=e.currentTarget){
         this.sortType = e.target.dataset.id
         this.sublist()
      }
    }
  },
  mounted(){
    this.sublist()
  }
}
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
  padding-top:50px; 
}

.search {
    height: 50px;
    background: #F5F5F5;
    padding: 10px 15px 10px 15px;
    position: relative;
}.search input {
    width: 80%;
    text-align: left;
    height: 30px;
    font-size: 13px;
    color: #B5B5B5;
    display: block;
    float: left;
    border: none;
    -webkit-appearance: none;
    border: 1px solid #DDDDDD;
    padding: 0 30px;
    border-radius: 5px;
    position: relative;
}.search .iconfont{
  position:absolute;
  left: 25px;
  z-index: 2;
  height: 30px;
  line-height: 30px;
}.search span {
    display: inline-block;
    color: #ffffff;
    height: 30px;
    width: 60px;
    border-radius: 5px;
    line-height: 30px;
    background-color: #3C97EB;
    text-align: center;
    font-size: 13px;
    margin-left: 10px;
}.ag-top {
    height: 40px;
    background: #fff;
    border-top: 1px solid #dddddd;
    border-bottom: 1px solid #dddddd;
}.ag-top .name-num {
    height: 40px;
    font-size: 14px;
    padding: 8px 6px;
    border-bottom: 1px solid #dddddd;
}.ag-top .name-num .lt {
    float: left;
    margin-left: 1em;
    padding-left: 1em;
    border-left: 2px solid #e23539;
    border-radius: 2px;
}.ag-top .name-num .rt {
    float: right;
    font-size: 12px;
    margin-right: 10px;
    button{
      height: 25px;
      font-size: 12px;
      color: #fff;
      padding: 0 6px;
    }
    button:nth-of-type(1){
      border: 1px solid #dddddd;
      background-color: #ffffff;
      color: #333;
      box-sizing: border-box;
      border-right: none;
      border-radius: 2px 0 0 2px;
    }
    button:nth-of-type(2){
      border: 1px solid #dddddd;
      background-color: #ffffff;
      box-sizing: border-box;
      color: #333;
      box-sizing: border-box;
      border-left:none;
      border-radius:0 2px 2px 0;
    }
    .red{
      background-color: #E54B55 !important;
      color: #fff !important;
    }
}
.sub-top {
    height: 30px;
    background: #F6ECED;
    border-top: 1px solid #dddddd;
    padding: 0 30px;
    border-bottom: 1px solid #dddddd;
    span{
      width:25%;
      line-height: 30px;
      text-align: center;
      float: left;
      color: #666666;
      font-size: 12px;
    }
}
.sub-contai{
    background: #f5f5f5;
    ul{
      .sub-contai-li{
       background: #fff;
       border-bottom: 1px solid #ddd;
       padding: 0 30px;
       height: 35px;
        i{
        height: 30px;
        position:absolute;
        font-size: 10px;
        line-height: 30px;
        color: #666;
        transform: rotate(-90deg);
        text-align: left;
        left: 20px;
        }
        .jiandu{
        transform: rotate(0deg);
        }
        span{
        width:50%;
        line-height: 30px;
        text-align: center;
        float: left;
        color: #666666;
        font-size: 12px;
        display: block;
        }
        
        span:nth-of-type(2){
          float: right;
        }
        .sub-contai-li-ul{
          display: block;
          margin: 0px 20px 10px 20px;
          padding-top: 35px;
          li{
            width: 100%;
            height: 35px;
            padding: 0 20px;
            display: flex;
            justify-content: space-around;
            border-bottom: 1px solid #ddd;
            span{
              text-align: left;
            }
          }
          button{
            display: flex;
            justify-content: space-around;
            border: 1px solid #ddd;
            margin: 10px 0;
            width: 100px;
            height: 30px;
            font-size: 12px;
            color: #3C97EB;
            background: #fff;
            border-radius: 3px;
            ;
          }
        }
      }
    }
}.blue{
  color: #3C97EB !important;
}.green{
 color: #5BB960 !important;
}.fullPageMsg{
   background:#f5f5f5 !important;
   border-bottom: nono !important;
}.PageMsg{
  width: 100%;
  text-align: center;
  line-height: 30px;
  color: #999;
  padding: 0 20px;
  font-size: 14px;
}
li{
  list-style: none;
}
.liheight{
  height: 100% !important;
  // border-bottom: none !important;
}
.flexdiv{
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content:space-around;
    justify-content: space-around;

}
</style>
