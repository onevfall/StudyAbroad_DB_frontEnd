<!--
描述：举报中心
作者：方新宇
-->
<template>
  <div
    class="school-center-layout"
    v-loading.fullscreen.lock="isLoading"
    element-loading-text="正在加载"
  >
    <div class="certification_center_layout">
      <div class="inner-right">
        <div class="info-right-title">
          <span class="right-title-text">消息中心</span>
        </div>
        <div class="right-content-all">
          <div class="right-nav">
            <el-tabs type="border-card" v-model="activeName">
              <el-tab-pane label="举报信息" name="1">
                <div style="padding: 20px 20px; min-height: 550px">
                  <div style="margin-left: 15px">
                    <div class="top_box">
                      <el-row :gutter="12" justify="space-around">
                        <el-col :span="6">
                          <div class="select_item">
                            <div class="select_item_name">举报信息类型</div>
                            <div class="select_item_option">
                              <el-select
                                v-model="report_type"
                                clearable
                                class="m-2"
                                placeholder="请选择"
                                size="large"
                              >
                                <el-option
                                  v-for="item in this.report_type_options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                />
                              </el-select>
                            </div>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="select_item">
                            <div class="select_item_name">当前状态</div>
                            <div class="select_item_option">
                              <el-select
                                v-model="now_situation"
                                clearable
                                class="m-2"
                                placeholder="请选择"
                                size="large"
                              >
                                <el-option
                                  v-for="item in this.now_situation_options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"
                                />
                              </el-select>
                            </div>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <el-button
                            type="warning"
                            size="large"
                            color="#3db369"
                            @click="goFilter"
                            style="margin-top: 10px"
                            ><div style="color: white">
                              按条件筛选
                            </div></el-button
                          >
                        </el-col>
                      </el-row>
                    </div>
                    <el-divider></el-divider>
                      <el-row >
                        <el-col :span="5"
                          >举报时间</el-col>
                        <el-col :span="5"
                          >被举报信息类型</el-col>
                        <el-col :span="5"
                          >当前状态</el-col>
                        <el-col :span="5"
                          >查看详情</el-col>
                        <el-col :span="4"
                          >标记已读</el-col>
                      </el-row>
                      <el-scrollbar height="500px" :key="this.isLoading">
                      <div v-for="(report, index) in now_list" :key="index">
                        <report-card :report="report" @reload="reload"></report-card>
                      </div>
                    </el-scrollbar>
                  </div>
                </div>
              </el-tab-pane>
              <!-- <el-tab-pane label="其它通知" name="2">
                <div
                  style="padding: 20px 20px; min-height: 550px; display: flex"
                >
                  <div style="margin-left: 15px">11111</div>
                  <div>
                    <img
                      src="../assets/qualification.png"
                      style="margin-left: 120px; height: 500px"
                    />
                  </div>
                </div>
              </el-tab-pane> -->
            </el-tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReportCard from "./ReportCard.vue";
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  components: {
    ElMessage,
    ReportCard,
  },
  data() {
    return {
      activeName: "1",
      isLoading: false,
      report_type: "",
      report_type_options: [
        {
          value: "动态",
          label: "动态",
        },
        {
          value: "回答",
          label: "回答",
        },
        {
          value: "动态评论",
          label: "动态评论",
        },
        {
          value: "回答评论",
          label: "回答评论",
        },
      ],
      now_situation: "",
      now_situation_options: [
        {
          value: "待处理",
          label: "待处理",
        },
        {
          value: "已处理但未读",
          label: "已处理但未读",
        },
      ],
      report_overall_list:[],
      now_list:[],
    };
  },
  created() {
    // if (!this.$store.state.is_login) {
    //   ElMessage({
    //     message: "请先登录",
    //     type: "warning",
    //     showClose: true,
    //     duration: 2000,
    //   });
    //   /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
    //   this.$router.push({
    //     path: "/login",
    //     query: { redirect: this.$route.fullPath },
    //   });
    // }
    axios
        .get("spring/personal_center/report", {
          params: {
            user_id: this.$store.state.user_info.user_id,
          },
        })
        .then((res) => {
          console.log(1111)
          console.log(res)
          if(res.data.status){
            this.answer_report=res.data.data.answer_report
            for(var i in this.answer_report)
              this.answer_report[i].Type="answer";

            this.blog_report=res.data.data.blog_report
            for(var i in this.blog_report)
              this.blog_report[i].Type="blog";

            this.answercomment_report=res.data.data.answercomment_report
            for(var i in this.answercomment_report)
              this.answercomment_report[i].Type="answercomment";

            this.blogcomment_report=res.data.data.blogcomment_report
            for(var i in this.blogcomment_report)
              this.blogcomment_report[i].Type="blogcomment";

            this.report_overall_list=[]
            this.report_overall_list.push.apply(this.report_overall_list,this.answer_report)
            this.report_overall_list.push.apply(this.report_overall_list,this.blog_report)
            this.report_overall_list.push.apply(this.report_overall_list,this.answercomment_report)
            this.report_overall_list.push.apply(this.report_overall_list,this.blogcomment_report)
            this.now_list=this.report_overall_list
            console.log(this.now_list)
          } 
        })
        .catch((err) => {
          console.log(err);
        });
  },
  watch: {
  },
  methods: {
    goFilter(){
      this.isLoading = true;
      this.now_list = [];
      if(this.report_type !== "" )
      {
        if(this.report_type == "动态" )
            this.now_list = this.blog_report
        else if(this.report_type == "回答" )
            this.now_list = this.answer_report
        else if(this.report_type == "动态评论" )
            this.now_list = this.blogcomment_report
        else
            this.now_list = this.answercomment_report
        
        if(this.now_situation !== "")
        {
          var new_list=[]
          for(var i in this.now_list)
          {
            if(this.now_situation === "待处理")
            {
              if(this.now_list[i].ReportAnswerResult == null)
                new_list.push(this.now_list[i])
            }
            else{
              if(this.now_list[i].ReportAnswerResult !== null)
                new_list.push(this.now_list[i])
            } 
          }
          this.now_list = new_list
        }
      }
      else{
        if(this.now_situation !== "")
        {
          var new_list=[]
          for(var i in this.now_list)
          {
            if(this.now_situation === "待处理")
            {
              if(this.now_list[i].ReportAnswerResult == null)
                new_list.push(this.now_list[i])
            }
            else{
              if(this.now_list[i].ReportAnswerResult !== null)
                new_list.push(this.now_list[i])
            } 
          }
          this.now_list = new_list
        }
        else
        {
          this.now_list = this.report_overall_list
        }
      }
      this.isLoading = false;
    },
    reload(res){
      if(res){
        this.isLoading = true;
        this.now_situation = "";
        this.report_type = "";
        axios
        .get("spring/personal_center/report", {
          params: {
            user_id: this.$store.state.user_info.user_id,
          },
        })
        .then((res) => {
          console.log(res)
          if(res.data.status){
            this.answer_report=res.data.data.answer_report
            for(var i in this.answer_report)
              this.answer_report[i].Type="answer";

            this.blog_report=res.data.data.blog_report
            for(var i in this.blog_report)
              this.blog_report[i].Type="blog";

            this.answercomment_report=res.data.data.answercomment_report
            for(var i in this.answercomment_report)
              this.answercomment_report[i].Type="answercomment";

            this.blogcomment_report=res.data.data.blogcomment_report
            for(var i in this.blogcomment_report)
              this.blogcomment_report[i].Type="blogcomment";

            this.report_overall_list=[]
            this.report_overall_list.push.apply(this.report_overall_list,this.answer_report)
            this.report_overall_list.push.apply(this.report_overall_list,this.blog_report)
            this.report_overall_list.push.apply(this.report_overall_list,this.answercomment_report)
            this.report_overall_list.push.apply(this.report_overall_list,this.blogcomment_report)
            this.now_list=this.report_overall_list
          } 
        })
        .catch((err) => {
          console.log(err);
        });
        this.isLoading = false;
      }
      else{
        ElMessage({
              message: "标记已读失败！",
              grouping: true,
              type: "warning",
        });
      }
    }
  },
};
</script>

