<template>
  <div class="betRoom">
    <Head>
      <span slot="pageName">{{this.$store.state.gameType.name}}投注</span>
    </Head>
    <div class="addBet">
      <p>
        {{this.$store.state.choice_no}}期投注截止：
        <span>{{countDown | openTimeDown}}</span>
      </p>
      <div class="quickpick">
        <div @click="back">
          <i class="iconfont">&#xe602;</i>
          <span>继续选号</span>
        </div>
        <div @click="onceRandom">
          <i class="iconfont">&#xe603;</i>
          <span>机选1注</span>
        </div>
        <div @click="quinticRandom">
          <i class="iconfont">&#xe603;</i>
          <span>机选5注</span>
        </div>
      </div>
    </div>
    <ul>
      <li v-for="(sola,index) in betArr" :key="index">
        <div>
          <span @click="details($event)" ref="num">
            <template v-for="(item,index) in sola">
              <template v-if="item.bet_name">[{{item.bet_name}}]</template>
              <template v-if="item.bili_name">{{item.bili_name}}</template>
              <template v-if="item.wanfa_name">{{item.wanfa_name}}</template>
              <template v-if="item.betNumbers">{{item.betNumbers}}</template>
              <template v-if="item.numbers">{{item.numbers}}</template>
              <template v-else>{{item.number}}</template>
              <template v-if="index>=0">&nbsp;</template>
            </template>
          </span>
          <p>
            [{{sola[0].wanfa_type}}]
            &nbsp;&nbsp;
            <span ref="shu">
              <template v-if="sola[0].bet_count>1">
                {{sola[0].bet_count}}
              </template>
              <template v-else>
                {{sola.length}}
              </template>
            </span> 注&nbsp;&nbsp;每注
            <template v-if="sola[0].money">{{sola[0].money}}</template>
            <template v-else>{{$store.state.everyBetRental}}</template>元
          </p>
        </div>
        <i class="iconfont" @click="delBet($event)" :data-index="index">&#xe8c1;</i>
      </li>
    </ul>
    <div id="footerBet">
      <div class="betNum">
        <div>
          投
          <input v-model="bili" type="number" oninput="this.value=this.value.replace(/\D/g,'').replace(/^0+(?=\d)/,'')" >倍
        </div>
        <div>
          投
          <input v-model="qishu" type="number" oninput="this.value=this.value.replace(/\D/g,'').replace(/^0+(?=\d)/,'')">期
        </div>
        <div>
          <span @click="zjjt=!zjjt">
            <i v-show="zjjt" class="iconfont">&#xe611;</i>
          </span>
          是否追停
        </div>
      </div>
      <div class="betAffrim">
        <div @click="clearAll">
          <span>清空</span>
        </div>
        <div>
          <!-- <p>{{(count*($store.state.everyBetRental*10)*bili*qishu)/10}}元</p> -->
          <p>{{totalMoney/10}}元</p>
          <p>{{count}}注&nbsp;{{bili}}倍&nbsp;{{qishu}}期</p>
        </div>
        <div @click="popupShow=true">确认投注</div>
      </div>
    </div>
    <!-- 弹出框 -->
    <div v-if="popupShow" class="popup">
      <h3>投注确认</h3>
      <div ref="pop" class="content">
          <div>
            <p>{{this.$store.state.gameType.name}}：</p><span>{{this.$store.state.choice_no}}期</span>
          </div>
          <div>
            <p>投注金额：</p><span>{{totalMoney/10}}元</span>
            </div>
          <div>
            <p>投注内容：</p>
            <div class="maincontent">
              <span v-for="(sola,index) in betArr" :key="index">
                  <span ref="num">
                    <template v-for="(item,index) in sola">
                      <template v-if="item.bet_name">[{{item.bet_name}}]</template>
                      <template v-if="item.bili_name">{{item.bili_name}}</template>
                      <template v-if="item.wanfa_name">{{item.wanfa_name}}</template>
                      <template v-if="item.betNumbers">{{item.betNumbers}}</template>
                      <template v-if="item.numbers">{{item.numbers}}</template>
                      <template v-else>{{item.number}}</template>
                      <template v-if="index>=0">、</template>
                    </template>
                  </span>
              </span>
            </div>
          </div>
      </div>
      <div class="button">
      <p @click="popupShow=false">关闭</p>
      <p @click="submitBet">确定</p>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="shade" v-if="popupShow" @click="popupShow=false" ></div>
  </div>
