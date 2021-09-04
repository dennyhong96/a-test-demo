import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import ProductsList from "@/views/products/ProductsList.vue";
import ProductDetails from "@/views/products/ProductDetails.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: ProductsList,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   // component: () =>
  //   //   import(/* webpackChunkName: "about" */ "../views/About.vue"),
  //   component: About,
  // },
  {
    path: "/products/:itemId",
    name: "ProductDetails",
    component: ProductDetails,
    props: true, // Accept any route parameters as props
  },
  // redirects
  // {
  //   path: "/all-jobs", // from
  //   redirect: "/jobs", // to
  // },
  // catch all
  // {
  //   path: "/:catchAll(.*)", // catch all other routes
  //   name: "NotFound",
  //   component: NotFound,
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
