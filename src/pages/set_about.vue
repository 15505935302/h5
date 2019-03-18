<template>
    <div id="set_hubs">
      <Head>
        <span slot="pageName">帮助指南</span>
      </Head>
      <div>
        <ul>
          <li v-for="(item, index) in lists" :key="index" @click="lis($event,item)" :data-id = index>
            <span>{{item.title}}</span>
            <i class="iconfont">&#xe655;</i>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import Head from "../components/header";
    export default {
    name: "set_hubs",
    data (){
      return{
            lists:[
              {
                title:"关于我们",
                content:'500彩成立于2014年，长期秉持＂客户第一、用户至上＂的服务宗旨，为广大用户提供最优质的购彩体验。<br>携手Cpunion（CP联盟互动娱乐）提供最专业的彩票投注系统，为广大用户提供＂安全、可靠、极致＂的服务体验。<br>提供最合理的赔率，多渠道的收付款方式，多元化的投注玩法让广大用户享受高品质的购彩体验。<br><br><h4>诚信为本：</h4>作为专业的彩票投注平台，我们承诺，为每一位用户提供最安全、最公平的购彩服务。<br><br><h4>安全与信誉:</h4>专业严谨的风险控管，以及第三方资金保险，100％保证玩家资金。<br>获得国际第三方TST公司的系统认证。<br>诺顿分级评级为安全网站，绝无任何恶意软件。<br>获得GEOTRUST国际认证，确保网站公平公正性，所有会员数据均经过加密，保障玩家隐私。<br>',
              },
              {
                title:"联系我们",
                content:'500彩暂时仅提供在线咨询服务，点击网站右上角＂在线客服＂即可进行在线咨询；<br>我们提供全天24小时在线咨询服务，全年无休；<br>专业的客服团队，24小时为您解答所有疑问；<br>',
              },
              {
                title:"商务合作",
                content:'<h4>内容合作</h4>如果您拥有精彩或原创的与彩票玩法彩票技巧等相关的内容或其他资源,欢迎您与我们取得联系！<br><br><h4>广告合作</h4>通过对网站广告位的互换及其他自由组合形式的广告资源置换来扩大宣传、增加多样化服务入口，最终以提升网站用户能取更多附加价值为目的。<br>如果您有相应的资源，非常欢迎您和我们取得联系。<br><br><h4>媒体合作</h4>如果您拥有互联网、微信、微博等各类传统与新媒体的丰富资源欢迎您与我们取得联系,让我们通过双方的友好合作来共同提高彼此的影响力！',
              },
              {
                title:"法律声明",
                content:'本网站提供的任何内容（包括但不限于数据、文字、图表、图象、声音或录象等）的版权均属于本网站或相关权利人。<br>未经本网站或相关权利人事先的书面许可，您不得以任何方式擅自复制、再造、传播、出版、转帖、改编或陈列本网站的内容。<br>同时，未经本网站书面许可，对于本网站上的任何内容，任何人不得在非本网站所属的服务器上做镜像。<br>任何未经授权使用本网站的行为都将违反《中华人民共和国著作权法》和其他法律法规以及有关国际公约的规定。<br>',
              },
              {
                title:"隐私声明",
                content:'在登陆时向我们提供您的个人信息是基于对我们的信任，我们会以专业、谨慎和负责的态度对待您的个人信息。<br>我们认为隐私权是您的重要权利，我们尊重您的隐私权，您提供的信息只能用于帮助我们为您提供更好的服务，因此，我们制定了个人信息保密制度以保护您的个人信息。<br>凡以任何方式登陆本网站或直接、间接使用本网站资料者，视为自愿接受本网站声明的约束。<br>我们的隐私权保护条款如下：<br><br><h4>个人信息的收集</h4>在您注册、使用本网站服务时，经您的同意，我们收集与个人身份有关的信息。<br>如果您无法提供相应信息，可能会不能使用对应服务。<br>我们也会基于优化用户体验的目的，收集其他有关的信息，以便优化我们的网站服务。<br><br><h4>隐私的保护</h4>保护用户隐私是本网站的一项基本政策。<br>本网站不会公布或传播您在本网站注册的任何资料，但下列情况除外：1）事先获得用户的明确授权；<br>2）用户对自身信息保密不当原因，导致用户非公开信息泄露；<br>3）由于网络线路、黑客攻击、计算机病毒、政府管制等原因造成的资料泄露、丢失、被盗用或被篡改等；<br>4）根据有关法律法规的要求；<br> 5）依据法院或仲裁机构的裁判或裁决，以及其他司法程序的要求；<br>6按照相关政府主管部门的要求；<br><br><h4>自我更新与信息公开</h4>我们鼓励您自我更新和修改个人信息以使其安全和有效。<br>您能在任何时候非常容易地获取并修改您的个人信息，您可以随时自行决定修改、删除您在网站上的相关资料。<br>您是唯一对您的账号和密码信息负有保密责任的人，任何情况下，请小心妥善保管。<br>无论何时您自愿在公开场合披露个人信息， 此种信息可能被他人收集及使用，因此造成您的个人信息泄露，网站不承担责任。<br><br><h4>提示</h4>我们可能会不时修改我们的隐私政策，这些修改会反映在本声明中，我们的任何修改都会将您的权益和满意度置於首位，我们希望您在每次访问我们的网页时都查阅我们的隐私声明，用户继续享用服务，则视为接受服务条款的变动。<br>',
              },
            ],

      }
    },
    components:{
        Head,
    },
    methods:{
      lis(e,item){
        if(e.target!=e.currentTaregt){
           this.$router.push({
              name: 'set_help_details',
              params: {
                item: item
              }
            })
        }
      }
    },
    }
</script>

<style scoped lang='less'>
  #set_hubs{
    background: #f5f5f5;
    padding-top: 50px;
  }
  .serve i{
    color: white;
    font-size: 20px;
    line-height: 30px;
  }
  #set_hubs ul{
    list-style: none;
    padding-left:15px;
    box-sizing: border-box;
    background-color: white;
    width: 100%;
    line-height: 30px;
  }
  #set_hubs ul li{
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding: 8px 10px 8px 0;
    font-size: 13px;
  }
  #set_hubs ul li i,.setting i{
    color: #ddd;
    font-size: 16px;
  }
  #set_hubs ul li>div,.setting>div{
    display: flex;
    align-items: center;
  }
  #set_hubs ul li>div .serve i,.setting .serve i{
    font-size: 15px;
    line-height: 20px;
    color: white;
  }
  
</style>
