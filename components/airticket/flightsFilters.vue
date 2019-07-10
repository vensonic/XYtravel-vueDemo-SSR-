<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="filteritems.airport" placeholder="起飞机场">
          <el-option
            v-for="(item,index) in data.options.airport"
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="filteritems.flightTimes" placeholder="起飞时间">
          <el-option
            v-for="(item,index) in data.options.flightTimes "
            :key="index"
            :label="`${item.from}:00-${item.to}:00`"
            :value="`${item.from}:00-${item.to}:00`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="filteritems.company" placeholder="航空公司">
          <el-option
            v-for="(item,index) in data.options.company "
            :key="index"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="filteritems.airSize" placeholder="机型">
          <el-option
            v-for="(item,index) in airSizes"
            :key="index"
            :label="item.name"
            :value="item.type"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-tag
        v-if="filteritems.airport !== ''"
        closable
        @close="airportTagClose"
      >{{filteritems.airport}}</el-tag>
      <el-tag
        type="success"
        v-if="filteritems.flightTimes !== ''"
        closable
        @close="flightTimesTagClose"
      >{{filteritems.flightTimes}}</el-tag>
      <el-tag
        type="danger"
        v-if="filteritems.company !== ''"
        closable
        @close="companyTagClose"
      >{{filteritems.company}}</el-tag>
      <el-tag
        type="warning"
        v-if="filteritems.airSize !== ''"
        closable
        @close="airSizeTagClose"
      >{{filteritems.airSize === 'L' ? '大' : filteritems.airSize === 'M' ? '中' : '小'}}</el-tag>
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      airSizes: [
        { name: "大", type: "L" },
        { name: "中", type: "M" },
        { name: "小", type: "S" }
      ],
      filteritems: {
        airport: "", // 机场
        flightTimes: "", // 出发时间
        company: "", // 航空公司
        airSize: "" // 机型大小
      }
    };
  },
  methods: {
    // 关闭机场筛选条件的时候
    airportTagClose() {
      this.filteritems.airport = "";
    },

    // 关闭选择出发时间时候触发
    flightTimesTagClose() {
      this.filteritems.flightTimes = "";
    },

    // 关闭选择航空公司时候触发
    companyTagClose() {
      this.filteritems.company = "";
    },

    // 关闭选择机型时候触发
    airSizeTagClose() {
      this.filteritems.airSize = "";
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      const arr = this.data.flights;
      this.$emit("filterFLightsList", arr);
      this.filteritems = {
        airport: "", // 机场
        flightTimes: "", // 出发时间
        company: "", // 航空公司
        airSize: "" // 机型大小
      };
    },
    //筛选函数
    handleFilter(value) {
      var arr = this.data.flights;
      if (value.airport !== "") {
        arr = arr.filter(v => {
          return v.org_airport_name === value.airport;
        });
      }
      if (value.flightTimes !== "") {
        const timestring = value.flightTimes.split("-");
        let from = timestring[0].split(":")[0];
        let to = timestring[1].split(":")[0];
        arr = arr.filter(v => {
          const depTime = +v.dep_time.split(":")[0];
          return depTime >= from && depTime < to;
        });
      }
      if (value.company !== "") {
        arr = arr.filter(v => {
          return v.airline_name === value.company;
        });
      }
      if (value.airSize !== "") {
        arr = arr.filter(v => {
          return v.plane_size === value.airSize;
        });
      }
      this.$emit("filterFLightsList", arr);
    }
  },
  watch: {
    filteritems: {
      handler: function(val, oldVal) {
        // console.log(val);
        this.handleFilter(val);
      },
      deep: true
    }
  }
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>