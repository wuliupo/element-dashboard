<template lang="html">
  <div>
    <db-breadcrumb></db-breadcrumb>
    <db-add-item :userForm="userForm" :afterAddCallback="handleSave" class="db-content-inner"></db-add-item>
  </div>
</template>

<script>
import AddItem from 'src/components/add-item';
import {getUser} from 'src/api/api';

export default {
  data() {
    return {
      userForm: {
        id: '',
        name: '',
        time: '',
        address: ''
      }
    }
  },
  methods: {
    handleSave() {
      this.$router.push({path: '/list/filters'});
    }
  },
  mounted() {
    var params = this.$route.params;
    if (!params || !params.id) {
      return;
    }
    getUser(params).then((res) => {
      if (res && res.status === 200 && res.data) {
        this.userForm = res.data;
      }
    });
  },
  components: {
    'db-add-item': AddItem
  }
};
</script>
