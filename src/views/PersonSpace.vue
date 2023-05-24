<template>
  <div
    class="user_profile"
    v-loading.fullscreen.lock="blog_count == -1"
  >
    <div class="user_profile_head">
      <div class="user_profile_banner"></div>
      <el-card class="user_profile_info_box">
        <div class="user_profile_info">
          <div class="head_img_border">
            <el-avatar
              :src="person_info.user_profile + '?t=' + Math.random()"
              :size="100"
            />
          </div>

          <div class="user_profile_info_right">
            <div class="user_profile_title">
              <span style="
                  font-size: 20px;
                  font-weight: bold;
                  text-align: left;
                  margin-right: 1%;
                ">{{ person_info.user_name }}
              </span>
              <span style="font-size: 15px; color: gray; text-align: left">
                等级：{{ person_info.user_level }}</span>
            </div>
            <div class="user_profile_content">
              <span
                style="font-size: 20px; font-weight: bolder; margin-right: 0.5%"
              >{{ this.user_follower_count }}</span>
              <span>粉丝</span>
              <el-divider
                direction="vertical"
                style="margin-left: 2%; margin-right: 2%"
              />
              <span
                style="font-size: 20px; font-weight: bolder; margin-right: 0.5%"
              >{{
                  this.user_follow_count +
                  this.follow_university_count +
                  this.follow_institution_count
                }}</span>
              <span>关注</span>
              <span
                v-for="identity_info in identity_info_list"
                :key="identity_info"
              >
                <el-divider
                  direction="vertical"
                  style="margin-left: 2%; margin-right: 2%"
                />
                <span>{{ identity_info.identity }}：{{
                    identity_info.university_name
                  }}</span>
              </span>

              <div>个性签名：{{ person_info.user_signature }}</div>
            </div>
            <div class="user_profile_head_control">
              <follow-button
                class="follow_button"
                v-if="person_info.user_id != this.visit_id"
                object_type="0"
                :object_id="this.host_id"
                :button_fontsize="14"
                :button_height="31"
                :button_width="80"
                :show_num="true"
                @giveFollow="follow"
                @cancelFollow="unFollow"
              ></follow-button>
              <el-button
                v-if="person_info.user_id == this.visit_id"
                type="primary"
                plain
                @click="goRecharge"
              >鸟币充值</el-button>
              <el-button
                v-if="person_info.user_id == this.visit_id"
                type="primary"
                plain
                @click="goPersonInfo"
              >个人信息</el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <div class="user_profile_body">
      <div class="user_profile_aside">
        <el-card
          class="user_profile_aside_card"
          v-if="person_info.user_id == this.visit_id"
        >
          <template #header>
            <div class="publish_center_head">
              <span>发布中心</span>
            </div>
          </template>
          <div>一起来让候鸟留学变得更热闹吧！</div>
          <div class="publish_center_button">
            <el-button
              type="primary"
              icon="Edit"
              style="width: 50%; height: 40px; font-size: 16px"
              @click="goAskPage"
            >提问</el-button>
          </div>
          <div class="publish_center_button">
            <el-button
              type="primary"
              icon="Share"
              style="width: 50%; height: 40px; font-size: 16px"
              @click="goBlogEdit"
            >发动态</el-button>
          </div>
        </el-card>
        <el-card class="user_profile_aside_card">
          <template #header>
            <div class="publish_center_head">
              <span>成就中心</span>
            </div>
          </template>
          <div class="achievement_content">
            <img
              src="../assets/like_ex.png"
              style="height: 30px"
            />
            <span
              style="margin-left: 5%">获得{{ achieve_info.like_times }}次点赞</span>
          </div>
          <div class="achievement_content">
            <img
              src="../assets/comment_ex.png"
              style="height: 30px"
            />
            <span
              style="margin-left: 5%">内容获得{{ achieve_info.comment_times }}次评论</span>
          </div>
          <div class="achievement_content">
            <img
              src="../assets/star_ex.png"
              style="height: 30px"
            />
            <span
              style="margin-left: 5%">获得{{ achieve_info.star_times }}次收藏</span>
          </div>
        </el-card>
        <el-card
          class="user_profile_aside_card"
          v-if="person_info.user_id == this.visit_id"
        >
          <template #header>
            <div class="grow_center_head">
              <span>成长中心</span>
              <el-button
                text="primary"
                type="primary"
                style="margin-left: 45%"
                @click="grow_detail = true"
              >查看详情</el-button>
            </div>
          </template>
          <div style="display: flex; margin: 5% 0 7% 5%">
            <img
              src="../assets/level.png"
              style="height: 30px; margin-right: 6%"
            />
            <div style="margin-top: 1%">
              <span>您的等级为 </span>
              <span style="font-weight: bold">{{ this.grow_info.level }}</span>
              <span>，当前经验值为 </span>
              <span style="font-weight: bold">{{ this.grow_info.exp }}</span>
            </div>
          </div>
          <div style="display: flex; margin: 3%">
            <img
              src="../assets/sign_in.png"
              style="height: 40px; margin-right: 3%"
            />
            <div style="margin-top: 3%">
              <span>您已连续登录 </span>
              <span style="font-weight: bold">{{
                this.grow_info.continus
              }}</span>
              <span>天，明日登录即可获得 </span>
              <span style="font-weight: bold">{{ this.gain_exp }}</span>
              <span>点经验值</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="user_profile_body_right">
        <el-card>
          <el-tabs class="user_profile_tabs">
            <el-tab-pane label="关注">
              <el-tabs class="user_profile_follow_tabs">
                <el-tab-pane>
                  <template #label>
                    <span class="second-tabs-label">
                      <span>用户 </span>
                      <span style="color: gray">{{ user_follow_count }}</span>
                    </span>
                  </template>
                  <el-scrollbar height="643px">
                    <div v-if="user_follow_count == 0">
                      <img
                        src="../assets/question-empty.png"
                        style="width: 40%; margin-top: 5%; margin-bottom: 1%"
                      />
                      <div style="font-size: 30px; color: #c6c6c9">
                        还没有关注的人哦~
                      </div>
                    </div>
                    <div
                      class="user_follow_list"
                      v-for="follow_person in user_follow_list"
                      :key="follow_person.user_id"
                    >
                      <el-avatar
                        :size="70"
                        :src="follow_person.user_profile"
                      />
                      <div
                        style="display: block; width: 85%"
                        @click="goPersonSpace(follow_person.user_id, $event)"
                      >
                        <div style="
                            font-size: 20px;
                            font-weight: bold;
                            margin-left: 2%;
                            margin-bottom: 2%;
                            text-align: left;
                          ">
                          {{ follow_person.user_name }}
                        </div>
                        <div style="
                            font-size: 15px;
                            font-weight: normal;
                            margin-left: 2%;
                            text-align: left;
                          ">
                          个性签名：{{ follow_person.user_signature }}
                        </div>
                      </div>
                      <div style="padding-top: 3%; padding-right: 2%">
                        <follow-button
                          object_type="0"
                          :object_id="follow_person.user_id"
                          :key="fresh_userlist_button"
                          @giveFollow="follow"
                          @cancelFollow="unFollow"
                          @click="freshButton($event, 0)"
                        ></follow-button>
                      </div>
                    </div>
                  </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane>
                  <template #label>
                    <span class="second-tabs-label">
                      <span>高校 </span>
                      <span style="color: gray">{{
                        follow_university_count
                      }}</span>
                    </span>
                  </template>
                  <el-scrollbar height="643px">
                    <div v-if="follow_university_count == 0">
                      <img
                        src="../assets/school_empty.png"
                        style="width: 30%; margin-top: 10%; margin-bottom: 5%"
                      />
                      <div style="font-size: 30px; color: #c6c6c9">
                        还没有关注高校哦~
                      </div>
                      <el-link
                        type="primary"
                        :underline="false"
                        @click="goSchoolCenter"
                        style="
                          font-size: 20px;
                          font-weight: 500;
                          margin-top: 3%;
                        "
                      >
                        去看看
                      </el-link>
                    </div>
                    <div
                      class="follow_university_list"
                      v-for="follow_university in follow_university_list"
                      :key="follow_university.university_id"
                    >
                      <el-avatar
                        :size="70"
                        :src="follow_university.university_badge"
                      />
                      <div
                        style="display: block; width: 85%"
                        @click="
                          goSchoolDetail(
                            follow_university.university_id,
                            $event
                          )
                        "
                      >
                        <div style="
                            font-size: 20px;
                            font-weight: bold;
                            margin-left: 2%;
                            margin-bottom: 2%;
                            text-align: left;
                          ">
                          {{ follow_university.university_chname }}
                        </div>
                        <div style="
                            font-size: 15px;
                            font-weight: normal;
                            margin-left: 2%;
                            text-align: left;
                          ">
                          国家：{{ follow_university.university_country }}
                        </div>
                      </div>
                      <div style="padding-top: 3%; padding-right: 2%">
                        <follow-button
                          object_type="1"
                          :object_id="follow_university.university_id"
                          @giveFollow="follow"
                          @cancelFollow="unFollow"
                        ></follow-button>
                      </div>
                    </div>
                  </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane>
                  <template #label>
                    <span class="second-tabs-label">
                      <span>机构 </span>
                      <span style="color: gray">{{
                        follow_institution_count
                      }}</span>
                    </span>
                  </template>
                  <el-scrollbar height="643px">
                    <div v-if="follow_institution_count == 0">
                      <img
                        src="../assets/institution_empty.png"
                        style="width: 25%; margin-top: 10%; margin-bottom: 5%"
                      />
                      <div style="font-size: 30px; color: #c6c6c9">
                        还没有关注机构哦~
                      </div>
                      <el-link
                        type="primary"
                        :underline="false"
                        @click="goInstitutionCenter"
                        style="
                          font-size: 20px;
                          font-weight: 500;
                          margin-top: 3%;
                        "
                      >
                        去看看
                      </el-link>
                    </div>
                    <div
                      class="follow_institution_list"
                      v-for="follow_institution in follow_institution_list"
                      :key="follow_institution.institution_id"
                    >
                      <el-avatar
                        :size="70"
                        :src="follow_institution.institution_profile"
                      />
                      <div
                        style="display: block; width: 85%"
                        @click="
                          goInstitutionDetail(
                            follow_institution.institution_id,
                            $event
                          )
                        "
                      >
                        <div style="
                            font-size: 20px;
                            font-weight: bold;
                            margin-left: 2%;
                            margin-bottom: 2%;
                            text-align: left;
                          ">
                          {{ follow_institution.institution_name }}
                        </div>
                        <div style="
                            font-size: 15px;
                            font-weight: normal;
                            margin-left: 2%;
                            text-align: left;
                          ">
                          服务范围：{{ follow_institution.institution_target }}
                        </div>
                      </div>
                      <div style="padding-top: 3%; padding-right: 2%">
                        <follow-button
                          object_type="2"
                          :object_id="follow_institution.institution_id"
                          @giveFollow="follow"
                          @cancelFollow="unFollow"
                        ></follow-button>
                      </div>
                    </div>
                  </el-scrollbar>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane>
              <template #label>
                <span class="first-tabs-label">
                  <span>粉丝 </span>
                  <span style="color: gray">{{ user_follower_count }}</span>
                </span>
              </template>
              <el-scrollbar height="686px">
                <div v-if="user_follower_count == 0">
                  <img
                    src="../assets/question-empty.png"
                    style="width: 40%; margin-top: 5%; margin-bottom: 5%"
                  />
                  <div style="font-size: 30px; color: #c6c6c9">
                    还没有粉丝哦~
                  </div>
                </div>
                <div
                  class="user_follower_list"
                  v-for="follower_person in user_follower_list"
                  :key="follower_person.user_id"
                >
                  <el-avatar
                    :size="70"
                    :src="follower_person.user_profile"
                  />
                  <div
                    style="display: block; width: 85%"
                    @click="goPersonSpace(follower_person.user_id, $event)"
                  >
                    <div style="
                        font-size: 20px;
                        font-weight: bold;
                        margin-left: 2%;
                        margin-bottom: 2%;
                        text-align: left;
                      ">
                      {{ follower_person.user_name }}
                    </div>
                    <div style="
                        font-size: 15px;
                        font-weight: normal;
                        margin-left: 2%;
                        text-align: left;
                      ">
                      个性签名：{{ follower_person.user_signature }}
                    </div>
                  </div>
                  <div style="padding-top: 3%; padding-right: 2%">
                    <follow-button
                      object_type="0"
                      :object_id="follower_person.user_id"
                      :key="fresh_followerlist_button"
                      @giveFollow="follow"
                      @cancelFollow="unFollow"
                      @click="freshButton($event, 1)"
                    ></follow-button>
                  </div>
                </div>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane
              label="收藏"
              class="user_profile_follow_tabs"
            >
              <el-tabs class="user_profile_star_tabs">
                <el-tab-pane>
                  <template #label>
                    <span class="second-tabs-label">
                      <span>问题 </span>
                      <span style="color: gray">{{ star_question_count }}</span>
                    </span>
                  </template>
                  <el-scrollbar height="643px">
                    <div v-if="star_question_count == 0">
                      <img
                        src="../assets/QA_empty.png"
                        style="width: 30%; margin-top: 5%; margin-bottom: 5%"
                      />
                      <div style="font-size: 30px; color: #c6c6c9">
                        还没有收藏问题哦~
                      </div>
                      <el-link
                        type="primary"
                        :underline="false"
                        @click="goQACenter"
                        style="
                          font-size: 20px;
                          font-weight: 500;
                          margin-top: 3%;
                        "
                      >
                        去看看
                      </el-link>
                    </div>
                    <div
                      class="star_question_list"
                      v-for="star_question in star_question_list"
                      :key="star_question.question_id"
                      @click="
                        goQuestionPage(
                          star_question.question_id,
                          '收藏',
                          $event
                        )
                      "
                    >
                      <div style="display: block; width: 100%">
                        <div style="
                            font-size: 20px;
                            font-weight: bold;
                            margin-left: 2%;
                            margin-bottom: 2%;
                            text-align: left;
                          ">
                          {{ star_question.question_title }}
                        </div>
                        <div style="
                            font-size: 15px;
                            font-weight: normal;
                            margin-left: 2%;
                            text-align: left;
                          ">
                          {{ star_question.user_name }}：{{
                            star_question.question_summary
                          }}
                        </div>
                      </div>
                      <div class="star_date">
                        <div>
                          发布于{{
                            star_question.question_date
                          }}
                        </div>
                        <div>
                          收藏于{{ star_question.star_time}}
                        </div>
                        <div
                          style="margin-top: 5%; margin-right: 10%"
                          @click.stop=""
                          :key="fresh_star"
                        >
                          <star-button
                            :content_id="star_question.question_id"
                            content_type="2"
                            :show_num="true"
                            size="large"
                            @click="freshStarOwn($event, 0, 1)"
                            @giveStar="star"
                          />
                        </div>
                      </div>
                    </div>
                  </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane>
                  <template #label>
                    <span class="second-tabs-label">
                      <span>回答 </span>
                      <span style="color: gray">{{ star_answer_count }}</span>
                    </span>
                  </template>
                  <el-scrollbar height="643px">
                    <div v-if="star_answer_count == 0">
                      <img
                        src="../assets/QA_empty.png"
                        style="width: 30%; margin-top: 5%; margin-bottom: 5%"
                      />
                      <div style="font-size: 30px; color: #c6c6c9">
                        还没有收藏回答哦~
                      </div>
                      <el-link
                        type="primary"
                        :underline="false"
                        @click="goQACenter"
                        style="
                          font-size: 20px;
                          font-weight: 500;
                          margin-top: 3%;
                        "
                      >
                        去看看
                      </el-link>
                    </div>
                    <div
                      class="star_answer_list"
                      v-for="(star_answer, index) in star_answer_list"
                      :key="star_answer"
                      @click="
                        goAnswerDetail1(star_answer.question_id, index, $event)
                      "
                    >
                      <div style="display: block; width: 100%">
                        <div style="
                            font-size: 20px;
                            font-weight: bold;
                            margin-left: 2%;
                            margin-bottom: 2%;
                            text-align: left;
                          ">
                          {{ star_answer.question_title }}
                        </div>
                        <div style="
                            font-size: 15px;
                            font-weight: normal;
                            margin-left: 2%;
                            text-align: left;
                          ">
                          {{ star_answer.answer_user_name }}：{{
                            star_answer.answer_summary
                          }}
                        </div>
                      </div>
                      <div class="star_date">
                        <div>
                          发布于{{ star_answer.answer_date }}
                        </div>
                        <div>
                          收藏于{{ star_answer.star_time }}
                        </div>
                        <div style="margin-top: 20%">
                          <el-row>
                            <el-col
                              :span="5"
                              @click.stop=""
                            >
                              <like-button
                                :content_id="star_answer.answer_id"
                                content_type="2"
                                :show_num="true"
                                size="large"
                              />
                            </el-col>
                            <el-col
                              :span="5"
                              @click.stop=""
                            >
                              <coin-button
                                :content_id="star_answer.answer_id"
                                content_type="1"
                                :show_num="true"
                                size="large"
                              />
                            </el-col>
                            <el-col
                              :span="5"
                              @click.stop=""
                            >
                              <star-button
                                :content_id="star_answer.answer_id"
                                content_type="1"
                                :show_num="true"
                                size="large"
                              />
                            </el-col>
                            <el-col :span="2"></el-col>
                            <el-col
                              :span="3"
                              @click.stop=""
                            >
                              <report-button
                                :content_id="star_answer.answer_id"
                                content_type="1"
                                size="large"
                                @reportResponse="reportResponse"
                              />
                            </el-col>
                            <el-col
                              :span="4"
                              style="text-align: left"
                              @click.stop=""
                            >
                              <span>举报</span>
                            </el-col>
                          </el-row>
                        </div>
                      </div>
                    </div>
                  </el-scrollbar>
                </el-tab-pane>
                <el-tab-pane>
                  <template #label>
                    <span class="second-tabs-label">
                      <span>动态 </span>
                      <span style="color: gray">{{ star_blog_count }}</span>
                    </span>
                  </template>
                  <el-scrollbar height="643px">
                    <div v-if="star_blog_count == 0">
                      <img
                        src="../assets/blog_empty.png"
                        style="width: 30%; margin-top: 10%; margin-bottom: 5%"
                      />
                      <div style="font-size: 30px; color: #c6c6c9">
                        还没有收藏动态哦~
                      </div>
                      <el-link
                        type="primary"
                        :underline="false"
                        @click="goBlogPage"
                        style="
                          font-size: 20px;
                          font-weight: 500;
                          margin-top: 3%;
                        "
                      >
                        去看看
                      </el-link>
                    </div>
                    <div
                      class="star_blog_list"
                      v-for="(star_blog, index) in star_blog_list"
                      :key="star_blog.blog_id"
                      @click="
                        goBlogDetail(
                          star_blog.blog_id,
                          index,
                          0,
                          '收藏',
                          $event
                        )
                      "
                    >
                      <div style="display: block; width: 100%">
                        <div style="
                            font-size: 20px;
                            font-weight: bold;
                            margin-left: 2%;
                            margin-bottom: 2%;
                            text-align: left;
                          ">
                          {{ star_blog.blog_user_name }}：
                        </div>
                        <!-- <div
                          style="
                            font-size: 15px;
                            font-weight: normal;
                            margin-left: 2%;
                            text-align: left;
                          "
                        >
                          {{ star_blog.blog_summary }}
                        </div> -->
                        <div style="display: flex">
                          <div
                            v-if="star_blog.image_url != null"
                            style="text-align: left; padding: 2%"
                          >
                            <img
                              style="
                                height: 100px;
                                width: 100px;
                                object-fit: cover;
                              "
                              :src="star_blog.image_url"
                            />
                          </div>
                          <div style="
                              font-size: 17px;
                              font-weight: normal;
                              margin-left: 2%;
                              text-align: left;
                              margin-top: 2%;
                            ">
                            {{ star_blog.blog_summary }}
                          </div>
                        </div>
                      </div>
                      <div class="star_date">
                        <div>
                          发布于{{ star_blog.blog_date }}
                        </div>
                        <div>
                          收藏于{{ star_blog.star_date }}
                        </div>
                        <div style="margin-top: 30%">
                          <el-row>
                            <el-col
                              :span="5"
                              @click.stop=""
                            >
                              <like-button
                                :content_id="star_blog.blog_id"
                                content_type="0"
                                :show_num="true"
                                size="large"
                              />
                            </el-col>
                            <el-col
                              :span="5"
                              @click.stop=""
                            >
                              <coin-button
                                :content_id="star_blog.blog_id"
                                content_type="0"
                                :show_num="true"
                                size="large"
                              />
                            </el-col>
                            <el-col
                              :span="5"
                              @click.stop=""
                            >
                              <star-button
                                :content_id="star_blog.blog_id"
                                content_type="0"
                                :show_num="true"
                                size="large"
                              />
                            </el-col>
                            <el-col :span="2"></el-col>
                            <el-col
                              :span="3"
                              @click.stop=""
                            >
                              <report-button
                                :content_id="star_blog.blog_id"
                                content_type="0"
                                size="large"
                                @reportResponse="reportResponse"
                              />
                            </el-col>
                            <el-col
                              :span="4"
                              style="text-align: left"
                              @click.stop=""
                            >
                              <span>举报</span>
                            </el-col>
                          </el-row>
                        </div>
                      </div>
                    </div>
                  </el-scrollbar>
                </el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane :key="need_refresh">
              <template #label>
                <span class="first-tabs-label">
                  <span>问题 </span>
                  <span style="color: gray">{{ question_count }}</span>
                </span>
              </template>
              <el-scrollbar height="686px">
                <div v-if="question_count == 0">
                  <img
                    src="../assets/QA_empty.png"
                    style="width: 30%; margin-top: 5%; margin-bottom: 5%"
                  />
                  <div style="font-size: 30px; color: #c6c6c9">
                    还没有发布问题哦~
                  </div>
                  <el-link
                    type="primary"
                    :underline="false"
                    @click="goAskPage"
                    style="font-size: 20px; font-weight: 500; margin-top: 3%"
                  >
                    现在就提问
                  </el-link>
                </div>
                <div
                  class="question_list"
                  v-for="question in question_list"
                  :key="question.QuestionId"
                  @click="
                    goQuestionPage(
                      question.QuestionId,
                      question.ReviewResult,
                      $event
                    )
                  "
                >
                  <div style="display: block; width: 100%">
                    <div style="
                        margin-left: 2%;
                        margin-bottom: 2%;
                        text-align: left;
                      ">
                      <span style="font-size: 20px; font-weight: bold">
                        {{ question.QuestionTitle }}
                      </span>
                      <el-tag
                        v-if="question.ReviewResult == '待审核'"
                        type=""
                        effect="light"
                      >
                        审核中
                      </el-tag>
                      <el-tag
                        v-if="question.ReviewResult == '不通过'"
                        type="danger"
                        effect="light"
                      >
                        审核不通过
                      </el-tag>
                    </div>
                    <div style="
                        font-size: 15px;
                        font-weight: normal;
                        margin-left: 2%;
                        text-align: left;
                      ">
                      {{ this.person_info.user_name }}：{{
                        question.QuestionSummary
                      }}
                    </div>
                  </div>
                  <div class="star_date">
                    <div>
                      发布于{{ question.QuestionDate.replace("T", " ") }}
                    </div>
                    <el-button
                      v-if="
                        this.$store.state.is_login &&
                        this.$store.state.user_info.user_id == this.host_id
                      "
                      type="danger"
                      style="margin-top: 10px; margin-left: 25px"
                      @click.stop="
                        openDeleteDia(question.QuestionId, 'question')
                      "
                    >
                      <el-icon class="el-icon--left">
                        <Delete />
                      </el-icon>删除
                    </el-button>
                    <div
                      style="margin-top: 5%; margin-right: 10%"
                      @click.stop=""
                      :key="fresh_own"
                    >
                      <star-button
                        :content_id="question.QuestionId"
                        content_type="2"
                        :show_num="true"
                        size="large"
                        @click="freshStarOwn($event, 1, 1)"
                        @giveStar="star"
                      />
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane :key="need_refresh">
              <template #label>
                <span class="first-tabs-label">
                  <span>回答 </span>
                  <span style="color: gray">{{ answer_count }}</span>
                </span>
              </template>
              <el-scrollbar height="686px">
                <div v-if="answer_count == 0">
                  <img
                    src="../assets/QA_empty.png"
                    style="width: 30%; margin-top: 5%; margin-bottom: 5%"
                  />
                  <div style="font-size: 30px; color: #c6c6c9">
                    还没有发布回答哦~
                  </div>
                  <el-link
                    type="primary"
                    :underline="false"
                    @click="goQACenter"
                    style="font-size: 20px; font-weight: 500; margin-top: 3%"
                  >
                    看看问题
                  </el-link>
                </div>
                <div
                  class="answer_list"
                  v-for="(answer, index) in answer_list"
                  :key="answer"
                  @click="
                    goAnswerDetail(
                      answer.question_id,
                      index,
                      answer.ReviewResult,
                      $event
                    )
                  "
                >
                  <div style="display: block; width: 100%">
                    <div style="
                        margin-left: 2%;
                        margin-bottom: 2%;
                        text-align: left;
                      ">
                      <span style="font-size: 20px; font-weight: bold">
                        {{ answer.QuestionTitle }}
                      </span>
                      <el-tag
                        v-if="answer.ReviewResult == '待审核'"
                        type=""
                        effect="light"
                      >
                        审核中
                      </el-tag>
                      <el-tag
                        v-if="answer.ReviewResult == '不通过'"
                        type="danger"
                        effect="light"
                      >
                        审核不通过
                      </el-tag>
                    </div>
                    <div style="
                        font-size: 15px;
                        font-weight: normal;
                        margin-left: 2%;
                        text-align: left;
                      ">
                      {{ answer.UserName }}：{{ answer.AnswerSummary }}
                    </div>
                  </div>
                  <div class="star_date">
                    <div>发布于{{ answer.AnswerDate.replace("T", " ") }}</div>
                    <el-button
                      v-if="
                        this.$store.state.is_login &&
                        this.$store.state.user_info.user_id == this.host_id
                      "
                      type="danger"
                      style="margin-top: 10px; margin-left: 25px"
                      @click.stop="openDeleteDia(answer.AnswerId, 'answer')"
                    >
                      <el-icon class="el-icon--left">
                        <Delete />
                      </el-icon>删除
                    </el-button>
                    <div style="margin-top: 20%">
                      <el-row>
                        <el-col
                          :span="5"
                          @click.stop=""
                        >
                          <like-button
                            :content_id="answer.AnswerId"
                            content_type="2"
                            :show_num="true"
                            size="large"
                          />
                        </el-col>
                        <el-col
                          :span="5"
                          @click.stop=""
                        >
                          <coin-button
                            :content_id="answer.AnswerId"
                            content_type="1"
                            :show_num="true"
                            size="large"
                          />
                        </el-col>
                        <el-col
                          :span="5"
                          @click.stop=""
                        >
                          <star-button
                            :content_id="answer.AnswerId"
                            content_type="1"
                            :show_num="true"
                            size="large"
                          />
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col
                          :span="3"
                          @click.stop=""
                        >
                          <report-button
                            :content_id="answer.AnswerId"
                            content_type="1"
                            size="large"
                            @reportResponse="reportResponse"
                          />
                        </el-col>
                        <el-col
                          :span="4"
                          style="text-align: left"
                          @click.stop=""
                        >
                          <span>举报</span>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </el-tab-pane>
            <el-tab-pane>
              <template #label>
                <span class="first-tabs-label">
                  <span>动态 </span>
                  <span style="color: gray">{{ blog_count }}</span>
                </span>
              </template>
              <el-scrollbar height="686px">
                <div v-if="blog_count == 0">
                  <img
                    src="../assets/blog_empty.png"
                    style="width: 30%; margin-top: 10%; margin-bottom: 5%"
                  />
                  <div style="font-size: 30px; color: #c6c6c9">
                    还没有发布动态哦~
                  </div>
                  <el-link
                    type="primary"
                    :underline="false"
                    @click="goBlogEdit"
                    style="font-size: 20px; font-weight: 500; margin-top: 3%"
                  >
                    现在就发动态
                  </el-link>
                </div>
                <div
                  class="blog_list"
                  v-for="(blog, index) in blog_list"
                  :key="blog.BlogId"
                  @click="
                    goBlogDetail(
                      blog.BlogId,
                      index,
                      1,
                      blog.ReviewResult,
                      $event
                    )
                  "
                >
                  <div style="display: block; width: 100%">
                    <div style="
                        margin-left: 2%;
                        margin-bottom: 2%;
                        text-align: left;
                      ">
                      <span style="font-size: 20px; font-weight: bold">
                        {{ this.person_info.user_name }}：
                      </span>
                      <el-tag
                        v-if="blog.ReviewResult == '待审核'"
                        type=""
                        effect="light"
                      >
                        审核中
                      </el-tag>
                      <el-tag
                        v-if="blog.ReviewResult == '不通过'"
                        type="danger"
                        effect="light"
                      >
                        审核不通过
                      </el-tag>
                    </div>
                    <div style="display: flex">
                      <div style="text-align: left; padding: 2%">
                        <img
                          style="height: 100px; width: 100px; object-fit: cover"
                          :src="blog.BlogImage"
                        />
                      </div>
                      <div style="
                          font-size: 17px;
                          font-weight: normal;
                          margin-left: 2%;
                          text-align: left;
                          margin-top: 2%;
                        ">
                        {{ blog.BlogSummary }}
                      </div>
                    </div>
                  </div>
                  <div class="star_date">
                    <div>发布于{{ blog.BlogDate.replace("T", " ") }}</div>
                    <el-button
                      v-if="
                        this.$store.state.is_login &&
                        this.$store.state.user_info.user_id == this.host_id
                      "
                      type="danger"
                      style="margin-top: 10px; margin-left: 25px"
                      @click.stop="openDeleteDia(blog.BlogId, 'blog')"
                    >
                      <el-icon class="el-icon--left">
                        <Delete />
                      </el-icon>删除
                    </el-button>
                    <div style="margin-top: 25%">
                      <el-row>
                        <el-col
                          :span="5"
                          @click.stop=""
                        >
                          <like-button
                            :content_id="blog.BlogId"
                            content_type="0"
                            :show_num="true"
                            size="large"
                          />
                        </el-col>
                        <el-col
                          :span="5"
                          @click.stop=""
                        >
                          <coin-button
                            :content_id="blog.BlogId"
                            content_type="0"
                            :show_num="true"
                            size="large"
                          />
                        </el-col>
                        <el-col
                          :span="5"
                          @click.stop=""
                        >
                          <star-button
                            :content_id="blog.BlogId"
                            content_type="0"
                            :show_num="true"
                            size="large"
                          />
                        </el-col>
                        <el-col :span="2"></el-col>
                        <el-col
                          :span="3"
                          @click.stop=""
                        >
                          <report-button
                            :content_id="blog.BlogId"
                            content_type="0"
                            size="large"
                            @reportResponse="reportResponse"
                          />
                        </el-col>
                        <el-col
                          :span="4"
                          style="text-align: left"
                          @click.stop=""
                        >
                          <span>举报</span>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </el-scrollbar>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="delete_dialog_visible"
    title="警告"
    width="30%"
    :before-close="handleClose"
  >
    <span style="font-size: 18px">你确认要删除吗? 此操作不可逆!请仔细考虑</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button
          type="primary"
          @click="deleteCheck"
        >确认</el-button>
      </span>
    </template>
  </el-dialog>
  <el-dialog
    v-model="grow_detail"
    title="成长详情"
    width="50%"
  >
    <div style="
        color: gray;
        font-weight: bold;
        font-size: 20px;
        text-align: left;
        margin-left: 5%;
        margin-bottom: 2%;
      ">
      等级{{ this.grow_info.level }}：
    </div>
    <el-progress
      :text-inside="true"
      :stroke-width="26"
      :percentage="
        (100 * this.grow_info.exp) /
        (this.grow_info.level * this.grow_info.level)
      "
      style="width: 70%; margin-left: 17%"
    >
      <span style="font-size: 20px">{{ this.grow_info.exp }}/{{
          this.grow_info.level * this.grow_info.level
        }}</span>
    </el-progress>
    <template #footer>
      <span>
        <el-button
          type="primary"
          @click="grow_detail = false"
        >确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { Delete, Edit, Search, Share, Upload } from "@element-plus/icons-vue";
