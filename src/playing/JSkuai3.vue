<template>
    <div class="JSkuai3">
        <PlayHead v-if="loading" :gameList="gameList[this.$store.state.wanfaName]"></PlayHead>
        <template v-if="this.$store.state.playingShow">
            <div class="playSele">
                <div v-for="(item, index) in gameList" :key="index" @click.capture="selePlaying($event,index)">
                    <span>{{item.name}}</span>
                    <p>最大{{item.maxBili}}倍</p>
                    <div>
                        <template v-if="item.name=='和值'">
                            <img src="../../static/img/the_dice_1.png" alt="">
                            <span>+</span>
                            <img src="../../static/img/the_dice_2.png" alt="">
                            <span>+</span>
                            <img src="../../static/img/the_dice_3.png" alt="">
                        </template>
                        <template v-else-if="item.name=='顺豹玩法'">
                            <img src="../../static/img/the_dice_1.png" alt="">
                            <img src="../../static/img/the_dice_1.png" alt="">
                            <img src="../../static/img/the_dice_1.png" alt="">
                        </template>
                    </div>              
                </div>
            </div>
        </template>
        <LotteryMsg v-on:betMsg="betMsg"></LotteryMsg>
        <template v-if="betShow">
          <WeBet></WeBet>
        </template>
        <template v-else>
            <Qihao></Qihao>
            <PK10Top v-if="loading" :gameList="gameList[this.$store.state.wanfaName]"></PK10Top>
        </template>
        <FooterBet v-if="this.$store.state.footbet" :gameList="gameList[this.$store.state.wanfaName]"></FooterBet>
    </div>
</template>

<script>
import PlayHead from '../components/play_head'
import LotteryMsg from "../playingSort/LotteryMsg";
import FooterBet from "../components/foot_bet";
// 投注信息（冠亚和）
import PK10Top from "../playingSort/PK10_top";
// 已投注信息
import WeBet from "../playingSort/WeBet";
import Qihao from "../components/qihao";

export default {
    components:{
        PlayHead,
        LotteryMsg,
        PK10Top,
        FooterBet,
        WeBet,
        Qihao
    },
    data(){
        return {
            gameList:[],
            loading:false,
            // 是否加载完毕
            loading: false,
            // 显示已投注
            betShow: false,
        }
    },
    methods:{
        // 查看已投注信息
        betMsg(data) {
            this.betShow = data;
        },
        // 玩法选择
        selePlaying(e,index){
            this.$store.commit("playingShow",false)
            this.$store.commit("wanfaName", index);
        },
        // 投注数据请求
        betRequest() {
            this.$api.game({ game_type: this.$store.state.gameType.game_type }).then(res => {
                this.gameList = res.data.data;
                this.loading = true;
            });
        },
    },
    created() {
        this.betRequest()
    this.$store.commit("footbet", true)
    },
}
</script>

<style lang="less" scoped>
    .JSkuai3{
        height: 100%;
        width: 100%;
        .playSele{
            display: flex;
            position: absolute;
            z-index: 200;
            background-color: #fff;
            padding: 0px 10px 10px;
            flex-wrap: wrap;
            width: 100%;
            // top: -110px;
            &>div{
                border: 1px solid #ddd;
                border-radius: 3px;
                width: 30%;
                height: 60px;
                text-align: center;
                padding: 0px 12px;
                box-sizing: border-box;
                font-size: 8px;
                color: #888;
                margin: 10px 1.65% 0;
                span{
                    font-size: 12px;
                    line-height: 16px;
                    color: #333;
                }
                p{
                    line-height: 18px;
                }
                div{
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    img{
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }
    }
</style>
