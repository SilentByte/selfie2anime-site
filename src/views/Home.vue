<!--
    Selfie2Anime <https://selfie2anime.com>
    Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
-->

<!--suppress HtmlUnknownAnchorTarget -->
<template>
    <div id="home">
        <!-- Navigation -->
        <nav id="mainNav"
             class="navbar navbar-expand-lg navbar-light fixed-top py-3">
            <div class="container">
                <a href="#home" class="navbar-brand js-scroll-trigger">
                    Selfie2Anime <span class="navbar-brand-inverted">アニメ</span>
                </a>
                <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ml-auto my-2 my-lg-0">
                        <li class="nav-item">
                            <a href="#home" class="nav-link js-scroll-trigger">Home</a>
                        </li>
                        <li class="nav-item">
                            <a href="#about" class="nav-link js-scroll-trigger">About</a>
                        </li>
                        <li class="nav-item">
                            <a href="#portfolio" class="nav-link js-scroll-trigger">Portfolio</a>
                        </li>
                        <li class="nav-item">
                            <a href="#contact" class="nav-link js-scroll-trigger">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        <!-- Masthead -->
        <header class="masthead">
            <div class="container h-100">
                <div class="row h-100 align-items-center justify-content-center">
                    <div class="col-lg-10 align-self-center">
                        <PhotoUploader />
                    </div>
                </div>
            </div>
        </header>

        <!-- About Section -->
        <section id="about" class="page-section">
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-lg-8 text-center">
                        <h2 class="mt-0" style="font-size: 3em">
                            What do <span class="text-primary font-weight-bold">YOU</span>
                            look like in <span class="text-primary font-weight-bold">anime</span>?
                        </h2>
                        <a href="#home"
                           class="mt-5 btn btn-primary px-5 btn-xl js-scroll-trigger"
                           style="font-size: 2rem">
                            Give it a try!
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Portfolio Section -->
        <section id="portfolio" class="bg-dark">
            <div class="container-fluid p-0">
                <div class="row no-gutters">
                    <div v-for="i in 96"
                         class="col-lg-1 col-md-2 col-sm-3 col-4">
                        <a class="portfolio-box" :href="`./img/portfolio/composite/${i}.jpg`">
                            <img class="img-fluid mx-auto d-block"
                                 :src="`./img/portfolio/gan/${i}.jpg`" alt="">
                            <div class="portfolio-box-caption">
                                <img class="img-fluid" :src="`./img/portfolio/original/${i}.jpg`" alt="">
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="page-section">
            <div class="container">
                <div class="row justify-content-center mb-4">
                    <div class="col-lg-8 text-center">
                        <h2 class="mt-0">Want to get in touch?</h2>
                        <hr class="divider my-4">
                        <p class="text-muted mb-5">
                            Follow us on Twitter and Github to find out what other
                            projects we're working on or drop us an email if you
                            have any questions!
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
                        <i style="color: #38a1f3" class="fa fa-twitter fa-5x mb-3"></i>
                        <a class="d-block" href="https://twitter.com/RicoBeti">@RicoBeti</a>
                        <a class="d-block" href="https://twitter.com/nathangloverAUS">@nathangloverAUS</a>
                    </div>

                    <div class="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
                        <i style="color: #211f1f" class="fa fa-github fa-5x mb-3"></i>
                        <a class="d-block" href="https://github.com/SilentByte">@SilentByte</a>
                        <a class="d-block" href="https://github.com/t04glovern">@t04glovern</a>
                    </div>

                    <div class="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
                        <i style="color: #f06292" class="fa fa-envelope fa-5x mb-3"></i>
                        <a class="d-block" href="mailto:info@selfie2anime.com">info@selfie2anime.com</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-light py-5">
            <div class="container">
                <div class="small text-center text-muted">
                    Copyright &copy; 2019 by
                    <a href="https://twitter.com/RicoBeti">Rico Beti</a>
                    &amp;
                    <a href="https://twitter.com/nathangloverAUS">Nathan Glover</a>
                </div>
            </div>
        </footer>
    </div>
</template>

<!--suppress JSMethodCanBeStatic, JSUnusedGlobalSymbols, TypeScriptCheckImport -->
<script lang="ts">
    import {
        Component,
        Vue,
    } from "vue-property-decorator";

    import * as creative from "@/vendor/creative";

    import PhotoUploader from "@/components/PhotoUploader.vue";

    @Component({
        components: {
            PhotoUploader,
        },
    })
    export default class Home extends Vue {
        mounted() {
            creative.init(jQuery);
        }
    }
</script>

<style lang="scss" scoped>
    .nav-item, .page-section h2 {
        text-transform: uppercase;
    }

    .nav-item .nav-link {
        font-size: 1.2rem !important;
    }

    .navbar-brand {
        font-size: 1.7rem !important;
    }

    .navbar-brand-inverted {
        color: #f06292;
    }

    #mainNav {
        background: rgba(30, 30, 30, 0.8);
    }

    #mainNav.navbar-scrolled {
        background: #fff;

        .navbar-brand {
            color: #f06292;
        }

        .navbar-brand-inverted {
            color: #212529;
        }
    }

    #portfolio .container-fluid {
        max-width: 12 * 256px;
    }

    .portfolio-box-caption {
        -webkit-transition: opacity 0.75s ease !important;
        transition: opacity 0.75s ease !important;;
    }
</style>