import axios from "axios";
import FollowButton from "../components/FollowButton.vue";
import PageLoading from "../components/PageLoading.vue";
import LikeButton from "../components/LikeButton.vue";
import CoinButton from "../components/CoinButton.vue";
import StarButton from "../components/StarButton.vue";
import ReportButton from "../components/ReportButton.vue";
import { ElMessage } from "element-plus";
export default {
  components: {
    FollowButton,
    PageLoading,
    LikeButton,
    CoinButton,
    StarButton,
    ReportButton,
  },
  data () {
    return {
      person_info: {},
      identity_info_list: [],
      achieve_info: {},
      grow_info: {},
      gain_exp: 0,
      visit_id: -1,
      host_id: -1,
      user_follow_list: [],
      user_follow_count: 0,
      user_follower_list: [],
      user_follower_count: 0,
      follow_university_list: [],
      follow_university_count: 0,
      follow_institution_list: [],
      follow_institution_count: 0,
      star_question_list: [],
      star_question_count: 0,
      star_answer_list: [],
      star_answer_count: 0,
      star_blog_list: [],
      star_blog_count: 0,
      question_list: [],
      question_count: 0,
      answer_list: [],
      answer_count: 0,
      blog_list: [],
      blog_count: -1,
      loading: true,
      delete_dialog_visible: false,
      need_refresh: false,
      fresh_followerlist_button: 1,
      fresh_userlist_button: 1,
      follow_or_follower: 0, //0-follow
      fresh_own: 0,
      fresh_star: 0,
      star_or_own: 0, //0-star
      fresh_type: 0, //0-动态，1-问题，2回答
      to_be_killed_type: "",
      to_be_killed_id: -1,
      grow_detail: false,
    };
  },
  props: ["host_id"],
  methods: {
    star (res) {
      if (res) {
        if (this.fresh_type == 0) this.star_blog_count++;
        else if (this.fresh_type == 1) this.star_question_count++;
        else if (this.fresh_type == 2) this.star_answer_count++;
        else;
      } else {
        if (this.fresh_type == 0) this.star_blog_count--;
        else if (this.fresh_type == 1) this.star_question_count--;
        else if (this.fresh_type == 2) this.star_answer_count--;
        else;
      }
      if (this.star_or_own == 0) {
        this.fresh_own++;
      } else {
        this.fresh_star++;
      }
    },
    follow (res, ob_type) {
      if (res) {
        ElMessage({
          type: "success",
          message: "关注成功！",
          duration: 2000,
          showClose: true,
        });
        console.log(res);
        if (ob_type == "0") {
          axios({
            url: "spring/personal_center/follow/follows",
            params: { user_id: this.host_id },
            method: "get",
          })
            .then((res) => {
              this.user_follow_list = res.data.data.follows;
              // this.user_follow_count = res.data.data.count;
              this.user_follow_count++;
              this.person_info.user_follows++;
              if (this.follow_or_follower == 0)
                this.fresh_followerlist_button++;
              else this.fresh_userlist_button++;
            })
            .catch((errMsg) => {
              console.log(errMsg);
            });
        } else if (ob_type == "1") {
          axios({
            url: "spring/personal_center/follow/universities",
            params: { user_id: this.host_id },
            method: "get",
          })
            .then((res) => {
              this.follow_university_list = res.data.data.follows;
              // this.follow_university_count = res.data.data.count;
              this.follow_university_count++;
              this.person_info.user_follows++;
            })
            .catch((errMsg) => {
              console.log(errMsg);
            });
        } else {
          axios({
            url: "spring/personal_center/follow/institutions",
            params: { user_id: this.host_id },
            method: "get",
          })
            .then((res) => {
              this.follow_institution_list = res.data.data.follows;
              // this.follow_institution_count = res.data.data.count;
              this.follow_institution_count++;
              this.person_info.user_follows++;
            })
            .catch((errMsg) => {
              console.log(errMsg);
            });
        }
      } else {
        ElMessage({
          type: "error",
          message: "关注失败！",
          duration: 2000,
          showClose: true,
        });
      }
    },
    unFollow (res, ob_type) {
      console.log("执行unfollow");
      if (res) {
        ElMessage({
          type: "success",
          message: "取消关注成功！",
          duration: 2000,
          showClose: true,
        });
        this.person_info.user_follows--;
        console.log(ob_type);
        if (ob_type == 0) {
          this.user_follow_count--;
          if (this.follow_or_follower == 0) this.fresh_followerlist_button++;
          else this.fresh_userlist_button++;
        } else if (ob_type == 1) {
          this.follow_university_count--;
        } else {
          this.follow_institution_count--;
        }
      } else {
        ElMessage({
          type: "error",
          message: "取消关注失败！",
          duration: 2000,
          showClose: true,
        });
      }
    },
    freshStarOwn (event, type, type2) {
      this.star_or_own = type;
      this.fresh_type = type2;
    },
    freshButton (event, type) {
      this.follow_or_follower = type;
    },
    goPersonInfo () {
      this.$router.push({
        path: "/person_info",
      });
    },
    goRecharge () {
      this.$router.push({
        path: "/recharge",
      });
    },
    goPersonSpace (id, event) {
      console.log(id);
      this.$router.push({
        path: "/person_space",
        query: {
          host_id: id,
        },
      });
    },
    goSchoolDetail (id, event) {
      console.log(id);
      this.$router.push({
        path: "/school_detail",
        query: {
          school_id: id,
        },
      });
    },
    goInstitutionDetail (id, event) {
      console.log(id);
      this.$router.push({
        path: "/institution_detail",
        query: {
          institution_id: id,
        },
      });
    },
    goQuestionPage (id, flag, event) {
      console.log(id);
      if (!(flag == "通过" || flag == "收藏")) {
        ElMessage({
          type: "error",
          message: "还不能查看哦",
          showClose: true,
        });
        return;
      }
      this.$router.push({
        path: "/question",
        query: {
          question_id: id,
        },
      });
    },
    goAnswerDetail (id, index, flag, event) {
      console.log(id);
      if (flag != "通过") {
        ElMessage({
          type: "error",
          message: "还不能查看哦",
          showClose: true,
        });
        return;
      }
      this.$router.push({
        path: "/answer_detail",
        query: {
          answer_id: this.answer_list[index].AnswerId,
          question_id: id,
        },
      });
    },
    goAnswerDetail1 (id, index, event) {
      console.log(id);
      this.$router.push({
        path: "/answer_detail",
        query: {
          answer_id: this.star_answer_list[index].answer_id,
          question_id: id,
        },
      });
    },
    goBlogDetail (id, index, flag, flag_re, event) {
      if (flag == 0) {
        this.$router.push({
          path: "/blog_detail",
          query: {
            blog_id: id,
            blog_tag: this.star_blog_list[index].blog_tag,
            user_id: this.star_blog_list[index].blog_user_id,
          },
        });
      } else {
        if (flag_re != "通过") {
          ElMessage({
            type: "error",
            message: "还不能查看哦",
            showClose: true,
          });
          return;
        }
        this.$router.push({
          path: "/blog_detail",
          query: {
            blog_id: id,
            blog_tag: this.blog_list[index].BlogTag,
            user_id: this.blog_list[index].BlogUserId,
          },
        });
      }
    },
    goBlogEdit () {
      this.$router.push({
        path: "/blog_edit",
      });
    },
    goCoinCenter () {
      this.$router.push({
        path: "/person_info",
        query: {
          selectName: "2",
        },
      });
    },
    goAskPage () {
      this.$router.push({
        name: "question_edit",
      });
    },
    goQACenter () {
      this.$router.push({
        name: "qa_center",
      });
    },
    goBlogPage () {
      this.$router.push({
        name: "blog",
      });
    },
    goSchoolCenter () {
      this.$router.push({
        name: "school_center",
      });
    },
    goInstitutionCenter () {
      this.$router.push({
        name: "institution_center",
      });
    },
    getParams () {
      this.host_id = this.$route.query.host_id;
      if(this.host_id == null){
        this.host_id = this.$store.state.user_info.user_id
      }
      console.log("h" + this.host_id);
    },
    reportResponse (res) {
      if (res) {
        ElMessage({
          type: "success",
          message: "举报成功！",
          duration: 2000,
          showClose: true,
        });
      } else {
        ElMessage({
          type: "error",
          message: "举报失败！",
          duration: 2000,
          showClose: true,
        });
      }
    },
    initPage: function () {
      if(this.host_id == -1){
        this.host_id = this.$store.state.user_info.user_id
      }
      this.visit_id = this.$store.state.user_info.user_id;
      console.log("施朱博测试中：")
      console.log(this.host_id)
      this.getParams();
      console.log(this.host_id + "  " + this.visit_id);
      //个人信息
      axios({
        url: "spring/personal_center/user_info",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          this.person_info = res.data.data;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取用户信息失败");
        });
      // this.person_info = this.$store.state.user_info;
      //学历认证
      axios({
        url: "spring/personal_center/identity",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          this.identity_info_list = res.data.data.identity_info;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取学历信息失败");
        });
      //成就信息
      axios({
        url: "spring/personal_center/user_info/achievement",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          this.achieve_info = res.data.data;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取成就信息失败");
        });
      //成长信息
      axios({
        url: "spring/personal_center/user_info/growth",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          this.grow_info = res.data.data;
          this.gain_exp =
            this.grow_info.continus == 7
              ? 1
              : Math.pow(this.grow_info.continus + 1, 2);
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取成长信息失败");
        });
      //粉丝列表
      axios({
        url: "spring/personal_center/follow/follower",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          console.log(res);
          console.log(res.data.data);
          this.user_follower_list = res.data.data.follows;
          this.user_follower_count = res.data.data.count;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取粉丝信息失败");
        });
      //关注用户列表
      axios({
        url: "spring/personal_center/follow/follows",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          this.user_follow_list = res.data.data.follows;
          this.user_follow_count = res.data.data.count;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取粉丝信息失败");
        });
      //关注学校列表
      axios({
        url: "spring/personal_center/follow/universities",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          this.follow_university_list = res.data.data.follows;
          this.follow_university_count = res.data.data.count;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取粉丝信息失败");
        });
      //关注机构列表
      axios({
        url: "spring/personal_center/follow/institutions",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          this.follow_institution_list = res.data.data.follows;
          this.follow_institution_count = res.data.data.count;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取粉丝信息失败");
        });
      //收藏问题列表
      axios({
        url: "spring/personal_center/star/questions",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          this.star_question_list = res.data.data.stars;
          this.star_question_count = res.data.data.count;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取粉丝信息失败");
        });
      //收藏回答列表
      axios({
        url: "spring/personal_center/star/answers",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          this.star_answer_list = res.data.data.stars;
          this.star_answer_count = res.data.data.count;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取粉丝信息失败");
        });
      //收藏动态列表
      axios({
        url: "spring/personal_center/star/blogs",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          this.star_blog_list = res.data.data.stars;
          this.star_blog_count = res.data.data.count;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取收藏动态信息失败");
        });
      //问题列表
      axios({
        url: "spring/personal_center/user_info/questions",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          this.question_list = res.data.data.question_list;
          this.question_count = res.data.data.count;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取问题信息失败");
        });
      //回答列表
      axios({
        url: "spring/personal_center/user_info/answers",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          this.answer_list = res.data.data.answer_list;
          this.answer_count = res.data.data.count;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取回答信息失败");
        });
      //动态列表
      axios({
        url: "spring/personal_center/user_info/blogs",
        params: { user_id: this.host_id },
        method: "get",
      })
        .then((res) => {
          console.log("23450", res.data.data);
          this.blog_list = res.data.data.blog_list;
          this.blog_count = res.data.data.count;
        })
        .catch((errMsg) => {
          console.log(errMsg);
          console.log("获取动态信息失败");
        });
      this.person_info.user_follows =
        this.user_follow_count +
        this.follow_university_count +
        this.follow_institution_count;
      this.person_info.user_follower = this.user_follower_count;
    },
    openDeleteDia (id, type_name) {
      this.to_be_killed_id = id;
      this.to_be_killed_type = type_name;
      this.delete_dialog_visible = true;
    },
    handleClose () {
      this.delete_dialog_visible = false;
      this.to_be_killed_type = "";
      this.to_be_killed_id = -1;
    },
    deleteCheck () {
      axios
        .delete("/api/" + this.to_be_killed_type, {
          params: {
            // 请求参数拼接在url上
            [this.to_be_killed_type + "_id"]: this.to_be_killed_id,
          },
        })
        .then((res) => {
          this.delete_dialog_visible = false;
          this.to_be_killed_type = "";
          this.to_be_killed_id = -1;
          if (res.data.status == true) {
            ElMessage.success("删除成功!");
            // this.$emit("deletecheck",true);
            this.need_refresh = !this.need_refresh;
          } else {
            ElMessage.error("删除失败!");
          }
        })
        .catch((errMsg) => {
          this.delete_dialog_visible = false;
          this.to_be_killed_type = "";
          this.to_be_killed_id = -1;
          console.log(errMsg);
          ElMessage.error("删除失败!");
        });
    },
  },
  watch: {
    $route () {
      this.initPage();
    },
    need_refresh () {
      console.log("fresh!");
      this.initPage();
    },
  },
  created () {
    this.initPage();
  },
};
</script>

