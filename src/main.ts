import { createApp } from "vue";
import "reset-css";
import "@/theme/globalStyles.css";

import App from "@/App.vue";
import router from "@/router";
import store, { key } from "@/store";

createApp(App)
  .use(store, key)
  .use(router)
  .mount("#app");
