import Vue from 'vue';
import App from './App.vue';
import Navigation from './Navigation.vue';
import DashboardSidebar from './dashboard/Sidebar.vue';
import DashboardNavigation from './dashboard/Navigation.vue';
import Footer from './dashboard/Footer.vue';
import VueRouter from 'vue-router';
import { routes } from './router'; 
import store from './store';
import VueResource from 'vue-resource';
import VueSession from 'vue-session';

Vue.component('trustpay-navigation', Navigation);
Vue.component('dashboard-sidebar', DashboardSidebar);
Vue.component('dashboard-navigation', DashboardNavigation);
Vue.component('dashboard-footer', Footer);

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueSession);


const router = new VueRouter({
  routes: routes,
  mode: 'history'

});

new Vue({
  el: '#app',
  render: h => h(App),
  router: router,
  //store
})
