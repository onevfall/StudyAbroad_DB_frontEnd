<!--
描述：问答首页卡片
作者：王若晗
-->
<template>
  <div class="card-field">
    <el-card class="question-card" shadow="hover">
      <template #header>
        <div id="card-header">
          <span>{{"0"+(this.question_info.num+1)}}</span>
        </div>
      </template>
      <el-row id="card-body">
        {{ contentShow }}
      </el-row>
      <el-row justify="end">
        <el-button type="primary" text="primary" @click="goToQuestionDetails" style="text-align:left;margin-top:30px">
            查看详情
            <br>
            >>
        </el-button>
      </el-row>
      <el-row style="margin-top:40px">
        <el-col :span="8" class="display-num">
            <!-- <el-icon :size="18"><Chicken /></el-icon> {{ this.question_info.QuestionReward }} -->
            <img src="../assets/favorite.png" style="height:16px"/> {{ this.question_info.QuestionReward }}
        </el-col>
        <el-col :span="8" class="display-num">
            <el-icon :size="18"><FolderRemove /></el-icon> {{ this.question_info.Count }}
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: ["question_info"],
  computed: {
    contentShow() {
      if (this.question_info.QuestionTitle.length < 19) {
        return this.question_info.QuestionTitle;
      } 
      else{
        return this.question_info.QuestionTitle.slice(0, 19) + "...";
      }
    },
  },
  methods:{
    goToQuestionDetails:function()
    {
      this.$router.push({
        name:"question",
        query:{question_id:this.question_info.QuestionId},
      });
    }
  }
}
</script>

<style scoped>
  .question-card{
    border-radius:5px;
  }

  #card-header{
    font-size:30px;
    font-weight: bolder;
    color:#217ecf;
    text-align:left;
    padding-left:15px;
    padding-top:5px;
  }

  #card-body{
    text-align:left;
    font-weight:bolder;
    font-size:25px;
    padding:10px;
    height:120px;
    color:black;
  }

  .card-field{
    margin:20px 20px 30px 20px;
  }

  .display-num{
    color:#217ecf;
    font-size:20px;
    font-weight: bolder;
    text-align:left;
    padding-left:15px;
  }
</style>