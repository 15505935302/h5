<template>
  <div id="voucher">
    <oneHead class="head_">
      <ButtonTab>
        <ButtonTabItem selected @on-item-click="xiaji_request"  :class="{writhcolor:newWinShow==false}">
          <span>下级开户</span>
        </ButtonTabItem>
        <ButtonTabItem @on-item-click="invitelist_request" :class="{redback:newWinShow==false}">
          <span>邀请码</span>
        </ButtonTabItem>
      </ButtonTab>
      <i slot="right"></i>
    </oneHead>
    <div class="main child-view" style="padding-bottom: 0px;">
      <!-- 下级开户 -->
      <div class="creatAccountTitle radio">
        <p class="tp-tip" v-if="newWinShow">
          请为下级设置类型和返点。
          <!-- <a href="/rebateTable/K3" class style="color: rgb(220, 59, 64);">查看返点赔率表</a> -->
        </p>
        <p class="tp-tip" v-if="newWinShow">
          <label>开户类型</label>
          <label class="choosed test-label" @click="agentTypeSelect(1)">
            <input class="test-radio" type="radio" name="radio">
            <span class="test-radioInput">
              <i class="iconfont gou">&#xe611;</i>
            </span>代理类型
          </label>
          <label class="test-label" @click="agentTypeSelect(2)">
            <input class="test-radio" type="radio" name="radio" checked>
            <span class="test-radioInput">
              <i class="iconfont gou">&#xe611;</i>
            </span>玩家类型
          </label>
        </p>
        <p class="tp-tip" v-if="yesterdayWinShow">
          <label>开户类型</label>
          <label class="choosed test-label" @click="inviteCodelist(1)">
            <input class="test-radio" type="radio" name="radioo">
            <span class="test-radioInput">
              <i class="iconfont gou">&#xe611;</i>
            </span>代理类型
          </label>
          <label class="test-label" @click="inviteCodelist(2)">
            <input class="test-radio" type="radio" name="radioo" checked>
            <span class="test-radioInput">
              <i class="iconfont gou">&#xe611;</i>
            </span>玩家类型
          </label>
        </p>
      </div>
      <!-- 下级开户 -->
      <div class="tabLI" v-if="newWinShow">
        <ul class="creatAccountDetail Backli">
          <template v-for="(item, index) in data.profitList">
            <li :key="index">
                <span>{{item.profit_name}}</span>
                <input
                  :placeholder="palace(item.profit_value)"
                  v-model="value[filted(item.profit_name)]"
                  @blur="hint($event,item)"
                  maxlength="3"
                  oninput="value=value.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
                >
            </li>
          </template>
        </ul>
      </div>
      <!-- 邀请码 -->
      <template v-if="loading">
        <div class="" v-if="yesterdayWinShow">
          <ul class="code">
            <li v-for="(item, index) in invitelist" :key="index">
                <div>
                  <span> 邀请码：<span>{{item.invite_code}}</span></span>
                  <p>{{item.update_time[0]}}</p>
                </div>
                <div>
                  <span>注册（{{item.register_count}}）</span>
                  <i @click="delinviteCode(item.id)" class="iconfont">&#xe610;</i>
                </div>
                <div>
                  <span @click="view(index)">查看返点</span>
                  <span class="copy" :data-clipboard-text="item.invite_code" @click="copy">复制邀请码</span>
                  <span>复制注册链接</span>
                </div>
            </li>
          </ul>
        </div>
      </template>
      <template v-if="yesterdayWinShow">
        <div v-if="pagemore" @click="seemore()" class="fullPageMsg">
          <p>点击查看更多</p>
        </div>
        <div v-else  class="fullPageMsg">
          <p>没有更多了</p>
        </div>
      </template>
      <a v-if="newWinShow" class="BTN submitBtn" @click="inviteCode">生成邀请码</a>
      <div style="height: 0.5em;"></div>
    </div>
  </div>
</template>

