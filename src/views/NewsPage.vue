<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="400px">
        <div class="logo_field">
          <div class="label">发布单位</div>
          <div class="logo">
            <img src="../assets/logo.png" style="height: 90px" />
          </div>
        </div>
        <div class="card_field">
          <div class="card" v-for="news in this.news_relevant" :key="news">
            <news-info-board :new_info="news"></news-info-board>
          </div>
        </div>
      </el-aside>
      <el-main>
        <div class="content_field">
          <div class="common-layout">
            <el-container>
              <el-aside width="75%">
                <div class="content_header">
                  <p class="title">
                    {{ this.news_info.news_flash_title }}
                  </p>
             
                  <el-row gutter="10" justify="center" style="width:100%">
                    <el-col span="1">
                      <el-tag class="ml-2" type="primary" size="large">{{
                        this.news_info.news_flash_date
                      }}</el-tag>
                    </el-col>
                    <el-col span="1">
                      <el-tag class="ml-2" type="success" size="large">{{
                        this.news_info.news_flash_region
                      }}</el-tag>
                    </el-col>
                    <el-col span="1">
                      <el-tag class="ml-2" type="warning" size="large">{{
                        this.news_info.news_flash_tag
                      }}</el-tag>
                    </el-col>
                  </el-row>
                </div>
              </el-aside>
              <el-main>
                <img src="../assets/drawing_news.png" style="height:80px">
              </el-main>
            </el-container>
          </div>
          <el-divider />
          <div class="content_main" >
            {{this.news_info.news_flash_content}}
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NewsInfoBoard from "../components/NewsInfoBoarder.vue";
import axios from "axios";
export default {
 components: {
    NewsInfoBoard,
  },
  data() {
    return {
      news_info: "",
      news_relevant: [], //存储相关快讯信息
      news_id:-1,
    };
  },
  created() {
    //在此处向服务器请求数据，初始化所需变量
    var tem_info = {
      news_flash_id: 1,
      news_flash_date: "2022-6-29",
      news_flash_title: "黄渡理工暑期不允许留校学生出校",
      news_flash_tag: "黄渡理工",
      news_flash_region: "江苏",
      news_flash_content:
        "近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，将于今年7月1日起生效。该条例对防疫安全等级管理、出入校申请条例、留校生生话管理规章制度、相应法律责任等作出了详尽规定。特别是对近日广大黄渡人民广泛关注的“关于暑期学生是否可以出校”这一问题，该条例明确“说不”。根据这一条例，未经允许，擅自离开校园，或私自与校外人员有物品传递解除等行为，对违反者、协助者等违法行为人，最多可予以留校察看、开除等处分。望广大黄渡子女引以为戒。近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，将于今年7月1日起生效。该条例对防疫安全等级管理、出入校申请条例、留校生生话管理规章制度、相应法律责任等作出了详尽规定。特别是对近日广大黄渡人民广泛关注的“关于暑期学生是否可以出校”这一问题，该条例明确“说不”。根据这一条例，未经允许，擅自离开校园，或私自与校外人员有物品传递解除等行为，对违反者、协助者等违法行为人，最多可予以留校察看、开除等处分,望广大黄渡学子引以为戒。\n \n黄渡新闻报道：4月27号晚，上海市某985高校志愿者李同学微信账号被盗，盗号者在年级大会上口出狂言：“别他骂了隔壁，念你那通稿，谁不会啊，能不能开个麦啊，赤佬”。事件引发了许多网友的关注，校方表示对这种行为保持强烈谴责，并保留追究到底的权力，呼吁同学们4月28日晚上7点务必在电脑前检测个人账号安全，不要离开电脑桌，更不要到阳台前，以免让不法分子有机可乘。当日，某乎网友开始了一项“‘65472’造句大赛”，表示对盗号分子虚伪假面的强烈遣责 。“大赛”开始于晚上23点左右，截至28日早上7点，已有700多网友通过电脑或手机参与。许多网友的词句也颇为用心。部分网友不了解事情始末，纷纷在网上留言询问：”到底发生啥了，一群谜语人，到处发病，谁来给我解释啊，无语“。随着事件“盗号者”身份的揭露，让网友惊讶的是这名事情的起因居然是盗号者不喜欢吃”猪肉刺身“。热心网友王老师说道：”刺身以漂亮的造型、新鲜的原料、柔嫩鲜美的口感以及带有刺激性的调味料，强烈地吸引着人们的胃口。当事人不喜欢吃刺身根本是无稽之谈，因此而发动盗号行为并发出不当言论更是超出常理，其背后可能有境外势力作祟“。黄渡新闻记者小焦现场报道\n\n近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，将于今年7月1日起生效。该条例对防疫安全等级管理、出入校申请条例、留校生生话管理规章制度、相应法律责任等作出了详尽规定。特别是对近日广大黄渡人民广泛关注的“关于暑期学生是否可以出校”这一问题，该条例明确“说不”。根据这一条例，未经允许，擅自离开校园，或私自与校外人员有物品传递解除等行为，对违反者、协助者等违法行为人，最多可予以留校察看、开除等处分。望广大黄渡子女引以为戒。近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，将于今年7月1日起生效。该条例对防疫安全等级管理、出入校申请条例、留校生生话管理规章制度、相应法律责任等作出了详尽规定。特别是对近日广大黄渡人民广泛关注的“关于暑期学生是否可以出校”这一问题，该条例明确“说不”。根据这一条例，未经允许，擅自离开校园，或私自与校外人员有物品传递解除等行为，对违反者、协助者等违法行为人，最多可予以留校察看、开除等处分,望广大黄渡学子引以为戒。\n \n黄渡新闻报道：4月27号晚，上海市某985高校志愿者李同学微信账号被盗，盗号者在年级大会上口出狂言：“别他骂了隔壁，念你那通稿，谁不会啊，能不能开个麦啊，赤佬”。事件引发了许多网友的关注，校方表示对这种行为保持强烈谴责，并保留追究到底的权力，呼吁同学们4月28日晚上7点务必在电脑前检测个人账号安全，不要离开电脑桌，更不要到阳台前，以免让不法分子有机可乘。当日，某乎网友开始了一项“‘65472’造句大赛”，表示对盗号分子虚伪假面的强烈遣责 。“大赛”开始于晚上23点左右，截至28日早上7点，已有700多网友通过电脑或手机参与。许多网友的词句也颇为用心。部分网友不了解事情始末，纷纷在网上留言询问：”到底发生啥了，一群谜语人，到处发病，谁来给我解释啊，无语“。随着事件“盗号者”身份的揭露，让网友惊讶的是这名事情的起因居然是盗号者不喜欢吃”猪肉刺身“。热心网友王老师说道：”刺身以漂亮的造型、新鲜的原料、柔嫩鲜美的口感以及带有刺激性的调味料，强烈地吸引着人们的胃口。当事人不喜欢吃刺身根本是无稽之谈，因此而发动盗号行为并发出不当言论更是超出常理，其背后可能有境外势力作祟“。黄渡新闻记者小焦现场报道",
    }
    
    
    // for (let i = 0; i < 3; ++i) {
    //   this.news_relevant.push(tem_info);
    // }
    this.news_info = tem_info;
  axios({
      url:"newsflash",
     
      method:"get"
    }).then((res)=>{
      console.log(res);
      console.log(res.data);
      console.log(res.data.data);
      console.log(res.data.data.newsflashs);
      this.news_relevant=res.data.data.newsflashs;
      console.log(this.news_relevant);
    }).catch(errMsg=>{
      console.log(errMsg);
    })
  },
  
};
</script>

<style scoped>
.logo_field .label {
  font-size: x-large;
  color: #409eff;
  font-family: SimSun;
  font-weight: bolder;
  margin-top: 20px;
  padding-bottom: 5px;
  border-bottom: #5c2705 solid;
  width: 250px;
  margin-left: 75px;
}
.logo_field .logo {
  margin-top: 15px;
}
.card_field {
  margin-top: 20px;
}
.card {
  margin-bottom: 10px;
  margin-left: 25px;
}
.content_field {
  background-color: white;
  min-height:720px;
  border-radius: 10px;
}
.title {
  font-size: xx-large;
  color: #409eff;
  font-family: SimSun;
  font-weight: bolder;
  margin-bottom: 15px;
}
.content_main{
  width: 80%;
  margin-left: 10%;
  text-align: left;
  margin-bottom: 10px;
  white-space: pre-line
}
</style>
