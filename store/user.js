export const state = {
  userInfo: {
    token: "",
    user: {}
  }
};

//定义mutation
export const mutations = {
  //设置state中userinfot
  setUserInfo(state, value) {
    state.userInfo = value;
  },
  //重置state中的userInfo
  clearUserInfo(state) {
    state.userInfo = {
      token: "",
      user: {}
    };
  }
};
//定义action,用于异步操作
export const actions = {
  //登录请求
  login({ commit }, data) {
    return this.$axios({
      url: "/accounts/login",
      method: "post",
      data
    }).then(res => {
      // console.log(res);
      if (res.status === 200) {
        //保存到store中,
        commit("setUserInfo", res.data);
        return res.data
      }
    });
  }
};
