<template>
  <el-container>
    <el-header class="header_comment">
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
        placeholder="评论些什么..."
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
    </el-header>
    <el-main :key="this.commentChange">
      <el-scrollbar v-if="this.comments.length !== 0" height="200px">
        <!-- <el-collapse accordion @change="handleChange"> -->
        <el-collapse accordion>
          <div v-for="(item, i) in this.comments" :key="i">
            <comment-item :comment_infor="this.comments[i]" :type=this.type> </comment-item>
          </div>
        </el-collapse>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script>
import CommentItem from "./CommentItem.vue";
import { ElMessage } from "element-plus";
import axios from "axios";
export default {
  name: "CommentZone",
  props: ["id", "type"],
  components: { CommentItem,ElMessage },
  data() {
    return {
      dynamic_type: "",
      comment_now: "",
      comments:[],
      answer_comment_id: -1,
      isReply: false,
      commentChange: false,
    };
  },
  created() {
    switch (this.type) {
      case "0":
        this.dynamic_type = "answer";
        break;
      case "1":
        this.dynamic_type = "blog";
        break;
    }
    axios
      .get("/" + this.dynamic_type + "/comment", {
        params: {
          [this.dynamic_type + "_id"]: this.id,
        },
      })
      .then((res) => {
        for (let i = 0; i < res.data.data.comment_list.length; ++i) {
          console.log("123")
          console.log(this.id)
          console.log(res.data.data)
          this.comments[i] = res.data.data.comment_list[i];
          this.comments[i].reply_num = 0;
          this.comments[i].child_comments = [];
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
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
          .post("/" + this.dynamic_type + "/comment", {
            [this.dynamic_type + "_id"]: this.id,
            [this.dynamic_type + "_comment_user_id"]:
              this.$store.state.user_info.user_id,
            [this.dynamic_type + "_comment_content"]: this.comment_now,
          })
          .then((res) => {
            //this.answer_comment_id =
            console.log(res.data);
            this.commentChange = !this.commentChange;
            ElMessage({
              type: "success",
              message: "评论成功！",
              duration: 2000,
              showClose: true,
            });
            this.comment_now = "";
            axios
              .get("/" + this.dynamic_type + "/comment", {
                params: {
                  [this.dynamic_type + "_id"]: this.id,
                },
              })
              .then((res) => {
                for (let i = 0; i < res.data.data.comment_list.length; ++i) {
                  this.comments[i] = res.data.data.comment_list[i];
                  this.comments[i].reply_num = 0;
                  this.comments[i].child_comments = [];
                }
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
  },
};
</script>

<style scoped>
.header_comment {
  text-align: center;
  margin-left: 3%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.thor_title {
  text-align: left;
  margin-left: 7%;
  display: flex;
  align-items: center;
}
.author_title .author_name {
  display: inline-block;
  margin-left: 2%;
}
.comment_button {
  text-align: center;
  margin-left: 3%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>