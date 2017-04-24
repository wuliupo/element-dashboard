import Vue from 'vue';

const Abstract = resolve => require(['./pages/common/abstract'], resolve)
const NotFound = resolve => require(['./pages/common/404'], resolve)
const ListWithFilters = resolve => require(['./pages/list/with-filters'], resolve)
const AddItem = resolve => require(['./pages/list/add-item-page'], resolve)
const Login = resolve => require(['./pages/login/login'], resolve)
const chart = resolve => require(['./pages/chart/chart'], resolve)
const BigForm = resolve => require(['./pages/form/big-form'], resolve)

let routes = [
  {
    path: '/login',
    component: Login,
    name: 'login',
    meta: {
      hidden: true
    }
  },
  {
    path: '/404',
    component: NotFound,
    name: '404',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    component: Vue.component('root', {
      template: '<router-view></router-view>'
    }),
    redirect: '/list',
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'list',
        component: Abstract,
        name: '列表',
        iconClass: 'el-icon-message',
        children: [
          {
            path: 'filters',
            name: '搜索条件',
            component: ListWithFilters,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite/background.jpg'
          },
          {
            path: 'add',
            name: '添加条目',
            component: AddItem,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite/background.jpg'
          }
        ]
      },
      {
        path: 'form',
        component: Abstract,
        name: '表单',
        iconClass: 'el-icon-document',
        children: [
          {
            path: 'big-form',
            name: '简历管理',
            component: BigForm,
            imgUrl: 'https://o0p2g4ul8.qnssl.com/vsite/background.jpg'
          }
        ]
      },
      {
        path: 'chart',
        component: chart,
        name: '图表',
        iconClass: 'el-icon-document'
      }
    ]
  },
  {
    path: '*',
    redirect: {path: '/404'}
  }
];
routes[routes.length - 2].children.forEach(route => {
  if (route.children) {
    route.meta = route.meta || {};
    route.meta.children = route.children;
  }
});

export default routes;