<style scoped>
body {
  height: 100%;
  /* background-image: url("../assets/user_profile_head_background.png");
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed; */
}

.user_profile_head {
  position: inherit;
  height: 250px;
  margin-bottom: 1%;
}
.user_profile_banner {
  position: inherit;
  height: 20%;
}
.user_profile_info_box {
  position: inherit;
  height: 70%;
  width: 95%;
  margin-left: 2.5%;
}
.user_profile_info {
  /* position: inherit; */
  width: 100%;
  display: flex;
}
.head_img_border {
  position: inherit;
  height: 100%;
  width: 10%;
}
.user_profile_info_right {
  position: inherit;
  width: 89%;
  height: 100%;
}
.user_profile_title {
  width: 100%;
  text-align: left;
}
.user_profile_content {
  width: 100%;
  margin-top: 1%;
  text-align: left;
  font-size: 15px;
  line-height: 200%;
}
.user_profile_head_control {
  text-align: right;
}
.user_profile_body {
  width: 100%;
  display: flex;
}
.user_profile_aside {
  width: 25%;
  margin-left: 2.5%;
}
.user_profile_aside_card {
  margin-bottom: 3%;
}
.publish_center_head,
.grow_center_head {
  text-align: left;
  font-size: 20px;
}
.publish_center_button {
  margin: 5%;
}
.user_profile_body_right {
  width: 69.1%;
  margin-left: 1%;
  margin-bottom: 1%;
}
::v-deep .user_profile_tabs .el-tabs__item {
  font-size: 20px;
}
::v-deep .user_profile_follow_tabs .el-tabs__nav {
  height: 30px;
}
::v-deep .user_profile_follow_tabs .el-tabs__item {
  font-size: 16px;
  line-height: 10px;
}

