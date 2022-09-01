<!--
高校详情
描述：展示详细高校信息
作者：张子涵
-->
<template>
  <div>
    <school-info :school="this.school_info"></school-info>
    <el-container>
      <el-aside width="25%">
        <el-card :body-style="{ background: 'aliceblue' }" shadow="always">
          <template #header>
            <div class="card-header">广告栏</div>
          </template>
          <div v-for="link in links" :key="link.text" class="text">
            <el-link href="https://sse.tongji.edu.cn"> {{ link.text }}</el-link>
          </div>
        </el-card>
      </el-aside>
      <el-main>
        <div class="info_detail">
          <school-info-card :school="this.school_info"> </school-info-card>
        </div>
      </el-main>
    </el-container>
  </div>
  <div class="rank_row">
    <p class="rank_text QS_rank_test">QS排名</p>
    <p class="rank_text">THE排名</p>
    <p class="rank_text">USNews排名</p>
  </div>
  <div class="downBox">
    <div v-for="(school, index) in school_list" :key="index">
      <school-card :school="school"></school-card>
      <br />
    </div>
  </div>
</template>

<script>
import BmapDemo from "../components/Map.vue";
import axios from "axios";
import SchoolInfo from "../components/SchoolInfo.vue";
import SchoolInfoCard from "../components/SchoolInfoCard.vue";
export default {
  components: {
    SchoolInfo,
    SchoolInfoCard,
    BmapDemo,
  },
  data() {
    return {
      school_info: "",
      school_id: "",
      links: [
        { text: "同济软院招聘信息" },
        { text: "同济经管学院招聘信息" },
        { text: "同济电院招聘信息" },
        { text: "同济土木学院招聘信息" },
        { text: "同济数院招聘信息" },
        { text: "同济物院招聘信息" },
      ],
    };
  },
  props: ["school_id"],
  methods: {
    getParams() {
      this.school_id = this.$route.query.school_id;
    },
  },
  created() {
    this.getParams();
    //在此处向服务器请求数据，初始化所需变量
    axios({
      url: "university?university_id=" + this.school_id,
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        var response = res.data;
        //console.log(response.state);
        if (response.status == true) {
          this.school_info = response.data;
          console.log(this.school_info.university_chname);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
  text-align: left;

  margin-bottom: 18px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  text-align: left;
  font-size: 28px;
  padding-left: 5px;
  border-left: 10px rgb(33, 33, 126) solid;
}
</style>
