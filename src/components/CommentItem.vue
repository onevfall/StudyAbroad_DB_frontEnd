<!--
描述：多级评论区组件封装
作者：方新宇
-->
<template>
  <!-- <el-collapse-item :key="this.comment_ischange"> -->
    <el-collapse-item >
    <template #title>
      <div class="self_comment">
        <div class="comment_header">
          <el-avatar :src="comment_infor.UserProfile" size="xx-small" />
          <span class="comment_name"
            ><b>{{ comment_infor.UserName }}</b></span
          ><br />
          <div
            style="width: 5%; display: flex; justify-content: space-around"
            v-if="this.type == '0'"
          >
            <like-button
              content_type="3"
              :content_id="comment_infor.AnswerCommentId"
              :show_num="true"
              size="normal"
              @giveLike="like"
              @cancelLike="unlike"
            />
          </div>
          <div
            style="width: 5%; display: flex; justify-content: space-around"
            v-else
          >
            <like-button
              content_type="1"
              :content_id="comment_infor.BlogCommentId"
              :show_num="true"
              size="normal"
              @giveLike="like"
              @cancelLike="unlike"
            />
          </div>
          <div class="comment_button">
            <el-button type="" @click="reply" link>
              <el-icon class="el-icon--right"><ChatSquare /></el-icon>
            </el-button>
            <div style="display: flex; justify-content: space-around">回复</div>
          </div>
          <div class="report_button" v-if="this.type == '0'">
            <report-button
                  content_type="3"
                  :content_id="comment_infor.AnswerCommentId"
                  size="normal"
                  @reportResponse="reportResponse"
                />
            <div style="display: flex; justify-content: space-around">举报</div>
          </div>
          <div class="report_button" v-else>
            <report-button
                  content_type="2"
                  :content_id="comment_infor.BlogCommentId"
                  size="normal"
                  @reportResponse="reportResponse"
                />
            <div style="display: flex; justify-content: space-around">举报</div>
          </div>
        </div>
        <div class="content_main" v-if="this.type == '0'">
          {{ comment_infor.AnswerCommentContent }}
        </div>
        <div class="content_main" v-else>
          {{ comment_infor.BlogCommentContent }}
        </div>
        <div class="comment_footer"></div>
      </div>
    </template>
    <!-- 以下为输入框 -->
    <div v-if="this.is_reply" class="reply_input" :key="this.is_reply">
      <!-- <el-header class="header_comment"> -->
      <el-col :span="1">
        <div v-if="this.$store.state.is_login">
          <el-avatar
            :src="this.$store.state.user_info.user_profile"
            :size="40"
            class="header_img"
          />
        </div>
        <div v-else>
          <el-avatar
            src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
            :size="40"
            class="header_img"
          />
        </div>
      </el-col>
      <el-input
        id="replyInput"
        v-model="comment_now"
        maxlength="128"
        show-word-limit
        class="reply_input"
        :placeholder="nowplaceholder"
        type="text"
        style="margin-left: 1%; margin-top: 5px; margin-right: 10px"
      />
      <el-button
        class="reply_btn"
        size="medium"
        @click="sendComment"
        type="primary"
        style="margin-top: 5px"
        >发表评论
      </el-button>
      <!-- </el-header> -->
    </div>
    <!-- 以下为子评论 -->
    <div
      v-if="this.comment_infor.reply_num !== 0"
      style="margin-left: 3%"
      :key="this.comment_infor.child_comments"
    >
      <!-- <div v-if="this.reply == true"> 
      </div> -->
      <el-collapse accordion>
        <div v-for="(item, i) in this.comment_infor.child_comments" :key="i">
          <comment-item
            :comment_infor="this.comment_infor.child_comments[i]"
            :type="this.type"
          >
          </comment-item>
        </div>
      </el-collapse>
    </div>
  </el-collapse-item>
</template>

