<template>
  <el-card shadow="never" style="margin-top: 15px; margin-bottom: 15px">
    <el-row type="flex" align="middle">
      <el-col :span="5">{{ report.reportDate }}</el-col>
      <!-- <el-col :span="4"><div style="word-wrap:break-word;width:150px;margin-left: 10px;">{{report.ReportReason}}</div></el-col> -->
      <el-col :span="5">{{ this.textType }}</el-col>
      <el-col :span="5">{{ this.adminFeedback }}</el-col>
      <!-- <el-col :span="4">{{report.ReportAnswerResult}}</el-col> -->
      <el-col :span="5">
        <el-button type="primary" plain @click="DetailDialogVisible = true">
          查看详情<el-icon class="el-icon--right"><DocumentCopy /></el-icon>
        </el-button>
      </el-col>
      <el-col :span="4">
        <el-button
          type="success"
          plain
          :disabled="this.report.reportAnswerResult == null ? true : false"
          @click="checkSeen"
        >
          确认已读<el-icon class="el-icon--right"><Check /></el-icon>
        </el-button>
      </el-col>
    </el-row>
  </el-card>
  <el-dialog
    v-model="DetailDialogVisible"
    title="举报详情"
    width="30%"
    draggable
  >
    <div class="report_item">
      <div class="report_item_name">举报时间</div>
      <div class="report_item_content">
        {{ report.reportDate }}
      </div>
    </div>

    <div class="report_item">
      <div class="report_item_name">被举报信息类型</div>
      <div class="report_item_content">
        {{ this.textType }}
      </div>
    </div>

    <!-- <div class="report_item">
      <div class="report_item_name">被举报信息ID</div>
      <div class="report_item_content">
        {{ report.Id }}
      </div>
    </div> -->

    <div class="report_item">
      <div class="report_item_name">被举报信息内容</div>
      <div class="report_item_content">
        <p v-html="this.BeingReportedContent"></p>
        <!-- {{ this.BeingReportedContent }} -->
      </div>
    </div>

    <div class="report_item">
      <div class="report_item_name">被举报用户</div>
      <div class="report_item_content">
        {{ this.BeingReportedUserName }}
      </div>
    </div>

    <div class="report_item">
      <div class="report_item_name">举报原因</div>
      <div class="report_item_content">
        {{ this.reportDetail.ReportReason }}
      </div>
    </div>

    <!-- <div class="report_item">
      <div class="report_item_name">当前状态</div>
      <div class="report_item_content">
        {{ this.situation }}
      </div>
    </div> -->

    <div class="report_item">
      <div class="report_item_name">当前状态</div>
      <div class="report_item_content">
        {{ this.adminFeedback }}
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="DetailDialogVisible = false">确认</el-button>
        <!-- <el-button type="primary" @click="deleteCheck">确认</el-button> -->
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { ElMessage } from 'element-plus';
export default {
  components: {
    ElMessage
  },
  props: ["report"],
  data() {
    return {
      DetailDialogVisible: false,
      textType: "",
      BeingReportedUserName: "",
      htmlText: "",
      reportDetail: "",
    };
  },
  computed: {
    adminFeedback() {
      return this.report.reportAnswerResult == null
        ? "正在处理中"
        : this.report.reportAnswerResult
        ? "举报成功"
        : "举报失败";
    },
    BeingReportedContent() {
      var temp = "11";
      // console.log("12345", this.htmlText);
      if (this.textType === "回答评论") {
        if (this.reportDetail.RepliedComment == null) {
          temp =
            this.reportDetail.AnswerCommentContent +
            "（回复给 回答：" +
            this.htmlText.substring(0, 20) +
            "... )";
        } else
          temp =
            this.reportDetail.AnswerCommentContent +
            "（回复给 上一级评论：" +
            this.reportDetail.RepliedComment +
            " )";
      }
      if (this.textType === "动态评论") {
        if (this.reportDetail.RepliedComment == null) {
          temp =
            this.reportDetail.AnswerCommentContent +
            "（回复给 动态：" +
            this.htmlText.substring(0, 20) +
            "... )";
        } else
          temp =
            this.reportDetail.AnswerCommentContent +
            "（回复给 上一级评论：" +
            this.reportDetail.RepliedComment +
            " )";
      }
      if (this.textType === "回答") {
        temp =
          this.htmlText.substring(0, 20) +
          "..." +
          "（回答的问题为：" +
          this.reportDetail.QuestionTitle +
          " )";
      }
      if (this.textType === "动态") {
        temp = this.htmlText.substring(0, 20);
        // console.log("动态", temp);
      }
      return temp;
    },
  },
  created() {
    this.getData();
  },
  methods: {
    ToText(res) {
      if (res.substr(0, 4) == "http") {
        const xhrFile = new XMLHttpRequest();
        xhrFile.open("GET", res, true);
        xhrFile.send();
        xhrFile.onload = () => {
          var input = xhrFile.response;
          this.htmlText = input
            .replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi, "")
            .replace(/<[^>]+?>/g, "")
            .replace(/\s+/g, " ")
            .replace(/ /g, " ")
            .replace(/>/g, " ");
        };
      } else {
        this.htmlText = res;
      }
    },
    checkSeen() {
      axios
        .put("/spring/personal_center/report/" + this.report.Type, {
          user_id: this.$store.state.user_info.user_id,
          report_id: this.report.ReportId,
        })
        .then((res) => {
          if (res.data.status) {
            ElMessage.success("标记已读成功！此消息将不会再被显示");
            this.$emit("reload", true);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },
    getData(){
      switch (this.report.Type) {
      case "answercomment":
        this.textType = "回答评论";
        break;
      case "answer":
        this.textType = "回答";
        break;
      case "blogcomment":
        this.textType = "动态评论";
        break;
      case "blog":
        this.textType = "动态";
        break;
    }
    axios
      .get("/spring/admin/check/" + this.report.Type, {
        params: {
          report_id: this.report.reportId,
        },
      })
      .then((res) => {
        console.log("card de")
        console.log(res)
        this.htmlText = "";
        if (res.data.status) {
          this.BeingReportedUserName = res.data.data.ReportedUserName;
          this.reportDetail = res.data.data;
          if (this.textType === "回答评论") {
            if (res.data.data.RepliedComment == null) {
              this.ToText(res.data.data.RepliedAnswerContent);
            }
          }
          if (this.textType === "动态评论") {
            if (res.data.data.RepliedComment == null) {
              this.ToText(res.data.data.RepliedBlogContent);
            }
          }
          if (this.textType === "回答") {
            this.ToText(res.data.data.AnswerContent);
          }
          if (this.textType === "动态") {
            this.ToText(res.data.data.BlogContent);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
  },
  watch:{
    report(){
      this.getData();
    }
  }
};
</script>

<style scoped>
.report_item {
  text-align: left;
  margin-top: 10px;
  /* margin-left: 3%; */
  display: flex;
  align-items: center;
}

.report_item .report_item_name {
  width: 100px;
  margin-right: 20px;
  font-weight: bold;
}

.report_item .report_item_content {
  width: 300px;
  text-align: left;
  word-wrap: break-word;
}
</style>
