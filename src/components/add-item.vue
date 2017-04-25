<template lang="html">
  <el-form ref="userFormRef" :rules="rules" :model="userForm" label-width="70px" :item-id="userForm.id">
    <el-form-item label="姓名" prop="name">
      <el-input v-model="userForm.name" class="el-col-24"></el-input>
    </el-form-item>
    <el-form-item label="出生日期">
      <el-date-picker class="el-col-24" type="datetime" placeholder="选择日期时间"
        v-model="userForm.time">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="地址">
      <el-input v-model="userForm.address" class="el-col-24"></el-input>
    </el-form-item>
    <el-form-item class="form-submit">
      <el-button @click="endForm()">取 消</el-button>
      <el-button type="primary" @click="handleSave()">确 定</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  addUser,
  editUser
} from '../api/api';

export default {
  data() {
    return {
      rules: {
        name: [
          {required: true, message: '请输入姓名', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    handleSave() {
      this.$refs.userFormRef.validate(valid => {
        if (!valid) {
          return false;
        }
        console.log(JSON.stringify(this.userForm));
        (this.userForm.id ? editUser : addUser)(this.userForm).then(() => {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.endForm();
        });
      });
    },
    endForm() {
      this.$emit('afterAddEvent', this.userForm);
      this.afterAddCallback && this.afterAddCallback(this.userForm);
    }
  },

  props: {
    afterAddCallback: false,
    userForm: {
      type: Object,
      default: function () {
        return {
          id: '',
          name: '',
          time: '',
          address: ''
        }
      }
    }
  }
};
</script>
