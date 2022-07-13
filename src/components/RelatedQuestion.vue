<template>
  <el-card class="related_question" shadow="never">
    <el-row style="font-size:20px; font-weight:bolder;">
      相关问题
    </el-row>
    <el-row style="margin-top:10px; font-size:10px; text-align:left">
      {{this.question_info.QuestionSummary}}
    </el-row>
    <el-row style="margin-top:30px; font-size:10px">
      关键词：{{this.question_info.question_tag}}
    </el-row>
    <el-row style="margin-top:20px;text-align:left">
      <el-link type="primary" underline="false" @click="goToQuestionPage">网页链接</el-link>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'RelatedQuestion',
  props: ["question_info"],
  computed: {
    contentShow() {
      if (this.question_info.question_title.length < 50) {
        return "内容梗概："+this.question_info.question_title;
      } else {
        return "内容梗概："+this.question_info.question_title.slice(0, 50) + "...";
      }
    },
  },
  methods:{
    goToQuestionPage:function(){
      alert("跳转至id为"+this.question_info.QuestionId+"的问题页面")
    }
  }
}
</script>

<style scoped>
.related_question{
  padding-left:30px;
  padding-top:10px;
  font-family:SimSun;
  font-weight:bolder;
  color: #2297FA;
  margin-bottom:10px;
}
</style>