<template>
  <div id="chat">
    <Head>
      <span slot="pageName">互动大厅</span>
    </Head>
    <main class="content" ref="content" @click="functionHide">
      <div
        v-for="(item, index) in adoptMsg"
        :key="index"
        :class="[{flexEnd:item.name==userMsg.nick_name},{tall:item.name!=userMsg.nick_name}]"
        @click.stop="getRed($event,item)"
      >
        <div class="userMsg">
          <img :src="item.headImg" alt class="userPhoto">
          <!-- <p>{{item.name}}</p> -->
        </div>
        <div class="tallContent" v-if="item.code=='usual'">{{item.data}}</div>
        <div class="redPacket" v-else-if="item.code=='red'">
          <p>{{item.data}}</p>
          <div class="redStyle">
            <template v-if="item.redPacket.code==0">
              <p>红包来啦</p>
              <p>{{item.redPacket.leaveMsg}}</p>
              <img src="../../static/img/1.png" alt="图片加载错误" class="usualReg">
            </template>
            <template v-else>
              <p>{{item.redPacket.leaveMsg}}</p>
              <p>{{item.redPacket.betMsg}}</p>
              <img src="../../static/img/中奖啦！.png" alt="图片加载错误" class="winRed">
            </template>
          </div>
        </div>
      </div>
    </main>
    <footer class="input">
      <div class="box">
        <input type="text" class="inputBox" v-model="msg">
        <i class="iconfont lian">&#xe6fa;</i>
        <i class="iconfont" v-if="sendStatus" @click.stop="functionShow">&#xe613;</i>
        <i class="iconfont" v-else @click.stop="clickButton">&#xe619;</i>
      </div>
      <div class="functionBlock" v-if="funShow">
        <div class="functionBox" @click.stop="funClick(0)">
          <div class="icon">
            <i class="iconfont">&#xe614;</i>
          </div>
          <span class="functionName">红包</span>
        </div>
      </div>
    </footer>
    <!-- 红包弹出框 -->
    <div class="red" v-if="redShow">
      <h4>发红包</h4>
      <table>
        <tr>
          <td>总金额</td>
          <td>
            <input v-model="redMsg.money" type="text">
          </td>
        </tr>
        <tr>
          <td>红包个数</td>
          <td>
            <input v-model="redMsg.redCount" type="text">
          </td>
        </tr>
        <tr>
          <td>留言</td>
          <td>
            <input v-model="redMsg.leaveMsg" type="text" placeholder="恭喜发财,大吉大利">
          </td>
        </tr>
      </table>
      <div class="btn">
        <div @click="cancel">取消</div>
        <div @click="affirm">确认</div>
      </div>
    </div>
    <div class="shade" v-if="this.shade" @touchmove.prevent @click="cenl"></div>
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
      id: "",
      msg: "",
      sendStatus: true,
      userMsg: {},
      adoptMsg: [],
      // 功能显示
      funShow: false,
      // 发红包显示
      redShow: false,
      redMsg: {
        money: 5,
        redCount: 1,
        leaveMsg: "",
        code: 0, // 普通红包
        betMsg:"", // 中奖期号金额信息
      },
      // 遮罩层
      shade: false,
      // 发炫耀红包获取的投注信息
      betMsg: {}
    };
  },
  watch: {
    msg(data) {
      if (data.length > 0) {
        this.sendStatus = false;
      } else {
        this.sendStatus = true;
      }
    }
  },
  scokets: {
    connect() {
      this.id = this.$socket.id;
    },
    login(val) {
      console.log(val);
    },
    getData(data) {
      console.log(data);
    }
  },
  methods: {
    // 显示功能
    functionShow(id) {
      this.funShow = true;
    },
    // 隐藏功能
    functionHide() {
      this.funShow = false;
    },
    // 选择功能
    funClick(id) {
      if (id == 0) {
        // 发红包功能
        this.funShow = false;
        this.redShow = true;
        this.shade = true;
      }
    },
    // 取消发红包
    cancel() {
      this.redShow = false;
      this.shade = false;
    },
    // 确认发红包
    affirm() {
      if (this.redMsg.leaveMsg == "") {
        this.redMsg.leaveMsg = "恭喜发财,大吉大利";
      }
      let msg = JSON.stringify({
        name: this.userMsg.nick_name,
        data: "发了一个红包",
        redPacket: this.redMsg,
        headImg: this.userMsg.user_photo,
        code: "red"
      });
      this.msg = "";
      this.$socket.emit("chat-message", msg);
      this.redShow = false;
      this.shade = false;
      this.betMsg={}
      this.redMsg={
        money: 5,
        redCount: 1,
        leaveMsg: "",
        code: 0, // 普通红包
        betMsg:"", 
      }
    },
    // 炫耀红包
    flaunt(){
      this.redShow=true;
      this.redMsg.betMsg=this.betMsg.base_wan_fa_name+this.betMsg.qihao+"期,喜中"+this.betMsg.bonus+"元";
      this.redMsg.code=1;
      if (this.redMsg.leaveMsg == "") {
        this.redMsg.leaveMsg = "投入梦想,注定精彩";
      }
    },
    // 领取红包
    getRed(e,msg){
      console.log(msg)
      if(msg.code=="red"){
        console.log(e.currentTarget)
        let dom=e.currentTarget
      }
    },
    // 点击遮罩层取消功能弹框
    cenl() {
      this.redShow = false;
      this.shade = false;
    },
    // 发送消息
    clickButton() {
      let msg = JSON.stringify({
        name: this.userMsg.nick_name,
        data: this.msg,
        headImg: this.userMsg.user_photo,
        code: "usual"
      });
      this.msg = "";
      this.$socket.emit("chat-message", msg);
    },
    // 获取用户信息
    initUser() {
      this.$socket.emit("addUser", this.userMsg.nick_name);
    },
    // 滚动条始终在底部
    scroll() {
      this.$nextTick(() => {
        this.$refs.content.scrollTop = this.$refs.content.scrollHeight;
      });
    }
  },
  created() {
    this.betMsg = this.$route.params;
    console.log(this.betMsg);
  },
  mounted() {
    if(this.betMsg.bonus){
      this.flaunt()
    }
    let _this = this;
    this.userMsg = JSON.parse(localStorage.getItem("loginTime"));
    this.initUser();
    this.sockets.subscribe("message", data => {
      let msg = JSON.parse(data);
      this.adoptMsg.push(msg);
    });
    this.scroll();
  },
  updated() {
    this.scroll();
  }
};
</script>

