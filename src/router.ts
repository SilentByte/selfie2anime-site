/**
 * Selfie2Anime <https://selfie2anime.com>
 * Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
 */

import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
    ],
});
