<template>
<div class="input_field">
  <editor v-model="content" @editorSubmit="upLoad"/>
</div>
</template>

<script>
import Editor from "../components/Editor"
export default {
  components: {
    Editor,
  },
  data(){
    return{
      
    }
  },
  methods:{
    upLoad(args){
      console.log(args.text_content);
      console.log(args.text_content);
      this.axios.post('blog',{
        user_id:'5',
        summary:args.text_content,
        content:args.base64_content
      }).then(res=>{
        console.log(res);
      }).catch(errMsg=>{
        console.log(errMsg);
      })
    }
  }
};
</script>

<style scoped>
.input_field{
  width: 75%;
}
</style>
