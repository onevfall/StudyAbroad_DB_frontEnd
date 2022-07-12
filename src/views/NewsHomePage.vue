<template>
  <div class="total-layout">
    <el-container>
      <el-header>Header</el-header>
      <el-main
        ><div class="partial-layout">
          <el-container>
            <el-header>
              <div class="news">留学快讯</div>

              <div class="heatOrLatest">
                <el-button text size="large"
                  ><img src="../assets/sort_desc.png" />按最新话题</el-button
                >

                <el-button text size="large"
                  ><img src="../assets/sort_asc.png" />按最热话题
                </el-button>
              </div>
            </el-header>
            <el-container>
              <el-aside width="300px">
                <el-card
                  :body-style="{ background: 'aliceblue' }"
                  shadow="always"
                >
                  <template #header>
                    <div class="card-header">广告栏</div>
                  </template>
                  <div v-for="i in 10" :key="i" class="text">
                    {{ "广告位招租" + i }}
                  </div>
                </el-card>
              </el-aside>
              <el-main>
                <div class="abstract">
                  <div class="latestNews">快讯摘要</div>
                  <div>
                    
                    <div class="infinite-list-wrapper" style="overflow: auto">
                      <ul
                        v-infinite-scroll="load"
                        class="list"
                        :infinite-scroll-disabled="disabled"
                      >
                        <li v-for="i in count" :key="i" class="list-item">
                          <div class="common-layout2">
                            <el-container>
                              <el-aside width="200px">
                                <img
                                  src="../assets/logo.png"
                                  style="width: 200px"
                                />
                              </el-aside>
                              <el-main class="mainColor">
                                <el-card>
                                  <template #header>
                                    <div class="card-header2">
                                      <span
                                        >{{this.news_info.news_flash_title}} <br /><br />
                                        <div class="dateAuthor">
                                          {{this.news_info.news_flash_date}}  the author
                                        </div></span
                                      >
                                      <el-button class="button2"
                                        >{{this.news_info.news_flash_region}} </el-button
                                      >
                                      <el-button class="button2"
                                        >{{this.news_info.news_flash_tag}} </el-button
                                      >
                                    </div>
                                  </template>
                                  近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，将于今年7月1日起生效。

                                  <div class="moreInfo">
                                    <el-button type="primary" class="button3" @click="jumpToNewsPage"
                                      >查看详情</el-button
                                    >
                                  </div>
                                </el-card>
                              </el-main>
                            </el-container>
                          </div>
                        </li>
                      </ul>
                      <p v-if="loading">Loading...</p>
                      <p v-if="noMore">No more</p>
                    </div>
                  </div>
                </div>
              </el-main>
            </el-container>
          </el-container>
        </div></el-main
      >

      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>


