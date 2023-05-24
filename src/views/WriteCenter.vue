<template>
  <div class="bodycard">
    <div>
      <div class="upBox">
        <div class="sch_box">——— 留学文书服务 ———</div>
      </div>
      <el-divider></el-divider>
      <div class="main_bg">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-row :gutter="21" style="margin: 20px">
              <el-col :span="7">
                <img
                  style="height: 200px; margin-right: 10px"
                  src="../assets/writing_left.png"
                />
              </el-col>
              <el-col :span="10">
                <div class="mid_text">让AI助力您的文书修改</div>
                <div class="mid_text">从无到有，精益求精</div>
                <div class="mid_text">由您来决定</div>
              </el-col>
              <el-col :span="6">
                <img style="height: 200px" src="../assets/writing_right.png" />
              </el-col>
            </el-row>

            <el-row style="margin: 20px" justify="center">
              <el-col :span="20">
                <el-form :model="form">
                  <el-form-item label="目标院校">
                    <el-input v-model="form.school" />
                  </el-form-item>
                  <el-form-item label="申请专业">
                    <el-input v-model="form.major" />
                  </el-form-item>
                  <el-form-item label="申请学位(简称)">
                    <el-input v-model="form.degree" />
                  </el-form-item>
                  <!-- <el-form-item label="文书类型">
                    <el-input v-model="form.degree" />
                  </el-form-item> -->
                  <el-form-item label="原文书">
                    <el-input
                      v-model="form.document_ps"
                      type="textarea"
                      :row="10"
                      placeholder="请输入原文书（若无文书，则可以将新的生成）"
                    />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="12">
            <el-tabs
              v-model="activeName"
              class="demo-tabs"
              style="height: 200px"
              @tab-click="handleClick"
            >
              <!-- <el-tab-pane label="参考文书" name="second">
                <el-row
                  ><el-col
                    v-for="(d, index) in documents"
                    :key="index"
                    :span="6"
                  >
                    <document-card
                      :document="d"
                      style="margin: 10px"
                    ></document-card> </el-col
                ></el-row>
              </el-tab-pane> -->
              <el-tab-pane label="文书修改意见" name="first">
                <!-- <div class="left_text">
                  {{ this.advice }}
                </div> -->
                <el-card class="box-card">
                  <template #header>
                    <div class="card-header">
                      <div >文书信息</div>
                      <div style="width:30px"></div>
                      <div style="display:inline-block;"> 
                        <!--仍有问题-->
                      <el-tag class="ml-2 tag-container" type="primary">目标院校 {{ this.form.school}}</el-tag>
                      <br>
                      <el-tag class="ml-2 tag-container" type="success">申请专业 {{ this.form.major}}</el-tag>
                      <br>
                      <el-tag class="ml-2 tag-container" type="info">文书类型 Personal Statement</el-tag>
                      <br>
                      <el-tag class="ml-2 tag-container" type="warning">申请学位 {{ this.form.degree }}</el-tag>
                    </div>
                    </div>
                  </template>
                  <el-scrollbar height="240px">
                  <span style="white-space: pre-wrap; display:inline-block;text-align: left;">{{ this.result }}</span>
                </el-scrollbar>
                </el-card>
              </el-tab-pane>
            </el-tabs>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
