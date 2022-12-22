<!--
描述：多级评论区组件封装
作者：方新宇
-->
<template>
  <el-collapse-item class="main">
    <template #title>
      <div class="self_comment">
        <div class="comment_header">
          <el-avatar
            :src="comment_infor.userProfile"
            size="xx-small"
            @click="goPersonSpace(comment_infor.userId, $event)"
            class="reviewer_profile"
          />
          <span
            class="comment_name"><b>{{ comment_infor.userName }}</b></span><br />
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
              @cancelLike="unLike"
            />
          </div>
          <div
            style="width: 5%; display: flex; justify-content: space-around"
            v-else
          >
            <like-button
              content_type="1"
              :content_id="comment_infor.blogCommentId"
              :show_num="true"
              size="normal"
              @giveLike="like"
              @cancelLike="unLike"
            />
          </div>
          <div class="comment_button">
            <el-button
              type=""
              @click="reply"
              link
            >
              <el-icon class="el-icon--right">
                <ChatSquare />
              </el-icon>
            </el-button>
            <div style="display: flex; justify-content: space-around">回复</div>
          </div>
          <div
            class="report_button"
            v-if="this.type == '0'"
          >
            <report-button
              content_type="3"
              :content_id="comment_infor.AnswerCommentId"
              size="normal"
              @reportResponse="reportResponse"
            />
            <div style="display: flex; justify-content: space-around">举报</div>
          </div>
          <div
            class="report_button"
            v-else
          >
            <report-button
              content_type="2"
              :content_id="comment_infor.blogCommentId"
              size="normal"
              @reportResponse="reportResponse"
            />
            <div style="display: flex; justify-content: space-around">举报</div>
          </div>
          <div class="delete_button">
            <el-button
              type=""
              @click.stop="deleteComment"
              link
            >
              <el-icon
                class="el-icon--right"
                style="color: red"
              >
                <Delete />
              </el-icon>
            </el-button>
            <div style="display: flex; justify-content: space-around">删除</div>
          </div>
        </div>
        <div
          class="content_main"
          v-if="this.type == '0'"
        >
          {{ comment_infor.AnswerCommentContent }}
        </div>
        <div
          class="content_main"
          v-else
        >
          {{ comment_infor.blogCommentContent }}
        </div>
        <div class="comment_footer"></div>
      </div>
    </template>
    <!-- 以下为输入框 -->
    <div
      v-if="this.is_reply"
      class="reply_input"
      :key="this.is_reply"
    >
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
        <div
          v-for="(item, i) in this.comment_infor.child_comments"
          :key="i"
        >
          <comment-item
            :comment_infor="this.comment_infor.child_comments[i]"
            :type="this.type"
            @refreshZone="init"
          >
          </comment-item>
        </div>
      </el-collapse>
    </div>
  </el-collapse-item>
  <el-dialog
    v-model="delete_dialog_visible"
    title="警告"
    width="30%"
    :before-close="handleClose"
  >
    <span style="font-size: 18px">你确认要删除该评论吗? 此操作不可逆!</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click.stop="handleClose">取消</el-button>
        <el-button
          type="primary"
          @click.stop="deleteCheck"
        >确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import LikeButton from "../components/LikeButton.vue";
import ReportButton from "../components/ReportButton.vue";
import { ElMessage } from "element-plus";
import axios from "axios";
//import { ElMessage } from "element-plus";
export default {
  name: "CommentItem",
  props: ["comment_infor", "type"],
  components: { LikeButton, ElMessage, ReportButton },
  data () {
    return {
      url: "",
      is_reply: false,
      comment_now: "",
      dynamic_type: "",
      delete_dialog_visible: false,
      now_delete_id: -1,
    };
  },
  created () {
    // this.comment_infor.reply_num = 0;
    // this.comment_infor.child_comments = [];
    switch (this.type) {
      case "0":
        this.dynamic_type = "answer";
        break;
      case "1":
        this.dynamic_type = "blog";
        url = "/spring/blog";
        break;
    }
    this.init();
  },
  computed: {
    nowplaceholder () {
      // console.log(this.$store);
      if (this.comment_infor.userName !== "") {
        return "回复" + this.comment_infor.userName;
      } else {
        return "评论点什么...";
      }
    },
  },
  methods: {
    init () {
      if (this.dynamic_type == "answer") {
        axios
          .get(url + "/reply", {
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
          .get(url + "/reply" + "/" + this.comment_infor.blogCommentId)
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
    reply () {
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
    sendComment () {
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
            .post("/spring/answer/reply", {
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
              this.$emit("refreshZone", true);
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          axios
            .post("/spring/blog/reply", {
              commentId: this.comment_infor.blogCommentId,
              replyUserId: this.$store.state.user_info.user_id,
              replyContent: this.comment_now,
            })
            .then((res) => {
              console.log("更改！");
              console.log(res.data);
              ElMessage({
                type: "success",
                message: "评论成功！",
                duration: 2000,
                showClose: true,
              });
              this.is_reply = false;
              this.comment_now = "";

              this.$emit("refreshZone", true);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    },
    deleteComment () {
      if (this.$store.state.is_login == false) {
        //若未登录
        ElMessage({
          message: "请先登录",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
        this.$router.push({
          path: "/login",
          query: { redirect: this.$route.fullPath },
        });
      } else {
        if (this.comment_infor.blogCommentUserId == this.$store.state.user_info.user_id) {
          //发comment的用户和当前登录的用户id是相同的id
          this.delete_dialog_visible = true;
          if (this.dynamic_type == "answer")
            this.now_delete_id = this.comment_infor.AnswerCommentId;
          else this.now_delete_id = this.comment_infor.blogCommentId;
        } else {
          ElMessage({
            message: "您不具有对这条评论的删除权限！",
            type: "warning",
            showClose: true,
            duration: 2000,
          });
        }
      }
    },
    handleClose () {
      this.now_delete_id = -1;
      this.delete_dialog_visible = false;
    },
    deleteCheck () {
      axios
        .delete(url + "/comment/" + this.now_delete_id)
        .then((res) => {
          this.delete_dialog_visible = false;
          this.now_delete_id = -1;
          if (res.data.status == true) {
            ElMessage.success("删除成功!");
            this.$emit("refreshZone", true);
          } else {
            ElMessage.error("删除失败!");
          }
        })
        .catch((errMsg) => {
          this.delete_dialog_visible = false;
          this.now_delete_id = -1;
          console.log(errMsg);
          ElMessage.error("删除失败!");
        });
    },
    like (res) {
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
    unLike (res) {
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
    goPersonSpace (id, event) {
      this.$router.push({
        path: "/person_space",
        query: {
          host_id: id,
        },
      });
    },
    reportResponse (res) {
      if (res) {
        ElMessage({
          type: "success",
          message: "举报成功！",
          duration: 2000,
          showClose: true,
        });
      } else {
        ElMessage({
          type: "error",
          message: "举报失败！",
          duration: 2000,
          showClose: true,
        });
      }
    },
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
  margin-left: 10px;
  display: flex;
  justify-content: space-around;
}

.self_comment .comment_header .delete_button {
  /* display: inline-block; */
  /* transform: translate(-50%, 125%); */
  margin-top: -1.5px;
  margin-left: 10px;
  display: flex;
  justify-content: space-around;
  color: red;
  opacity: 0;
  transition: 0.3s ease-out;
}

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

.reviewer_profile:hover {
  box-shadow: 0 0 15px 10px #00000020;
}
.main:hover .self_comment .comment_header .delete_button {
  opacity: 1;
}
</style>
