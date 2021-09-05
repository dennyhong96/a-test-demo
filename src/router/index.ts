import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

import ProductList from "@/views/products/ProductList.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: ProductList,
  },

  {
    path: "/products/:itemId",
    name: "ProductDetails",

    // Code split by route
    component: () =>
      import(/* webpackChunkName: "productDetails" */ "@/views/products/ProductDetails.vue"),
    props: true, // Accept any route parameters as props
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

export default router;
