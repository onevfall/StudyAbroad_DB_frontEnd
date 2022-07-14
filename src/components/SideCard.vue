<!--
描述：问答板块边栏卡片
作者：方新宇
-->
<template>
  <!-- 用户信息展示卡片的封装，需传入用户信息对象 -->
  <el-card class="box-card" :body-style="this.body_style">
    <template #header>
      <div class="card-header">
        <span
          ><b>相关{{card_info.essence}}</b></span
        >
        <!-- 如何获知当前是动态详情界面还是问题详情界面 靠外部传参 essence-->
      </div>
    </template>
    <span class="content" >内容梗概: {{ card_info.content }}</span>
    <span class="keyword" >关键词: {{ card_info.keyword }}</span>
    <!-- 关键词还需要改成类似认证的tag形式，需要前端对传来的字符串进行split -->
    <div class="nextpage">
        <el-icon class="icon"><Compass /></el-icon>
        <el-button class="button" :type="primary" text @click="toDetailPage">点击此处查看详情</el-button>
    </div>
  </el-card>
</template>
<script>
import { computed } from "@vue/runtime-core";
import axios from "axios";
import AnswerDetailVue from '@/views/AnswerDetail.vue';
//import { ElMessage } from "element-plus";
export default {
  props: ["card_info"],
  components: {
  },
  data() {
    return {
      body_style: {
        // color: "red",
      },
    };
  },
  computed: {
    
  },
  methods: {
    toDetailPage(){//后续待改
        if(this.card_info.essence === "问题")
        {
          console.log(this.card_info.id);
          this.$router.push({
            name:"answer_detail",
            query:{id:this.card_info.id},
          });
        }
        else
            console.log("11blog");
    },
    
  },
};
</script>

<style scoped>
.card-header {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  color:#469afb;
  font-family: "宋体";
  font-size: large;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 350px;
}
.info_field {
  margin-left: 33px;
  margin-top: 15px;
  margin-bottom: 15px;
}
.info_field .label {
  margin-bottom: 5px;
}
.content{
    width:300px;
    word-break:break-all;
    display:inline-block;
    /* display:-webkit-box; */
    white-space: nowrap; 
    /* white-space: normal;*/
    /* font-size: small;  */
    overflow: hidden;
    text-overflow: ellipsis;
    text-align:left;
    color:#469afb;
    font-family: "宋体";
}

.keyword{
    width:300px;
    margin-top:10px;
    margin-left:0px;
    word-break:break-all;
    display:inline-block;
    /* display:-webkit-box; */
    white-space: nowrap; 
    /* white-space: normal;*/
    overflow: hidden;
    text-overflow: ellipsis;
    text-align:left;
    color:#469afb;
    font-family: "宋体";
}
.nextpage{
  margin-left:1px;
  margin-top:10px;
  text-align:left;
  color:#469afb;
}
.nextpage .icon{
  padding-top:5px;
  padding-left:5px;
}
.nextpage .button{
  padding-top:-10px;
  margin-top:-10px;
  color:#469afb;
  font-family: "宋体";
}
</style>
