<template>
  <div>
    <Head>
      <span slot="pageName">玩家信息</span>
    </Head>
    <div class="main">
      <div class="founduserhead">
        <div class="bg-playuser">
          <img src="../assets/img/web/bg_player_information.png">
        </div>
        <div class="playerHeadImg">
          <img :src="data.head_img" alt>
        </div>
      </div>
      <div class="playerInfo">
        <h2>
          <em>{{data.nick_name}}</em>
          <span v-if='data.sex==1' class="iconfont man">&#xe685;</span>
          <span v-if='data.sex==2' class="iconfont women">&#xe686;</span>
        </h2>
        <div class="playerBetInfo">
          <div>
            <p>
              <span>
                <span class="colorRed">￥ {{data.total}}</span>
              </span>
              <br>
              <i>今日奖金</i>
            </p>
          </div>
          <div>
            <p>
              <span class="rank">{{data.user_level_name}}</span>
              <br>
              <i>头衔</i>
            </p>
          </div>
          <div>
            <p>
              <span class="VIP">
                <ins class="vip">VIP{{data.user_level}}</ins>
              </span>
              <br>
              <i>等级</i>
            </p>
          </div>
        </div>
      </div>
      <div class="cardIcon">
        <p>Ta喜欢的彩票</p>
        <ul class="cardIconList fix">
            <li v-for="(item, inde) in iconarr" :key="inde">
              <a>
                <img :src="getImgUrl2(item)" alt="">
              </a>
            </li>
          <template v-for="(item, ind) in grayarr" >
            <li v-if="ind<10-iconarr.length" :key="10*ind+0.1">
                <a>
                  <img :src="getImgUrl2(item,'gray')" alt="">
                </a>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Head from "../components/header";
export default {
  components: {
    Head
  },
  data() {
    return {
      data:this.$route.params.msg,
      iconarr:[],
      loading:false,
      grayarr:[],
    };
  },
  methods: {
    // id鉴别彩种
    filt(id){
      let x
      switch(id){
        case 22:
        x = '07'
        break;
        case 20:
        x = '07'
        break;
        case 30:
        x = '07'
        break;
        case 14:
        x = '04'
        break;
        case 18:
        x = '04'
        break;
        case 19:
        x = '04'
        break;
        case 21:
        x = '01'
        break;
        case 12:
        x = '01'
        break;
        case 11:
        x = 14
        break;
        case 4:
        x = 18
        break;
        case 23:
        x = 15
        break;
        case 10:
        x = 16
        break;
        case 15:
        x = '08'
        break;
        case 1:
        x = '06'
        break;
        case 3:
        x = '09'
        break;
        case 5:
        x = 17
        break;
        case 2:
        x = '02'
        break;
      }
      return x
    },
    getImgUrl2(icon,col){
      if(col){
        return   "../static/img/graytb-"+icon+".png"
      }else{
        return   "../static/img/tb-"+icon+".png"
      }
      },
    imgarr(){
      console.log(65656)
      for(let i=0,len=this.data.play_game_list.length;i<len;i++){
        console.log(this.data.play_game_list[i])
        let num = this.filt(this.data.play_game_list[i])
        console.log(num)
        if(this.iconarr.indexOf(num)==-1){
          this.iconarr.push(num)
        }
      }
      for(let i=1;i<18;i++){
        if(i<10){
          i = '0'+i
        }
        if(this.iconarr.indexOf(i)==-1){
          this.grayarr.push(i)
        }
      }
      this.loading = true
    }
  },
  mounted() {
    this.imgarr()
    console.log(this.$route.params.msg)
  }
};
</script>

<style scoped lang='less'>
.women{
   color: rgb(255, 79, 79)
}
.man {
  color: rgb(120, 157, 249);;
}
* {
  box-sizing: border-box;
  font-family: PingFangSC-Regular;
  font-weight: Regular;
}
p {
  font-family: PingFangSC-Regular;
  font-weight: Regular;
}
.main {
  width: 100%;
  padding-top: 50px;
  background-color: #f5f5f5;
  overflow: hidden;
}
.founduserhead {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
}
.bg-playuser > img {
  margin-left: -10%;
  width: 120%;
  height: 156px;
  padding: 0;
}
.playerHeadImg {
  border-radius: 50%;
  border: 4px solid #fff;
  position: absolute;
  bottom: -31.5px;
  margin-left: -41.5px;
  overflow: hidden;
  left: 50%;
  width: 90px;
  height: 90px;
}
.playerHeadImg img {
  width: 83px;
  height: 83px;
}
.playerInfo {
  width: 100%;
  height: 150px;
  padding-top: 30px;
  background-color: #fff;
}
.playerInfo h2 {
  text-align: center;
  font-size: 12px;
  color: #333333;
}
em,
i {
  font-style: inherit;
}
.playerBetInfo {
  width: 100%;
  margin: 30px 0;
}
.playerBetInfo > div {
  width: 32%;
  display: inline-block;
}
.playerBetInfo > div:nth-of-type(2) {
  border-left: 1px solid #dddddd;
  border-right: 1px solid #dddddd;
}
.playerBetInfo > div p {
  color: #888888;
  font-size: 10px;
  text-align: center;
}
.playerBetInfo p i {
  margin-top: 10px;
  display: block;
}
.colorRed {
  font-size: 15px;
  color: #e54b55;
}
.rank {
  font-size: 15px;
  color: #333333;
}
.playerBetInfo > div p .VIP {
  background: url("../assets/img/web/bg_vip.png");
  background-size: 100% 100%;
  border-radius: 1px;
  padding: 4px 6px;
}
.vip {
  width: 35px;
  height: 17px;
  color: #fff;
  font-size: 12px;
}
.cardIcon {
  margin-top: 10px;
  background: #fff;
  height: 100%;
}
.cardIcon > p {
  padding: 10px 0 20px 14px;
  color: #333333;
  font-size: 14px;
}.cardIconList{
  display: block;
  height: calc(50vh);
  margin: 0 20px;
}.cardIconList li{
    display: inline-block;
    line-height: 1em;
    width: 49px;
    height: 49px;
    text-align: center;
    margin: 11px 11px;
}
.cardIconList li a{
    display: inline-block;
}.cardIconList li img{
    width: 49px;
    height: 49px;
}
</style>