<script>
import LikeButton from "../components/LikeButton.vue";
import ReportButton from "../components/ReportButton.vue"
import { ElMessage } from "element-plus";
import axios from "axios";
//import { ElMessage } from "element-plus";
export default {
  name: "CommentItem",
  props: ["comment_infor", "type"],
  components: { LikeButton, ElMessage,ReportButton },
  data() {
    return {
      is_reply: false,
      comment_now: "",
      comment_ischange: false,
      dynamic_type: "",
    };
  },
  created() {
    // this.comment_infor.reply_num = 0;
    // this.comment_infor.child_comments = [];
    switch (this.type) {
      case "0":
        this.dynamic_type = "answer";
        break;
      case "1":
        this.dynamic_type = "blog";
        break;
    }
    if (this.dynamic_type == "answer") {
      axios
        .get("/" + this.dynamic_type + "/reply", {
          params: {
            answer_comment_id: this.comment_infor.AnswerCommentId,
          },
        })
        .then((res) => {
          this.comment_infor.reply_num = res.data.data.reply_num;
          this.comment_infor.child_comments = res.data.data.reply_list;
          console.log(this.comment_infor.child_comments);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios
        .get("/" + this.dynamic_type + "/reply", {
          params: {
            blog_comment_id: this.comment_infor.BlogCommentId,
          },
        })
        .then((res) => {
          this.comment_infor.reply_num = res.data.data.reply_num;
          this.comment_infor.child_comments = res.data.data.reply_list;
          console.log(this.comment_infor.child_comments);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  computed: {
    nowplaceholder() {
      // console.log(this.$store);
      if (this.comment_infor.UserName !== "") {
        return "回复" + this.comment_infor.UserName;
      } else {
        return "评论点什么...";
      }
    },
  },
  watch: {
    comment_ischange() {
      if (this.dynamic_type == "answer") {
        axios
          .get("/answer/reply", {
            params: {
              answer_comment_id: this.comment_infor.AnswerCommentId,
            },
          })
          .then((res) => {
            console.log("发出子评论了,再次请求子评论数据");
            console.log(res);
            this.comment_infor.child_comments = res.data.data.reply_list;
            console.log(this.comment_infor.child_comments);
            this.$store.commit("RefreshCommitZone");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        axios
          .get("/blog/reply", {
            params: {
              blog_comment_id: this.comment_infor.BlogCommentId,
            },
          })
          .then((res) => {
            console.log("11213142");
            console.log(res);
            this.comment_infor.child_comments = res.data.data.reply_list;
            this.$store.commit("RefreshCommitZone");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  methods: {
    reply() {
      if (this.$store.state.is_login == false) {
        //若未登录
        ElMessage({
          message: "请先登录",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
        this.comment_now = "";
        this.$router.push({
          path: "/login",
          query: { redirect: this.$route.fullPath },
        });
      } else {
        // console.log("67801");
        // console.log(this.comment_infor);
        this.is_reply = true;
        // console.log(this.isReply);
      }
    },
    sendComment() {
      if (this.$store.state.is_login == false) {
        //若未登录
        ElMessage({
          message: "请先登录",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
        this.comment_now = "";
        this.$router.push({
          path: "/login",
          query: { redirect: this.$route.fullPath },
        });
      } else {
        if (this.dynamic_type == "answer") {
          axios
            .post("/answer/reply", {
              comment_id: this.comment_infor.AnswerCommentId,
              reply_user_id: this.$store.state.user_info.user_id,
              reply_content: this.comment_now,
            }) //待修改
            .then((res) => {
              console.log(res.data);

              ElMessage({
                type: "success",
                message: "评论成功！",
                duration: 2000,
                showClose: true,
              });
              this.is_reply = false;
              this.comment_now = "";
              this.comment_ischange = !this.comment_ischange;
              console.log("更改！");
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          axios
            .post("/blog/reply", {
              comment_id: this.comment_infor.BlogCommentId,
              reply_user_id: this.$store.state.user_info.user_id,
              reply_content: this.comment_now,
            })
            .then((res) => {
              console.log(res.data);
              ElMessage({
                type: "success",
                message: "评论成功！",
                duration: 2000,
                showClose: true,
              });
              this.is_reply = false;
              this.comment_now = "";
              this.comment_ischange = !this.comment_ischange;
              console.log("更改！");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    like(res) {
      if (res) {
        ElMessage({
          type: "success",
          message: "点赞成功！",
          duration: 2000,
          showClose: true,
        });
      } else {
        ElMessage({
          type: "error",
          message: "点赞失败！",
          duration: 2000,
          showClose: true,
        });
      }
    },
    unLike(res) {
      if (res) {
        ElMessage({
          type: "success",
          message: "取消点赞成功！",
          duration: 2000,
          showClose: true,
        });
      } else {
        ElMessage({
          type: "error",
          message: "取消点赞失败！",
          duration: 2000,
          showClose: true,
        });
      }
    },
    sendComment() {
      if (this.$store.state.is_login == false) {
        //若未登录
        ElMessage({
          message: "请先登录",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
        this.comment_now = "";
        this.$router.push({
          path: "/login",
          query: { redirect: this.$route.fullPath },
        });
      } else {
          axios
            .post("/answer/reply", {
              comment_id: this.comment_infor.AnswerCommentId,
              // comment_id: this.$store.state.reply_to.AnswerCommentId,
              reply_user_id: this.$store.state.user_info.user_id,
              reply_content: this.comment_now,
            }) //待修改
            .then((res) => {
              console.log(res.data);
              this.comment_ischange = !this.comment_ischange//此处需修改
              ElMessage({
                type: "success",
                message: "评论成功！",
                duration: 2000,
                showClose: true,
              });
              this.is_reply = false;
              this.comment_now = "";
              axios
                .get("/answer/reply", {
                  params: {
                    answer_comment_id : this.comment_infor.AnswerCommentId,
                  },
                })
                .then((res) => {
                  console.log(res);
                  this.comment_infor.child_comments =
                    res.data.data.reply_list;
                  this.comment_ischange_1 = !this.comment_ischange_1;
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        } 
      },
      like(res) {
      if (res) {
        ElMessage({
          type: "success",
          message: "点赞成功！",
          duration: 2000,
          showClose: true,
        });
      } else {
        ElMessage({
          type: "error",
          message: "点赞失败！",
          duration: 2000,
          showClose: true,
        });
      }
    },
    unLike(res) {
      if (res) {
        ElMessage({
          type: "success",
          message: "取消点赞成功！",
          duration: 2000,
          showClose: true,
        });
      } else {
        ElMessage({
          type: "error",
          message: "取消点赞失败！",
          duration: 2000,
          showClose: true,
        });
      }
    },
    reportResponse(res){
      if (res) {
        ElMessage({
          type: "success",
          message: "举报成功！",
          duration: 2000,
          showClose: true,
        });
      }
      else{
        ElMessage({
          type: "error",
          message: "举报失败！",
          duration: 2000,
          showClose: true,
        });
      }
    }
  }, 
};
</script>

<style scoped>
::v-deep .el-collapse {
  --el-collapse-border-color: var(--el-border-color-lighter);
  --el-collapse-header-height: 100px;
  --el-collapse-header-bg-color: var(--el-fill-color-blank);
  --el-collapse-header-text-color: var(--el-text-color-primary);
  --el-collapse-header-font-size: 13px;
  --el-collapse-content-bg-color: var(--el-fill-color-blank);
  --el-collapse-content-font-size: 13px;
  --el-collapse-content-text-color: var(--el-text-color-primary);
  border-top: 1pxsolidvar (--el-collapse-border-color);
  border-bottom: 1pxsolidvar (--el-collapse-border-color);
}
::v-deep .el-collapse-item__header {
  display: flex;
  align-items: center;
  height: 100px;
  line-height: 25px;
  background-color: var(--el-collapse-header-bg-color);
  color: var(--el-collapse-header-text-color);
  cursor: pointer;
  border-bottom: 1px solid var(--el-collapse-border-color);
  font-size: var(--el-collapse-header-font-size);
  font-weight: 500;
  transition: border-bottom-color var(--el-transition-duration);
  outline: 0;
}

.reply_input {
  text-align: center;
  margin-left: 6%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.self_comment {
  margin-top: -20px;
  margin-bottom: 20px;
  width: 90%;
}
.self_comment .comment_header {
  text-align: left;
  margin-left: 3%;
  display: flex;
  align-items: center;
}
.self_comment .comment_header .comment_name {
  display: inline-block;
  margin-left: 2%;
  margin-right: 3%;
}
.self_comment .comment_header .comment_button {
  /* display: inline-block; */
  margin-top: -1.5px;
  display: flex;
  justify-content: space-around;
}
.self_comment .comment_header .report_button {
  /* display: inline-block; */
  margin-top: -1.5px;
  margin-left:10px;
  display: flex;
  justify-content: space-around;
}
/* .self_comment .comment_header .comment_button >>> .el-button--primary {
  border: none;
} */

.self_comment .content_main {
  text-align: left;
  margin-left: 9%;
  word-wrap: break-word;
  word-break: normal;
}
.self_comment .comment_footer {
  text-align: right;
  margin-top: -6%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>
