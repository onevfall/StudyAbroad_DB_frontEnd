<!--
描述：封装富文本编辑器
作者：焦佳宇
-->
<template>
  <editor :init="this.init" :api-key="this.api_key" v-model="content"></editor>
</template>

<script>
import { encode, decode } from "../utils/base64";
import Editor from "@tinymce/tinymce-vue";
export default {
  components: {
    Editor,
  },
  data() {
    return {
      content: "",
      api_key: "mr0kk8fqz3vlsnczol9q2qxu5dj89xoay1svicqzybn0ve93",
      init: {
        language: "zh_CN", //语言类型
        placeholder: "在这里输入...",
        branding: false, //tiny技术支持信息是否显示
        width: "100%",
        height: 600,
        min_height: 600,

        statusbar: true, //最下方的元素路径和字数统计那一栏是否显示
        elementpath: false, //元素路径是否显示
        font_formats:
          "微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;", //字体样式
        plugins:
          "autoresize preview searchreplace autolink directionality visualblocks visualchars fullscreen image link template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave emoticons", //插件配置
        toolbar: [
          "fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat ",
          "styleselect formatselect fontselect fontsizeselect |  table image axupimgs emoticons charmap hr pagebreak insertdatetime  selectall visualblocks searchreplace | code print preview | indent2em lineheight formatpainter",
        ],
        menubar: false, //加了工具栏选项，为了避免界面臃肿，隐藏menubar
        paste_data_images: true, //图片是否可粘贴
        //此处为图片上传处理函数
        images_upload_handler: (blobInfo, success, failure) => {
          // 这里用base64的图片形式上传图片,
          let reader = new FileReader(); //本地预览
          reader.readAsDataURL(blobInfo.blob());
          reader.onloadend = function () {
            const imgbase64 = reader.result;
            success(imgbase64);
          };
        },
        //媒体上传处理函数待定
      },
    };
  },
  methods: {
    getContent() {
      //获取纯文本
      var activeEditor = tinymce.activeEditor;
      var editBody = activeEditor.getBody();
      activeEditor.selection.select(editBody);
      var text = activeEditor.selection.getContent({ format: "text" });
      return text.trim();
    },
    getImage() {
      //获取图片
      var reg = /<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim;
      var arr = [];
      let tem;
      while ((tem = reg.exec(this.content))) {
        arr.push(tem[2]);
      }
      return arr;
    },
    submit() {
      var image_array=this.getImage()
      var args = {
        base64_content:this.content, //富文本内容
        text_content: this.getContent(), //纯文本
        image_array: image_array, //包含图片url数组
      };
      this.$emit("editorSubmit", args);
    },
  },
};
</script>

<style></style>