<style scoped>
.certification_center_layout {
  background-color: white;
  padding-left: 5%;
  height: 800px;
}
.inner-right {
  min-height: 600px;
  width: 99%;
  background-color: #f1f9ff;
  border-radius: 30px;
  margin-bottom: 3%;
}
.info-right-title {
  height: 60px;
  padding-left: 30px;
  border-bottom: 2px solid #ddd;
}

.right-title-text {
  float: left;
  margin: 15px 0 0 0;
  font-size: 20px;
  cursor: default;
}

.right-content-all {
  width: 96%;
  background-color: #f1f9ff;
  border-radius: 30px;
  padding: 1% 0 0 2%;
}
.right-nav .el-tabs ::v-deep .el-tabs__item {
  height: 50px;
  position: relative;
  font-size: 15px;
  text-align: center;
  padding: 0 20px; /*关键的第一列的宽度*/
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-weight: 500;
  color: #303133;
}

.new-button {
  float: left;
}

.upload-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

.upload-button {
  margin-top: 40%;
}

.select_item {
  text-align: left;
  margin-top: 10px;
  /* margin-left: 3%; */
  display: flex;
  align-items: center;
}

.select_item .select_item_name {
  width: 170px;
  margin-right: 20px;
}

.select_item .select_item_content {
  width: 400px;
  text-align: left;
}

/* .top_box{
  background-color: #c5def0;
  opacity: 0.8; 
  min-height: 80px;
  background-blend-mode: overlay;
} */
/* .certification_card {
  display: flex;
} */

/* .small-title{
    text-align:left;
    font-size: 20px;
    margin-top: 10px;
    margin-left:30px;
    margin-bottom:10px;
} */
</style>