</template>

<script>
import Head from "../components/header";
import open from "../mixins/openResult.js";
import randomSelect from "../mixins/randomSelect.js"
export default {
  components: {
    Head,
  },
  mixins: [open,randomSelect],
  data() {
    return {
      bili_name: "",
      // 随机投注数组
      randomBet: [],
      // 投注号码数组
      betArr: [],
      popupShow: false,
      count: 0,
      // 投注倍数
      bili: 1,
      // 追加期数
      qishu: 1,
      // 是否追停
      zjjt: false,
      chaseStop: false,
      totalMoney:0,
      shareBet:{}
    };
  },
  watch: {
    betArr(data) {
      this.compute(data)
      this.allRetNum(this.$store.state.betStr);
    },
    qishu(){
      this.compute(this.betArr)
    },
    bili(){
      this.compute(this.betArr)  
    },
    randomShow(data){
      this.betArr=data
      this.compute(data)
      this.allRetNum(data)
    }
  },
  computed: {
    randomShow(){
      return this.$store.state.betStr
    }
  },
  methods: {
    // 金额计算
    compute(data){
      this.totalMoney=0
       for(let i=0,len=data.length;i<len;i++){
        for(let j=0,leng=data[i].length;j<leng;j++){
          this.totalMoney+=(data[i][j].bet_count*(data[i][j].money*10)*this.bili*this.qishu)
        }
      }
    },
    // 后退
    back() {
      window.history.back();
    },
    // 删除投注
    delBet(e) {
      this.count=0
      let index = e.currentTarget.dataset.index;
      this.$store.commit("delBet", index);
      this.betArr = this.$store.state.betStr;
    },
    // 投注号码超出容器点击详情弹出查看投注详情
    details(e) {
      // this.popupShow=true
      // console.log(this.$refs.num[0].innerText)
      // let pop=this.$refs.pop
      // console.log(pop)
      // let num=this.$refs.num
      // for(let i=0;i<this.$refs.num.length;i++){
      //     pop.innerHTML+=num[i].innerText+'&nbsp;'
      // }
      let str = e.currentTarget.innerText;
    },
    // 房间模式机选数据处理
    roomRandomDispose(num, length){
      console.log(length)
      let betStr = {};
      // 判断是否为带位数
      if(this.$store.state.betMsg.lists){
        // 每个位数创建一个数组做前端展示格式
        let random = new Array(length).fill("-");
        for(let i=0;i<num.length;i++){
          let tens=Math.floor(num[i] / this.$store.state.leng)
          let unit = parseInt(num[i] % this.$store.state.leng);
          random.splice(tens, 1, this.$store.state.betMsg.lists[tens].list[unit].bili_name);
          betStr.bili_id = this.$store.state.betMsg.lists[tens].list[unit].id;
        }
        betStr.bili_name = random.join(",")
      }else{
        let NoArr=[]
        for(let i=0;i<num.length;i++){
          NoArr.push(this.$store.state.betMsg.list[num[i]].bili_name);
          betStr.bili_id = this.$store.state.betMsg.list[num[i]].id
        }
        if(this.$store.state.wanfa=="不定胆"){
          betStr.betNumbers = NoArr.join(",")
        }else{
          betStr.bili_name = NoArr.join(",")
        }
      }
      betStr.wanfa_type = this.$store.state.betMsg.name;
      betStr.point = 2;
      betStr.money=2
      betStr.bet_count = 1;
      betStr.multiple_count = 1;
      betStr.totalMoney=2
      this.randomBet.push(betStr);
      this.$store.commit("betStr", this.randomBet);
      this.randomBet = [];
    },
    // 直选模式机选数据处理
    directRandomDispose(num, length){
      console.log(this.$store.state.betMsg)
      let betStr = {};
      if(this.$store.state.wanfa=="连码" || this.$store.state.wanfa=="合肖" || this.$store.state.wanfa=="生肖连" || this.$store.state.wanfa=="尾数连" || this.$store.state.wanfa=="全不中"){ // 区分六合彩
        betStr.wanfa_id=this.$store.state.betMsg.list[0].id
        betStr.money=this.$store.state.everyBetRental
        let arr=[]
        for(let i=0;i<num.length;i++){
          arr.push(this.$store.state.betMsg.listma[num[i]].name)
        }
        betStr.numbers=arr.join(",")
        betStr.bet_count=1
        betStr.isbetcount=1
        betStr.wanfa_type=this.$store.state.betMsg.list[0].wanfa_parentname+","+this.$store.state.betMsg.list[0].wanfa_name
      }else{
        // 判断是否为带位数
        if(this.$store.state.betMsg.lists){
          // 每个位数创建一个数组做前端展示格式
          var random = new Array(length).fill("-");
          for(let i=0;i<num.length;i++){
            let tens=Math.floor(num[i] / this.$store.state.leng)
            let unit = parseInt(num[i] % this.$store.state.leng);
            console.log(tens,unit)
            if(this.$store.state.wanfa=="定位胆"){
              random.splice(tens, 1, this.$store.state.betMsg.lists[tens].list[unit].wanfa_name);
              betStr.wanfa_id = this.$store.state.betMsg.lists[tens].wanfa_id;
            }else{
              random.splice(i, 1, this.$store.state.betMsg.lists[tens].list[unit].wanfa_name);
              betStr.wanfa_id = this.$store.state.betMsg.lists[tens].wanfa_id || this.$store.state.betMsg.wanfa_id;
            }
          }
          betStr.numbers = random.join(",")
        }else{
          var NoArr=[]
          for(let i=0;i<num.length;i++){
            NoArr.push(this.$store.state.betMsg.list[num[i]].wanfa_name);
            betStr.wanfa_id = this.$store.state.betMsg.list[num[i]].id || this.$store.state.betMsg.wanfa_id
          }
          if(this.$store.state.gameType.id==1){
            betStr.isbetcount=0
            betStr.wanfa_name=NoArr.join(",")
          }else{
            betStr.multiple_count=this.bili
            betStr.numbers = NoArr.join(",")
          }
        }
        betStr.wanfa_type = this.$store.state.betMsg.name;
        if(this.$store.state.wanfa=="组三"){
          betStr.bet_count=2
          betStr.totalMoney=4
        }else{
          if(this.$store.state.childWanfa=='后二和值' || this.$store.state.childWanfa=='前二和值'){
            let arr=[]
            arr.push(random)
            betStr.bet_count=this.common.combinationCount(this.$store.state.childWanfa,arr)
            betStr.totalMoney=betStr.bet_count*2
          }else{
            betStr.bet_count=1
            betStr.totalMoney=2
          }
        }
        betStr.money=2
      }
      this.randomBet.push(betStr);
      this.$store.commit("betStr", this.randomBet);
      this.randomBet = [];
    },
    // 机选调用
    randomCall(){
      this.random()
      if(this.$store.state.gameType.type==0){
        if(this.$store.state.betMsg.lists){
          this.directRandomDispose(this.$store.state.random,this.$store.state.betMsg.lists.length)
        }else{
          this.directRandomDispose(this.$store.state.random,this.$store.state.betMsg.list.length)
        }
      }else{
        if(this.$store.state.betMsg.lists){
          this.roomRandomDispose(this.$store.state.random,this.$store.state.betMsg.lists.length)
        }else{
          this.roomRandomDispose(this.$store.state.random,this.$store.state.betMsg.list.length)
        }
      }
    },
    // 机选一次
    onceRandom() {
      this.randomCall();
    },
    // 机选五次
    quinticRandom() {
      this.randomCall();
      this.randomCall();
      this.randomCall();
      this.randomCall();
      this.randomCall();
    },
    // 清除房间内所有投注
    clearAll() {
      this.count=0
      this.$store.commit("clearCount");
      this.betArr=[]
    },
    // 注数处理
    allRetNum(num) {
      this.count=0
      for (let i = 0; i < num.length; i++) {
        for (let j = 0; j < num[i].length; j++) {
          this.count+=num[i][j].bet_count
        }
      }
    },
    // 投注数据处理
    dispose(data,arr){
      for(let i=0;i<data.bet_count;i++){
        let betObj={}
        betObj.bet_count=1
        betObj.bili_id=data.bili_id[i]
        betObj.bili_name=data.bili_name[i]
        betObj.multiple_count=data.multiple_count
        betObj.point=data.point
        betObj.unit_type=data.unit_type
        betObj.wanfa_type=data.wanfa_type
        arr.push(betObj)
      }
    },
    // 投注成功后更新用户资料金额
    user_reqest(){
      this.$api.userDetails().then(res=>{
        const loginMsg=JSON.stringify(res.data.data)
        this.user=res.data.data
        localStorage.setItem('loginTime', loginMsg)
        setTimeout(function(){
            this.loading=true
        }.bind(this),1500)
      })
    },
    // 提交投注
    submitBet() {
      let _this=this
      this.popupShow = false
      if (this.$store.state.betStr.length > 0) {
        if(this.$store.state.gameType.id==1){
          let str = [];
          this.$store.state.betStr.forEach(function(item, i) {
            item.forEach(function(t, i) {
              let obj = {};
              obj.isbetcount = t.isbetcount;
              obj.wanfa_id = t.wanfa_id;
              obj.wanfa_name = t.wanfa_name;
              obj.money = t.money;
              obj.point = t.point;
              obj.numbers=t.numbers
              obj.wanfa_type = t.wanfa_type;
              obj.betcount=t.bet_count
              str.push(obj);
            });
          });
          let bet = {};
          // 添加期号游戏类型
          bet.qihao = this.$store.state.choice_no;
          bet.betarr = JSON.stringify(str);
          this.$api.subBet(bet).then(res => {
            if(res.data.result_code==0){
              // this.showToast("text","投注成功")
              this.confirm({
                title: "温馨提示",
                content: "投注成功,是否分享注单",
                confirmText: '继续投注',
                cancelText: '分享注单',
                onCancel() {
                  _this.$router.push({
                    name:"互动大厅",
                    params:bet
                  })
                }
              });
              console.log(bet)
              this.user_reqest()
              setTimeout(()=>{
                window.history.back();
              },500)
            }else{
              this.showToast("text",res.data.result_desc)
            }
          });
        }else if (this.$store.state.gameType.type == 0) {
          // 直投模式          
          let str = [];
          this.$store.state.betStr.forEach(function(item, i) {
            item.forEach(function(t, i) {
              let obj = {};
              // obj.isbetcount = "1";
              obj.wanfa_id = t.wanfa_id;
              if(_this.$store.state.wanfa=="不定胆" || _this.$store.state.wanfa=="组三" || _this.$store.state.wanfa=="组六"){
                obj.numbers=t.numbers.replace(/,/g, "")
              }else{
                obj.numbers = t.numbers;
              }
              obj.money = t.money;
              obj.bet_count=t.bet_count
              obj.unit_type=t.unit_type
              obj.totalMoney=t.totalMoney
              obj.multiple_count = _this.bili;
              // obj.point = t.point;
              obj.wanfa_type = t.wanfa_type;
              str.push(obj);
            });
          });
          let bet = {};
          // 添加期号游戏类型
          bet.qihao = this.$store.state.choice_no;
          bet.baseWanFaID = this.$store.state.gameType.id;
          // bet.isbetcount="0"
          bet.betarr = JSON.stringify(str);
          this.$api.directSubmit(bet).then(res => {
            if(res.data.result_code==0){
              // this.showToast("text","投注成功")
              this.confirm({
                title: "温馨提示",
                content: "投注成功,是否分享注单",
                confirmText: '继续投注',
                cancelText: '分享注单',
                onCancel() {
                  _this.$router.push({
                    name:"互动大厅",
                    params:this.betArr
                  })
                }
              });
              this.user_reqest()
              setTimeout(()=>{
                window.history.back();
              },500)
            }else{
              this.showToast("text",res.data.result_desc)
            }
          });
        } else {
          // 房间模式
          let str = [];
          // 投注数据处理
          let betNumber = JSON.parse(JSON.stringify(this.$store.state.betStr));
          betNumber.forEach((item, i)=>{
            if(item[0].wanfa_type=="猜双面" || item[0].wanfa_type=="猜数字" || item[0].wanfa_type=="猜龙虎"){
              item.forEach((t, i)=>{
                t.bili_name = t.bili_name.replace(/-/g, "").replace(/,/g, "");
                if(t.bili_id.length>1){
                  t.bili_id = t.bili_id.replace(/-/g, "").replace(/,/g, "");
                  t.bili_id=t.bili_id.split("|")
                  t.bili_name=t.bili_name.split("")
                  t.multiple_count=_this.bili
                  _this.dispose(t,str)
                }else{
                  str.push(t);
                }
              });
            }else if(item[0].wanfa_type=="直选"){
              let betMsg=JSON.parse(JSON.stringify(item))
              str.push(betMsg)
            }else{
              let betMsg=JSON.parse(JSON.stringify(item))
              for(let i=0,len=betMsg.length;i<len;i++){
                str.push(betMsg[i])
              }
            }
          });
          let bet = {};
          bet.betStr = JSON.stringify(str);  
          // 添加期号、游戏类型、追号、倍率、追停
          bet.choice_no = this.$store.state.choice_no;
          bet.game_type = this.$store.state.gameType.game_type;
          if(this.qishu>1){
            bet.multiple = this.bili;
            bet.times = this.qishu;
            bet.zjjt = this.zjjt == true ? 1 : 0;
            this.$api.afterNo(bet).then(res=>{
              if(res.data.result_code==0){
                // this.showToast("text","投注成功")
                this.confirm({
                  title: "温馨提示",
                  content: "投注成功,是否分享注单",
                  confirmText: '继续投注',
                  cancelText: '分享注单',
                  onCancel() {
                    _this.$router.push({
                      name:"互动大厅",
                      params:this.betArr
                    })
                  }
                });
                this.user_reqest()
                setTimeout(()=>{
                  window.history.back();
                },500)
              }else{
                this.showToast("text",res.data.result_desc)
              }
            })
          }else{
            this.$api.roomSubmit(bet).then(res => {
              if(res.data.result_code==0){
                // this.showToast("text","投注成功")
                this.confirm({
                  title: "温馨提示",
                  content: "投注成功,是否分享注单",
                  confirmText: '继续投注',
                  cancelText: '分享注单',
                  onCancel() {
                    _this.$router.push({
                      name:"互动大厅",
                      params:this.betArr
                    })
                  }
                });
                setTimeout(()=>{
                  window.history.back();
                },500)
              }else{
                this.showToast("text",res.data.result_desc)
              }
            });
          }
          this.qishu=1
          this.zjjt=false
        }
      }
      this.clearAll();
    }
  },
  created() {
    // 选号
    this.betArr = this.$store.state.betStr;
  },
};
</script>