<style lang="less">
// 红包
.red {
  position: relative;
  width: 70%;
  height: 160px;
  position: fixed;
  background-color: #fff;
  border-radius: 5px;
  left: 15%;
  z-index: 101;
  top: calc(50% - 80px);
  h4 {
    text-align: center;
    line-height: 35px;
    font-size: 15px;
  }
  & > table {
    width: 100%;
    padding: 0px 20px;
    tr {
      td {
        padding: 3px 0;
        color: #333;
        font-size: 13px;
        &:nth-child(2n) {
          width: 75%;
          padding-left: 5px;
        }
        input {
          width: 100%;
          height: 20px;
          border: none;
          border-radius: 2px;
          background-color: #f5f5f5;
          font-size: 13px;
        }
      }
    }
  }
  .btn {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #ddd;
    & > div {
      height: 100%;
      width: 50%;
      text-align: center;
      line-height: 35px;
    }
    & > div:nth-child(2) {
      color: #3c97eb;
      border-left: 1px solid #dddddd;
    }
  }
}
// 聊天框样式
.userMsg {
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  width: 40px;
  height: 40px;
}
.userPhotos {
  width: 100%;
  height: 100%;
}
.tallStyle {
  margin: 10px 0;
  width: 100%;
  display: flex;
}
.tallContents {
  position: relative;
  max-width: 72%;
  min-width: 20px;
  padding: 5px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 13px;
  word-wrap: break-word;
}
.redPacketStyle {
  position: relative;
  background-color: #e54b55;
  width: 100%;
  height: 50px;
  color: #fff;
  font-size: 14px;
  padding: 0 8px;
  box-sizing: border-box;
  border-radius: 5px;
}
.before {
  border: solid transparent;
  content: "";
  height: 0;
  width: 0px;
  position: absolute;
  border-width: 10px;
  top: 10px;
}
#chat {
  height: 100%;
  padding: 58px 0;
  box-sizing: border-box;
  background-color: #f5f5f5;
  .content {
    height: 100%;
    padding: 0 15px 58px;
    overflow-y: scroll;
    position: relative;
    .tall {
      .tallStyle;
      .userMsg {
        .userMsg;
        .userPhoto {
          .userPhotos;
        }
      }
      .tallContent {
        .tallContents;
        margin-left: 15px;
        &::before {
          right: 100%;
          .before;
          border-right-color: #fff;
        }
      }
      // 红包信息样式
      .redPacket {
        width: 72%;
        margin-left: 15px;
        text-align: left;
        .tallContents;
        &::before {
          right: 100%;
          .before;
          border-left-color: #fff;
        }
        .redStyle {
          .redPacketStyle;
          .usualReg {
            position: absolute;
            right: 0;
            top: 0;
            transform: rotate(180deg);
            width: 39.5px;
            border-radius: 5px;
          }
          .winRed {
            position: absolute;
            width: 60px;
            top: -8px;
            right: 10px;
          }
        }
      }
    }
    .flexEnd {
      .tallStyle;
      flex-direction: row-reverse;
      .userMsg {
        .userMsg;
        .userPhoto {
          .userPhotos;
        }
      }
      .tallContent {
        margin-right: 15px;
        .tallContents;
        &::before {
          left: 100%;
          .before;
          border-left-color: #fff;
        }
      }
      // 红包信息样式
      .redPacket {
        width: 72%;
        margin-right: 15px;
        text-align: right;
        .tallContents;
        &::before {
          left: 100%;
          .before;
          border-left-color: #fff;
        }
        .redStyle {
          .redPacketStyle;
          .usualReg {
            position: absolute;
            left: 0;
            top: 0;
            width: 39.5px;
            border-radius: 5px;
          }
          .winRed {
            position: absolute;
            width: 60px;
            top: -8px;
            left: 10px;
          }
        }
      }
    }
  }
  .input {
    width: 100%;
    position: fixed;
    bottom: 0;
    background-color: #f5f5f5;
    .box {
      width: 100%;
      padding: 1px 5px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ddd;
      .inputBox {
        border: none;
        width: 78%;
        height: 30px;
        border-radius: 3px;
        font-size: 16px;
      }
      .iconfont {
        font-size: 25px;
        line-clamp: 30px;
        padding: 0 5px;
      }
      .lian {
        font-size: 31px;
      }
    }
    .functionBlock {
      padding: 25px;
      height: 200px;
      .functionBox {
        // width: 30px;
        width: 50px;
        height: 70px;
        text-align: center;
        .icon {
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: space-around;
          align-items: center;
          border-radius: 5px;
          background-color: #fff;
          .iconfont {
            font-size: 25px;
          }
        }
        .functionName {
          color: #333;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
