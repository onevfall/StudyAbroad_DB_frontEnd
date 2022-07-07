<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="350px">
        <div class="issue">
        发布单位
        </div>
        
      <img src="../assets/logo.png" class="logo"/>
  <div class="comment1">
  <el-button key="button.text" type="primary" text>评论</el-button>
  </div>
  <div class="comment2">
  <el-button key="button.text" type="primary" text>show more</el-button>
  </div>
  <div class="input-txt">
  <el-input
    v-model="myComment"
    :rows="3"
    type="textarea"
    placeholder="评论点什么吧..."
    clearable
  />
  </div>
  <el-form
    ref="ruleFormRef"
  
    status-icon
    :rules="rules"
    label-width="0px"
    
  >
    <el-form-item>
      
      <el-card class="box-card">
    
        <div class="card-header">
          <span>Name1 Surname1</span>
          <el-button class="button" text>show more </el-button>
        </div>
    
        <el-input
                    v-model="comment1"
                    class="commentForm"
                    :input-style="this.input_style"
                    type="textarea"
                    :rows="2"
                    disabled
                    placeholder="哈哈哈哈哈哈哈"
                  />
      </el-card>
      <el-card class="box-card">
    
        <div class="card-header">
          <span>Name2 Surname2</span>
          <el-button class="button" text ><font color: blue>show more</font> </el-button>
        </div>
    
        <el-input
                    v-model="comment1"
                    class="commentForm"
                    :input-style="this.input_style"
                    type="textarea"
                    disabled
                    placeholder="哈哈哈"
                    :rows="2"
                  />
        </el-card>
    </el-form-item>
   
    
    
  </el-form>



      </el-aside>
      <el-main>
        <div class="title">
        大标题
        </div>
        <el-button type=""><el-icon><ArrowUpBold />   </el-icon></el-button>
        
        <el-button type=""><el-icon><ChatLineSquare /></el-icon></el-button>
        <div class="issueTime">
          发布时间:2022年7月4日
        </div>
        <div class="retweet">
          <el-button type="primary">转发给好友</el-button>
        </div>
        <div class="keywords">
          关键词：
        </div>
        <div class="contents">
          具体内容

        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";

//import { ref } from 'vue';
import { reactive, ref } from 'vue';


export default {
  data() {
  return{
    myComment:"",

  };
},
  methods:{

  }
}

</script>

<style>

</style>
<style scoped>
.logo {
  
  margin-left:10%;
  height: 112px;
}
.issue{
  margin-top:10%;
  font-size: 20px;
  color: #409eff;
  font-family: 'Times New Roman', Times, serif;
  
}
.line{
  margin-top:10%;
}
.comment1{
  color: #409eff;
  margin-top:35%;
  float:left;
  
}
.comment2{
  color: #409eff;
  margin-top:35%;
  float:right;
}
.commentForm{
  margin-top:10%;
}
.input-text{
  margin-top:10%;
}
.title{
  margin-top:5%;
  font-size: 40px;
  color: #409eff;
  font-family: 'Times New Roman', Times, serif;
}
.issueTime{
  margin-top:5%;
  font-size: 10px;
  color: #409eff;
}
.retweet{
  float:right;
  margin-right:10%;
  font-size: 10px;
  color: #409eff;
}
.keywords{
  margin-left:-50%;
  margin-top:5%;
  font-size: 15px;
  color: #409eff;
}
.contents{
  margin-left:-50%;
  margin-top:5%;
  font-size: 15px;
  color: #409eff;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #409eff;
}

.text {
  font-size: 14px;
  color: #409eff;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
  margin-top:10%;
  color: #409eff;
}
</style>

