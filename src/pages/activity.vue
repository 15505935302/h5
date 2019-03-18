<template>
    <div id="activity">
        <oneHead>
            <span>活动中心</span>
        </oneHead>
        <div class="activity_list">
            <div v-for="item in data" @click="activity(item)" :key="item.id">
                <img :src="item.img_url" alt="">
                <div class="details">
                    <div>
                        <span>{{item.title}}</span>
                        <p>{{item.sub_title}}</p>
                    </div>
                    <i class="iconfont">&#xe655;</i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import oneHead from "../components/onehead"
export default {
    components:{
        oneHead,
    },
    data(){
        return {
            data:'',
        }
    },
    methods:{
        homecontent(){
            this.$api.homecontent().then(res=>{
                console.log(res)
                this.data=res.data.data
            })
        },
        activity(item){
            if(item.type==4 || item.type==5){
                this.$router.push({
                    name: 'ActivityDetails',
                    params: {
                        item: item
                    }
                })
            }else{
                this.$router.push({
                    name: 'set_help_details',
                    params: {
                        item: item
                    }
                })
            }
        }
    },
    mounted(){
        this.homecontent()
    }
}
</script>

<style scoped>
    #activity{
        background-color: #f5f5f5;
    }
    .activity_list{
        padding: 0 15px 15px;
        font-size: 0;
    }
    .activity_list>div{
        background-color: #fff;
        border-radius: 5px;
        overflow: hidden;
        margin: 15px auto 0;
    }
    .activity_list div img{
        width: 100%;
    }
    .details{
        padding: 9px 16px;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .details>div{
        width: 80%;
    }
    .details div span{
        color: #333;
        font-size: 14px;
    }
    .details div p{
        color: #888;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>
