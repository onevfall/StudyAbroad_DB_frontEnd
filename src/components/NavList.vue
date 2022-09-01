<!--
快捷导航
描述：快捷导航
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
                <div class="card-header">快捷导航栏</div>
                </template>
                <div v-for="link in links" :key="link.text" class="list">
                <el-link :href=link.website class="text">
                    {{ link.text }}
                </el-link>
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
    
    .list {
      text-align: left;
      text-decoration: none;
      margin-bottom: 18px;
      margin-left: 10%;
    } 
    .text {
      font-size: 20px;
      font-weight: 500;
      margin-bottom: 10px;
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
    