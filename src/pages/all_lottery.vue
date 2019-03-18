<template>
    <div id="all_kind">
        <Header>
            <span slot="pageName">全部彩种</span>
        </Header>
        <Lottery :category="kuai3">
            <span slot="lottery_name">快3</span>
        </Lottery>
        <Lottery :category="timeCai">
            <span slot="lottery_name">时时彩</span>
        </Lottery>
        <Lottery :category="happyCai">
            <span slot="lottery_name">快乐彩</span>
        </Lottery>
        <Lottery :category="xuan5">
            <span slot="lottery_name">11选5</span>
        </Lottery>
        <Lottery :category="diPin">
            <span slot="lottery_name">低频彩</span>
        </Lottery>
        <!-- <Lottery :category="gameCai">
            <span slot="lottery_name">游戏彩</span>
        </Lottery> -->
        <!-- <Lottery :category="sportCai">
            <span slot="lottery_name">体育彩</span>
        </Lottery> -->
    </div>
</template>

<script>
import Header from '../components/header'
import Lottery from '../components/lottery_kind'
export default {
    data(){
        return {
            allLottery:[],
            kuai3:[],
            timeCai:[],
            happyCai:[],
            xuan5:[],
            diPin:[],
            gameCai:[],
            sportCai:[]
        }
    },
    components:{
        Header,
        Lottery
    },
    methods:{
        getLottery(){
            this.$api.wanfa().then(res => {
                this.allLottery=res.data.data
                this.screen(this.allLottery)
                console.log(this.allLottery)
            })
        },
        // 彩种筛选
        screen(arr){
            arr.forEach(ele=>{
                if(ele.category_type===1){
                    this.kuai3.push(ele)
                }else if(ele.category_type===2){
                    this.timeCai.push(ele)
                }else if(ele.category_type===3){
                    this.happyCai.push(ele)
                }else if(ele.category_type===4){
                    this.xuan5.push(ele)
                }else if(ele.category_type===5){
                    this.diPin.push(ele)
                }else if(ele.category_type===6){
                    this.gameCai.push(ele)
                }else if(ele.category_type===7){
                    this.sportCai.push(ele)
                }
            })
        }
    },
    mounted() {
        this.getLottery()
    },
}
</script>

<style scoped>
    #all_kind{
        background-color: #f5f5f5;
        margin-top: 50px;
    }
    #all_kind>div:nth-child(n+2){
        margin-bottom: 10px;
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
    }
</style>
