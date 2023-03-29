<!--
描述：动态首页
作者：焦佳宇
-->
<template>
  <div class="body_card">
    <div
      class="header_field"
      v-loading.fullscreen.lock="blog_list.length == 0"
    >
      <el-row>
        <el-col
          :span="9"
          style="text-align: left; padding-left: 220px; padding-top: 55px"
        >
          <img
            src="../assets/drawing_blog1.png"
            style="height: 200px"
          />
        </el-col>
        <el-col
          :span="7"
          style="text-align: left; padding-top: 90px; padding-left: 20px"
        >
          动态分享
        </el-col>
        <el-col
          :span="8"
          style="text-align: left; padding-top: 20px; padding-left: 35px"
        >
          <img
            src="../assets/drawing_blog2.png"
            style="height: 250px"
          />
        </el-col>
      </el-row>
    </div>
    <div class="blog_field">
      <section class="select_field">
        <el-tabs
          v-model="sort_type"
          class="demo-tabs"
          @tab-click="sortSwitcher"
        >
          <el-tab-pane name="0">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon :size="20">
                  <Star />
                </el-icon>
                <span style="font-size: large">最新动态</span>
              </span>
            </template>
            <section
              class="content_field"
              v-loading="this.loading"
            >
              <el-space
                warp
                :size="40"
              >
                <div
                  class="blog_card"
                  v-for="blog in this.blog_list"
                  :key="blog"
                >
                  <blog-info-board :blog_info="blog"></blog-info-board>
                </div>
              </el-space>
            </section>
          </el-tab-pane>
          <el-tab-pane name="1">
            <template #label>
              <span class="custom-tabs-label">
                <el-icon :size="20">
                  <Sunny />
                </el-icon>
                <span style="font-size: large">热门动态</span>
              </span>
            </template>
            <section
              class="content_field"
              v-loading="this.loading"
            >
              <el-space
                warp
                :size="40"
              >
                <div
                  class="blog_card"
                  v-for="blog in this.blog_list"
                  :key="blog"
                >
                  <blog-info-board :blog_info="blog"></blog-info-board>
                </div>
              </el-space>
            </section>
          </el-tab-pane>
        </el-tabs>
      </section>
    </div>
    <div class="pagination_field">
      <el-row justify="center">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="PAGESIZE"
          :total="blog_num_total"
          @current-change="curChange"
          v-model:current-page="this.cur_page"
        />
      </el-row>
    </div>
  </div>
</template>

<script>
import BlogInfoBoard from "../components/BlogInfoBoard.vue";
import axios from "axios";
import PageLoading from "../components/PageLoading.vue";
export default {
  components: {
    BlogInfoBoard,
    PageLoading,
  },
  data () {
    return {
      sort_type: "0", //0-时间，1-热度
      blog_list: [],
      loading: false,
      blog_num_total: 0,
      PAGESIZE: 8,
      cur_page: 1,
    };
  },

  methods: {
    curChange (res) {
      this.loading = true;
      this.cur_page = res;
      let sort_type_name = this.sort_type == 0 ? "time" : "hot";
      axios
        .get(
          "/spring/blog/list/" +
          sort_type_name +
          "?num=1000&page=" +
          res +
          "&page_size=" +
          this.PAGESIZE
        )
        .then((res) => {
          // this.blog_list = [].concat(res.data.data.blog);
          this.blog_list = [].concat(res.data.data);
          this.loading = false;
          window.scrollTo(0, 0); //将滚动条回滚至最顶端
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },
    sortSwitcher (res) {
      this.cur_page = 1;
      if (res.paneName == "0") {
        this.sortByTime();
      } else {
        this.sortByHeat();
      }
    },
    sortByTime () {
      if (this.sort_type == "0") {
        return;
      }
      this.loading = true;
      this.sort_type = "0";
      axios({
        url: "/spring/blog/list/time?num=100&page_size=" + this.PAGESIZE + "&page=1",
        method: "get",
      })
        .then((res) => {
          this.blog_list = [].concat(res.data.data);
          this.loading = false;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          this.loading = false;
        });
    },
    sortByHeat () {
      if (this.sort_type == "1") {
        return;
      }
      this.loading = true;
      this.sort_type = "1";
      axios
        .get("/spring/blog/list/hot?num=100&page_size=" + this.PAGESIZE + "&page=1")
        .then((res) => {
          this.blog_list = [].concat(res.data.data);
          this.loading = false;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          this.loading = false;
        });
    },
    bottoomLoading () {
      if (
        document.documentElement.clientHeight + window.scrollY >=
        document.documentElement.scrollHeight
      ) {
        console.log();
        ("触底了!!!!记得加载");
      }
    },
  },
  created () {
    //统计动态总数
    let get_num = axios
      .get("/spring/blog/num?num=1000")
      .then((res) => {
        this.blog_num_total = res.data.data.blog_num;
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
    let get_list = axios
      .get("/spring/blog/list/time?num=1000&page_size=" + this.PAGESIZE + "&page=1")
      .then((res) => {
        this.blog_list = [].concat(res.data.data);
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });
    // Promise.all([get_num, get_list]).then(() => {
    //   this.loading = false;
    // });
  },
  mounted () {
    window.addEventListener("scroll", this.bottoomLoading);
  },
  unmounted () {
    window.removeEventListener("scroll", this.bottoomLoading);
  },
};
</script>

<style scoped>
.blog_field {
  margin-bottom: 3%;
  border-radius: 28px;
  /* box-shadow: 34px 34px 68px #dedfdf, -34px -34px 68px #ffffff; */
}
.select_field {
  /* padding-top: 30px; */
  font-weight: bolder;
  margin-left: 8%;
  width: 84%;
}
.content_field {
  margin-top: 2%;
  margin-left: 1%;
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
.header_field {
  font-size: 70px;
  font-family: "SimSun";
  font-weight: bolder;
}
.pagination_field {
  margin-bottom: 10px;
}
.body_card {
  width: 98%;
  margin-left: 1%;
  border-radius: 17px;
  background: linear-gradient(#ffffffd0, #bdecfdd5);
  box-shadow: -5px -5px 10px #eff0f0, 5px 5px 10px #ffffff;
}
</style>
