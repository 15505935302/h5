<template>
  <div id="found">
    <oneHead class="head_">
      <ButtonTab>
        <ButtonTabItem selected @on-item-click="newWin_request">
          <span>消息</span>
        </ButtonTabItem>
        <ButtonTabItem @on-item-click="yesterWin_request">
          <span>公告</span>
        </ButtonTabItem>
      </ButtonTab>
    </oneHead>
    <div class="">
      <ul v-show="newWinShow">
        <li @click="newsContent(item)"  class="win_user" v-for="(item, index) in noticeList.list" :key="index"  v-show='noticeList.list.length>0'>
          <p>{{item.title}}<span v-if='noticeList.status==1'></span></p>
          <p>{{item.create_time}}</p>
        </li>
      </ul>
      <ul v-show="yesterdayWinShow">
        <li @click="newsContent(item)" class="win_user" v-for="(item, index) in systemNoticeList.list" :key="index"  v-show='systemNoticeList.list.length>0'>
          <p>{{item.title}}</p>
          <p>{{item.create_time}}</p>
        </li>
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
        noticeList:'',
        systemNoticeList:'',
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
      // 消息
      notice(){
        let obj = {
          page_no:1,
          page_size:20,
        }
        this.$api.notice(obj).then(res=>{
            this.noticeList = res.data.data
              console.log(res)
            })
        },
      // 公告
      systemNotice(){
        let obj = {
          page_no:1,
          page_size:20,
        }
        this.$api.systemNotice(obj).then(res=>{
            this.systemNoticeList = res.data.data
              console.log(res)
            })
        },
      // 消息公告内容详情
      newsContent(item){
          this.$router.push({
            name: 'Newscontent',
            params: {
                msg: item
            }
            })
      }
      },
    mounted(){
      this.notice()
      this.systemNotice()
    }
  }
  
</script>

<style>
  #found{
    background-color: #f5f5f5;
  }
  .head_ span{
    width: 70px;
    display: inline-block;
    font-size: 12px;
  }
  .win_user{
    padding: 9px 15px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    padding-left: 20px;
  }
  .win_user p:nth-child(1) span{display: inline-block;width: 5px;height: 5px;background: #E54B55;border-radius: 2.5px;vertical-align: text-top;margin-left: 5px;margin-top: 5px;}
  .win_user p:nth-child(1){color: #333333;font-size: 14px;}
  .win_user p:nth-child(2){color: #888888;font-size: 12px;}
  .win_user p:nth-child(2) span{margin-left: 10px;}
</style>
