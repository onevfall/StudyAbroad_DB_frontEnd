<!--
描述：动态发布页面
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
            <strong>动态</strong>
          </el-col>
        </el-row>
        <el-row :gutter="30" style="margin-top: 5px">
          <el-col span="3" style="margin-top: 5px"> 动态话题: </el-col>
          <el-col span="3">
            <el-checkbox-group v-model="tagList" :min="1">
              <el-checkbox label="Option A" />
              <el-checkbox label="Option B" />
              <el-checkbox label="Option C" />
              <el-checkbox label="disabled" />
              <el-checkbox label="selected and disabled" />
            </el-checkbox-group>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="card content_field"
        ><div class="input_field">
          <editor ref="text_editor" v-model="content" @editorSubmit="upLoad" />
          <button @click="callEditor" class="mine_button">
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
        </div></el-main
      >
    </el-container>
  </div>
</template>

<script>
import Editor from "../components/Editor";
export default {
  components: {
    Editor,
  },
  data() {
    return {
      tagList: [],
    };
  },
  methods: {
    callEditor() {
      console.log(111);
      this.$refs.text_editor.submit();
    },
    upLoad(args) {
      console.log(args.text_content);
      console.log(args.image_content);
      this.axios
        .post("blog111", {
          user_id: "5",
          summary: "关于只狼boss难度排名，自认还是比较有资格回答的",
          content: args.base64_content,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((errMsg) => {
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
  min-height: 100px;
}
.content_field {
  margin-top: 2vh;
  margin-bottom: 5vh;
}

.mine_button {
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
