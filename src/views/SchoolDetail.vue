<!--
高校详情
描述：展示详细高校信息
作者：张子涵
-->
<template>
  <div>
    <school-info :school ="this.school_info"></school-info>
    <el-container>
      <el-aside width=25%>
        
      </el-aside>
      <el-main>
        <div class="info_detail">
        <school-info-card :school="this.school_info"> </school-info-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import BmapDemo from "../components/Map.vue"
import axios from "axios";
import SchoolInfo from "../components/SchoolInfo.vue";
import SchoolInfoCard from "../components/SchoolInfoCard.vue";
export default {
  components: {
    SchoolInfo,
    SchoolInfoCard,
    BmapDemo
  },
  data() {
    return {
      school_info: "",
      school_id:"",
    };
  },
  props:["school_id"],
  methods:{
    getParams(){
      this.school_id = this.$route.query.school_id 
    },
  },
  created() {
    this.getParams();
    //在此处向服务器请求数据，初始化所需变量
    axios({
        url: "university?university_id="+this.school_id,
        method: "get",
      })
        .then((res) => {
          console.log(res.data);
          var response=res.data
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
  mounted(){
     window.scrollTo(0,0);
  }
};
</script>

<style scoped>

</style>
