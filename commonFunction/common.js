import Bus from '../src/store/bus'
const common = {}
 
 
// 删除数组元素
Array.prototype.indexOf = function(val) {
  for (var i = 0; i < this.length; i++) {
  if (this[i] == val) return i;
  }
  return -1;
};
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
  this.splice(index, 1);
  }
};
common.removeArr=function(arr,val){
  arr.remove(val)
}
 
// 日期期号过滤（今日第一期上一期为昨日最后一期时期号计算）
common.timeQihao=function(qihao,remarks,gameType){
  if(qihao && qihao.length>=11 && gameType!==14){
    let num=String(qihao).slice(8)
    let date=String(qihao).substr(0,8)
    let allQishu= remarks.replace(/[^0-9]/ig,"");
    if(num=="001"){
      return (date-1)+allQishu
    }else{
      return qihao-1
    }
  }else{
    return qihao-1
  }
}
// 六合彩色波区分
common.color=function(num){
  let green=['5','6','11','16','17','21','22','27','28','32','33','38','39','43','44','49']
  let blue=['3','4','9','10','14','15','20','25','26','31','36','37','41','42','47','48',]
  if(green.indexOf(num)!=-1){
    return "liugreen"
  }else if(blue.indexOf(num)!=-1){
    return "liublue"
  }else{
    return "liured"
  }
}
// 六合彩色波区分
common.fontcolor=function(num){
  let green=['05','06','11','16','17','21','22','27','28','32','33','38','39','43','44','49',"绿波","绿单","绿双","绿大","绿小","绿合单","绿合双"]
  let blue=['03','04','09','10','14','15','20','25','26','31','36','37','41','42','47','48','蓝波',"蓝单","蓝双","蓝大","蓝小","蓝合单","蓝合双"]
  if(green.indexOf(num)!=-1){
    return "green"
  }else if(blue.indexOf(num)!=-1){
    return "blue"
  }else{
    return "red"
  }
}
// 不定胆投注处理 lottery:区别彩种类，minBet:最小投注，type:房间模式/直投模式
common.budingBet=function(bet,numArr,betStr,minBet,type,lottery){
  if (bet.classList.contains('betActive') != true) {
    bet.classList.add('betActive')
    switch(type){
      case 0:
        this.direct(bet,numArr,betStr,"add")
        break
      case 1:
        this.roomBet(bet,numArr,betStr,"add")
        break
    }
    betStr.bet_count=this.combinationCount(bet.dataset.wanfa_type,numArr.length,minBet)
  } else {
    bet.classList.remove('betActive')
    switch(type){
      case 0:
        this.direct(bet,numArr,betStr,"del")
        break
      case 1:
        this.roomBet(bet,numArr,betStr,"del")
        break
    }
    betStr.bet_count=this.combinationCount(bet.dataset.wanfa_type,numArr.length,minBet)
  }
  if(numArr.length<minBet){
    let unit={}
    unit.content="请至少选择"+minBet+"号码"
    Bus.$emit("rule",unit)
  }
  let arr=[]
  if(numArr.length>0){
    arr.push(betStr)
  }else{
    arr=[]    
  }
  Bus.$emit('add', arr)
}
// 房间投注数据处理
common.roomBet=function(bet,numArr,betStr,status){
  if(status=="add"){
    betStr.point = 2
    betStr.bili_id = bet.dataset.bili_id
    betStr.wanfa_type = bet.dataset.wanfa_type
    betStr.multiple_count = 1
    numArr.push(bet.dataset.betnumbers)
    betStr.betNumbers =numArr.join(",")
  }else{
    let id = bet.dataset.betnumbers
    for (let i = 0; i < numArr.length; i++) {
      if (numArr[i] == id) {
        numArr.splice(i, 1)
      }
    }
    betStr.betNumbers =numArr.join(",")
  }
}
// 直投数据处理
common.direct=function(bet,numArr,betarr,status){
  if(status=="add"){
    betarr.point = 2
    betarr.wanfa_id = bet.dataset.wanfa_id
    betarr.wanfa_type = bet.dataset.wanfa_type
    let wanfaType=bet.dataset.wanfa_type.split(",")[0]
    if(wanfaType=="连码" || wanfaType=="合肖" || wanfaType=="生肖连" || wanfaType=="尾数连" || wanfaType=="全不中"){
      betarr.isbetcount=1
    }
    betarr.multiple_count = 1
    numArr.push(bet.dataset.numbers)
    betarr.numbers =numArr.join(",")
  }else{
    let id = bet.dataset.numbers
    for (let i = 0; i < numArr.length; i++) {
      if (numArr[i] == id) {
        numArr.splice(i, 1)
      }
    }
    betarr.numbers=numArr.join(",")
  }
}
// 投注或取消投注函数
common.bet = function (bet, addBet,lottery) {
  if(lottery.id==1){
    if (bet.classList.contains('betActive') != true) {
      bet.classList.add('betActive')
      let betStr = {}
      betStr.isbetcount=0
      betStr.wanfa_id = bet.dataset.wanfa_id
      betStr.wanfa_type = bet.dataset.wanfa_type
      betStr.wanfa_name = bet.dataset.wanfa_name
      betStr.bet_count = 1
      betStr.multiple_count = 1
      addBet.push(betStr)
    } else {
      bet.classList.remove('betActive')
      let id = bet.dataset.wanfa_id
      for (let i = 0; i < addBet.length; i++) {
        if (addBet[i].wanfa_id == id) {
          addBet.splice(i, 1)
        }
      }
    }
  }else{
    if (bet.classList.contains('betActive') != true) {
      bet.classList.add('betActive')
      let betStr = {}
      betStr.point = 2
      betStr.bili_id = bet.dataset.bili_id
      betStr.wanfa_type = bet.dataset.wanfa_type
      betStr.bili_name = bet.dataset.bili_name
      betStr.bet_count = 1
      betStr.multiple_count = 1
      addBet.push(betStr)
    } else {
      bet.classList.remove('betActive')
      let id = bet.dataset.bili_id
      for (let i = 0; i < addBet.length; i++) {
        if (addBet[i].bili_id == id) {
          addBet.splice(i, 1)
        }
      }
    }
  }
  Bus.$emit('add', addBet)
}
// 六合投注或取消投注函数
common.betliuhe = function (bet,betNo, addBet) {
    let betNum = JSON.parse(JSON.stringify(betNo))
    let arr=[]
  if (bet.className != 'betActive') {
    bet.classList.add('betActive')
    let betStr = {}
    betStr.wanfa_id = bet.dataset.bili_id
    betStr.wanfa_type = bet.dataset.wanfa_type
    betStr.min_select = bet.dataset.min_select
    betStr.isbetcount = 1
    betStr.numbers=betNum.join(",")
    betStr.betcount = this.combination(betNo.length,bet.dataset.min_select)
    // betStr.bet_count=this.combination(bet.dataset.wanfa_type,betNo.length,bet.dataset.min_select)
    arr.push(betStr)
  } else {
    bet.classList.remove('betActive')
    let id = bet.dataset.bili_id
    for (let i = 0; i < addBet.length; i++) {
      if (addBet[i].bili_id == id) {
        addBet.splice(i, 1)
      }
    }
  }
  addBet=arr
  Bus.$emit('add', addBet)
}
// 六合（全不中和合肖）投注或取消投注函数
common.betliuone = function (bet,betNo, addBet) {
  let betNum = JSON.parse(JSON.stringify(betNo))
  let arr=[]
if (bet.className != 'betActive') {
  bet.classList.add('betActive')
  let betStr = {}
  betStr.wanfa_id = bet.dataset.bili_id
  betStr.wanfa_type = bet.dataset.wanfa_type
  betStr.min_select = bet.dataset.min_select
  betStr.isbetcount = 1
  betStr.numbers=betNum.join(",")
  betStr.bet_count = 1
  arr.push(betStr)
} else {
  bet.classList.remove('betActive')
  let id = bet.dataset.bili_id
  for (let i = 0; i < addBet.length; i++) {
    if (addBet[i].bili_id == id) {
      addBet.splice(i, 1)
    }
  }
}
addBet=arr
Bus.$emit('add', addBet)
}
 