<style scoped lang="less">
.button {
  width: 30%;
  height: 40px;
  text-align: center;
  padding: 10px 0;
  box-sizing: border-box;
}
// 投注详情弹出框
.popup {
  position: absolute;
  background-color: #fff;
  border-radius: 5px;
  width: 80%;
  top: 30%;
  margin: 0 10%;
  box-sizing: border-box;
  text-align: center;
  padding: 5px 10px;
  z-index: 102;
  h3{
    font-size: 16px;
    font-weight: 500;
  }
  p {
    display: block;
    font-size: 15px !important;
    color: #333 !important;
  }
  p:nth-child(3) {
    color: #3c97eb !important;
  }
  div {
    box-sizing: border-box;
    width: 100%;
    padding: 5px 8px;
    color: #666 !important;
    font-size: 14px;
    line-height: 18px;
    text-align: left;
  }
  .content{
    p{
      float: left;
    }
    .maincontent{
      padding: 0;
      text-align: left;
      span{
        width: 100%;
      }
    }
  }
  .button{
    display: flex;
    border-top: 1px solid #ddd;
    padding-top: 10px;
    p:nth-child(1){
      display: block;
      border-right: 2px solid #ddd;
      width: 50%;
      text-align: center;
      height: 20px;
    }
    p:nth-child(2){
      display: block;
      height: 20px;
      width: 50%;
      text-align: center;
      color: #e54b55;
    }
  }
}
// 遮罩层
.shade {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
  top: 0;
  left: 0;
  z-index: 101;
}
.betRoom {
  height: 100%;
  .addBet {
    width: 100%;
    background-color: #f5f5f5;
    text-align: center;
    padding: 60px 0 11px;
    p {
      font-size: 14px;
      color: #333;
      span {
        color: #e54b55;
      }
    }
    .quickpick {
      display: flex;
      justify-content: space-around;
      padding: 14px 15px 0;
      div {
        width: 110px;
        height: 35px;
        border: 1px solid #ddd;
        border-radius: 3px;
        background-color: #fff;
        line-height: 35px;
        i {
          font-size: 13px;
          color: #888;
        }
      }
    }
  }
  ul {
    background-color: #fff;
    padding: 10px 15px 10px 15px;
    height: 460px;
    overflow-y: scroll; 
    li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 33px;
      box-shadow: 0 0 5px 0.5px #ddd;
      border-radius: 5px;
      padding: 10px 15px 10px 10px;
      margin-bottom: 10px;
      div {
        & > span {
          display: inline-block;
          width: 100%;
          height: 25px;
          color: #e54b55;
          letter-spacing: -1px;
          font-size: 15px;
          overflow: hidden;
          -webkit-line-clamp: 1;
        }
        p {
          color: #888;
          font-size: 12px;
        }
      }
      i {
        font-size: 15px;
        color: #e54b55;
      }
    }
  }
  #footerBet {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 1;
    .betNum {
      font-size: 12px;
      background-color: #f5f5f5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 15px;
      border-top: 1px solid #ddd;
      div {
        input {
          width: 50px;
          height: 25px;
          border: 1px solid #ddd;
          border-radius: 3px;
          margin: 0 11px;
          font-size: 12px;
          text-align: center;
          &:focus {
            outline-style: none;
          }
        }
      }
      div:nth-child(3) {
        margin-left: 35px;
        & > span {
          display: inline-block;
          width: 15px;
          height: 15px;
          vertical-align: -5px;
          border: 1px solid #ddd;
          border-radius: 2px;
          text-align: center;
          i {
            color: #e54b55;
            font-size: 10px;
            vertical-align: 5px;
          }
        }
      }
    }
    .betAffrim {
      background-color: #333;
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      & div:nth-child(1) {
        .button();
        span {
          display: inline-block;
          width: 100%;
          border-right: 1px solid #fff;
        }
      }
      & div:nth-child(2) {
        text-align: center;
        width: 50%;
        padding: 7px 0;
        p {
          line-height: 13px;
        }
      }
      & div:nth-child(3) {
        .button();
        background-color: #e54b55;
      }
    }
  }
}
</style>
