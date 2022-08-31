<!--
描述：问答首页
作者：王若晗
-->
<template>
  <page-loading v-if="this.loading"></page-loading>
  <el-container>
    <el-header>
      <el-row>
        <el-col :span="9" style="text-align:left;padding-left:220px;padding-top:55px">
          <img src="../assets/drawing_qacenter2.png" style="height: 140px" />
        </el-col>
        <el-col :span="7" style="text-align:left;padding-top:90px;padding-left:20px">
          留学问答
        </el-col>
        <el-col :span="8" style="text-align:left;padding-top:20px;padding-left:35px">
          <img src="../assets/drawing_qacenter1.png" style="height: 250px" />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="3" style="padding-left:10px">
          <el-button type="primary" text="primary" @click="newStatus" style="font-size:20px">
            <el-icon :size="20"><Star /></el-icon>
            按最新话题
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" text="primary" @click="heatStatus" style="font-size:20px">
            <el-icon :size="20"><Sunny /></el-icon>
            按最热话题
          </el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px" v-if="this.display_status">
        <el-col :span="6" class="card-field" v-for="ques in this.question_time_info" :key="ques">
          <question-card :question_info="ques"></question-card>
        </el-col>
      </el-row>
      <el-row style="margin-top:20px" v-if="!this.display_status">
        <el-col :span="6" class="card-field" v-for="ques in this.question_heat_info" :key="ques">
          <question-card :question_info="ques"></question-card>
        </el-col>
      </el-row>
      <el-row style="text-align:center">
        <div id="go-ask" style="margin-left:36%;">
          <span>没找到想看的问题？</span>
          <el-link type="primary" :underline="false" @click="goToAskPage" 
          style="font-size:29px;padding-bottom:6px;font-weight:500">
          去提问
          </el-link>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import QuestionCard from "../components/QuestionCard.vue";
import PageLoading from "../components/PageLoading.vue";
import axios from "axios";
export default ({
  name: "QACenterPage",
  components: {
    QuestionCard,
    PageLoading
  },
  data() {
    return {
      question_time_info:[],
      question_heat_info:[],
      display_status:true,
      loading:true
    };
  },
  methods:{
    newStatus:function(){
      this.display_status=true;
    },
    heatStatus:function(){
      this.display_status=false;
    },
    goToAskPage:function(){
      this.$router.push({
        name: "question_edit",
      });
    }
  },
  created(){
    axios({
      url: "question/time",
      method: "get",
      })
      .then((res) => {
        console.log(res.data.data);
        this.question_time_info=res.data.data.question.slice(0,8);
        for(let i=0;i<this.question_time_info.length;i++)
        {
          this.question_time_info[i].num=i;
        };
        this.loading=false;
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      url: "question/heat",
      method: "get",
      })
      .then((res) => {
        console.log(res.data.data);
        this.question_heat_info=res.data.data.question.slice(0,8);
        for(let i=0;i<this.question_heat_info.length;i++)
        {
          this.question_heat_info[i].num=i;
        };
      })
      .catch((err) => {
        console.log(err);
      });
  }
})
</script>

<style scoped>
  .el-header{
    font-size:70px;
    font-family:"SimSun";
    font-weight:bolder;
    margin-bottom:170px;
  }

  .el-main{
    padding-bottom:50px;
  }

  #go-ask{
    margin-top:20px;
    font-size:30px;
    color:rgb(37, 37, 37);
    font-weight:300;
  }
</style>