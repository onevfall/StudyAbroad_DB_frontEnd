<template>
  <el-collapse-item>
    <template #title>
        <div class="self_comment">
        <div class="comment_header">
          <el-avatar :src="comment_infor.UserProfile" size="xx-small" />
          <span class="comment_name"><b>{{ comment_infor.UserName }}</b></span><br />
          <div style="width: 5%;display:flex;justify-content: space-around;">
            <like-button
            content_type="3"
            :content_id="comment_infor.AnswerCommentId"
            :show_num="true"
            size="normal"
            @giveLike="like"
            @cancelLike="unlike"
          />
          </div>
        </div>
          <div class="content_main">
            {{ comment_infor.AnswerCommentContent }}
        <!-- 我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐我的天呐 -->
          </div>
          <div class="comment_footer">
          </div>
      </div>
    </template>
    <!-- <div v-if="">

    </div> -->
  </el-collapse-item>
</template>

<script>
import LikeButton from "../components/LikeButton.vue";
//import { ElMessage } from "element-plus";
export default {
  name: "CommentItem",
  props: ["comment_infor"],
  components: { LikeButton },
  created() {

  },
  data() {
    return {};
  },
  watch: {},
  methods: {},
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
    border-top: 1pxsolidvar(--el-collapse-border-color);
    border-bottom: 1pxsolidvar(--el-collapse-border-color);
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
