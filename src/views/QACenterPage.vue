<!--
描述：问答首页
作者：王若晗 方新宇
-->
<template>
  <el-container v-loading.fullscreen.lock="this.loading" class="body_card">
    <el-header>
      <el-row>
        <el-col
          :span="9"
          style="text-align: left; padding-left: 220px; padding-top: 55px"
        >
          <img src="../assets/drawing_qacenter2.png" style="height: 140px" />
        </el-col>
        <el-col
          :span="7"
          style="text-align: left; padding-top: 90px; padding-left: 20px"
        >
          留学问答
          <el-row style="text-align: center;margin-top:30px;margin-left: -10px;">

          <span style="font-size: 26px">没找到想看的问题？</span>
          <el-link
            type="primary"
            :underline="false"
            @click="goToAskPage"
            style="font-size: 26px; font-weight: 500"
          >
            去提问
          </el-link>


      </el-row>
        </el-col>
        <el-col
          :span="8"
          style="text-align: left; padding-top: 20px; padding-left: 35px"
        >
          <img src="../assets/drawing_qacenter1.png" style="height: 250px" />
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="3" style="padding-left: 10px">
          <el-button
            type="primary"
            text="primary"
            @click="newStatus"
            style="font-size: 20px"
          >
            <el-icon :size="20"><Star /></el-icon>
            按最新话题
          </el-button>
        </el-col>
        <el-col :span="3">
          <el-button
            type="primary"
            text="primary"
            @click="heatStatus"
            style="font-size: 20px"
          >
            <el-icon :size="20"><Sunny /></el-icon>
            按最热话题
          </el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 20px" v-loading="this.question_loading">
        <el-col
          :span="6"
          class="card-field"
          v-for="(ques, index) in this.question_list"
          :key="ques"
        >
          <question-card :question_info="ques" :question_num="index+(this.cur_page-1)*this.PAGESIZE"></question-card>
        </el-col>
      </el-row>
     
      <div class="pagination_field">
        <el-row justify="center">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="PAGESIZE"
            :total="question_num_total"
            @current-change="curChange"
            v-model:current-page="this.cur_page"
          />
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import QuestionCard from "../components/QuestionCard.vue";
import PageLoading from "../components/PageLoading.vue";
import axios from "axios";
import { ElMessage } from "element-plus";
export default {
  name: "QACenterPage",
  components: {
    QuestionCard,
    PageLoading,
    ElMessage,
  },
  data() {
    return {
      question_list: [],
      question_num_total: 0,
      PAGESIZE: 8,
      display_status: true,
      loading: true,
      question_loading: false,
      cur_page: 1,
    };
  },
  methods: {
    newStatus: function () {
      this.cur_page = 1;
      this.display_status = true;
      this.sortByTime();
    },
    heatStatus: function () {
      this.cur_page = 1;
      this.display_status = false;
      this.sortByHeat();
    },
    goToAskPage: function () {
      this.$router.push({
        name: "question_edit",
      });
    },
    curChange: function (res) {
      this.question_loading = true;
      this.cur_page = res;
      let sort_type_name = this.display_status ? "/time" : "/hot";
      axios
        .get(
          "/spring/qa/question/list" +
            sort_type_name +
            "?page=" +
            res +
            "&page_size=" +
            this.PAGESIZE
        )
        .then((res) => {
          this.question_list = [].concat(res.data.data);
          this.question_loading = false;
          window.scrollTo(0, 0); //将滚动条回滚至最顶端
        })
        .catch((err) => {
          this.question_loading = false;
          console.log(err);
          ElMessage.error("加载失败！！！");
        });
    },
    sortByTime: function () {
      this.question_loading = true;
      axios({
        url: "/spring/qa/question/list/time?page_size=" + this.PAGESIZE + "&page=1",
        method: "get",
      })
        .then((res) => {
          this.question_list = [].concat(res.data.data);
          this.question_loading = false;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          this.question_loading = false;
          ElMessage.error("切换到时间失败！！！");
        });
    },
    sortByHeat: function () {
      this.question_loading = true;
      axios({
        url: "/spring/qa/question/list/hot?page_size=" + this.PAGESIZE + "&page=1",
        method: "get",
      })
        .then((res) => {
          this.question_list = [].concat(res.data.data);
          this.question_loading = false;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          this.question_loading = false;
          ElMessage.error("切换到热度失败！！！");
        });
    },
  },
  created() {
    let get_num = axios
      .get("/spring/qa/question/num")
      .then((res) => {
        this.question_num_total = res.data.data.num;
      })
      .catch((errMsg) => {
        console.log(errMsg);
      });

    axios({
      url: "/spring/qa/question/list/time?page_size=" + this.PAGESIZE + "&page=1",
      method: "get",
    })
      .then((res) => {
        this.question_list = [].concat(res.data.data);
        this.question_loading = false;
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });

  },
};
</script>

<style scoped>
.el-header {
  font-size: 70px;
  font-family: "SimSun";
  font-weight: bolder;
  margin-bottom: 170px;
}

.el-main {
  padding-bottom: 50px;
}

.pagination_field {
  margin-bottom: 10px;
}
.body_card {
  width:95%;
  margin-left: 2.5%;
  border-radius: 17px;
  background: linear-gradient(#ffffffd0, #bdecfdd5);
  box-shadow: -5px -5px 10px #eff0f0, 5px 5px 10px #ffffff;
}
</style>