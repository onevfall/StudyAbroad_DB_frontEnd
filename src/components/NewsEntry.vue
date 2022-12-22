<!--
快讯列表项
作者：焦佳宇、
-->
<template>
  <div class="common-layout card">
    <el-container class="news_card">
      <el-aside width="200px">
        <img
          class="news_image"
          :src="this.news_flash_image"
          v-if="this.news_flash_image != null"
        />
        <img v-else class="news_image" src="../assets/logo.png" />
      </el-aside>

      <el-main>
        <el-row gutter="10">
          <el-col :span="20" style="text-align: left">
            <strong>
              {{ this.news_flash_title }}
            </strong>
          </el-col>
          <el-col :span="4" class="flash_date">
            发布于
            {{
              this.news_flash_date.substring(
                0,
                this.news_flash_date.indexOf(" ")
              )
            }}
          </el-col>
        </el-row>
        <el-row gutter="1">
          <el-col :span="2" class="public_info">
            <el-tag type="success">
              {{ this.news_flash_region }}
            </el-tag>
          </el-col>
          <el-col
            :span="1"
            class="public_info"
            v-for="tag in this.news_flash_tagAry"
            :key="tag"
          >
            <el-tag type="warning">
              {{ tag }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row gutter="10">
          <el-col :span="20" style="text-align: left" class="summary_field">
            {{ this.news_flash_summary.slice(0,250)+"..." }}
          </el-col>
          <el-col :span="4" style="margin-top: 20px">
            <el-button type="warning" plain @click="goDetail">
              查看全文
            </el-button>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  props: {
    news_flash_title: {
      type: String,
      default: "",
    },
    news_flash_date: {
      type: String,
      default: "",
    },
    news_flash_region: {
      type: String,
      default: "",
    },
    news_flash_tag: {
      type: String,
      default: "",
    },
    news_flash_summary: {
      type: String,
      default: "",
    },
    news_flash_id: {
      type: Number,
      default: -1,
    },
    news_flash_image: {
      type: String,
      default: "../assets/logo.png",
    },
  },
  data() {
    return {
      news_flash_tagAry: "",
      logo_path: "../assets/logo.png",
    };
  },
  methods: {
    goDetail() {
      this.$router.push({
        path: "/news",
        query: {news_id: this.news_flash_id },
      });
    },
  },
  created() {
    this.news_flash_tagAry = this.news_flash_tag.split("-");
  },
};
</script>

<style scoped>
.news_image {
  object-fit: cover;
  height: 85%;
  width: 85%;
  margin-top: 10px;
  border-radius: 5px;
}
.card {
  background: rgb(255, 255, 255);
  border-radius: 1em;
  box-shadow: 0.3em 0.3em 0.7em #00000015;
  transition: border 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: rgb(250, 250, 250) 0.2em solid;
  width: 100%;
}
.card:hover {
  border: #008bf8 0.2em solid;
}
.flash_date {
  color: grey;
  font-size: small;
  margin-top: 3px;
}
.public_info {
  text-align: left;
  font-size: x-small;
  margin-top: 10px;
}
.summary_field {
  text-align: left;
  font-size: small;
  margin-top: 10px;
}
</style>
