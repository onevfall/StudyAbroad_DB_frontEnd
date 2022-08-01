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
        <!-- <div>
        <div class="small-title">
        <span >认证信息</span>
        </div>
        <div style="margin-left:30px">
        <certification-card></certification-card>
        </div>
     </div> -->
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
                      <el-row>
                        <el-col :span="4"
                          >举报时间</el-col>
                        <el-col :span="4"
                          >举报原因</el-col>
                        <el-col :span="4"
                          >被举报信息类型</el-col>
                        <el-col :span="4"
                          >当前状态</el-col>
                        <el-col :span="4"
                          >处理结果</el-col>
                        <el-col :span="4"
                          >标记已读</el-col>
                      </el-row>
                      <el-scrollbar height="550px">
                      <div v-for="(report, index) in report_overall_list" :key="index">
                        <report-card :report="report"></report-card>
                      </div>

                      <!-- <div class="new-button">
                      <el-button type="success" round
                        >提交新的学历认证<el-icon style="margin-left: 5px"
                          ><Collection /></el-icon
                      ></el-button>
                    </div> -->
                    </el-scrollbar>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="其它通知" name="2">
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
              </el-tab-pane>
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
      report_overall_list:[
        {
          ReportDate:"2022-07-30 09:50:59",
          ReportId:3,
          Type:"回答评论",
          ReportReason:"sssssssssssssssssssssssssssssssssssssssssssssssssss",
          ReportState:false,
          ReportAnswerResult:"123",
        },
        {
          ReportDate:"2022-07-30 09:50:59",
          ReportId:3,
          Type:"回答评论",
          ReportReason:"ss",
          ReportState:false,
          ReportAnswerResult:"123",
        }
      ]
    };
  },
  created() {
    if (!this.$store.state.is_login) {
      ElMessage({
        message: "请先登录",
        type: "warning",
        showClose: true,
        duration: 2000,
      });
      /**之后此处需记录当前页面路径，以便于登陆完成后跳转 */
      this.$router.push({
        path: "/login",
        query: { redirect: this.$route.fullPath },
      });
    }
  },
  watch: {
    // need_refresh() {//重新申请数据 尚不确定是否成功
    //   axios({
    //     url: "/identity?user_id=" + this.$store.state.user_info.user_id,
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       this.certification_infor = [].concat(res.data.data.identity_list);
    //       this.certification_infor = this.sortByKey(
    //         this.certification_infor,
    //         "identity"
    //       );
    //       console.log(this.certification_infor);
    //     })
    //     .catch((errMsg) => {
    //       console.log(errMsg);
    //     });
    // },
  },
  methods: {},
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