import { createApp } from "vue";
import "reset-css";

import "@/theme/globalStyles.css";
import clickOutside from "@/lib/clickOutside";
import App from "@/App.vue";
import router from "@/router";
import store, { key } from "@/store";

createApp(App)
  .use(store, key)
  .use(router)
  .directive("click-outside", clickOutside)
  .mount("#app");
