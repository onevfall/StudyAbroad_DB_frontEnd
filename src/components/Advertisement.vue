<!--
高校详情
描述：展示详细高校信息
作者：张子涵
-->
<template>
<el-containor  style="overflow:visible">
        <el-card  :body-style="{ background: 'white' }"
            shadow="always"
            position:sticky
            top=0px
        >
        <template #header>
            <div class="card-header">广告栏</div>
        </template>
        <img src="../assets/drawing_qacenter1.png" style="width:200px">
        <div style="font-size:15px">
            <div>我们正在招贤纳士！</div>
            <div>有什么问题就联系我们吧！</div>
            <div>邮箱：2480518677@qq.com</div>
            <div>电话：18001960761</div>
        </div>
        </el-card>
 </el-containor>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      links: [
        { text: "首页", website:"#/home" },
        { text: "找对学校", website:"#/school_center"  },
        { text: "看看机构" , website:"#/institution_center" },
        { text: "留学快讯" , website:"#/newsHome" },
        { text: "留学问答", website:"#/qa_center"  },
        { text: "动态分享", website:"#/blog"  },
        { text: "个人空间", website:"#/person_space"  },
      ],
    };
  },
};
</script>

<style scoped>


.text {
  font-size: 14px;
  text-align: left;
  text-decoration: none;
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
