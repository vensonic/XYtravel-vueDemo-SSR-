<template>
  <div class="searchTicket">
    <!-- tab栏 -->
    <el-row class="tabs" type="flex" justify="center" align="middle">
      <div
        v-for="(item,index) in tabs"
        :key="index"
        :class="{active:currentTabID==index}"
        @click="handleTabs(index)"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </div>
    </el-row>
    <!-- 搜索表单 -->
    <el-form :model="searchForm" label-width="80px" class="searchForm">
      <el-form-item label="出发城市">
        <el-autocomplete
          v-model="searchForm.departCity"
          :fetch-suggestions="querySearchDepartCity"
          placeholder="请输入出发城市"
          @select="selectDepartCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="searchForm.destCity"
          :fetch-suggestions="querySearchDestCity"
          placeholder="请输入目的城市"
          @select="selectDestCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发日期">
        <el-date-picker
          v-model="searchForm.departDate"
          type="date"
          placeholder="选择日期"
          style="width:200px"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button type="primary" icon="el-icon-search" @click="searchTicket" style="width:200px">搜索</el-button>
      </el-form-item>
    </el-form>
    <!-- 切换城市 -->
    <div class="changeCity">
      <div class="line">
        <div class="changeBtn" @click="cityReverse">换</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //设置日期选择限制
      pickerOptions: {
        disabledDate(time) {
          //当天之前的日期不可选择
          return time.getTime() < Date.now();
        }
      },
      //tab栏数据
      tabs: [
        { name: "单程", icon: "iconfont icondancheng" },
        { name: "往返", icon: "iconfont iconshuangxiang" }
      ],
      //当前tab栏id
      currentTabID: 0,
      //搜索框表单
      searchForm: {
        departCity: "",
        departCode: "",
        destCity: "",
        destCode: "",
        departDate: new Date()
      }
    };
  },
  methods: {
    //tab栏切换事件
    handleTabs(index) {
      // this.currentTabID = index;
      if (index === 1) {
        this.$alert("抱歉!机票往返服务暂未开通", "温馨提示", {
          confirmButtonText: "确定",
          type: "warning"
        });
      }
    },
    //异步查询出发城市
    querySearchDepartCity(queryString, cb) {
      //   console.log(queryString);
      this.$axios
        .get("/airs/city", {
          params: { name: queryString }
        })
        .then(res => {
          const { data } = res.data;
          const newData = data.map(v => {
            return { ...v, value: v.name.replace("市", "") };
          });
          //   console.log(newData);
          cb(newData);
          //优化体验,默认选中搜索结果的第一条数据
          // this.searchForm.departCity = newData[0].value
          // this.searchForm.departCode = newData[0].sort
        });
    },
    //选择出发城市
    selectDepartCity(val) {
      //设置城市码
      this.searchForm.departCode = val.sort;
    },
    //异步查询目的城市
    querySearchDestCity(queryString, cb) {
      this.$axios
        .get("/airs/city", {
          params: { name: queryString }
        })
        .then(res => {
          const { data } = res.data;
          const newData = data.map(v => {
            return { ...v, value: v.name.replace("市", "") };
          });
          //   console.log(newData);
          cb(newData);
          //优化体验,默认选中搜索结果的第一条数据
          // this.searchForm.destCity = newData[0].value
          // this.searchForm.destCode = newData[0].sort
        });
    },
    //选择目的城市
    selectDestCity(val) {
      //设置城市码
      this.searchForm.destCode = val.sort;
    },
    //选择日期
    //提交搜索机票
    searchTicket() {
      // console.log(this.searchForm);
      var flag = true;
      //验证
      const validate = [
        {
          value: this.searchForm.departCity,
          message: "请选择出发城市"
        },
        {
          value: this.searchForm.destCity,
          message: "请选择目的城市"
        },
        {
          value: this.searchForm.departDate,
          message: "请选择出发日期"
        }
      ];
      validate.forEach(val => {
        if (flag) {
          if (!val.value) {
            this.$message.warning(val.message);
            flag = false;
          }
        }
      });
      if (!flag) return;
      this.$router.push({
        path: "/airticket/airlines",
        query: this.searchForm
      });

      //将搜索信息存至localStorage
      let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]')
      searchHistory.unshift(this.searchForm)
      localStorage.setItem('searchHistory',JSON.stringify(searchHistory))
    },
    //交换出发地和目的地
    cityReverse() {
      const { departCity, departCode, destCity, destCode } = this.searchForm;
      this.searchForm.departCity = destCity;
      this.searchForm.departCode = destCode;
      this.searchForm.destCity = departCity;
      this.searchForm.destCode = departCode;
    }
  }
};
</script>
<style lang="less" scoped>
.searchTicket {
  position: relative;
  width: 360px;
  height: 350px;
  background: #fff;
  border: 1px solid #ddd;
  .tabs {
    > div {
      flex: 1;
      height: 48px;
      line-height: 48px;
      text-align: center;
      background: #eee;
      box-sizing: border-box;
    }
    .active {
      background: #fff;
      color: orange;
      border-top: 2px solid orange;
    }
  }
  .searchForm {
    margin-top: 10px;
    padding: 15px;
  }
  .changeCity {
    position: absolute;
    top: 90px;
    right: 42px;
    .line {
      position: relative;
      width: 20px;
      height: 60px;
      border-top: 1px solid #ddd;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      .changeBtn {
        position: absolute;
        top: 22px;
        right: -10px;
        width: 20px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
        background: #aaa;
        cursor: pointer;
      }
    }
  }
}
</style>
