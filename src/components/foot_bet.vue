<template>
    <div id="footerBet">
        <div class="betNum">
            <div class="price"  v-if="gametyep.indexOf(this.$store.state.gameType.id) != -1" >
                <span>每注</span>
                <input type="number" v-model="price" ref='price' onkeydown="if(event.keyCode==13)event.keyCode=9" onKeyPress="if ((event.keyCode<48 || event.keyCode>57)) event.returnValue=false">
                <span>元</span>
            </div>
            <div class="NumRental">
                <span class="num">共<span>
                    <template v-if="add.length==1">
                        {{this.add[0].bet_count}}
                    </template>
                    <template v-else>
                        {{this.add.length}}
                    </template>
                </span>注，</span>
                <span class="rental">
                    <template>
                        <span v-if="gametyep.indexOf(this.$store.state.gameType.id) != -1">
                            <template v-if="add.length==1">
                                {{this.add[0].bet_count*this.price  | keepNum}}
                            </template>
                            <template v-else>
                                {{this.add.length*this.price | keepNum}}
                            </template>                    
                        </span>
                        <span v-else>
                            <template v-if="add.length==1">
                                {{this.add[0].bet_count*this.$store.state.everyBetRental | keepNum}}
                            </template>
                            <template v-else>
                                {{this.add.length*this.$store.state.everyBetRental | keepNum}}
                            </template>
                        </span>元
                    </template>
                </span>
            </div>
            <div  v-if="gametyep.indexOf(this.$store.state.gameType.id) == -1" class="rentalUnit">
                <span class="active yuan" @click="yuan($event)">元</span>
                <span class="jiao" @click="jiao($event)">角</span>
            </div>
        </div>
        <div class="betAffrim">
            <template v-if="this.add.length">
                <div @click="clearBet">清空</div>
            </template>
            <template v-else>
                <div @click="random">机选</div>
            </template>
            <div @click.self="addBet">+确定选号</div>
            <div @click="confirmBet">
                确认投注
                <span class="stamp" v-if="betShow">{{allcount}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '../store/bus.js'
import randomSelect from "../mixins/randomSelect.js"
export default {
    props:['gameList'],
    mixins:[randomSelect],
    data(){
        return {
            show:false,
            betShow:false,
            // 投注用数据
            add:[],
            unit:1,
            price:"2",
            gametyep:[1,30,22,20],
            betArr:[],
            count:0,
            allcount:0,
            compen:'',
            rule:"",
            // 判断是否已经选过号码
            existing:false,
        }
    },
    watch: {
        betArr(data) {
            this.allRetNum(this.$store.state.betStr);
            if(this.$store.state.betStr.length>0){
                this.existing=true
            }
        },
        price(data){
            if(data<0 || data==''){
                data=1
                this.price=1
            }
        }
    },
    methods:{
        // 投注单位切换
        yuan(e){
            let dom = e.currentTarget;
            dom.parentNode.lastChild.classList.remove("active");
            e.currentTarget.classList.add("active");
            this.$store.commit('unit',1)
        },
        jiao(e){
            let dom = e.currentTarget;
            dom.parentNode.firstChild.classList.remove("active");
            e.currentTarget.classList.add("active");
            this.$store.commit('unit',2)
        },
        allRetNum(num) {
            this.allcount = 0;
            for (let i = 0; i < num.length; i++) {
                for (let j = 0; j < num[i].length; j++) {
                    this.allcount+=num[i][j].bet_count
                }
            }
        },
        // 清除投注
        clearBet(){
            Bus.$emit('clearBet')
            this.add=[]
        },
        // 确定选号
        addBet(){
            if(this.$store.state.gameType.id==1){
                if(this.add.length>0){
                    console.log(11111)
                    this.count++
                    this.show=true
                    for(let i=0,len=this.add.length;i<len;i++){
                        this.add[i].money=this.price
                    }
                    this.$store.commit('liubet',this.add)
                    Bus.$emit('clearBet')
                    if(this.count>0){
                        this.betShow=true
                    }else{
                        this.betShow=false
                    }
                    this.add=[]
                }
            }else{
                if(this.$store.state.betStr.length>0 || this.add.length>0 && this.add[0].bet_count>0){
                    this.count++
                    this.show=true
                    this.addPrice()
                    Bus.$emit('clearBet',this.count)
                    if(this.count>0){
                        this.betShow=true
                    }else{
                        this.betShow=false
                    }
                    this.existing=true
                    this.add=[]
                }else{
                    this.betPopMsg(this.rule.len)
                    this.existing=false
                }
            }
        },
        // 确认投注
        confirmBet(){
            if(this.existing){
                if(this.add.length>0){
                    this.addPrice()
                    this.$router.push({
                        name:'BetRoom',
                    })
                }else{
                    this.$router.push({
                        name:'BetRoom',
                    })
                }
            }else{
                if(this.$store.state.betStr.length>0 || this.add.length>0 && this.add[0].bet_count>0){
                    this.addPrice()
                    this.$router.push({
                        name:'BetRoom',
                    })
                }else{
                    this.betPopMsg(this.rule.len)
                }
            }
        },
        // 投注数据金额添加
        addPrice(){
            if(this.$store.state.gameType.id==1){
                for(let i=0,len=this.add.length;i<len;i++){
                    this.add[i].money=this.price
                }
                this.$store.commit('liubet',this.add)
            }else{
                for(let i=0,len=this.add.length;i<len;i++){
                    this.add[i].totalMoney=(this.add[i].bet_count*(this.$store.state.everyBetRental*10))/10
                    this.add[i].money=this.$store.state.everyBetRental
                }
                this.$store.commit('betStr',this.add)
            }
        },
        // 投注提示信息
        betPopMsg(msg){
            switch(msg){
                case 2:
                    var unitArr=["十位","个位"]
                    var content="请选择"+unitArr[this.rule.index]+"号码"
                    break
                case 3:
                    var unitArr=["百位","十位","个位"]
                    var content="请选择"+unitArr[this.rule.index]+"号码"
                    break
                case 4:
                    var unitArr=["千位","百位","十位","个位"]
                    var content="请选择"+unitArr[this.rule.index]+"号码"
                    break
                case 5:
                    var unitArr=["万位","千位","百位","十位","个位"]
                    var content="请选择"+unitArr[this.rule.index]+"个号码"
                    break
                default:
                    var content=this.rule.content || "请选择投注内容"
            }
            this.showToast("text",content)
        },
    },
    filters:{
        keepNum(value){
            value=Number(value)
            return value.toFixed(2)
        }
    },
    beforeCreate() {
        Bus.$on('rule',(unit)=>{
            this.rule=unit
        })
        Bus.$on('add',(data)=>{
            this.add=data
        })
    },
    created() {
        // 选号
        this.betArr = this.$store.state.betStr;
    },
    beforeDestroy() {
        Bus.$off();
    },
    destroyed() {
        this.$store.commit('unit',1)
    },
}
</script>

<style scoped lang="less">
.button{
    width: 30%;
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
        // position: relative;
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
                width: 50%;
                border-left: 1px solid #fff;
            }
            & div:nth-child(3){
                position: relative;
                .button();
                background-color: #E54B55;
                .stamp{
                    position: absolute;
                    font-size: 10px;
                    border-radius: 50%;
                    display: inline-block;
                    width: 15px;
                    height: 15px;
                    line-height: 15px;
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
