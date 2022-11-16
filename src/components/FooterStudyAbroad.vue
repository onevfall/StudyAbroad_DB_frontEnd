<!--
footer
描述：本项目的footer栏目
作者：张子涵
-->
<template>
  <section class="footer">
    <div>候鸟留学</div>
    <a href="https://beian.miit.gov.cn/" class="beian">蜀ICP备2022018954号-1</a>
    <br>
    <a href="http://www.beian.gov.cn/portal/registerSystemInfo" class="beian">公安备案号：51162302000180</a>
    <br>
    <div></div>
  </section>
  
</template>

<script>
export default {
    name:"FooterStudyAbroad",
    components: {
      
    },
  methods: {
  }
}
</script>

<style scoped>

.footer{
    color: rgb(123, 123, 145);
    background-color: rgb(22, 22, 67);
    position:-webkit-sticky;
    bottom:0;
    width:100%;
    height:100px;
}

.beian{
    color: rgb(123, 123, 145);
    background-color: rgb(22, 22, 67);
}
.beian:hover{
  cursor:pointer
}
</style>
