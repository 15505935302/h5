<template>
  <div id="home">
    <!-- 头部 -->
    <header class="home_header">
      <i class="iconfont service" style="opacity: 0;">&#xe60f;</i>
      <img src="../assets/img/logo_500vip.png">
      <a
        href="https://f18.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=55229&configID=80293&jid=1334393335&s=1"
      >
        APP <i class="iconfont service">&#xe72e;</i>
      </a>
    </header>
    <!-- 轮播图 -->
    <div class="swiper-container">
      <swiper :options="swiperOption" v-if="showSwiper">
        <!-- slides -->
        <swiper-slide v-for="(item, index) in banner" :key="index">
          <img @click="clickurl(item)" class="swiper-img" :src="item.banner_imgurl" alt>
        </swiper-slide>
        <!-- Optional controls -->
        <div id="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <!-- 公告 -->
    <div class="announcement">
      <div>
        <i class="iconfont">&#xe6c8;</i>
        <ul ref="notice">
          <li
            v-for="(item, index) in Notice.list"
            :key="index"
            @click="annli(item)"
          >{{item.title}}</li>
        </ul>
      </div>
    </div>
    <!-- 充值客服助手 -->
    <div class="function">
      <div class="helper" @click="dragon">
        <p>
          <span>长龙助手</span>
          <br>
          <span>红单神器好玩易中</span>
        </p>
        <img src="../assets/img/web/btn_home_assistant.png" alt>
      </div>
      <router-link to="/recharge" class="recharge" tag="div">
        <img src="../assets/img/web/home_ic_recharge.png" alt>
        <span>充值中心</span>
      </router-link>
      <div class="recharge">
        <a
          href="https://f18.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=55229&configID=80293&jid=1334393335&s=1"
          class="recharge"
        >
          <img src="../assets/img/web/home_ic_service.png" alt>
          <span>联系客服</span>
        </a>
      </div>
    </div>
    <!-- 彩种 -->
    <div class="kind">
      <Lottery :category="lottery">
        <span slot="lottery_name">彩种</span>
        <router-link :to="{name:'AllLottery'}" slot="more_lottery">更多>></router-link>
      </Lottery>
    </div>
  </div>
</template>

<script>
import Lottery from "../components/lottery_kind";
export default {
  components: {
    Lottery
  },
  data() {
    return {
      banner: [],
      lottery: [],
      Notice: {},
      timer: null,
      // 公告条数
      leng:0,
      count:0,
      h:0,
      swiperOption: {
        direction:"horizontal",
        autoplay:{
          autoplay: 4000,
          disableOnInteraction:false,
        },
        loop: true,
        slidesPerView:"auto",
        centeredSlides:true,
        spaceBetween:20,
        loopAdditionalSlides:100,
        pagination:{
          el:"#swiper-pagination"
        }
      }
    };
  },
  watch:{
    Notice(){
      this.$nextTick(()=>{
        this.h=this.$refs.notice.firstChild.offsetHeight
      })
    }
  },
  computed: {
    showSwiper() {
      return this.banner.length;
    },
  },
  methods: {
    //系统公告点击跳转
    annli(item) {
      this.$router.push({
        name: "set_help_details",
        params: {
          item: item
        }
      });
    },
    //系统公告轮播
    systemlunb() {
      let _this=this
      this.count++
      if(this.count==this.leng){
        this.count=0
        _this.$refs.notice.style.transition="all 0s"
      }else{
        _this.$refs.notice.style.transition="all 0.3s"
      }
      let h=this.count*this.h
      this.$refs.notice.style.top=-h+"px"
      this.timer = setTimeout(() => {
        this.systemlunb()
      }, 5000);
      this.$once("hook:beforeDestroy", () => {
        clearTimeout(this.timer);
      });
    },
    //系统公告
    systemNotice() {
      let obj = {
        page_no: 1,
        page_size: 20
      };
      this.$api.systemNotice(obj).then(res => {
        this.Notice = res.data.data;
        this.leng=this.Notice.list.length
      });
    },
    //轮播图跳转链接
    clickurl(url) {
      location.href = url.url;
    },
    // 数据请求
    reqest() {
      // 彩票种类请求
      this.$api.wanfa().then(res => {
        let lottery = res.data.data;
        this.lottery = lottery.slice(0, 9);
        this.$store.commit("lottery", res.data.data);
      });
    },
    // 获取轮播图
    requestBanner() {
      this.$api.banner().then(res => {
        this.banner = res.data.data;
      });
    },
    // 长龙助手点击判断
    dragon() {
      let _this = this;
      let access_token = JSON.parse(localStorage.getItem("access_token"));
      if (access_token) {
        _this.$router.push({
          name: "dragon"
        });
      } else {
        _this.confirm({
          title: "提示",
          content: "请先登录才能查看更多",
          onConfirm() {
            _this.$router.push({
              path: "/login"
            });
          }
        });
      }
    }
  },
  created() {
    this.reqest();
    this.requestBanner();
    this.systemNotice();
  },
  mounted() {
    this.systemlunb();
  }
};
</script>

