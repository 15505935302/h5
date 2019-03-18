<template>
  <div id="personal">
    <oneHead class="head_">
      <ButtonTab>
        <ButtonTabItem selected @on-item-click="newWin_request" :class="{writhcolor:newWinShow==false}">
          <span>个人资料</span>
        </ButtonTabItem>
        <ButtonTabItem @on-item-click="yesterWin_request" :class="{redback:newWinShow==false}">
          <span>等级头衔</span>
        </ButtonTabItem>
      </ButtonTab>
    </oneHead>
    <div class="">
      <ul v-show="newWinShow">
        <li @click="imgshow = true , imgorsex=true" class="personal">
          <span>头像</span>
          <div>
            <span><img id="userImg" :src="data.user_photo" alt=""></span>
          </div>
          <i class="iconfont">&#xe655;</i>
        </li>
        <li class="personal">
          <span>账号</span>
          <span>{{data.account}}</span>
        </li>
        <li class="personal">
          <span>昵称</span>
          <span v-if="data.nick_name" >{{data.nick_name}}</span>
          <input v-else class="ddd"   id="ddd" v-model="namefirst" placeholder="最多5个汉字，修改过不得更改" oninput="value=value.replace(/[^\w\u4E00-\u9FA5]/g, '')" maxlength='5'>
        <li class="personal" @click="imgshow = true ,imgorsex=false">
          <span>性别</span>
          <div>
            <span><em id='sex'>{{data.sex==1?"男":'女'}}</em></span>
          </div>
          <i class="iconfont">&#xe655;</i>
        </li>
      </ul>
      <ul style="background:#fff;height:calc(100vh - 153.5px);" v-show="yesterdayWinShow">
        <div class="levelTitleHeader">
            <img :src="data.user_photo" alt="">
            <div class="rightInfo">
              <div>
                <span>{{data.account}}</span>
                <span class="VIP1">VIP{{data.level}}</span>
              </div>
              <span>头衔：{{LevelName.userLevelName}}</span>
              <span>积分：{{data.all_point}}</span>
            </div>
        </div>
        <div class="levelBar fix">
          <div class="left">
            {{LevelName.userLevelName}}
          </div>
          <p class="u-progress"><span id="progress" class="pgbar" :style="{ width: this.percentage + '%' }"></span><span class="pg">{{this.percentage}}%</span></p>
          <div class="right" v-if="loading">
            {{this.level[Level].level_name}}
          </div>
        </div>
        <div v-if="loading" class="textJi">距离下一级需要{{this.level[Level].recharge_fee-data.all_point}}分，每充值1元加1分</div>
        <div class="line"></div>
        <div class="textJ2">等级机制</div>
        <table class="userGrade" width="90%;">
          <tbody>
          <tr>
            <th>等级</th>
            <th>头衔</th>
            <th>成长积分</th>
            <th>晋级奖金</th>
          </tr>
          <tr v-for="(item, index) in level" :key="index">
            <th>VIP{{item.id}}</th>
            <th v-if="loading">{{item.level_name}}</th>
            <th v-if="loading">{{item.recharge_fee}}</th>
            <th v-if="loading">{{item.promotion_bonus}}</th>
          </tr>
          </tbody>
        </table>
      </ul>
    </div>
    <button  v-show="newWinShow" @click="update">保存</button>
    <div @click="imgshow=false" v-if="imgshow" class="mask"></div>
    <div v-if="imgshow" class="photo">
      <ul v-if="imgorsex">
        <li v-for="(item, index) in photolist.list" :key="index">
          <img @click="choose(index)" :class="{redbor:index==col}" :src="item.user_photo" alt="">
        </li>
      </ul>
      <div v-else>
        <span @click="sexchoose($event)">男</span>
        <span @click="sexchoose($event)">女</span>
      </div>
      <button  v-if="imgorsex" @click="confirm">确定</button>
      <button  v-else @click="confirm2">确定</button>
    </div>
  </div>

