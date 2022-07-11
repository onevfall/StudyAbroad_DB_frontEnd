<template>
  <div class="my_eboothHeader">
    <div class="info_table" style="height: 541px; width: 100%; position: absolute; background: rgb(26, 46, 80); opacity: 0.5; z-index: 1;">
    </div>  
    <input type="hidden" value="us00012021062410073553812821"> <input type="hidden" value="6"> <input type="hidden" value="1">
     <div class="main clearfix">
        <div class="left">
          <div class="con1" style="min-height: 100px;">
          <img src="https://filebrowse.edufair.com//2019/8/20190826/858999190826092417033.png" alt="" class="school">
           <div class="title">
            <p title="Harvard University" class="p1">
            Harvard University
            <!----></p> 
            <p title="哈佛大学" class="p2">哈佛大学</p>
             <p title="HarvardU">@HarvardU</p>
           </div>
          </div> 
          <div class="con2">
            <span class="con2_span">校训：“真理”（Veritas）
              知名院系：商学院、设计学院、法学院、医学院等
              所属联盟：常春藤联盟（Ivy League）
              学校排名：US News 全美综合排名前10，世界排名前5
              
              哈佛大学（Harvard University），位于Massachusetts（麻省）剑桥市，是美国本土历史最悠久的高等学府。1636年，由Massachusetts（麻省）殖民地立法机关创建，初名为New College或the college at New Towne，是全美第一所高等教育机构。</span> 
<span class="show"><span class="more">[更多]</span></span> <!----></div></div> 
<!----></div></div>
    </template>

<script>
//到时候传入一个
export default {
  props: ["new_info"],
  computed: {
    contentShow() {
      if (this.new_info.news_flash_content.length < 60) {
        return this.new_info.news_flash_content;
      } else {
        return this.new_info.news_flash_content.slice(0, 60) + "...";
      }
    },
  },
  methods:{
      goNewsDetail(){
          alert("跳转至id为"+ this.new_info.news_flash_id+"的快讯详情页面")
      }
  }
};
</script>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #299afb;
  font-weight: bolder;
  margin-bottom: 10px;
}
.news_card {
  width: 350px;
}
.content {
  font-size: small;
}
</style>


