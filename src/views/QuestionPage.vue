<!--
描述：问题页面
作者：王若晗
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <el-card id="question" shadow="never">
          <el-row>
            <el-col :span="1"></el-col>
            <el-col :span="19">
              <el-row>
                <el-col :span="3">
                  <el-tag size="middle">{{this.question_info.user_university}}</el-tag>
                </el-col>
                <el-col :span="2">
                  <el-tag size="middle">{{this.question_info.university_country}}</el-tag>
                </el-col>
              </el-row>
              <el-row class="user_info">
                <el-col :span="2">
                  <el-avatar shape="circle" :size="50" :src="this.question_info.user_profile" />
                </el-col>
                <span class="user_name">
                  {{this.question_info.user_name}}
                </span>
                <el-col id="user_identify" :span="2">
                  <el-tag v-if="this.question_info.user_qualification!=null" type="warning" size="large">已认证:{{this.question_info.user_university}} {{this.question_info.user_qualification}}</el-tag>
                </el-col>
              </el-row>
              <el-row id="question_content">问题：{{this.question_info.question_title}}</el-row>
            </el-col>
            <el-col :span="4">
              <img src="../assets/question.png" style="height: 200px">
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="1"></el-col>
            <el-col id="question_details" :span="20">
              <div v-if="isFull" style="text-align:left">
                详细阐释：{{this.question_info.question_des}}
              </div>
              <div v-if="!isFull" style="text-align:left">
                详细阐释：{{this.question_info.question_description}}
              </div>
            </el-col>
            <el-col class="expand" :span="3">
              <!--展开收起-->
              <el-button id="expand" type="info" text="info" @click="expandToFull">{{textStatus}}</el-button>
            </el-col>
          </el-row>
          <el-row class="question_tools">
            <el-col :span="1"></el-col>
            <el-col :span="2">
              <el-button type="primary" size="large" @click="goToWriteAnswerPage">写回答</el-button>
            </el-col>
            <el-col :span="6">
            </el-col>
            <el-col :span="4">
            </el-col>
          </el-row>
        </el-card>
        <el-row class="bottom">
          <el-col :span="16">
            <el-card id="answer_card" shadow="never">
              <el-row style="margin-bottom:30px">
                {{answer_num}}条回答
              </el-row>
              <div class="answer" v-for="ans in this.answer_info" :key="ans">
                <div @click="goToAnswerPage(ans.AnswerId)">
                  <el-row>
                    <el-col :span="2">
                      <el-avatar shape="circle" :size="50" :src="ans.UserProfile" />
                    </el-col>
                    <span class="user_name">
                      {{ans.UserName}}
                    </span>
                  </el-row>
                  <el-row id="answer_content">
                    {{ans.AnswerSummary}}
                  </el-row>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <div class="card" v-for="ques in this.card_info" :key="ques">
              <side-card :card_info="ques"></side-card>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import RelatedQuestion from '@/components/RelatedQuestion.vue';
import SideCard from "../components/SideCard.vue";
import axios from "axios"
export default {
  name: 'QuestionPage',
  components: {
    RelatedQuestion,
    SideCard,
  },
  data() {
    return {
      relevant_question_info: "",//相关问题
      question_relevant: [], //存储相关问题的信息
      question_info:"",//问题信息
      card_info:[],//卡片信息(用于传参)
      answer_info:[],//回答信息
      question_id:12,
      answer_num:0,
      related_question_tag:"",
      isFull:true,
      textStatus:"展开全文↓",
    };
  },
  methods:{
    goToWriteAnswerPage:function(){
      alert("跳转至写回答页面")
    },
    expandToFull:function(){
      this.isFull=!this.isFull;
      if(this.isFull)
      {
        this.textStatus="展开全文↓";
      }
      else
      {
        this.textStatus="收起";
      }
    },
    goToAnswerPage:function(ans_id){
      this.$router.push({
        name:"answer_detail",
        query:{answer_id:ans_id,question_id:this.question_info.question_id},
      });
    },
  },
  computed: {
    answerShow:function() {
      if (this.answer_info.answer_content.length < 100) {
        return this.answer_info.answer_content;
      } 
      else {
        return this.answer_info.answer_content.slice(0, 100) + "...";
      }
    },
  },
  created() {
    //在此处向服务器请求数据，初始化所需变量
    //问题信息
    axios({
      url:'question',
      method:'get',
      params:{
        question_id:this.question_id,
      },
    })
    .then((res)=>{
      console.log(res.data.data);
      this.question_info=res.data.data;
      if(this.question_info.question_description.length>100)
        this.question_info.question_des=this.question_info.question_description.slice(0, 100)+"...";
      else
        this.question_info.question_des=this.question_info.question_description;
    })
    .catch((err) => {
      console.log(err);
    });
    //回答信息
    axios({
      url:'question/answers',
      method:'get',
      params:{
        question_id:this.question_id,
      },
    })
    .then((res)=>{
      console.log(res.data.data);
      this.answer_num=res.data.data.count;
      this.answer_info=res.data.data.answers;
      console.log(this.answer_info);
    })
    .catch((err) => {
      console.log(err);
    });
    //相关问题
    axios({
      url:'question/related',
      method:'get',
      params:{
        question_id:this.question_id,
      },
    })
    .then((res)=>{
      console.log(res.data.data);
      this.related_question_tag=res.data.data.tag;
      this.question_relevant=res.data.data.related_questions;
      for(let i=0;i<this.question_relevant.length;i++)
      {
        var tem_info = {
          essence:"问题",
          content:this.question_relevant[i].QuestionSummary,
          keyword:res.data.data.tag,
          id:this.question_relevant[i].QuestionId,
        };
        this.card_info.push(tem_info);
      };
      console.log(this.card_info);
    })
    .catch((err) => {
      console.log(err);
    });
  }
}
</script>

<style scoped>
.el-header{
  background:#87A5C7;
}
.el-main{
  background:#F1F9FF;
  padding-left:50px;
  padding-right:50px;
}

.el-footer{
  background:#87A5C7;
}

.logo{
  height:80px;
  margin-top:10px;
}

.userInfo{
  margin-top:10px;
}

.user_name{
  display: flex;
  align-items:center;
  font-family:SimSun;
  font-weight:bolder;
  font-size:large;
  margin-right:10px;
}

#user_identify{
  display: flex;
  align-items:center;
}

.user_info{
  margin-top:20px;
}

#question_content{
  display: flex;
  align-items:center;
  font-family:SimSun;
  font-weight:bolder;
  font-size:50px;
  margin-left:5px;
  margin-top:18px;
  text-align:left
}

#question_details{
  display: flex;
  align-items:center;
  font-family:SimSun;
  font-weight:bolder;
  font-size:20px;
  padding-left:10px;
}

.expand{
  display: flex;
  align-items:center;
  padding-left:10px;
}

#expand{
  font-family:SimSun;
  font-size:10px;
}

.question_tools{
  margin-top:50px;
  margin-bottom:30px;
}

.bottom{
  margin-top:80px;
}

#question{
  margin-top:30px;
}

#answer_card{
  margin-right:20px;
  font-family:SimSun;
  font-weight:bolder;
  padding-left:20px;
  padding-right:20px;
}

.answer{
  padding-top:20px;
  padding-bottom:40px;
  border-top:0.8px solid black;
  border-bottom:0.8px solid black;
  font-size:15px;
  color:grey;
}

.card{
  margin-left:29px;
  margin-bottom:20px;
}

#answer_content{
  font-size:20px;
  color:black;
  margin-top:10px;
  padding-left:10px;
  text-align:left
}

</style>