<style>
/* 头部 */
.home_header {
  background-color: #e54b55;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}
.home_header img {
  width: 60px;
  height: 38px;
  margin-left: 25px;
}
.home_header a{
  color: #fff;
}
.service {
  color: white;
  font-size: 20px;
}

/* 轮播图 */
.swiper-container {
  margin-top: 0.1rem !important;
  width: 100%;
  height: 4.2rem;
  overflow: hidden !important;
  position: relative;
}
.swiper-container .swiper-wrapper .swiper-slide {
  width: 8rem;
  border-radius: 0.12rem;
}
.swiper-container .swiper-wrapper .swiper-slide img {
  width:100%;
  height: 4.11rem;
  border-radius: 0.12rem;
}
.swiper-container .swiper-wrapper .swiper-slide-prev {
  height: 4.11rem !important;
}
.swiper-container .swiper-wrapper .swiper-slide-prev img {
  height: 4.11rem !important;
}
.swiper-container .swiper-wrapper .swiper-slide-next {
  height: 4.11rem !important;
}
.swiper-container .swiper-wrapper .swiper-slide-next img {
  height: 4.11rem !important;
}
.swiper-container .swiper-wrapper .swiper-slide-active {
  width: 8rem;
}
#swiper-pagination {
  position: relative;
  z-index: 100;
  bottom: 1.6em !important;
  text-align: center;
}
.swiper-pagination-bullet{
  background: #fff; 
  opacity: 0.5;
}
.swiper-pagination-bullet-active{
  background: #007aff; 
  opacity: 1;
}

/* 公告 */
.announcement {
  padding: 8px 8px 4px 8px;
}
.announcement div {
  font-size: 12px;
  color: #333;
  border-top: 1px solid #ddd;
  overflow: hidden;
  height: 30px;
  display: flex;
}
.announcement div i {
  margin-right: 15px;
  color: #e54b55;
  font-size: 15px;
  line-height: 32px;
}
.announcement div ul {
  position: relative;
  list-style: none;
}

.announcement div ul li {
  list-style: none;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  width: 330px;
  overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap
}
/* 功能 */
.function {
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px;
}
.function img {
  width: 30px;
  height: 30px;
}
.function div {
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  padding: 5px;
}
.helper {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 45%;
  width: 180px;
  height: 60px;
}
.helper span {
  font-size: 14px;
}
.helper p span:nth-child(3) {
  font-size: 12px;
  color: #888;
  line-height: 30px;
}
.helper p span:nth-child(1) {
  color: #333;
}
.recharge {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 80px;
  height: 60px;
  margin-left: 7px;
  color: #666;
}
.kind {
  margin-bottom: 60px;
}
.redback {
  background: #e54b55 !important;
}
</style>
