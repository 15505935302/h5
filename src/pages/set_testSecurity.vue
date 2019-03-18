<template>
  <div id="set_testSecurity">
    <Head>
        <span slot="pageName">选择充值方式</span>
      </Head>
    <ul>
      <li>
        <div>问题一</div>
        <div><input type="text" placeholder="您的高中叫啥？" readonly="readonly"></div>
        <div><i class="iconfont">&#xe655;</i></div>
      </li>
      <li>
        <div>答案一</div>
        <div><input type="text" placeholder="请输入答案"></div>
        <div><i class="iconfont">&nbsp;&nbsp;&nbsp;</i></div>
      </li>
    </ul>
    <ul>
      <li>
        <div>问题二</div>
        <div><input type="text" placeholder="您的高中班主任是谁？" readonly="readonly"></div>
        <div><i class="iconfont">&#xe655;</i></div>
      </li>
      <li>
        <div>答案二</div>
        <div><input type="text" placeholder="请输入答案"></div>
        <div><i class="iconfont"></i>&nbsp;&nbsp;&nbsp;</div>
      </li>
    </ul>
    <div class="closeBtn">
      <button>确认</button>
    </div>
  </div>
</template>

<script>
import Head from "../components/header";
  export default {
    components:{
        Head,
    },
    name: "set_testSecurity"
  }
</script>

<style scoped>
  #set_testSecurity{
    background: #f5f5f5;
    height: 100%;
  }
  #set_testSecurity ul{
    list-style: none;
    padding-left:15px;
    box-sizing: border-box;
    background-color: white;
    width: 100%;
    margin-bottom: 12px;
  }
  #set_testSecurity ul li{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding: 5px 10px 5px 0;
    align-items: center;
  }
  #set_testSecurity ul li div:nth-child(1){line-height: 40px;font-size: 17px;}
  #set_testSecurity ul li div:nth-child(2){width: 70%;height: 40px;}
  #set_testSecurity ul li i{color: #ddd;}
  #set_testSecurity ul li input{width: 95%;height: 40px;vertical-align: text-top;font-size: 17px;border: none;outline: none;}
  .closeBtn{text-align: center;margin: 30px auto;}
  .closeBtn button{width: 90%;height: 40px;background: #E54B55;color: #FFF;outline: none;border-radius: 4px;font-size: 16px;border: none;}

</style>