.user_follow_list,
.user_follower_list,
.follow_university_list,
.follow_institution_list {
  border-bottom: 1px solid #f0f0f2;
  display: flex;
  padding-bottom: 1%;
  margin-bottom: 1%;
  padding-top: 1%;
  padding-left: 10%;
  transition: background-color 0.1s ease;
}
.user_follow_list:hover {
  background-color: rgb(243, 242, 242);
  box-shadow: 0.3em 0.3em 0.7em #00000015;
}
.user_follower_list:hover {
  background-color: rgb(243, 242, 242);
  box-shadow: 0.3em 0.3em 0.7em #00000015;
}
.follow_university_list:hover {
  background-color: rgb(243, 242, 242);
  box-shadow: 0.3em 0.3em 0.7em #00000015;
}
.follow_institution_list:hover {
  background-color: rgb(243, 242, 242);
  box-shadow: 0.3em 0.3em 0.7em #00000015;
}

.achievement_content {
  text-align: left;
  margin: 4%;
}
.star_question_list,
.star_answer_list,
.star_blog_list,
.question_list,
.answer_list,
.blog_list {
  border-bottom: 1px solid #f0f0f2;
  display: flex;
  padding: 1%;
  margin-bottom: 1%;
  transition: background-color 0.1s ease;
}
.star_question_list:hover {
  background-color: rgb(243, 242, 242);
  box-shadow: 0.3em 0.3em 0.7em #00000015;
}
.star_answer_list:hover {
  background-color: rgb(243, 242, 242);
  box-shadow: 0.3em 0.3em 0.7em #00000015;
}
.star_blog_list:hover {
  background-color: rgb(243, 242, 242);
  box-shadow: 0.3em 0.3em 0.7em #00000015;
}
.question_list:hover {
  background-color: rgb(243, 242, 242);
  box-shadow: 0.3em 0.3em 0.7em #00000015;
}
.answer_list:hover {
  background-color: rgb(243, 242, 242);
  box-shadow: 0.3em 0.3em 0.7em #00000015;
}
.blog_list:hover {
  background-color: rgb(243, 242, 242);
  box-shadow: 0.3em 0.3em 0.7em #00000015;
}

.star_date {
  /* font-size: 3px; */
  color: gray;
  width: 50%;
  text-align: right;
}
</style>