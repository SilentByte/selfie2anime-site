<!--
    Selfie2Anime <https://selfie2anime.com>
    Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
-->

<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style lang="scss">
    body {
        font-size: 16pt;
        line-height: 1.75em;
    }

    .social-container .btn {
        min-width: 160px;
        text-transform: uppercase;
        white-space: nowrap;
        color: #fff;

        .fa {
            margin-right: 0.25em;
        }

        &.facebook {
            background-color: #3b5998;

            &:hover {
                background-color: #556fbb;
            }
        }

        &.twitter {
            background-color: #38a1f3;

            &:hover {
                background-color: #269ce5;
            }
        }

        &.email {
            background-color: #444;

            &:hover {
                background-color: #555;
            }
        }
    }
</style>
