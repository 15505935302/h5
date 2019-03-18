<template>
    <div id="lower_user">
      <oneHead class="head_">
        <ButtonTab>
          <ButtonTabItem selected @on-item-click="newWin_request">
            <span>下级用户</span>
          </ButtonTabItem>
          <ButtonTabItem @on-item-click="yesterWin_request">
            <span>邀请码</span>
          </ButtonTabItem>
        </ButtonTab>
      </oneHead>
      <div class="lower_user">
        <ul v-show="newWinShow">
          <ul class="lower_ul">
            <li>请为下级设置类型和返点，<span class="red">查看返点赔率</span></li>
            <li>开户类型<em><span><i class="iconfont">&#xe6e2;</i>代理类型</span><span><i class="iconfont">&#xe6e2;</i>玩家类型</span></em></li>
          </ul>
          <ul class="lower_ul ul">
            <li style="border-top: 0.025rem solid #ddd">快三<span>自身返点7.0，可设置返点0.0-7.0</span></li>
            <li>时时彩<span>自身返点7.0，可设置返点0.0-7.0</span></li>
            <li>福彩3D<span>自身返点7.0，可设置返点0.0-7.0</span></li>
            <li>排列3/5<span>自身返点7.0，可设置返点0.0-7.0</span></li>
            <li>PC蛋蛋<span>自身返点7.0，可设置返点0.0-7.0</span></li>
            <li>六合彩<span>自身返点7.0，可设置返点0.0-7.0</span></li>
          </ul>
          <div class="closeBtn">
            <button>生成邀请码</button>
          </div>
        </ul>
        <ul v-show="yesterdayWinShow">
          <ul class="lower_ul">
            <li>开户类型<em><span><i class="iconfont">&#xe6e2;</i>代理类型</span><span><i class="iconfont">&#xe6e2;</i>玩家类型</span></em></li>
          </ul>
          <div class="code">
            <div class="padd">
              <div class="codeC"><span>邀请码：83839234</span><span style="float: right;color: #888;">2018-11-23</span></div>
              <div class="codeC"><span style="color: #888;">注册(10)</span><span style="float: right;color: #888;"><i>&#xe610;</i></span></div>
            </div>
            <hr />
            <div class="code_span"><span>查看返点</span><span style="color: #ddd">|</span><span>复制邀请码</span><span style="color: #ddd">|</span><span>复制注册链接</span></div>
            <hr />
          </div>
          <div class="code">
            <div class="padd">
              <div class="codeC"><span>邀请码：83839234</span><span style="float: right;color: #888;">2018-11-23</span></div>
              <div class="codeC"><span style="color: #888;">注册(10)</span><span style="float: right;color: #888;"><i>&#xe610;</i></span></div>
            </div>
            <hr style="margin-top: 10px;" />
            <div class="code_span"><span>查看返点</span><span style="color: #ddd">|</span><span>复制邀请码</span><span style="color: #ddd">|</span><span>复制注册链接</span></div>
            <hr />
          </div>
        </ul>
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
        newWinShow:true,
        yesterdayWinShow:false,
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
      }
    }
  }
</script>

<style scoped>
  hr,span{margin: 0;padding: 0;}
  #lower_user{
    background: #f5f5f5;
  }
  .head_ span{
    width: 70px;
    display: inline-block;
    font-size: 12px;
  }
  .lower_ul li{
    list-style: none;
    font-size: 16px;
    padding: 8px 0;
    padding-left: 20px;
    border-bottom: 1px solid #ddd;
    background: #fff;
  }
  .ul li span{float: right;margin-right: 60px;color: #B5B5B5;}
  .lower_ul li span.red{color: #E54B55;}
  .ul{margin-top: 10px;}

  .lower_user{
    background-color: #f5f5f5;
  }
  .code{font-size: 17px;width: 100%;margin-top: 10px;background: #fff;border-top: 1px solid #ddd;}
  .padd{padding: 5px 0;}
  .code .codeC{padding: 0 20px;}
  .code .code_span{padding: 12px 10px}
  .code .code_span span{margin-left: 18px;color: #3C97EB;}
  .lower_ul li em{font-style: normal;}
  .lower_ul em span{display: inline-block;margin: 0 20px;}
  .lower_ul em span i{padding-right: 5px; color: #EE4549;font-size: 17px;}
  .closeBtn{text-align: center;margin: 30px auto;}
  .closeBtn button{width: 90%;height: 40px;background: #E54B55;color: #FFF;outline: none;border-radius: 4px;font-size: 16px;border: none;}
</style>
