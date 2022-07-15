<!--
机构详情
描述：展示详细机构信息
作者：张子涵
-->
<template>
  <div>
    <institution-info :institution ="this.institution_info"></institution-info>
    <el-container>
      <el-aside width="300px">
        <el-card
                  :body-style="{ background: 'aliceblue' }"
                  shadow="always"
                >
                  <template #header>
                    <div class="card-header">广告栏</div>
                  </template>
                  <div v-for="link in links" :key="link.text" class="text">
                    <el-link href="https://sse.tongji.edu.cn">
                      {{ link.text }}</el-link
                    >
                  </div>
        </el-card>
      </el-aside>
      <el-main>
        <div class="info_detail">
        <institution-info-card :institution="this.institution_info"> </institution-info-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import BmapDemo from "../components/Map.vue"
import axios from "axios";
import InstitutionInfo from "../components/InstitutionInfo.vue";
import InstitutionInfoCard from "../components/InstitutionInfoCard.vue";
export default {
  components: {
    InstitutionInfo,
    InstitutionInfoCard,
    BmapDemo
  },
  data() {
    return {
      institution_info: "",
      institution_id:"",
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
  props:["institution_id"],
  methods:{
    getParams(){
      this.institution_id = this.$route.query.institution_id 
    },
  },
  created() {
    this.getParams();
    //在此处向服务器请求数据，初始化所需变量
    axios({
        url: "institution?institution_id="+this.institution_id,
        method: "get",
      })
        .then((res) => {
          console.log(res.data);
          var response=res.data
          //console.log(response.state);
          if (response.status == true) {
            this.institution_info = response.data;
            console.log(this.institution_info.institution_name);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  },
  mounted(){
     window.scrollTo(0,0);
  }
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
