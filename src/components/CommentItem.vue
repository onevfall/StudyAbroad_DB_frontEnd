<!--
描述：多级评论区组件封装
作者：方新宇
-->
<template>
  <el-collapse-item>
    <template #title>
      <div class="self_comment">
        <div class="comment_header">
          <el-avatar :src="comment_infor.UserProfile" size="xx-small" />
          <span class="comment_name"
            ><b>{{ comment_infor.UserName }}</b></span
          ><br />
          <div style="width: 5%; display: flex; justify-content: space-around">
            <like-button
              content_type="3"
              :content_id="comment_infor.AnswerCommentId"
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
        </div>
        <div class="content_main">
          {{ comment_infor.AnswerCommentContent }}
        </div>
        <div class="comment_footer"></div>
      </div>
    </template>
    <div v-if="this.comment_infor.reply_num !== 0">
      <el-collapse accordion >
        <div v-for="(item, i) in this.comment_infor.child_comments" :key="i">
          <comment-item :comment_infor="this.comment_infor.child_comments[i]"> </comment-item>
        </div>
      </el-collapse>
    </div>
  </el-collapse-item>
</template>

<script>
import LikeButton from "../components/LikeButton.vue";
import axios from "axios";
//import { ElMessage } from "element-plus";
export default {
  name: "CommentItem",
  props: ["comment_infor"],
  components: { LikeButton },
  created() {
    // this.comment_infor.reply_num = 0;
    // this.comment_infor.child_comments = [];
    axios
      .get("/answer/reply", {
        params: {
          answer_comment_id: this.comment_infor.AnswerCommentId,
        },
      })
      .then((res) => {
        console.log("内部子评论请求,评论id为"+this.comment_infor.AnswerCommentId+"内容为"+this.comment_infor.AnswerCommentContent);
        console.log(res.data);
        this.comment_infor.reply_num = res.data.data.reply_num;
        this.comment_infor.child_comments = res.data.data.reply_list;
        // for (let i = 0; i < res.data.data.reply_list.length; ++i) {
        //   this.comment_infor.child_comments[i] = res.data.data.reply_list[i];
        // }
        console.log(this.comment_infor.child_comments);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    reply() {
      console.log(this.comment_infor);
      this.$store.commit("ChangeReplyObj", this.comment_infor);
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
