import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/product/create",
    name: "CreateProduct",
    meta: { authOnly: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CreateProduct.vue")
  },
  {
    path: "/product/:id",
    name: "ShowProduct",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ShowProduct.vue")
  },
  {
    path: "/product/:id/edit",
    name: "UpdateProduct",
    meta: { authOnly: true },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/UpdateProduct.vue")
  },
  {
    path: "/login",
    name: "Login",
    meta: { guestOnly: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/Auth/Login.vue")
  },
  {
    path: "/user/register",
    name: "Register",
    meta: { guestOnly: true },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import("../views/Auth/Register.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

function isLoggedIn() {
  return localStorage.getItem('token');
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    if (!isLoggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    if (isLoggedIn()) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      })
    } else {
      next();
    }
  } else {
    next();
  }
})

export default router;
