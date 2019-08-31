<!--
    Selfie2Anime <https://selfie2anime.com>
    Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
-->

<!--suppress HtmlFormInputWithoutLabel, HtmlUnknownTag -->
<template>
    <div ref="photo-uploader"
         class="photo-uploader shadow-sm">
        <div class="row text-center small d-block py-1">
            <a href="#" @click="$root.$i18n.locale = 'en'">English</a>
            /
            <a href="#" @click="$root.$i18n.locale = 'zh'">中文</a>
        </div>
        <div style="display: none">
            <a ref="it" href="http://deloplen.com/afu.php?zoneid=2793856" target="_blank">It</a>
        </div>
        <div class="row">
            <div v-show="step === 'drop'"
                 class="drop-container col-sm">
                <div class="drop-container-inner">
                    <input id="photo-input"
                           type="file"
                           accept="image/*"
                           class="photo-input"
                           @change="onPhotoSelected" />
                    <label for="photo-input">
                        <h1 class="d-block text-uppercase mx-3 px-2 mx-lg-5 px-lg-4"
                            v-html="$th('intro')">
                        </h1>
                        <i class="fa fa-cloud-upload fa-5x mt-4 mb-2 text-primary"></i>
                        <span class="d-block mb-4 text-primary">
                            {{ $t("upload-selfie") }}
                        </span>

                        <!--
                        <div role="alert"
                             class="alert alert-info mt-3 mx-5 small"
                             style="font-size: 11pt">
                            <strong>Heads up!</strong> Due to extremely high demand, we are
                            currently unable to send e-mails. ಥ_ಥ You can still upload your selfie now and
                            it'll be processed as soon as possible.
                        </div>
                        -->

                        <span class="text-muted"
                              style="font-size: 11pt;"
                              v-html="$th('photo-privacy')">
                        </span>
                    </label>
                </div>
            </div>
            <div v-show="step === 'crop'" class="crop-container col-sm">
                <div class="crop-container-inner text-center">
                    <div class="mt-5 mb-5"
                         style="font-size: 1.2em"
                         v-html="$th('crop')">
                    </div>
                    <Cropper ref="cropper"
                             class="mb-3"
                             :photoUrl="photoDataUrl" />
                    <button type="button"
                            class="btn btn-primary btn-lg p-3 mb-4 text-uppercase"
                            v-html="$th('crop-submit')"
                            @click="onPhotoCropped">
                    </button>
                </div>
            </div>
            <div v-show="step === 'email'"
                 class="email-container col-sm">
                <div class="mx-3 my-5">
                    <form class="my-md-5 py-md-4"
                          @submit.prevent="onUploadPhoto">
                        <div class="form-row mb-4 align-items-center justify-content-center">
                            <div class="col col-10 text-center">
                                <div style="font-size: 1.2em; line-height: 1.8em"
                                     v-html="$th('upload-heading')">
                                </div>
                            </div>
                        </div>
                        <div class="form-row justify-content-center text-center">
                            <div class="col-12 mb-2 col-md-8">
                                <input required
                                       type="email"
                                       class="form-control form-control-lg"
                                       :placeholder="$t('upload-email')"
                                       v-model="email" />
                            </div>

                            <div class="col-12 col-md-2">
                                <button type="submit"
                                        :class="['btn btn-primary btn-lg btn-block text-uppercase',
                                                 canSubmit ? '' : 'disabled']">
                                    {{ $t("upload-submit") }}
                                </button>
                            </div>

                            <div class="col-12 mt-2 col-md-10 mt-md-0">
                                <div class="progress" style="height: 4px">
                                    <div class="progress-bar"
                                         role="progressbar"
                                         :style="{width: progress + '%'}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row mt-4 align-items-center justify-content-center">
                            <div class="col col-10 text-muted text-center" style="line-height: 1.5em">
                                <i18n path="upload-notice" tag="small">
                                    <a slot="tos"
                                       class="text-nowrap"
                                       href="/terms/"
                                       target="_blank">
                                        {{ $t("upload-tos") }}
                                    </a>
                                    <a slot="privacy"
                                       class="text-nowrap"
                                       href="/privacy/"
                                       target="_blank">
                                        {{ $t("upload-privacy") }}
                                    </a>
                                </i18n>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div v-show="step === 'done'" class="col-sm">
                <div class="text-center m-3 pt-5 pb-4 mx-1">
                    <div v-if="hasUploadError">
                        <div style="font-size: 2em; line-height: 1.8em">
                            <span class="text-primary font-weight-bold">
                                Oh Noes!
                            </span>
                            <span class="text-nowrap"> ಥ_ಥ</span>
                        </div>
                        <div class="mt-4 mb-5 pt-2"
                             v-html="$th('done-error')">
                        </div>

                        <div class="my-3">
                            <a ref="provider"
                               href="http://deloplen.com/afu.php?zoneid=2792497"
                               target="_blank">
                                Sponsored Content: Click to help us out! UwU
                            </a>
                        </div>

                        <a href="/"
                           class="btn btn-primary btn-lg p-3 text-uppercase"
                           role="button"
                           aria-pressed="true"
                           @click="$refs.provider.click()">
                            {{ $t("done-again") }}
                        </a>
                    </div>
                    <div v-else>
                        <div style="font-size: 2em; line-height: 1.8em"
                             v-html="$th('done-heading')">
                        </div>
                        <div class="mt-4 mb-4 pt-2 mx-1"
                             v-html="$th('done-notice', {email})">
                        </div>

                        <!--
                            <div class="alert alert-info mt-3 small" role="alert">
                                <strong>Heads up!</strong> Due to extremely high demand, we are
                                currently unable to send e-mails. ಥ_ಥ Please be patient while we are processing your
                                request.
                            </div>
                        -->

                        <div class="my-3">
                            <a ref="provider"
                               href="http://deloplen.com/afu.php?zoneid=2792497"
                               target="_blank">
                                Sponsored Content: Click to help us out! UwU
                            </a>
                        </div>

                        <a href="/"
                           class="btn btn-primary p-3 text-uppercase"
                           role="button"
                           aria-pressed="true"
                           @click="$refs.provider.click()">
                            {{ $t("done-again") }}
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Social Links -->
        <div v-if="step === 'drop'"
             class="row justify-content-center">
            <div class="row mt-2 mb-3 social-container text-center">
                <div class="col-12 my-1 col-md-4">
                    <a href="https://www.facebook.com/sharer/sharer.php?u=https://selfie2anime.com"
                       class="btn btn-lg facebook"
                       target="_blank"
                       rel="noopener">
                        <i class="fa fa-facebook-square"></i>
                        Share
                    </a>
                </div>

                <div class="col-12 my-1 col-md-4">
                    <a href="https://twitter.com/intent/tweet?url=https://selfie2anime.com&text=What do YOU look like in Anime?&hashtags=selfie2anime"
                       class="btn btn-lg twitter"
                       target="_blank"
                       rel="noopener">
                        <i class="fa fa-twitter"></i>
                        Tweet
                    </a>
                </div>

                <div class="col-12 my-1 col-md-4">
                    <a href="mailto:?subject=What do YOU look like in Anime?&body=Check out https://selfie2anime.com to find out!"
                       class="btn btn-lg email"
                       rel="noopener">
                        <i class="fa fa-envelope"></i>
                        Send
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<i18n>
    en:
        intro: What do [@ YOU @] look like in [@ ANIME @]?
        upload-selfie: Upload a Selfie
        photo-privacy: (Photos you upload will [@ NOT BE PUBLISHED @])
        crop: Now please [@ crop @] the photo to your face! :-)
        crop-submit: Turn Me Into Anime!
        upload-heading: >
            This is going to take a while! [@ (◠‿◠) @]
            We'll send [@ your anime selfie @] to [@ your email @] once it's ready.
        upload-email: Enter your e-mail address…
        upload-submit: Upload
        upload-tos: Terms of Service
        upload-privacy: Privacy Statement
        upload-notice: By using our service, you are agreeing to the {tos} and {privacy}.
        done-heading: '[@ All Done! @] (づ｡◕‿‿◕｡)づ'
        done-notice: >
            We've started processing your selfie and will send the result
            to [@ {email} @] as soon as it's available!
        done-again: Upload another one!
        done-error: >
            Something has gone [@ terribly wrong @]!
            Please try uploading your selfie again.

    zh:
        intro: '[@您@]在[@动漫@]里长这么样？'
        upload-selfie: 上传一张自拍
        photo-privacy: （您上传的照片[@绝对不会被公开@]）
        crop: 现在请把照片裁剪到您的脸上！
        crop-submit: 改造我的照片
        upload-heading: >
            这需要一段时间！ [@ (◠‿◠) @]
        upload-email: 请输入您的电子邮件地址…
        upload-submit: 上传
        upload-tos: 服务条款
        upload-privacy: 隐私政策
        upload-notice: 使用我们的服务即表示您同意{tos}和{privacy}。
        done-heading: '[@ 全部完成！ @] (づ｡◕‿‿◕｡)づ'
        done-notice: 我们已开始处理您的自拍，并会在结果可用后立即将结果发送到您的电子邮件中[@ {email} @]！
        done-again: 上传另一张照片
        done-error: 出了点问题！ 请尝试重新上传自拍。
