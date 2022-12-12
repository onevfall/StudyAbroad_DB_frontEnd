<!--
描述：高校主页用于搜索时显示的学校卡片
作者：蔡明宏
-->
<template>
  <div class="school_card">
    <!-- 排名小卡片 -->
    <el-card class="rank_card">
      <div class="rank_text">
        <div>{{ school.universityQsRank }}</div>
        <div>{{ school.universityTheRank }}</div>
        <div>{{ school.universityUsnewsRank }}</div>
      </div>
    </el-card>

    <el-card class="two_block hover_card" >
      <div class="two_block_hori">
        <div>
          <div class="avatar_text">
            <el-avatar shape="square" :size="70" :src="school.universityBadge" />
            <div>
                <p class="enname">{{ school.universityEnName }}</p>
                <p class="chname">{{ school.universityChName }}</p>
              
            </div>
          </div>
          <!-- 下面主要介绍在校人数、位置、简介 -->
          <div>
              <div style="margin:10px;"> 
                <el-row :gutter="10" justify="space-around">
                  <el-col :span="8">
                    <div >
                      <span class="info_text">在校人数:</span>
                      <span style="color:gray;">{{school.universityStudentNum}}</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div>
                      <span class="info_text">位置：</span>
                      <span style="color:gray;">{{school.universityLocation}}</span>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div>
                      <span class="info_text">学费：</span>
                      <span style="color:gray;">{{school.universityTuition}}</span>
                    </div>
                  </el-col>
                </el-row>
                </div>

                <div>
                    <span class="info_text">简介：</span>
                    <span style="color:gray;">{{school.universityIntroduction.slice(0,150)}}</span>
                </div>
              
          </div>
        </div>

        <!-- 右侧点击去看看 -->
        <div>
          <el-button type="warning" size="large" color="#626aef" @click="seeSchool"
            >去看看</el-button
          >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: [
    'school',
  ],
  data() {
    return {};
  },
  methods: {
    seeSchool(){
      // <router-link target="_blank" :to="{path:'/home',query:{id:'1'}}">新页面打开home页</router-link>;
      this.$router.push({
        path:'/school_detail',
        query:{
          school_id:this.school.universityId
        }
      })
    }
  },
};
</script>

<style>
.hover_card:hover{
  border: #61acf6 0.2em solid;
}
.school_card {
  margin: 20px;
  width: 90%;
  height: 20%;
  display: flex;
  justify-content: center;
}
.rank_card {
  padding: 30px; /* 调整上下间距的 */
  margin: 30px;
  width: 20%;
  height: 30%;
  vertical-align: middle;
}
.rank_text {
  color: coral;
  font-size: 25px;
  vertical-align: middle;
  display: flex;
  justify-content: space-between;
}
.two_block {
  /* margin-left: 20px; */
  padding: 10px;
  height: 20%;
  width: 60%;
}
.two_block_hori {
  display: flex;
  justify-content: space-between;
}
.avatar_text {
  display: flex;
}
p.enname{
    color:rgb(57, 47, 65);
    font-family:"Lucida Console", "Courier New", monospace;
    font-size: 20px;
    margin-left:30px;
    margin-top:10px;
}
p.chname{
    color:dimgray;
    font-family:'Times New Roman', Times, serif;
    float:left;
    margin-top:-10px;
    margin-left:30px;
}
span.info_text{
    font-family: Arial, Helvetica, sans-serif;
    font-size:18px;
    color: rgb(121, 75, 75);
}

</style>
