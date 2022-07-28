<template>
  <navbar style="flex:1"></navbar>
  <div class="content">
  <router-view ></router-view>
  </div>
  <footer-study-abroad></footer-study-abroad>
</template>
<script>
import Navbar from "../src/components/Navbar.vue";
import FooterStudyAbroad from "../src/components/FooterStudyAbroad.vue"
export default {
  components: {
    Navbar,
    FooterStudyAbroad
  },
  created(){
    if(sessionStorage.getItem("store")){
      this.$store.replaceState(
        Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store")))
      )
      sessionStorage.removeItem("store");
    }
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state))
    })
  },
  mounted(){
    this.$router.replace('/home')
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.content{
  min-height: calc(100vh - 200px);
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
