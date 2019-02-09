/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";

import Login from "./components/LoginForm.vue";

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  linkActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login
    },
    {
      path: "/home",
      name: "home",
      component: () =>
        import(/* webpackChunkName: "home" */ "./views/Home.vue"),
      children: [
        {
          path: "list",
          name: "list",
          component: () =>
            import(/* webpackChunkName: "profile" */ "./views/List.vue")
        },
        {
          path: "profile",
          name: "profile",
          component: () =>
            import(/* webpackChunkName: "profile" */ "./views/Profile.vue")
        }
      ]
    }
  ]
});

export default router;
