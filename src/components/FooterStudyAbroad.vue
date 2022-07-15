<template>
  <section class="footer">
    <div>这是footer，这里可以存放我们网站的基础注册信息</div>
    <div>这一行应该存放一个横向列表</div>
    <div>这一行可以放几个图标</div>
    <div>这里一行再放我们的备案号</div>
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
</style>