<script>
import oneHead from "../components/one_head";
import { ButtonTab, ButtonTabItem } from "vux";
import Clipboard from "clipboard";
export default {
  components: {
    oneHead,
    ButtonTab,
    ButtonTabItem
  },
  data() {
    return {
      value: {},
      // 邀请码类型
      invitation: 2,
      info: "",
      data: {},
      invitelist: 2,
      agentType: 1,
      yesterdayWinShow: false,
      newWinShow: true,
      status:true,
      viewType:'',
      invite:2,
      loading:false,
      pagemore:true,
      page:1,
    };
  },
  methods: {
    clearNoNum(obj){ 
          obj.value = obj.value.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
          obj.value = obj.value.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
          obj.value = obj.value.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
          obj.value = obj.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
          if(obj.value.indexOf(".")< 0 && obj.value !=""){//以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额 
              obj.value= parseFloat(obj.value); 
          } 
      },
      // 点击查看更多
      seemore(){
        this.page++
        this.inviteCodelist()
      },
    // 复制邀请码
    copy(){
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
    // 开户类型选择
    agentTypeSelect(type) {
      this.agentType = type;
    },
    xiaji_request() {
      this.yesterdayWinShow = false;
      this.newWinShow = true;
    },
    invitelist_request() {
      this.yesterdayWinShow = true;
      this.newWinShow = false;
      this.inviteCodelist(this.invite);
    },
    //默认显示返点
    palace(item) {
      return "自身返点" + item + "，可设置返点0.0-" + item;
    },
    hint(e,msg){     
      e.currentTarget.value
      console.log(e.currentTarget.value,msg)
      if(msg.status==0 && e.currentTarget.value!=msg.profit_value){
        this.alert({
          title: '提示',
          content: msg.profit_name+"的分润只能为"+msg.profit_value,
          buttonText: '确定',
        })
        this.value[this.filted(msg.profit_name)]=msg.profit_value
      }else if(e.currentTarget.value>msg.profit_value){
        this.alert({
          title: '提示',
          content: msg.profit_name+"的分润不能大于"+msg.profit_value,
          buttonText: '确定',
        })
      }
    },
    //下级开户列表
    infoagent() {
      this.$api.infoagent().then(res => {
        this.data = res.data.data;
        console.log(this.data)
      });
    },
    //个人代理信息
    inviteCode() {
      this.value.type=this.agentType
      for(let i=0,len=this.data.profitList.length;i<len;i++){
        if(this.value[this.filted(this.data.profitList[i].profit_name)]>this.data.profitList[i].profit_value){
           this.alert({
            title: '提示',
            content: this.data.profitList[i].profit_name+"返点只能在0到"+this.data.profitList[i].profit_value+"之间",
            buttonText: '确定',
          })
          this.status=false
          break
        }else{
          this.status=true
        }
      }
      if(this.status){
        this.$api.inviteCode(this.value).then(res => {
          this.info = res.data.data;
          console.log(res);
          if(res.data.result_code==0){
            this.showToast("text","生成邀请码成功")
            this.invitelist_request()
          }else{
            this.showToast("text","返点数值不能为空！")
          }
        });
      }
    },
    // 对象过滤
    filted(data){
      let obj={
        "快三":"kuaiThreeProfit",
        "时时彩":"shishicaipProfit",
        "11选5":"elevenFiveProfit",
        "福彩3D":"fucaiProfit",
        "排列3/5":"arrayProfit",
        "28游戏":"twentyEightProfit",
        "pk10":"pkTenProfit",
        "六合彩":"lhcProfit",
        "低频彩":"lowFrequencyProfit",
      }
      return obj[data]
    },
    // 对象过滤
    filt(data){
      let obj={
        "kuai_three_profit":"快三",
        "shishicaip_profit":"时时彩",
        "eleven_five_profit":"11选5",
        "fucai_profit":"福彩3D",
        "array_profit":"排列3/5",
        "twenty_eight_profit":"28游戏",
        "pk_ten_profit":"pk10",
        "lhc_profit":"六合彩",
        "low_frequency_profit":"低频彩",
      }
      return obj[data]
    },
    //获取邀请码列表
    inviteCodelist(type) {
      this.pagemore = true
      this.invitation = type;
      let obj = {
        type: this.invitation,
        page: 1,
        page_size: this.page*20,
      };
      console.log(this.invitation)
      this.$api.inviteCodelist(obj).then(res => {
      this.invitelist = res.data.data;
        if(this.invitelist.length<this.page*20){
           this.pagemore = false
        }
        this.loading = true
        for(let i=0,len=this.invitelist.length;i<len;i++){
          this.invitelist[i].update_time = this.invitelist[i].update_time.split(" ")
        }
        console.log(this.invitelist);
      });
    },
    // 查看返点
    view(index){
      let str=""
        // let arr =  this.filt(this.invitelist[index].array_profit)+":"+this.invitelist[index].array_profit+"<br>"
        for (let key in this.invitelist[index]) {
            if(this.filt(key)){
              str+=this.filt(key)+":"+this.invitelist[index][key]+"<br>"
              // console.log(this.filt(key))
            }
            console.log(key)
        }
        this.confirm({
          title: '返点详情',
          content: str,
          confirmText: '我知道了',
          showCancelButton:false,
        })
    },
    // 删除邀请码
    delinviteCode(id){
      let _this=this
      this.confirm({
          title: '删除邀请码',
          content: "是否要删除该邀请码",
          confirmText: '确定',
          onConfirm(){
            _this.$api.delinviteCode({inviteCodeId:id}).then(res=>{
                _this.inviteCodelist(_this.invitation)
                console.log(res)
            })
          },
      })
    }
  },
  mounted() {
    this.infoagent();
  }
};
</script>

<style scoped lang="less">
.copyText{
  height: 1px;
  width: 1px;
  border: none;
}
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
.creatAccountTitle {
  background: #fff;
  padding: 0 0;
  text-align: left;
  p {
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
  }
}
.tp-tip {
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dddddd;

  label {
    font-size: 13px;
    height: 40px;
    line-height: 40px;
    input {
      width: 15px;
      height: 15px;
      float: left;
      line-height: 40px;
      margin: 10px 5px;
    }
  }
  label:nth-of-type(2) {
    margin-left: 40px;
  }
  label:nth-of-type(3) {
    margin-left: 20px;
  }
}
.test-label {
  display: inline-block;
}
.test-radio {
  display: none;
}
.test-radioInput {
  border: 1px solid #dddddd;
  background-color: #fff;
  border-radius: 100%;
  display: inline-block;
  height: 20px;
  margin-right: 10px;
  vertical-align: middle;
  width: 20px;
  line-height: 1;
}
.gou {
  font-size: 12px;
  line-height: 18px;
  position: absolute;
  color: #fff;
  margin-left: 2px;
}
.test-radio:checked + .test-radioInput:after {
  background-color: #ee4549;
  border-radius: 100%;
  content: "";
  display: inline-block;
  height: 18px;
  width: 18px;
}
.tabLI {
  margin-top: 10px;
  background-color: #fff;
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  width: 100%;
  .Backli {
    padding: 0 15px;
    width: 100%;
    li {
      border-bottom: 1px solid #dddddd;
      line-height: 50px;
      font-size: 16px;
      color: #333333;
      list-style: none;
      box-sizing: border-box;
      span {
        min-width: 80px;
        display: inline-block;
      }
      input {
        border: none;
        width: 75%;
        height: 30px;
        display: inline-block;
        font-size: 13px;
        color: #333333;
        ::-webkit-input-placeholder {
          color: #dddddd;
        }
      }
    }
  }
}
.submitBtn {
  width: 90%;
  margin: 1em auto;
  display: block;
  font-size: 14px;
  line-height: 35px;
  text-align: center;
  height: 35px;
}
.BTN {
  border-radius: 0.3em;
  -webkit-tap-highlight-color: transparent;
  color: #fff;
  background: #e54b55;
}
.code{
    li{
      height: 90px;
      margin-top: 10px;
      background: #fff;
      border-top: 1px solid #dddddd;
      border-bottom: 1px solid #dddddd;
      div{
        width: 100%;
        display: flex;
      }
      div:nth-of-type(1){
        padding: 0 10px;
        padding-top: 10px;
        -webkit-justify-content: flespace-betweenx;
        justify-content: space-between;
      }
      div:nth-of-type(2){
        padding: 0 10px;
        -webkit-justify-content: flespace-betweenx;
        justify-content: space-between;
        border-bottom:solid 1px #DDDDDD;
      }
      div:nth-of-type(3){
        padding: 0 30px;
        height: 30px;
        line-height: 20px;
        width: 100%;
        -webkit-justify-content: flespace-betweenx;
        justify-content: space-between;
        border-top: #333;
        font-size: 14px;
        color: #3C97EB;
        padding-top: 5px;
        span{
          height: 20px;
          text-align: center;
        }
        span:nth-of-type(2){
          border-left:solid 1px #DDDDDD;
          border-right:solid 1px #DDDDDD;
          display: block;
          padding: 0 10%;
        }
      }
    }
  }
  .fullPageMsg{text-align: center;padding: 20px;font-size: 14px;color: #888;}
  
.writhcolor{
  color: #fff !important;
  background: #E54B55 !important;
}
.redback{
  color: #E54B55 !important;
  background: #fff !important;
}
</style>
