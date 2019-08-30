/**
 * Selfie2Anime <https://selfie2anime.com>
 * Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
 */

module.exports = {
    productionSourceMap: false,

    pluginOptions: {
        i18n: {
            locale: "en",
            fallbackLocale: "en",
            localeDir: "locales",
            enableInSFC: true,
        },
    },

    chainWebpack: config => {
        config.module
            .rule("i18n")
            .resourceQuery(/blockType=i18n/)
            .type("javascript/auto")
            .use("i18n")
            .loader("@kazupon/vue-i18n-loader")
            .end()
            .use("yaml")
            .loader("yaml-loader")
            .end();
    },
};