// axios.defaults.headers.post['Content-Type']='application/json'
import { TabsPaneContext } from "element-plus";
import InstitutionCard from "../components/InstitutionCard.vue";
import PageLoading from "../components/PageLoading.vue";
import DocumentCard from "../components/DocumentCard.vue";
export default {
  components: {
    InstitutionCard,
    PageLoading,
    DocumentCard,
  },
  data() {
    return {
      image_url:
        "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png",
      form: {
        school: "Carniage Mellon University",
        major: "Computer Science And Technology",
        degree: "Master",
        document_ps: "",
        // school: "",
        // major: "",
        // degree: "",
        // document: "",
      },
      activeName: "first",
      documents: [],
      advice: "",
      result: ""
    };
  },
  methods: {
    onSubmit() {
      // this.activeName = "second";
      // this.advice = "advice";
      axios.post(
          "http://127.0.0.1:8000/writing/", //?school=" + this.form.school + "&major=" + this.form.major + "&degree=" + this.form.degree + "&document_ps=" + this.form.document,
          {
            school: this.form.school,
            major:this.form.major,
            degree:this.form.degree,
            document_ps:this.form.document
          },
       )
      // axios.post(
      //   "http://127.0.0.1:8000/writing/",
      //   {JSON.stringify(this.form)},
      //   // headers:{
      //   //   // 'content-type':'application/x-www-form-urlencoded; charset=UTF-8',
      //   //   'Access-Control-Allow-Origin': process.env.VUE_APP_Access_Control_Allow_Origin
      //   // }
      // )
      .then((res) => {
        console.log(res);
        this.result = res.data;
      })
      .catch((errMsg) => {
            console.log(errMsg);
            console.log("1111");
          });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    curChange(res) {
      this.cur_page = res;
      this.getDocuments(this.cur_page);
    },
    getDocuments(page) {
      this.documents = [
        { name: "a", id: 1, img: this.image_url },
        { name: "a", id: 1, img: this.image_url },
        { name: "a", id: 1, img: this.image_url },
        { name: "a", id: 1, img: this.image_url },
        { name: "a", id: 1, img: this.image_url },
      ];
    },
  },
  mounted() {},
  created() {
    this.getDocuments(1);
  },
};
</script>
  
<style scoped >
.upBox {
  background-image: linear-gradient(#a6c1ee, #d3afa5);
  height: 90px;
  width: 100%;
}

.my_top_layout {
  height: 70px;
  display: flex;
  position: relative;
  /* justify-content: space-around; */
}

.tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.sch_box {
  position: absolute;
  text-align: center;
  /* margin-left: -20px;
  margin-bottom: 10px;
  padding-top: 5px; */
  /* height: 30px;
  width: 100px; */
  margin-top: 10px;
  margin-left: 30%;
  /* background: cornflowerblue; */
  color: black;
  /* border: 2px solid cornflowerblue; */
  border-radius: 8px;
  font-size: 40px;
}

.searchBox {
  background-color: #969393;
  /*;*/
  opacity: 0.6;
  background-blend-mode: overlay;
}

.cover_up {
  padding-left: 8%;
}

.cover {
  width: 300px;
  height: 230px;
  position: relative;
}

.cover:after {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  box-shadow: 0 0 10px 10px #ffffff inset;
}

.drawing {
  /* height: 220px; */
  /* height: 90%;
    object-fit: cover; 图片缩放自适应原图的比例 */
  width: 300px;
  height: 230px;
  display: block;
  margin-bottom: 20px;
  /* margin-left: 20px; */
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  color: white;
}

.grid-content {
  border-radius: 4px;
  min-height: 70px;
}

.mid_text {
  color: rgb(0, 0, 0);
  text-align: middle;
  margin: 5px;
  margin-top: 22px;
  font-size: 25px;
}

.left_text {
  color: rgb(0, 0, 0);
  text-align: left;
  margin: 20px;
  margin-left: 6%;
  font-size: 19px;
}

.rank_row {
  background: rgb(245, 242, 242);
  display: flex;
  margin: 20px;
}

p.rank_text {
  color: coral;
  font-size: 17px;
  margin-left: 45px;
}

p.QS_rank_test {
  margin-left: 8.5%;
}

.search_component {
  margin-left: 35%;
  margin-top: 2.8%;
}

.pagination_field {
  margin-top: 10px;
  margin-bottom: 10px;
}

.body_card {
  width: 95%;
  margin-left: 2.5%;
  border-radius: 17px;
  background: linear-gradient(#ffffffd0, #bdecfdd5);
  box-shadow: -5px -5px 10px #eff0f0, 5px 5px 10px #ffffff;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.main_bg {
  margin: 0 auto;
  /* border-radius: 2%; */
  background-image: linear-gradient(#84b3de, #fdfbfb);
  /* background-color: rgb(124, 178, 222); */
  border: #9d9d9d73 1px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
  /* width: 98%; */
}

.card-header {
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 600px;
}

.tag-container {
    display: block;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

/* .ml-2 {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
} */


</style>
  