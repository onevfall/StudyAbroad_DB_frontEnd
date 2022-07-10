import {
  createStore
} from 'vuex'

export default createStore({
  state: {
    user_info: {
      user_id: -1,
      user_email: "",
      user_phone: "",
      user_password: "",
      user_name: "",
      user_profile: "",
      user_createtime: "",
      user_birthday: "",
      user_gender: "",
      user_state: -1,
      user_signature: "",
      user_follower: -1,
      user_follows: -1,
      user_level: -1,
      user_coin: -1
    },
    is_login: false
  },
  getters: {},
  mutations: {
    //登入
    loginIn(state,user_info){
      state.is_login=true;
      state.user_info=user_info;
    },
    //登出
    loginOut(state){
      state.is_login=false;
      state.user_info={
        user_id: -1,
        user_email: "",
        user_phone: "",
        user_password: "",
        user_name: "",
        user_profile: "",
        user_createtime: "",
        user_birthday: "",
        user_gender: "",
        user_state: -1,
        user_signature: "",
        user_follower: -1,
        user_follows: -1,
        user_level: -1,
        user_coin: -1
      }
    },
  },
  actions: {},
  modules: {},
  strict: true
})