// 投注数据处理betNo（投注号码）betId（投注Id）
common.pk10bet = function (bet, betNo, betId,gameType) {
      let betMsg = JSON.parse(JSON.stringify(betNo))
      let id = JSON.parse(JSON.stringify(betId))
      let str = []
      let idStr = []
      // 注数计算
      let betNum=[]
      for (let i = 0, len = betMsg.length; i < len; i++) {
        betNum.push(betMsg[i].length)
        if (betMsg[i].length <= 0) {
          betMsg[i].push("-")
          id[i].push("-")
        } 
        str.push(betMsg[i].join(""))
        idStr.push(id[i].join(""))
      }
      let arr = []
      let betStr = {}
      let betCount=this.combinationCount(bet.dataset.wanfa_type,betNum)
      if(gameType==14 || gameType==12){
        betStr.wanfa_id=bet.dataset.wanfa_id
        betStr.wanfa_type=bet.dataset.wanfa_type
        betStr.money=2
        betStr.bet_count = betCount
        betStr.numbers=str.join(",")
        betStr.multiple_count=1
        betStr.totalMoney=betCount*2
      }else{
        betStr.point = 2
        betStr.bili_id = idStr.join(",")
        betStr.wanfa_type = bet.dataset.wanfa_type
        betStr.bili_name = str.join(",")
        betStr.bet_count = betCount
        betStr.multiple_count = 1
      }
      arr.push(betStr)
      Bus.$emit('add', arr)
},
// 组三，组六注数计算
common.combinationCount=function(wanfaType,num,n){
  switch(wanfaType){
    case "组三":
      var type=1
      break
    case "组六":
      var type=2
      break
    case "直选":
      var type=3
      break
    case "总和":
      var type=3
      break
    case "前三":
      var type=3
      break
    case "后三":
      var type=3
      break
    case "前二":
      var type=3
      break
    case "后二":
      var type=3
      break
    case "后二复式":
      var type=3
      break
    case "前二复式":
      var type=3
      break
    case "后二和值":
      var type=5
      break
    case "前二和值":
      var type=5
      break
    case "后三复式":
      var type=3
      break
    case "中三复式":
      var type=3
      break
    case "前三复式":
      var type=3
      break
    case "后四复式":
      var type=3
      break
    case "五星复式":
      var type=3
      break
    case "豹子":
      var type=3
      break
    case "定位胆":
      var type=4
      break
    case "猜双面":
      var type=4
      break
    case "猜数字":
      var type=4
      break
    default:
      var type=999
  }
  switch(type){
    case 1:
      var p=num*(num-1)
      break
    case 2:
      var p=num*(num-1)*(num-2)/6
      break
    case 3:
      var p=num.reduce(function(a, b) {
        return a * b;        //如果是相加return a + b 如果是相减return a - b
      })
      break
    case 4:
      var p=num.reduce(function(a, b) {
        return a + b;     //如果是相加return a + b 如果是相减return a - b
      })
      break
    case 5: // 和值注数计算
      var p=0
      console.log(wanfaType,num)
      let arr=[0,1,2,3,4,5,6,7,8,9]
      for(let i=0,len=num[0].length;i<len;i++){
        for(let j=0,len=arr.length;j<len;j++){
          if(arr.indexOf(num[0][i]-arr[j])!=-1){
            p++
          }
        }
      }
      break
    default: // 不定胆投注
      // 彩种投注注数算法
      function factorial(m,n){
        var num = 1;
        var count = 0;
        for(var i = m;i > 0;i--){
            if(count == n){//当循环次数等于指定的相乘个数时，即跳出for循环
                break;
            }
            num = num * i;
            count++;
        }
        return num;
      }
      function  combination(m,n){
        if(m==0){
          return 0
        }else{
          return factorial(m,n)/factorial(n,n);//就是Cmn(上面是n，下面是m) = Amn(上面是n，下面是m)/Ann(上下都是n)
        }
      }
      var p=Math.floor(combination(num,n))
  }
  return p
}
// 福彩：排列3、排列5、福彩3D投注(直选、定位胆)
common.fucaiBet=function(bet,betNo,wanfa){
  let arr=[]
  let betFigure=[]
  let betStr={}
  let betNum=[]
  let betMsg=JSON.parse(JSON.stringify(betNo))
  // 注数
  let betcount=0
  if(bet.dataset.wanfa_type=="直选" || wanfa=="大小单双"){
    if(betMsg.length==1){
      betNum.push(betMsg[0].length)
      betFigure.push(betMsg[0].join(","))
      betcount=this.combinationCount(bet.dataset.wanfa_type,betNum)
    }else{
      for(let i=0,len=betMsg.length;i<len;i++){
        betNum.push(betMsg[i].length)
        betFigure.push(betMsg[i].join(""))
        betcount=this.combinationCount(bet.dataset.wanfa_type,betNum)
      }
    }
  }else if(bet.dataset.wanfa_type=="后二和值" || bet.dataset.wanfa_type=="前二和值"){
    betFigure=betMsg
    betNum=betMsg
    betcount=this.combinationCount(bet.dataset.wanfa_type,betMsg)
  }else{
    for(let i=0,len=betMsg.length;i<len;i++){
      betNum.push(betNo[i].length)
      if(betMsg[i].length<=0){
        betMsg[i].push("-")
      }
      betFigure.push(betMsg[i].join(""))
    }
    betcount=this.combinationCount(bet.dataset.wanfa_type,betNum)
  }
  betStr.wanfa_id=bet.dataset.wanfa_id
  betStr.wanfa_type=bet.dataset.wanfa_type
  betStr.bet_count=betcount
  betStr.multiple_count=1
  betStr.numbers=betFigure.join(",")
  // 判断是否符合投注规则  
  if(betNum.indexOf(0)!=-1){
    let unit={}
    unit.index=betNum.indexOf(0)
    unit.len=betNo.length
    Bus.$emit("rule",unit)
  }
  let count=0
  if(betNum.length>0){
    for(let i=0;i<betNum.length;i++){
      count+=betNum[i]
    }
    if(count==0){
      arr=[]
    }else{
      arr.push(betStr)
    }
  }else{
    arr=[]
  }
  Bus.$emit("add",arr)
}
 
common.img = function (data) {
  let imgSrc = {
    '1': './static/img/tb-04.png',
    '2': './static/img/tb-04.png',
    '10': './static/img/tb-01.png',
    '9': './static/img/tb-04.png',
    '4': './static/img/tb-01.png',
    '12': './static/img/tb-02.png',
    '13': './static/img/tb-09.png',
    '15': './static/img/tb-17.png',
    '11': './static/img/tb-06.png',
    '3': './static/img/tb-07.png',
    '7': './static/img/tb-07.png',
    '30': './static/img/tb-07.png',
    '25': './static/img/tb-08.png',
    '21': './static/img/tb-14.png',
    '5': './static/img/tb-15.png',
    '6': './static/img/tb-16.png',
    '14': './static/img/tb-18.png',
  }
  return imgSrc[data]
}
export default common