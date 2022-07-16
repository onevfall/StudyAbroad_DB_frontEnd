<!--
描述：动态首页
作者：焦佳宇
-->
<template>
  <page-loading v-if="blog_list.length == 0"></page-loading>
  <carousel
    type="card"
    indicator-position="none"
    style="margin-top: 10px"
  ></carousel>
  <div class="blog_field">
    <section class="select_field">
      <span>
        <el-row gutter="10">
          <el-col span="1" @click="sortByTime">
            <img src="../assets/sort_desc.png" />
          </el-col>
          <el-col span="1" @click="sortByTime">
            <div
              :style="{
                'margin-top': '9px',
                color: this.sort_type == 0 ? '#fbc563' : 'black',
              }"
            >
              发布时间
            </div>
          </el-col>
          <el-col span="1" @click="sortByHeat">
            <img src="../assets/sort_asc.png" />
          </el-col>
          <el-col span="1" @click="sortByHeat">
            <div
              :style="{
                'margin-top': '9px',
                color: this.sort_type == 1 ? '#fbc563' : 'black',
              }"
            >
              动态热度
            </div>
          </el-col>
        </el-row>
      </span>
    </section>
    <section class="content_field">
      <el-space warp :size="40">
        <div class="blog_card" v-for="blog in this.blog_list" :key="blog">
          <blog-info-board :blog_info="blog"></blog-info-board>
        </div>
      </el-space>
    </section>
  </div>
</template>

<script>
import Carousel from "../components/Carousel.vue";
import BlogInfoBoard from "../components/BlogInfoBoard.vue";
import axios from "axios";
import PageLoading from "../components/PageLoading.vue";
export default {
  components: {
    Carousel,
    BlogInfoBoard,
    PageLoading,
  },
  data() {
    return {
      sort_type: 0, //0-时间，1-热度
      blog_list: [],
    };
  },

  methods: {
    sortByTime() {
      if (this.sort_type == 0) {
        return;
      }
  
      this.sort_type = 0;
      axios({
        url: "/blog/time?num=8",
        method: "get",
      })
        .then((res) => {
          this.blog_list = [].concat(res.data.data.blog);
          this.blog_list = this.blog_list.concat(res.data.data.blog);
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    },
    sortByHeat() {
      if (this.sort_type == 1) {
        return;
      }
      this.sort_type = 1;
      axios
        .get("/blog/heat?num=8")
        .then((res) => {
          this.blog_list = [].concat(res.data.data.blog);
          this.blog_list = this.blog_list.concat(res.data.data.blog);
        })
        .catch((errMsg) => {
          console.log(errMsg);
        });
    },
    bottoomLoading() {
      if (
        document.documentElement.clientHeight + window.scrollY >=
        document.documentElement.scrollHeight
      ) {
        console.log();("触底了!!!!记得加载");
      }
    },
  },
  created() {
    
    axios
      .get("/blog/time?num=8")
      .then((res) => {
        this.blog_list = [].concat(res.data.data.blog);
        this.blog_list = this.blog_list.concat(res.data.data.blog);
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
  },
  mounted() {
    window.addEventListener("scroll", this.bottoomLoading);
     

  },
  unmounted() {
    window.removeEventListener("scroll", this.bottoomLoading);
  },
};
</script>

<style scoped>
.blog_field {
  margin-top: 1%;
  margin-bottom: 3%;
  background-color: white;
  border-radius: 28px;
  background: #ecf5ff;
  box-shadow: 34px 34px 68px #dedfdf, -34px -34px 68px #ffffff;
}
.select_field {
  padding-top: 30px;
  font-weight: bolder;
  margin-left: 8%;
}
.content_field {
  margin-top: 2%;
  margin-left: 8%;
}
.blog_card {
  margin-bottom: 8%;
}
.el-space {
  display: flex;
  vertical-align: top;
  flex-wrap: wrap;
  flex-direction: row;
}
</style>
