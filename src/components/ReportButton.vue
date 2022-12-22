<!--
描述：举报按钮组件
作者：方新宇
-->

<template>
  <div>
    <span style="text-align: left; margin-right: 8px" v-if="!this.is_reported">
      <img
        src="../assets/warning.png"
        :style="{ height: this.icon_size + 'px' }"
        @click.stop="reportConfirm"
      />
    </span>
    <span style="text-align: left; margin-right: 8px" v-else>
      <img
        src="../assets/warning_solid.png"
        :style="{ height: this.icon_size + 'px' }"
      />
    </span>
  </div>
  <el-dialog v-model="give_report_reason" title="举报详情">
    <el-input v-model="report_reason" placeholder="请输入举报理由" clearable />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="give_report_reason = false">我再想想</el-button>
        <el-button type="primary" @click="reportPost">确认举报</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  /*
    type: 0-动态、1-回答、2-动态评论、3-回答评论
    content_id:要操作的内容的id
    size:尺寸
    */
  props: ["content_type", "content_id", "size"],
  components: {
    ElMessage,
  },
  data() {
    return {
      is_reported: false,
      dynamic_type: "",
      icon_size: 0,
      give_report_reason:false,
      report_reason:"",
    };
  },
  methods: {
    reportConfirm() {
      //判断是否登录
      if (this.$store.state.is_login == false) {
        //若未登录
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
      } else {
        //呼出理由输入框
        this.give_report_reason = true;
      }
    },
    reportPost() {
      this.give_report_reason = false;//关闭dialog
      console.log(this.dynamic_type)
      console.log(this.content_id)
      console.log(this.report_reason)
      axios
        .post("spring/personal_center/report/" + this.dynamic_type, {
          user_id: this.$store.state.user_info.user_id,
          [this.dynamic_type + "_id"]: this.content_id,
          report_reason: this.report_reason,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status) {
            this.is_reported = true;   
            this.$emit("reportResponse", true);
          } else {
            this.$emit("reportResponse", false);
          }
        })
        .catch((errMsg) => {
          alert("qq");
          console.log(errMsg);
        });
    },
  },
  created() {
    //设定大小
    switch (this.size) {
      case "xx-small":
        this.icon_size = 9;
        break;
      case "x-small":
        this.icon_size = 10;
        break;
      case "small":
        this.icon_size = 12;
        break;
      case "normal":
        this.icon_size = 14;
        break;
      case "large":
        this.icon_size = 17;
        break;
      case "x-large":
        this.icon_size = 24;
        break;
      case "xx-large":
        this.icon_size = 30;
        break;
    }
    //动态改变url
    switch (this.content_type) {
      case "0":
        this.dynamic_type = "blog";
        break;
      case "1":
        this.dynamic_type = "answer";
        break;
      case "2":
        this.dynamic_type = "blogcomment";
        break;
      case "3":
        this.dynamic_type = "answercomment";
        break;
    }
    //查询是否举报过
    if (this.$store.state.is_login) {
      axios
        .get(
          "spring/personal_center/report/" +
            this.dynamic_type +
            "?user_id=" +
            this.$store.state.user_info.user_id +
            "&" +
            this.dynamic_type +
            "_id=" +
            this.content_id
        )
        .then((res) => {
          console.log("try",res.data);
          this.is_reported = res.data.status;
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    } else {
      this.is_reported = false;
    }
  },
};
</script>

<style></style>
