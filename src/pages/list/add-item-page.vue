<template lang="html">
  <div>
    <db-breadcrumb></db-breadcrumb>
    <db-add-item :userForm="userForm" :afterAddCallback="handleSave" class="db-content-inner"></db-add-item>
  </div>
</template>

<script>
const AddItem = resolve => require(['../../components/add-item'], resolve)

export default {
  data() {
    return {
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
  },
  methods: {
    handleSave() {
      this.$router.push({path: '/list/filters'});
    }
  },
  components: {
    'db-add-item': AddItem
  }
};
</script>
