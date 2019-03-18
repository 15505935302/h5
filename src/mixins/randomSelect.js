var randomSelect={
    data() {
        return {
            randomArr:[]
        }
    },
    methods: {
        random(){
            console.log(this.$store.state.wanfa,this.$store.state.childWanfa)
            switch(this.$store.state.wanfa){
                case "不定胆":
                    if(this.$store.state.childWanfa=="后三二码" || this.$store.state.childWanfa=="前三二码" || this.$store.state.childWanfa=="二码不定胆" || this.$store.state.childWanfa=="前五二码" || this.$store.state.childWanfa=="后五二码"){
                        var p=2
                    }else if(this.$store.state.childWanfa=="前五三码" || this.$store.state.childWanfa=="后五三码"){
                        var p=3
                    }else{
                        var p=1
                    }
                    break
                case "大小单双":
                    if(this.$store.state.childWanfa=="前三" || this.$store.state.childWanfa=="后三"){
                        var p=3
                    }else if(this.$store.state.childWanfa=="前二" || this.$store.state.childWanfa=="后二"){
                        var p=2
                    }else{
                        var p=1
                    }
                    break
                case "直选":
                    if(this.$store.state.gameType.name=="排列5"){
                        var p=5
                    }else{
                        var p=3
                    }
                    break
                case "组三":
                    var p=2
                    break
                case "组六":
                    var p=3
                    break
                case "前三": // 11选5
                    var p=3
                    break
                case "前二": // 11选5
                    var p=2
                    break
                case "任选":
                    switch(this.$store.state.childWanfa){
                        case "任选二":
                            var p=2
                            break
                        case "任选三":
                            var p=3
                            break
                        case "任选四":
                            var p=4
                            break
                        case "任选五":
                            var p=5
                            break
                        case "任选六":
                            var p=6
                            break
                        case "任选七":
                            var p=7
                            break
                        case "任选八":
                            var p=8
                            break
                    }
                    break
                case "二星直选":
                    if(this.$store.state.childWanfa=='后二复试' || this.$store.state.childWanfa=='前二复试'){
                        var p=2                        
                    }else{
                        var p=1
                    }
                    break
                case "三星玩法":
                    var p=3
                    break
                case "四星玩法":
                    var p=4
                    break
                case "五星玩法":
                    var p=5
                    break
                case "连码":
                    switch(this.$store.state.childWanfa){
                        case "四全中":
                            var p=4
                            break
                        case "三全中":
                            var p=3
                            break
                        case "三中二":
                            var p=3
                            break
                        default:
                            var p=2
                    }
                    break
                case "生肖连":
                    if(this.$store.state.childWanfa=="二肖连中" || this.$store.state.childWanfa=="二肖连不中"){
                        var p=2
                    }else if(this.$store.state.childWanfa=="三肖连中" || this.$store.state.childWanfa=="三肖连不中"){
                        var p=3
                    }else if(this.$store.state.childWanfa=="五肖连中"){
                        var p=5
                    }else{
                        var p=4
                    }
                    break
                case "尾数连":
                    if(this.$store.state.childWanfa=="二尾连中" || this.$store.state.childWanfa=="二尾连不中"){
                        var p=2
                    }else if(this.$store.state.childWanfa=="三尾连中" || this.$store.state.childWanfa=="三尾连不中"){
                        var p=3
                    }else{
                        var p=4
                    }
                    break
                case "全不中":
                    switch(this.$store.state.childWanfa){
                        case "五不中":
                            var p=5
                            break
                        case "六不中":
                            var p=6
                            break
                        case "七不中":
                            var p=7
                            break
                        case "八不中":
                            var p=8
                            break
                        case "九不中":
                            var p=9
                            break
                        case "十不中":
                            var p=10
                            break
                        case "十一不中":
                            var p=11
                            break
                        case "十二不中":
                            var p=12
                            break
                    }
                    break
                case "合肖":
                    switch(this.$store.state.childWanfa){
                        case "二肖":
                            var p=2
                            break
                        case "三肖":
                            var p=3
                            break
                        case "四肖":
                            var p=4
                            break
                        case "五肖":
                            var p=5
                            break
                        case "六肖":
                            var p=6
                            break
                        case "七肖":
                            var p=7
                            break
                        case "八肖":
                            var p=8
                            break
                        case "九肖":
                            var p=9
                            break
                        case "十肖":
                            var p=10
                            break
                        case "十一肖":
                            var p=11
                            break
                    }
                    break
                default:
                    var p=1
            }
            if(this.$store.state.wanfa=="前二" || this.$store.state.wanfa=="前三" || this.$store.state.wanfa=="大小单双" || this.$store.state.wanfa=="直选" ||  this.$store.state.wanfa=="二星直选" || this.$store.state.wanfa=="三星玩法" || this.$store.state.wanfa=="四星玩法" || this.$store.state.wanfa=="五星玩法"){
                if(this.$store.state.childWanfa=="组选"){
                    var randomNumber=this.randomCount(p)
                }else{
                    var randomNumber=this.unitRandom(p,this.$store.state.leng)
                }
            }else{
                var randomNumber=this.randomCount(p)
            }
            this.$store.commit("random",randomNumber)
            console.log(this.$store.state.random)
        },
        // 机选随机号码生成
        randomCount(p){
            console.log(this.$store.state.numLength)
            let arr=[]
            let randomIndex=[]
            if(p==1){
                let num=Math.floor(Math.random()*this.$store.state.numLength)
                randomIndex.push(num)
            }else{
                for(let i=0;i<this.$store.state.numLength;i++){
                    arr.push(i)
                }
                do{
                    let num=Math.floor(Math.random()*arr.length)
                    var flag=true
                    randomIndex.push(arr[num])
                    arr.splice(num,1)
                    if(arr.length==(this.$store.state.numLength-p)){
                        flag=false
                    }
                }while(flag)
            }
            return randomIndex
        },
        // 有位数定位随机号码生成
        unitRandom(p,leng){
            let arr=[]
            do{
                let num=Math.floor(Math.random()*leng)
                arr.push(num)
                var flag=true
                if(arr.length>=p){
                    flag=false
                }
            }while(flag)
            return arr
        },
    },
}

export default randomSelect