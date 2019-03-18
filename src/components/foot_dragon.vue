<template>
    <div id="footerBet">
        <div class="betNum">
            <div class="price" >
                <span>每注</span>
                <input type="number" ref='price' value="1" v-model="point">
                <span>倍</span>
            </div>
            <div class="NumRental">
                <span class="rental">
                   <p>最高可中{{point*this.$store.state.betdetails.bili || point*0}}元</p>
                </span>
            </div>
        </div>
        <div class="betAffrim">
            <div>共{{point}}注，共{{point}}元</div>
            <div @click="bet">
                确认投注
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            point:0,
            betdetails:'',
            betcontent:'',
        }
    },
    watch:{
        betNum:function(data){
            this.betdetails = data
        },
        betMsg:function(data){
            this.betcontent = data
        }
    },
    computed:{
        // 监听下注信息
        betNum(){
            return this.$store.state.betdetails
        },
        // 监听下注信息
        betMsg(){
            return this.$store.state.betcontent
        }
    },
    methods:{
        // 判断是否为数组
        isArray(arg) {
            if (typeof arg === 'object') {
                return Object.prototype.toString.call(arg) === '[object Array]';
            }
            return false;
        },
        bet(){
            if(this.betcontent && this.betdetails){
                this.point=1
                if(this.betcontent.game_type==4 || this.betcontent.game_type==10){
                    var length=5
                }else if(this.betcontent.game_type==5){
                    var length=10
                }else if(this.betcontent.game_type==7){
                    var length=1
                }
                let dragonBet = new Array(length).fill("-");
                dragonBet.splice(this.betcontent.position-1,1,this.betdetails.bili_name)
                let obj={
                    choice_no:this.betcontent.game_num,
                    point:this.point,
                    bili_id:this.betdetails.id,
                    dragonBet:dragonBet.join(","),
                    wanfa_type:this.betcontent.type,
                    bet_count:1,
                    multiple_count:this.point,
                    unit_type:1,
                    game_type:this.betcontent.game_type
                }
                let _this=this
                let str=''
                    str+=this.betcontent.game_name+":"+this.betcontent.game_num+"期"+"<br>"
                    str+="投注金额:"+this.point+"元"+"<br>"
                    str+="投注内容:"+dragonBet.join(",")
                this.confirm({
                    title: '投注确认',
                    content: str,
                    confirmText: '确定',
                    onConfirm(){
                        _this.$api.dragonadd(obj).then(res=>{
                            if(res.data.result_code==0){
                                _this.showToast("text","投注成功")
                                obj={}
                                this.$store.commit("betdetails", obj);
                                this.$store.commit("betcontent", obj);
                            }else{
                                _this.showToast("text",res.data.result_desc)
                            }
                        })
                    },
                })
            }else{
                this.showToast("text","请选择投注内容")                
            }
        }
    },
    mounted(){
        console.log(this.betdetails)
    }
}
</script>

<style scoped lang="less">
.ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: green;
    position: fixed;
    top: 685px;
    left: 170px;
    z-index: 200;
}

.fade-enter-active{
    animation: moveStart 0.25s linear;
}
.fade-leave-active{
    animation: moveEnd 0.25s linear;
}
// .fade-enter {
//     display: none;
// }
// .fade-leave{
//     display: none;
// }

@keyframes moveStart {
    0%{
        left: 170px;
        top: 685px;
    }
    50%{
        left: 215px;
        top: 640px;
    }
    100%{
        left: 260px;
        top: 630px;
    }
}
@keyframes moveEnd{
    0%{
        left: 260px;
        top: 630px;
    }
    50%{
        left: 310px;
        top: 640px;
    }
    100%{
        left: 370px;
        top: 675px;
    }
}
.button{
    height: 40px;
    text-align: center;
    padding: 10px;
    box-sizing: border-box;
}
.active{
    background-color: #E54B55;
    color: #fff;
}
    #footerBet{
        width: 100%;
        position: fixed;
        bottom: 0;
        z-index: 1;
        .betNum{
            padding: 10px 15px;
            display: flex;
            justify-content: space-between;
            background-color: #f5f5f5;
            border-top: 1px solid #ddd;
            .rentalUnit{
                font-size: 0;
                span{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    text-align: center;
                    font-size: 9px;
                    line-height: 20px;
                }
                .yuan{
                    border-left: 1px solid #ddd;
                    border-top: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                    border-top-left-radius: 2px;
                    border-bottom-left-radius: 2px;
                }
                .jiao{
                    border-right: 1px solid #ddd;
                    border-top: 1px solid #ddd;
                    border-bottom: 1px solid #ddd;
                    border-top-right-radius: 2px;
                    border-bottom-right-radius: 2px;
                }
            }
            .NumRental{
                width: 60%;
                text-align: right;
                .num{
                    span{
                        color: #E54B55;
                    }
                }
                .rental{
                    span{
                        color: #E54B55;
                    }
                }
            }
        }
        .betAffrim{
            background-color: #333;
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            & div:nth-child(1){
                .button()
            }
            & div:nth-child(2){
                text-align: center;
            }
            & div:nth-child(2){
                position: relative;
                width: 30%;
                .button();
                background-color: #E54B55;
                .stamp{
                    position: absolute;
                    font-size: 10px;
                    border-radius: 50%;
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    background-color: #FFF;
                    color: #E54B55;
                    top: 5px;
                    right: 15px;
                }
            }
        }
    }
.price{
    color: #333;
    font-size: 12px;
    line-height: 25px;
    input{
        height: 25px;
        width: 70px;
        font-size: 12px; 
        text-align: center; 
        border: 1px solid #ddd;
    }
}
</style>
