/**
 * Selfie2Anime <https://selfie2anime.com>
 * Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
 */

import "croppr/dist/croppr.min.css";

import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";

Vue.config.productionTip = false;

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");
