<!--
描述：回答编辑页面
作者：焦佳宇
-->
<template>
  <div class="card header_field">
    <el-row :gutter="10">
      <el-col :span="20">
        <el-row gutter="10">
          <el-col :span="2">
            <el-avatar
              :src="this.question_info.userProfile"
              size="normal"
              style="margin-top: 7.5px"
            />
          </el-col>
          <el-col :span="3" style="margin-top: 17px; font-size: large">
            {{ this.question_info.userName }}
          </el-col>
          <el-col :span="3" style="margin-top: 17px; font-size: large">
            <el-tag
              type="warning"
              size="large"
              v-if="this.question_info.user_university != 'null'"
              >已认证:{{ this.question_info.userUniversity }}
              {{ this.question_info.userQualification }}</el-tag
            >
          </el-col>
          <el-col :span="13" style="margin-top: 5px; font-size: 1.8em">
            <strong>编辑回答</strong>
          </el-col>
        </el-row>
        <el-row :gutter="30" style="margin-top: 10px">
          <el-col :span="3">
            <strong>悬赏: {{ this.question_info.questionReward }} 鸟币</strong>
          </el-col>
          <el-col
            :span="1"
            v-for="tag in this.question_info.tagList"
            :key="tag"
            style="margin-right: 3px"
          >
            <el-tag size="middle">{{ tag }}</el-tag>
          </el-col>
        </el-row>
        <el-row gutter="5" style="margin-top: 10px; font-size: x-large">
          <el-col style="text-align: left; margin-left: 20px"
            ><strong>{{ this.question_info.questionTitle }}</strong></el-col
          >
        </el-row>
        <el-row gutter="5" style="margin-top: 20px; margin-left: 20px">
          <el-col style="font-size: 0.9em" :span="20">
            <div v-if="notFull" style="text-align: left">
              {{ this.question_info.questionSummary }}
            </div>
            <div v-else style="text-align: left">
              <p v-html="this.question_info.questionDescription"></p>
            </div>
          </el-col>
          <el-col class="expand" :span="3">
            <!--展开收起-->
            <el-button
              id="expand"
              type="info"
              text="info"
              @click="expandToFull"
              >{{ textStatus }}</el-button
            >
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="4">
        <img src="../assets/question.png" style="height: 200px" />
      </el-col>
    </el-row>
  </div>
  <div class="card content_field">
    <div class="input_field">
      <div style="text-align: left; margin-bottom: 10px">
        <strong> 编辑回答: </strong>
      </div>

      <editor ref="text_editor" @editorSubmit="upLoad" />
      <button
        @click="callEditor"
        class="mine_button"
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-text="正在提交..."
      >
        <div class="svg-wrapper-1">
          <div class="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              ></path>
            </svg>
          </div>
        </div>
        <span>发布</span>
      </button>
    </div>
  </div>
</template>

<script>
import Editor from "../components/Editor";
import { ElMessage } from "element-plus";
export default {
  components: {
    Editor,
    ElMessage,
  },
  data() {
    return {
      question_info: JSON.parse(
        decodeURIComponent(this.$route.params.question_info)
      ),
      notFull: true,
      textStatus: "展开全文↓",
      fullscreenLoading: false,
    };
  },
  methods: {
    expandToFull() {
      this.notFull = !this.notFull;
      if (this.notFull) {
        this.textStatus = "展开全文↓";
      } else {
        this.textStatus = "收起";
      }
    },
    callEditor() {
      this.$refs.text_editor.submit();
    },
    upLoad(args) {
      this.fullscreenLoading = true;
      //处理summary
      var summary = "";
      if (args.text_content.length == 0) {
        this.fullscreenLoading = false;
        ElMessage({
          type: "warning",
          message: "请输入有效内容",
          duration: 2000,
          showClose: true,
        });
        return;
      } else if (args.text_content.length < 40) {
        summary = args.text_content;
      } else {
        summary = args.text_content.slice(0, 40) + "...";
      }
      //处理图片
      var image_url = "";
      if (args.image_array.length != 0) {
        image_url = args.image_array[0]; //选第一张图片
      }
      this.axios
        .post("/spring/qa/answer", {
          user_id: this.$store.state.user_info.user_id,
          summary: summary,
          content: args.base64_content,
          question_id:this.question_info.questionId,
          image_url: image_url,
        })
        .then((res) => {
          if (res.data.status == true) {
            this.fullscreenLoading = false;
            ElMessage({
              type: "success",
              message: "提交成功，正在等待审核",
              duration: 2000,
              showClose: true,
            });
            this.$router.back();
          } else {
            this.fullscreenLoading = false;
            ElMessage({
              type: "warning",
              message: "提交失败!",
              duration: 2000,
              showClose: true,
            });
          }
        })
        .catch((errMsg) => {
          this.fullscreenLoading = false;
          ElMessage({
            type: "warning",
            message: "提交失败，请检查网络连接",
            duration: 2000,
            showClose: true,
          });
          console.log(errMsg);
        });
    },
  },
  created() {},
};
</script>

<style scoped>
.input_field {
  margin-top: 20px;
  width: 95%;
  margin-left: 2.5%;
}

.card {
  background: rgb(255, 255, 255);
  border-radius: 1em;
  box-shadow: 0.3em 0.3em 0.7em #00000015;
  transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: rgb(250, 250, 250) 0.2em solid;
}
.card:hover {
  border: #008bf8 0.2em solid;
}
.header_field {
  margin-top: 1vh;
  /* min-height: 200px; */
}
.content_field {
  margin-top: 2vh;
  margin-bottom: 5vh;
}

.mine_button {
  margin-left: 45%;
  margin-top: 2vh;
  font-family: inherit;
  font-size: 16px;
  background: rgb(37, 150, 249);
  color: white;
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
}

.mine_button span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

.mine_button svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

.mine_button:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

.mine_button:hover svg {
  transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

.mine_button:hover span {
  transform: translateX(5em);
}

.mine_button:active {
  transform: scale(0.95);
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}
</style>