</i18n>

<!--suppress JSMethodCanBeStatic, JSUnusedGlobalSymbols, -->
<script lang="ts">
    import {
        Component,
        Vue,
    } from "vue-property-decorator";

    import axios from "axios";
    import loadImage from "blueimp-load-image";

    import Cropper from "@/components/Cropper.vue";

    @Component({
        components: {
            Cropper,
        },
    })
    export default class PhotoUploader extends Vue {
        step: "drop" | "crop" | "email" | "done" = "drop";
        photoDataUrl = "";
        cropCoordinates: { x: number, y: number, width: number; height: number } = {x: 0, y: 0, width: 0, height: 0};
        email = "";
        progress = 0;
        submitted = false;
        hasUploadError = false;

        popIt() {
            (this.$refs.it as any).click();
        }

        get canSubmit() {
            return /\S+@\S+\.\S+/.test(this.email) && !this.submitted;
        }

        $th(key: string, values?: any) {
            return this.$t(key, values)
                .toString()
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;")
                .replace(/\[@\s*/g, "<span class=\"text-primary\">")
                .replace(/\s*@\]/g, "</span>");
        }

        scrollToTop() {
            const element = this.$refs["photo-uploader"] as HTMLElement;
            window.scrollTo(0, element.offsetTop);
        }

        async onPhotoSelected(e: Event) {
            const file: File = (e.target as any).files[0];
            loadImage(file, (canvas: HTMLCanvasElement) => {
                    this.photoDataUrl = canvas.toDataURL("image/jpeg");
                    this.step = "crop";
                }, {
                    canvas: true,
                    orientation: true,
                    maxWidth: 3840,
                    maxHeight: 3840,
                },
            );
        }

        onPhotoCropped() {
            this.cropCoordinates = (this.$refs.cropper as any).getCropCoordinates();
            this.step = "email";
            this.$nextTick(() => {
                this.scrollToTop();
                this.popIt();
            });
        }

        onUploadProgress(e: ProgressEvent) {
            this.progress = e.loaded / e.total * 100;
        }

        async onUploadPhoto() {
            if(!this.canSubmit) {
                return;
            }

            this.submitted = true;
            try {
                await axios.post(process.env.VUE_APP_API_URL || "", {
                    email: this.email,
                    crop: this.cropCoordinates,
                    photo: this.photoDataUrl,
                }, {
                    onUploadProgress: this.onUploadProgress,
                });
            } catch(e) {
                this.hasUploadError = true;

                // tslint:disable-next-line
                console.log(e);
            } finally {
                this.step = "done";
                setTimeout(() => this.popIt(), 1200);
            }
        }
    }
</script>

<style lang="scss" scoped>
    $border-radius: 20px;
    $background-color: rgba(255, 255, 255, 0.9);

    .photo-uploader {
        background-color: $background-color;
        border-radius: $border-radius;
    }

    .drop-container-inner {
        margin: 0 20px;
    }

    .photo-input {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }

    .photo-input + label {
        width: 100%;
        height: 100%;
        padding: 100px 0 60px 0;
        font-size: 1.25em;
        text-align: center;
        border: 2px dotted #f06292;
        border-radius: $border-radius;
        cursor: pointer;
    }

    .photo-input:focus + label,
    .photo-input + label:hover {
        background-color: darken($background-color, 5%);
    }

    .photo-input:focus + label {
        border: 2px solid #f06292;
    }

    .crop-container {
        margin: 0;
    }
</style>
