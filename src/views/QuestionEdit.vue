<!--
描述：问题发布页面
作者：焦佳宇
-->
<template>
  <div class="common-layout">
    <el-container>
      <el-header class="card header_field">
        <el-row gutter="10">
          <el-col :span="1">
            <el-avatar
              :src="this.$store.state.user_info.user_profile"
              size="normal"
              style="margin-top: 7.5px"
            />
          </el-col>
          <el-col :span="3" style="margin-top: 17px; font-size: large">
            {{ this.$store.state.user_info.user_name }}
          </el-col>
          <el-col :span="15" style="margin-top: 5px; font-size: 1.8em">
            <strong>提问</strong>
          </el-col>
        </el-row>
        <el-row :gutter="30" style="margin-top: 5px">
          <el-col span="3" style="margin-top: 5px">
            <strong>话题:</strong>
          </el-col>
          <el-col span="3">
            <el-checkbox-group v-model="tagList">
              <el-checkbox label="生活" />
              <el-checkbox label="考试" />
              <el-checkbox label="学习" />
              <el-checkbox label="科研" />
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row gutter="5" style="margin-top: 5px">
          <el-col span="3">
            <strong>悬赏金额: </strong>{{ coin_in_num }}
          </el-col>
          <el-col :span="2">
            <el-button
              type="primary"
              plain
              size="small"
              @click="this.input_nums = true"
            >
              修改
            </el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="card content_field"
        ><div class="input_field">
          <div style="text-align: left; margin-bottom: 10px">
            <strong> 问题: </strong>
          </div>
          <el-input
            v-model="title"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            placeholder="在这里输入"
            style="margin-bottom: 10px"
          />
          <div style="text-align: left; margin-bottom: 10px">
            <strong> 补充说明(可选): </strong>
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
        <el-dialog v-model="input_nums" title="请设置悬赏金额">
          <el-input-number
            min="0"
            v-model="this.coin_in_num"
            :precision="0"
          ></el-input-number>
          <template #footer>
            <span class="dialog-footer">
              <el-button type="primary" @click="coinConfirm">确认</el-button>
            </span>
          </template>
        </el-dialog>
      </el-main>
    </el-container>
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
      title: "",

      tagList: [],
      fullscreenLoading: false,
      input_nums: false,
      coin_in_num: 0,
    };
  },
  methods: {
    coinConfirm() {
      //判断输入是否为合法类型-number
      if (typeof this.coin_in_num != "number") {
        ElMessage({
          type: "error",
          message: "请输入合法值",
          duration: 2000,
          showClose: true,
        });
        return;
      }

      if (this.coin_in_num > this.$store.state.user_info.user_coin) {
        ElMessage({
          type: "warning",
          message:
            "鸟币不足,当前余额为 " +
            this.$store.state.user_info.user_coin +
            " 枚",
          duration: 2000,
          showClose: true,
        });
        return;
      }
      this.input_nums = false;
    },
    callEditor() {
      if (this.title.length == 0) {
        ElMessage({
          message: "请输入问题",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
        return;
      }
      if (this.tagList.length == 0) {
        ElMessage({
          message: "请选择至少一个关键词",
          type: "warning",
          showClose: true,
          duration: 2000,
        });
      } else {
        this.$refs.text_editor.submit();
      }
    },
    upLoad(args) {
      this.fullscreenLoading = true;
      //处理summary
      var summary = "";
      if (args.text_content.length == 0) {
        summary="如题"
        return;
      } else if (args.text_content.length < 15) {
        summary = args.text_content;
      } else {
        summary = args.text_content.slice(0, 15);
      }
      //处理tag
      var tag = "";
      for (let i = 0; i < this.tagList.length; ++i) {
        tag += this.tagList[i] + "-";
      }
      tag = tag.slice(0, tag.length - 1);
      this.axios
        .post("question", {
          question_user_id: this.$store.state.user_info.user_id,
          question_title: this.title,
          question_description:summary,
          question_reward:this.coin_in_num,
          question_tag:tag
        })
        .then((res) => {
            console.log(99451295761927);
            console.log(res);
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
              message: "提交失败，请输入合法字段",
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
};
</script>

<style scoped>
.input_field {
  width: 98%;
  margin-left: 1%;
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
  min-height: 150px;
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