</template>

<script>
  import oneHead from "../components/one_head"
  import { ButtonTab, ButtonTabItem } from 'vux'
  export default {
    components:{
      oneHead,
      ButtonTab,
      ButtonTabItem,
    },
    data(){
      return {
        newWinShow:this.$route.params.msg?false:true,
        yesterdayWinShow:this.$route.params.msg?true:false,
        data:{},
        level:{},
        LevelName:"",
        Level:'0',
        percentage:'0',
        loading:false,
        photolist:'',
        col:"0",
        photourl:"",
        imgshow:false,
        imgorsex:true,
        namefirst:"",
      }
    },
    methods:{
      newWin_request(){
        this.yesterdayWinShow=false
        this.newWinShow=true
      },
      yesterWin_request(){
        this.yesterdayWinShow=true
        this.newWinShow=false
      },
      // 头像选择
      choose(index){
        this.imgorsex = true
        this.col = index
        this.photourl = this.photolist.list[this.col].user_photo;
      },
      confirm(){
        document.getElementById("userImg").src = this.photourl
        this.imgshow = false
      },
      confirm2(){
        
      },
      sexchoose(e){
        document.getElementById("sex").innerHTML = e.target.innerHTML
        this.imgshow = false
      },
      // 用户头像性别修改
      update(){
          let sex =""
          if(document.getElementById("sex").innerHTML=="男"){
            sex=1
          }else{
            sex=2
          }
          let nick_name = this.namefirst
          let obj={
            "sex":sex,
            "nick_name":nick_name,
            "user_photo":this.photourl,
          }
          this.$api.update(obj).then(res=>{
            if(res.data.data == "ok"){
              this.showToast("text",'设置成功')
              this.$router.push({
                name: 'User',
                })
            }else{
              this.showToast("text",res.data.result_desc)
            }
          })
      },
      //用户信息获取
      userDetails(){  
        this.$api.userDetails().then(res=>{
            this.data = res.data.data
            this.Level = Number(this.data.level)
            this.userLevel()
        })
      },
      //用户等级获取
      userLevel(){  
        this.$api.userLevel().then(res=>{
            this.level = res.data.data
            this.loading=true
            this.percentage = Math.floor((this.data.all_point-this.level[this.Level-1].recharge_fee)/(this.level[this.Level].recharge_fee-this.level[this.Level-1].recharge_fee)*100) 
            console.log(this.percentage)
        })
      },
      //用户等级头衔获取
      userLevelName(){  
        this.$api.userLevelName().then(res=>{
            this.LevelName = res.data.data
            console.log(res)
        })
      },
      photo(){
        this.$api.photo({"page":1,"pageSize":60}).then(res=>{
            console.log(res)
            this.photolist = res.data.data
        })
      }
    },
    mounted(){
      this.userDetails()
      this.userLevelName()
      this.photo()
      console.log(this.$route.params.msg)
      console.log(this.newWinShow)
      console.log(this.yesterdayWinShow)
    }
  }
</script>


