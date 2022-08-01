<template>
  <el-card shadow="never" style="margin-top: 15px;margin-bottom: 15px;">
    <el-row>
      <el-col :span="4">{{report.ReportDate}}</el-col>
      <el-col :span="4"><div style="word-wrap:break-word;width:150px;margin-left: 10px;">{{report.ReportReason}}</div></el-col>
      <el-col :span="4">{{report.Type}}</el-col>
      <el-col :span="4">{{this.situation}}</el-col>
      <el-col :span="4">{{report.ReportAnswerResult}}</el-col>
      <el-col :span="4">
        <el-button type="success" plain :disabled="this.report.ReportAnswerResult == null ? true:false">
        确认已读<el-icon class="el-icon--right"><Check /></el-icon>
        </el-button>

      </el-col>
    </el-row>
  </el-card>
</template>

<script>

export default {
  components: {},
  props: ["report"],
  computed:{
    situation(){
        return this.report.ReportState?"举报成功":"举报失败";
    }
  }
};
</script>

<style scoped>
</style>
