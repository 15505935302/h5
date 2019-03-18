<template>
    <div id="header">
        <slot name="left" ><i  @click="back" class="iconfont">&#xe616;</i></slot>
        <slot></slot>
        <slot name="right"><a href="https://f18.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=55229&configID=80293&jid=1334393335&s=1"><i class="iconfont service">&#xe60f;</i></a></slot>
    </div>
</template>

<script>
export default {
    methods:{
        back(){
            window.history.back()
        }
    }
}
</script>

<style>
    #activity{
        background-color: #f5f5f5;
    }
    #header{
        background-color: #E54B55;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 17px;
        color: white;
        padding: 12px 15px;
    }
    #header i{
        width: 25px;
    }
</style>