<style lang='less' scoped>
  .head_ span{
    width: 70px;
    display: inline-block;
    font-size: 12px;
  }
  .personal{
    padding: 9px 15px;
    border-bottom: 1px solid #ddd;
    background-color: #ffffff;
    padding-left: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .personal span{font-size: 16px;}
  .personal div{width: 80%;}
  .personal div img{width: 50px;height: 50px;border-radius: 6px;float: right;}
  .personal i{color: #ddd;}
  .personal .ddd{color: #888; height: 40PX;width:280px;border: none;margin: 0;padding:0;text-align: right;font-size: 14px;&:focus{
          border: none;
      }}
  .personal div em{float: right;font-style:normal}
  /*等级头衔*/
  .levelTitleHeader{background:linear-gradient(180deg,rgba(229,75,85,1),rgba(181,56,64,1));min-height: 100px; padding: 20px 16px;}
  .levelTitleHeader img{width: 60px;height: 60px;border-radius: 50%;display: block;float: left;}
  .levelTitleHeader .rightInfo{float: left;color: #fff;padding: 10px 0 0 20px;}
  .levelTitleHeader .rightInfo div{font-size: 17px;}
  .levelTitleHeader .rightInfo div span{font-size: 15px;}
  .levelTitleHeader .rightInfo div .VIP1{background:linear-gradient(-52deg,rgba(201,134,18,1),rgba(244,174,24,1),rgba(237,221,39,1));border-radius:2px;margin-left: 18px;padding: 0 3px;font-size: 13px;}
  .levelTitleHeader .rightInfo>span{font-size: 12px;margin-right: 22px;}
  .levelBar .left, .levelBar .right{width: 11.9%;float: left;height: 12px;line-height: 12px;font-size: 16px;}
  .levelBar .left{left: -3px;}
  .levelBar p{display: block;width: 76%;float: left;}
  .u-progress .pgbar{width: 100%;height: 12px;border-radius: 4px;background: rgba(229,75,85,1);display: block;}
  .levelBar .u-progress .pg{position: absolute;top: -4px;text-align: center;width: 100%;font-size: 12px;}
  .u-progress{height: 12px;position: relative;border-radius: 20px;background: hsla(0,0%,89%,.65);display: block}
  .levelBar{position: relative;font-size: 20px;width: 90%;margin: 20px auto;}
  .levelBar .right{right: -3px;text-align: right;}
  .textJi{clear: both;color: #888;font-size: 14px;padding: 10px 20px 0 20px;}
  .textJ2{color: #333;font-size: 16px;margin-left: 20px;width: auto;height: 13px;border-left: 3px solid #E54B55;line-height: 13px;padding-left: 10px;border-radius: 1px;margin: 10px 20px;}
  .line{width: 100%;height: 13px;background: #f5f5f5;border-top: 0.9px solid #ddd;border-bottom: 0.9px solid #ddd;margin-top: 10px;}

  .userGrade{
    text-align: center;
    color: #666;
    table-layout: fixed;
    font-size: 16px;
    margin: 0 auto;
  }
  .userGrade td,.userGrade th{
    border: 1px solid #ddd;
    font-weight: 400;
    line-height: 2.2em;
  }
  .userGrade th{
    background: #F6ECED;
    font-weight: 400;
    line-height: 2.2em;
  }
  table{border-collapse: collapse;border-spacing: 0;}
  button{
      width: 90%;
      background-color: #E54B55;
      border: none;
      height: 35px;
      margin: 0 5%;
      font-size: 14px;
      color: white;
      border-radius: 5px;
      margin-top: 40px;
      &:focus{
          outline: none;
      }
  }
.photo{
  position: fixed;
  bottom: 0;
  width: 100vw;
  background: #fff;
  z-index: 20;
   ul{
     width: 100%;
     height: 120px;
     padding: 20px 0 ;
     display: -webkit-flex;
     display: flex;
     overflow-x: scroll;
     li{
       justify-content: flex-start;
       float: left;
       width: 60px;
       height: 60px;
       list-style: none;
       margin: 0 10px;
        img{
          width: 70px;
          height: 70px;
          padding: 2px;
        }
        .redbor{
          border: 2px solid #E54B55;
        }
     }
   }
   button{
     margin-bottom: 30px;
     margin-top:10px;
   }
   span{
     display: block;
     width: 100%;
     height: 30px;
     font-size: 16px;
     line-height: 30px;
     text-align: center;
     padding: 10px 0 ;
   }
}
.mask{
  position: absolute;
  z-index: 9;
  background: rgba(222, 222, 222, 0.3);
  width: 100vw;
  height: 100vh;
  top: 0;
}
.writhcolor{
  color: #fff !important;
  background: #E54B55 !important;
}
.redback{
  color: #E54B55 !important;
  background: #fff !important;
}
</style>