import { computed, ref } from "vue";
export default {
  data() {
    return {
      count: ref(10),
      loading: ref(false),
      noMore: computed(() => this.count >= 20),
      disabled: computed(() => this.loading || this.noMore),
      news_info: "",
      news_relevant: [], //存储相关快讯信息
    };
  },
    
  created() {
    //在此处向服务器请求数据，初始化所需变量
    var tem_info = {
      news_flash_id: 1,
      news_flash_pic: "",
      news_flash_date: "2022-6-29",
      news_flash_title: "黄渡理工暑期不允许留校学生出校",
      news_flash_tag: "黄渡理工",
      news_flash_region: "江苏",
      news_flash_content:
        "近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，将于今年7月1日起生效。该条例对防疫安全等级管理、出入校申请条例、留校生生话管理规章制度、相应法律责任等作出了详尽规定。特别是对近日广大黄渡人民广泛关注的“关于暑期学生是否可以出校”这一问题，该条例明确“说不”。根据这一条例，未经允许，擅自离开校园，或私自与校外人员有物品传递解除等行为，对违反者、协助者等违法行为人，最多可予以留校察看、开除等处分。望广大黄渡子女引以为戒。近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，将于今年7月1日起生效。该条例对防疫安全等级管理、出入校申请条例、留校生生话管理规章制度、相应法律责任等作出了详尽规定。特别是对近日广大黄渡人民广泛关注的“关于暑期学生是否可以出校”这一问题，该条例明确“说不”。根据这一条例，未经允许，擅自离开校园，或私自与校外人员有物品传递解除等行为，对违反者、协助者等违法行为人，最多可予以留校察看、开除等处分,望广大黄渡学子引以为戒。\n \n黄渡新闻报道：4月27号晚，上海市某985高校志愿者李同学微信账号被盗，盗号者在年级大会上口出狂言：“别他骂了隔壁，念你那通稿，谁不会啊，能不能开个麦啊，赤佬”。事件引发了许多网友的关注，校方表示对这种行为保持强烈谴责，并保留追究到底的权力，呼吁同学们4月28日晚上7点务必在电脑前检测个人账号安全，不要离开电脑桌，更不要到阳台前，以免让不法分子有机可乘。当日，某乎网友开始了一项“‘65472’造句大赛”，表示对盗号分子虚伪假面的强烈遣责 。“大赛”开始于晚上23点左右，截至28日早上7点，已有700多网友通过电脑或手机参与。许多网友的词句也颇为用心。部分网友不了解事情始末，纷纷在网上留言询问：”到底发生啥了，一群谜语人，到处发病，谁来给我解释啊，无语“。随着事件“盗号者”身份的揭露，让网友惊讶的是这名事情的起因居然是盗号者不喜欢吃”猪肉刺身“。热心网友王老师说道：”刺身以漂亮的造型、新鲜的原料、柔嫩鲜美的口感以及带有刺激性的调味料，强烈地吸引着人们的胃口。当事人不喜欢吃刺身根本是无稽之谈，因此而发动盗号行为并发出不当言论更是超出常理，其背后可能有境外势力作祟“。黄渡新闻记者小焦现场报道\n\n近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，将于今年7月1日起生效。该条例对防疫安全等级管理、出入校申请条例、留校生生话管理规章制度、相应法律责任等作出了详尽规定。特别是对近日广大黄渡人民广泛关注的“关于暑期学生是否可以出校”这一问题，该条例明确“说不”。根据这一条例，未经允许，擅自离开校园，或私自与校外人员有物品传递解除等行为，对违反者、协助者等违法行为人，最多可予以留校察看、开除等处分。望广大黄渡子女引以为戒。近日，《关于疫情期间黄渡理工留校管理条例》经黄渡理工十一届人大常委会第七次会议通过，将于今年7月1日起生效。该条例对防疫安全等级管理、出入校申请条例、留校生生话管理规章制度、相应法律责任等作出了详尽规定。特别是对近日广大黄渡人民广泛关注的“关于暑期学生是否可以出校”这一问题，该条例明确“说不”。根据这一条例，未经允许，擅自离开校园，或私自与校外人员有物品传递解除等行为，对违反者、协助者等违法行为人，最多可予以留校察看、开除等处分,望广大黄渡学子引以为戒。\n \n黄渡新闻报道：4月27号晚，上海市某985高校志愿者李同学微信账号被盗，盗号者在年级大会上口出狂言：“别他骂了隔壁，念你那通稿，谁不会啊，能不能开个麦啊，赤佬”。事件引发了许多网友的关注，校方表示对这种行为保持强烈谴责，并保留追究到底的权力，呼吁同学们4月28日晚上7点务必在电脑前检测个人账号安全，不要离开电脑桌，更不要到阳台前，以免让不法分子有机可乘。当日，某乎网友开始了一项“‘65472’造句大赛”，表示对盗号分子虚伪假面的强烈遣责 。“大赛”开始于晚上23点左右，截至28日早上7点，已有700多网友通过电脑或手机参与。许多网友的词句也颇为用心。部分网友不了解事情始末，纷纷在网上留言询问：”到底发生啥了，一群谜语人，到处发病，谁来给我解释啊，无语“。随着事件“盗号者”身份的揭露，让网友惊讶的是这名事情的起因居然是盗号者不喜欢吃”猪肉刺身“。热心网友王老师说道：”刺身以漂亮的造型、新鲜的原料、柔嫩鲜美的口感以及带有刺激性的调味料，强烈地吸引着人们的胃口。当事人不喜欢吃刺身根本是无稽之谈，因此而发动盗号行为并发出不当言论更是超出常理，其背后可能有境外势力作祟“。黄渡新闻记者小焦现场报道",
    };
    
    this.news_info = tem_info;
  },
  methods: {
    load() {
      this.loading = true;
      setTimeout(() => {
        this.count += 2;
        this.loading = false;
      }, 2000);
    },
    jumpToNewsPage(){
      this.$router.replace("/news");
    }
  },
};
</script>

<style scoped>
.heatOrLatest {
  margin-left: -5%;
  margin-top: -3%;
  width: 400px;
}
.news {
  font-weight: bolder;
  font-family: SimSun;
  font-size: 40px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  text-align: left;
  font-size: 28px;
  padding-left: 5px;
  border-left: 10px rgb(33, 33, 126) solid;
}

.text {
  font-size: 14px;
  text-align: left;

  margin-bottom: 18px;
}

.abstract {
  text-align: left;
  font-size: 10px;
  background-color: white;
  padding-top: 3%;
  margin-top: -3%;
}
.latestNews {
  margin-left: 3%;
  text-align: left;
  font-size: 28px;
  padding-left: 5px;
  border-left: 10px rgb(172, 210, 34) solid;
  margin-bottom: 3%;
}
.card_field {
  margin-top: 20px;
  margin-left: 15%;
  width: 500px;
}
.card {
  margin-bottom: 10px;
  margin-left: 0px;
  width: 40px;
}
.el-button {
  color: #2277aa;

  font-weight: 500;
  font-size: 20px;
  border-radius: 4px;
}
.card-header2 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  color: rgb(30, 23, 118);
}
.button2 {
  font-size: 10px;
  margin: 3%;
  padding: 0%;
  border: 0%;
}
.button3 {
  font-size: 10px;
  color: white;
}
.moreInfo {
  margin-left: 80%;
}

.common-layout2 {
  margin-bottom: 5%;
}

.mainColor {
  background-color: aliceblue;
  color: aliceblue;
}

.dateAuthor {
  font-size: 10px;
  margin-left: -10%;
}

.infinite-list-wrapper {
  height: 400px;
  text-align: center;
}

.infinite-list-wrapper .list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 250px;
  background: white;
}
</style>