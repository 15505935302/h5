<template>
    <div id="play_head">
        <i class="iconfont"  @click="back">&#xe616;</i>
        <div class="head_middel">
            <div>
                <p>玩</p>
                <p>法</p>
            </div>
            <div class="playing" id="" @click.stop="playing">
                <span>
                    {{gameList.name || gameList.wanfa_name}}
                </span>
                <template v-if="this.$store.state.playingShow">
                    <i class="iconfont i" ref="play_tri">&#xe601;</i>                    
                </template>
                <template v-else>
                    <i class="iconfont">&#xe601;</i>
                </template>
            </div>
        </div>
        <div class="address" @click.stop="adderss_sele">
            <span>{{this.$store.state.gameType.name}}</span>
            <template v-if="this.$store.state.addressShow">
                <i class="iconfont i" ref="address_tri">&#xe601;</i>            
            </template>
            <template v-else>
                <i class="iconfont" ref="address_tri">&#xe601;</i>             
            </template>
        </div>
        <!-- 地区快三弹出框 -->
        <div class="region" v-if="this.$store.state.addressShow">
            <div class="regionLottery" v-for="(item, index) in lottery" :key="index" @click.stop="lotteruySwitch(item.name,item)">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
import Bus from '../store/bus.js'
export default {
    props:["gameList"],
    inject:["reload"],
    data(){
        return {
            // 筛选后的彩种
            lottery:[],
        }
    },
    methods:{
        back(){
            this.$router.push({
                path:"/"
            })
            this.$store.commit('playingShow',false)
        },
        playing(){
            this.$store.commit('addressShow',false)
            if(this.$store.state.playingShow){
                this.$store.commit("playingShow",false)
                document.body.style.overflow="scroll"
            }else{
                this.$store.commit("playingShow",true)
                document.body.style.overflow="hidden"
            }
        },
        adderss_sele(){
            this.$store.commit('playingShow',false)
            if(this.$store.state.addressShow){
                this.$store.commit("addressShow",false)
            }else{
                this.$store.commit("addressShow",true)
            }
        },
        lotteruySwitch(name,game_type){
            this.$store.commit('gameType',game_type)
            Bus.$emit('gameType',game_type)
            this.$router.push({
                name:name
            })
            this.$store.commit("addressShow",false)
            this.$store.commit('wanfaName',0)
            this.$store.commit('wanfachild',0)
            this.reload()
        },
        // 获取所有玩法
        requestWanfa(){
            this.$api.wanfa().then((res)=>{
                if(res.data.result_code==0){
                    let allLottery=res.data.data
                    for(let i=0,len=allLottery.length;i<len;i++){
                        if(allLottery[i].category_type==this.$store.state.gameType.category_type){
                            this.lottery.push(allLottery[i])
                        }
                    }
                }
            })
        }
    },
    mounted() {
        this.requestWanfa()
        this.$store.commit('addressShow',false)
    },
}
</script>

<style scoped lang="less">
    .i_animation{
        display: inline-block;
        font-size: 10px;
        transition: all 500ms;
    }
    .i{
        transform: rotate(180deg);
    }
    #play_head{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 20px;
        background-color: #E54B55;
        color: #fff;
        // position: fixed;
        position: relative;
        width: 100%;
        box-sizing: border-box;
        top: 0;
        z-index: 101;
        .head_middel{
            display: flex;
            align-items: center;
            div{
                p{
                    line-height: 13px;
                    font-size: 11px;
                }
            }
            .playing{
                background-color: #fff;
                text-align: center;
                border-radius: 2px;
                color: #E54B55;
                font-size: 14px;
                padding: 0 8px;
                height: 23px;
                margin-left: 8px;
                border: none;
                i{
                    .i_animation()
                }
            }
        }
        .address{
            font-size: 12px;
            text-align: right;
            i{
                .i_animation()
            }
        }
        .region{
            position: absolute;
            background: #fff;
            color: #333;
            font-size: 10px;
            top: 45px;
            right: 15px;
            border: 1px solid #ddd;
            z-index: 450;
            .regionLottery{
                text-align: center;
                padding: 14px 5px;
                width: 60px;
                border-bottom: 1px solid #ddd;
            }
        }
    }
</style>
