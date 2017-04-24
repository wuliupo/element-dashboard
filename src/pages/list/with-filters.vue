<template lang="html">
  <div class="list-filters-page ">

    <db-breadcrumb></db-breadcrumb>

    <div class="db-content-inner">

      <!-- filters start -->
      <div class="filters">
        <div class="filter">
          <el-select v-model="filters.labelVal" clearable placeholder="请选择">
            <el-option
                v-for="item in selectedOptions"
                :label="item.label"
                :value="item.value">
            </el-option>
          </el-select>
          <el-input placeholder="请输入年龄" v-model="filters.age" v-show="filters.labelVal == '1'"></el-input>
          <el-input placeholder="请输入姓名" v-model="filters.userName" v-show="filters.labelVal == '2'"></el-input>
        </div>
        <div class="filter">
          起止时间：
          <el-date-picker type="datetimerange" placeholder="选择时间范围" v-model="filters.startEndTime"></el-date-picker>
        </div>
        <div class="filter">
          <el-button type="primary" @click="handleSearch()">搜索</el-button>
          <el-button type="primary" @click="handleEdit()">创建</el-button>
        </div>
      </div>
      <!-- filters end -->

      <!-- table start  -->
      <el-table :data="users" ref="userTable" element-loading-text="拼命加载中"
        stripe
        v-loading="loading"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange">
        <el-table-column type="selection" width="55" :reserve-selection="reserveSelection"></el-table-column>
        <el-table-column prop="date" label="出生日期" :formatter="formatDate" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="age" sortable="custom" label="年龄"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column :context="_self" width="150" inline-template label="操作">
          <div>
            <el-button size="small" @click="handleEdit($index, row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete($index, row)">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
      <!-- table end  -->

      <!-- pagination start  -->
      <div class="pagination-wrapper" v-show="!loading">
        <el-pagination
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
          :page-size="20">
        </el-pagination>
      </div>
      <!-- pagination end  -->

      <!-- edit dialog start -->
      <el-dialog :title="userForm.id ? '编辑' : '添加'" v-model="userDialog" size="tiny">
        <db-add-item v-if="userDialog" :userForm="userForm" @afterAddEvent="closeDialog"></db-add-item>
        <a v-if="userForm.id" :href="'#/list/edit/' + userForm.id">在页面编辑</a>
      </el-dialog>
      <!-- edit dialog end -->

    </div>
  </div>
</template>

<script>
import {
  fetchList,
  removeUser
} from 'src/api/api';

import AddItem from 'src/components/add-item'

export default {
  data() {
    return {
      users: [],
      total: 0,
      page: 0,
      loading: true,
      multipleSelection: [],
      reserveSelection: false,
      userDialog: false,
      createDialog: false,
      filters: {
        sortWay: '',
        userName: '',
        startEndTime: '',
        labelVal: '1',
        age: ''
      },
      userForm: {},
      selectedOptions: [{
        value: '1',
        label: '年龄'
      }, {
        value: '2',
        label: '姓名'
      }]
    };
  },

  methods: {
    formatDate(row) {
      return new Date(row.date).toLocaleDateString();
    },
    handleSortChange(sortWay) {
      this.filters.sortWay = {
        prop: sortWay.prop,
        order: sortWay.order
      };
      this.fetchData();
    },

    handleEdit($index, row) {
      row = row || {};
      this.userForm = {};
      this.userForm.id = row.id;
      this.userForm.name = row.name;
      this.userForm.date = row.date;
      this.userForm.address = row.address;
      this.userDialog = true;
    },

    handleDelete($index, row) {
      this.$confirm('是否删除此条信息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeUser({
          id: row.id
        }).then(() => {
          this.fetchData();
          this.$message({
            message: '删除成功',
            type: 'success'
          });
        });
      });
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    handleSearch() {
      this.fetchData();
    },

    closeDialog(user) {
      this.userDialog = false;
      console.log(user);
    },

    handleCurrentChange(val) {
      this.fetchData(val);
    },

    fetchData(page) {
      function getTime(date, i) {
        return date && date[i] && date[i].getTime() || '';
      }
      // param: start time and end end time
      let options = {
        page: this.page = page || this.page || 0,
        userName: this.filters.labelVal === '2' ? this.filters.userName : null,
        startTime: getTime(this.filters.startEndTime, 0),
        endTime: getTime(this.filters.startEndTime, 1),
        sortWay: this.filters.sortWay || '',
        age: this.filters.labelVal === '1' ? parseInt(this.filters.age, 10) : null
      };

      this.loading = true;
      fetchList(options).then((res) => {
        // clear selection
        this.$refs.userTable.clearSelection();
        // lazy render data
        this.users = res.data.users;
        this.total = res.data.total;
        this.loading = false;
      });
    }
  },
  mounted() {
    this.fetchData();
  },
  components: {
    'db-add-item': AddItem
  }
};
</script>

<style lang="scss">
.list-filters-page {
  .filters {
    margin: 0 0 20px;
    border: 1px #efefef solid;
    padding: 10px;
    background: #f9f9f9;

    .filter {
      display: inline-block;
      max-width: 100%;
      padding: 10px;
    }

    .el-input {
      width: 150px;
      display: inline-block;
    }
    .el-date-editor--datetimerange {
      width: 350px;
    }
  }

  .pagination-wrapper {
    text-align: center;
    padding: 30px;
  }
}

// small device
@media (max-width: 444px) {
  .list-filters-page .filters {
    .filter, .el-select, .el-input {
      display: block;
    }
    .el-input {
      width: 100%;
    }
    .el-select + .el-input {
      margin-top: 10px;
    }
  }
  .el-date-range-picker__content, .el-date-range-picker__time-header {
    float: none;
    margin: 0 auto;
    width: 100% !important;
  }
}
</style>
