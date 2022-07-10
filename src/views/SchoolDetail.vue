<template>
  <div class="common-layout">
    <school-info></school-info>
    <el-container>
      <el-aside width="400px">
        
      </el-aside>
      <el-main>Main
        
        <BmapDemo :school ="this.school_info"></BmapDemo>
      </el-main>
    </el-container>
  </div>
</template>

<script>

import BmapDemo from "../components/Map.vue"
import UserInfoBoard from "../components/UserInfoBoard.vue";
import axios from "axios";
import SchoolInfo from "../components/SchoolInfo.vue";
export default {
  components: {
    UserInfoBoard,
    SchoolInfo,
    BmapDemo
  },
  data() {
    return {
      school_info: "",
    };
  },
  created() {
    //在此处向服务器请求数据，初始化所需变量
    axios({
        url: "university?university_id="+2,
        method: "get",
      })
        .then((res) => {
          console.log(res.data);
          var response=res.data
          //console.log(response.state);
          if (response.status == true) {
            this.school_info = response.data;
            console.log(this.school_info.university_name);
          }
        })
        .catch((err) => {
          console.log(err);
        });
  },
};
</script>

<style scoped>
.UserInfo {
  margin-top: 20px;
  margin-left: 25px;
}
</style>
