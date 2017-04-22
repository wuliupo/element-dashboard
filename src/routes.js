import Vue from 'vue';
import Abstract from './pages/common/abstract';
import NotFound from './pages/common/404';

// list with filters page
import ListWithFilters from './pages/list/with-filters';
import BigForm from './pages/form/big-form';
import Login from './pages/login/login';
import chart from './pages/chart/chart';

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
