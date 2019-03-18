<template>
    <div id="found">
        <oneHead class="head_">
            <ButtonTab>
                <ButtonTabItem selected @on-item-click="newWin_request">
                    <span>最新中奖</span>
                </ButtonTabItem>
                <ButtonTabItem @on-item-click="yesterWin_request">
                    <span>昨日排行</span>
                </ButtonTabItem>
            </ButtonTab>
        </oneHead>
        <div class="win_list">
            <ul v-show="newWinShow">
                <li v-for="(item, index) in newWin" :key="index" class="win_user"  @click="founduser(item)">
                    <img :src="item.head_img" alt="">
                    <div>
                        <span>{{item.account}}</span>
                        <p>在{{item.point_desc}}喜中&nbsp;<span class="colorred">￥&nbsp;{{item.total}}</span></p>
                    </div>
                    <i class="iconfont">&#xe655;</i>
                </li>
            </ul>
            <div v-show="yesterdayWinShow">
                <template v-if="loading">                
                    <div class="champion">
                        <div class="second"  @click="founduser(yesterdayWin[1])">
                            <img src="../assets/img/web/奖牌-02.svg" alt="">
                            <img :src="yesterdayWin[0].head_img" alt="">
                            <div>                        
                                <span>{{yesterdayWin[1].account}}</span>
                                <p  class="colorred">￥{{yesterdayWin[1].total}}</p>
                            </div>
                        </div>
                        <div class="first"  @click="founduser(yesterdayWin[0])">
                            <img src="../assets/img/web/奖牌-01.svg" alt="">
                            <img :src="yesterdayWin[0].head_img" alt="">
                            <div>
                                <span>{{yesterdayWin[0].account}}</span>
                                <p  class="colorred">￥{{yesterdayWin[0].total}}</p>
                            </div>
                        </div>
                        <div class="third" @click="founduser(yesterdayWin[2])">
                            <img src="../assets/img/web/奖牌-03.svg" alt="">
                            <img :src="yesterdayWin[0].head_img" alt="">
                            <div>
                                <span>{{yesterdayWin[2].account}}</span>
                                <p  class="colorred">￥{{yesterdayWin[2].total}}</p>
                            </div>
                        </div>
                    </div>
                    <ul class="yesterday_win">
                        <li v-for="(item, index) in newarr" :key="index" class="win_user"  @click="founduser(item)">
                            <span>{{index+4}}</span>
                            <img :src="item.head_img" alt="">
                            <div>
                                <span>{{item.account}}</span>
                                <p>在{{item.point_desc}}喜中&nbsp;<span class="colorred">￥&nbsp;{{item.total}}</span></p>
                            </div>
                            <i class="iconfont">&#xe655;</i>
                        </li>
                    </ul>
                </template>
                <img src="../assets/img/lazy.gif" alt="" v-else class="lazying">
            </div>
        </div>
    </div>
</template>

<script>
import oneHead from "../components/onehead"
import { ButtonTab, ButtonTabItem } from 'vux'
export default {
    components:{
        oneHead,
        ButtonTab,
        ButtonTabItem,
    },
    data(){
        return {
            newWinShow:false,
            yesterdayWinShow:true,
            newarr:[],
            topCount:10,
            loading:false,
            newWin:'',
            yesterdayWin:[],
            time:null,
        }
    },
    methods:{
        // 刷新请求
        refresh(){
            this.$api.bestnewuser({topCount:this.topCount}).then(res=>{
                if(res.data.result_code==0){
                    this.newWin=res.data.data
                    this.time=setTimeout(()=>{
                        this.refresh()
                    },10000)
                }
            })
            this.$once('hook:beforeDestroy', () => {            
                clearTimeout(this.time);                                    
            })
        },
        newWin_request(){
            this.$api.bestnewuser({topCount:this.topCount}).then(res=>{
                if(res.data.result_code==0){
                    this.newWin=res.data.data
                    setTimeout(()=>{
                        this.refresh()
                    },5000)
                }
            })
            this.yesterdayWinShow=false
            this.newWinShow=true
        },
        yesterWin_request(){
            this.$api.yesterdayWin({topCount:this.topCount}).then(res=>{
                if(res.data.result_code==0){
                    this.yesterdayWin=res.data.data
                    this.yesterdayWin.sort(this.compare)
                    this.newarr=this.yesterdayWin.slice(3)
                    this.yesterdayWin.length=3
                    setTimeout(()=>{
                        this.loading=true
                    },1000)
                }
            })
            this.yesterdayWinShow=true
            this.newWinShow=false
        },
        // 昨日奖金排序
        compare(x,y){
            if (x.total < y.total) {
                return 1;
            } else if (x.total > y.total) {
                return -1;
            } else {
                return 0;
            }
        },
        //昨日玩家信息跳转
        founduser(item){
            this.$router.push({
            name: 'FoundUser',
            params: {
                msg: item
            }
            })
        }
    },
    mounted(){
        this.newWin_request()
        this.yesterdayWin.sort(this.compare)
        
    },
    destroyed(){
        if(this.time){
            window.clearTimeout(this.time)
        }
    },
    beforeDestroy(){
        if(this.time){
            window.clearTimeout(this.time)
        }
    },
}
</script>

<style>
    #found{
        background-color: #f5f5f5;
    }
    .win_list{
        overflow-y: scroll ;
        height: 85vh;
    }
    .head_ span{
        width: 70px;
        display: inline-block;
        font-size: 12px;
    }
    .yesterday_win{
        margin-top: 10px;
        border-top: 1px solid #ddd;
    }
    .win_user{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 9px 15px;
        color: #333;
        border-bottom: 1px solid #ddd;
        background-color: #fff;
    }
    .win_user span{
        font-size: 14px;
    }
    .win_user img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 0 11px 0 14px;
    }
    .win_user div{
        width: 80%;
    }
    .win_user div>span{
        font-size: 14px !important;
    }
    .win_user div p{
        font-size: 12px;
    }
    .win_user i{
        color: #ddd;
        font-size: 20px;
    }
    /* 中奖前三名 */
    .champion{
        position: relative;
        width: 100%;
        height: 140px;
        border-bottom: 1px solid #ddd;
        background-color: #fff;
    }
    .first,.second,.third{
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        bottom: 0;
    }
    .first{
        width: 86px;
        bottom: 0;
        left: calc(50% - 43px);
    }
    .second{
        width: 70px;
        left: 40px;
        bottom: 0;
    }
    .third{
        width: 70px;
        right: 40px;
        bottom: 0;
    }
    .first div,.second div,.third div{
        text-align: center;
    }
    .first img:nth-child(2),.second img:nth-child(2),.third img:nth-child(2){
        position: absolute;
        border-radius: 50%;
    }
    .second img:nth-child(2),.third img:nth-child(2){
        width: 38px;
        height: 38px;
        top: 11px;
    }
    .first img:nth-child(2){
        width: 43px;
        height: 43px;
        top: 15px;
    }
    .second img:nth-child(1),.third img:nth-child(1){
        width: 70px;
    }
    .first img:nth-child(1){
        width: 86px;
    }
    /* 懒加载 */
    .lazying{
        width: 60px;
        position: absolute;
        top: 35%;
        left: calc(50% - 30px);
    }.colorred{
        color: #E54B55
    }
</style>
