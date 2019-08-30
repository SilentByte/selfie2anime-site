/**
 * Selfie2Anime <https://selfie2anime.com>
 * Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
 */

import "croppr/dist/croppr.min.css";

import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import i18n from "@/i18n";

Vue.config.productionTip = false;

new Vue({
    router,
    i18n,
    render: (h) => h(App),
}).$mount("#app");
