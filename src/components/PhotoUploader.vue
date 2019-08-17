<!--
    Selfie2Anime <https://selfie2anime.com>
    Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
-->

<!--suppress HtmlFormInputWithoutLabel -->
<template>
    <div ref="photo-uploader" class="photo-uploader shadow-sm">
        <div class="row">
            <div v-show="step === 'drop'" class="drop-container col-sm">
                <div class="drop-container-inner">
                    <input id="photo-input"
                           type="file"
                           accept="image/*"
                           class="photo-input"
                           @change="onPhotoSelected" />
                    <label for="photo-input">
                        <h1 class="d-block text-uppercase mx-3 px-2 mx-lg-5 px-lg-4" style="font-size: 2.2em;">
                            What do <span class="text-primary font-weight-bold">YOU</span>
                            look like in <span class="text-primary font-weight-bold">anime</span>?
                        </h1>
                        <i class="fa fa-cloud-upload fa-5x my-4 text-primary"></i>
                        <span class="d-block text-primary">
                            Upload a Photo
                        </span>
                    </label>
                </div>
            </div>
            <div v-show="step === 'crop'" class="crop-container col-sm">
                <div class="crop-container-inner text-center">
                    <div class="mt-5 mb-4" style="font-size: 1.2em">
                        Now please <span class="text-primary font-weight-bold">crop</span>
                        the photo to your <span class="text-primary font-weight-bold">face</span> only!
                    </div>
                    <Cropper ref="cropper"
                             class="mb-3"
                             :photoUrl="photoDataUrl" />
                    <button type="button"
                            class="btn btn-primary btn-lg p-3 text-uppercase"
                            @click="onPhotoCropped">
                        Turn me into anime!
                    </button>
                </div>
            </div>
            <div v-show="step === 'email'" class="email-container col-sm">
                <div style="margin: 50px">
                    <form>
                        <div class="form-row mb-4 align-items-center justify-content-center">
                            <div class="col col-10 text-center">
                                <div style="font-size: 1.2em; line-height: 1.8em">
                                    This is going to take a while!
                                    <span class="text-primary text-nowrap font-weight-bold">(◠‿◠)</span>
                                    We'll send <span class="text-primary font-weight-bold">your anime selfie</span>
                                    to <span class="text-primary font-weight-bold">your email</span> once it's ready.
                                </div>
                            </div>
                        </div>
                        <div class="form-row align-items-center justify-content-center">
                            <div class="col col-10">
                                <div class="input-group mb-2">
                                    <input type="email"
                                           class="form-control form-control-lg"
                                           placeholder="Enter your e-mail address..."
                                           v-model="email" />
                                    <div class="input-group-append">
                                        <button type="button"
                                                class="btn btn-primary px-5 text-uppercase"
                                                @click="onUploadPhoto">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<!--suppress JSMethodCanBeStatic, JSUnusedGlobalSymbols, -->
<script lang="ts">
    import {
        Component,
        Vue,
    } from "vue-property-decorator";

    import axios from "axios";
    import Cropper from "@/components/Cropper.vue";

    function fileToDataUrl(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onerror = reject;
            reader.onload = () => {
                resolve(reader.result as string);
            };
            reader.readAsDataURL(file);
        });
    }

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

        scrollToTop() {
            const element = this.$refs["photo-uploader"] as HTMLElement;
            window.scrollTo(0, element.offsetTop);
        }

        async onPhotoSelected(e: Event) {
            const file: File = (e.target as any).files[0];
            this.photoDataUrl = await fileToDataUrl(file);
            this.step = "crop";
        }

        onPhotoCropped() {
            this.cropCoordinates = (this.$refs.cropper as any).getCropCoordinates();
            this.step = "email";
            this.$nextTick(() => this.scrollToTop());
        }

        onUploadProgress(e: ProgressEvent) {
            // TODO: Implement progress.
            console.log(e);
        }

        async onUploadPhoto() {
            const result = await axios.post(process.env.VUE_APP_API_URL, {
                email: this.email,
                crop: this.cropCoordinates,
                photo: this.photoDataUrl,
            }, {
                onUploadProgress: this.onUploadProgress,
            });

            // TODO: Implement error handling.
        }
    }
</script>

<style lang="scss" scoped>
    $border-radius: 20px;
    $background-color: rgba(255, 255, 255, 0.85);

    .photo-uploader {
        background: $background-color;
        border-radius: $border-radius;
    }

    .drop-container-inner {
        margin: 20px;
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
        padding: 120px 0;
        font-size: 1.25em;
        text-align: center;
        border: 2px dotted #f4623a;
        border-radius: $border-radius;
        cursor: pointer;
    }

    .photo-input:focus + label,
    .photo-input + label:hover {
        background-color: darken($background-color, 5%);
    }

    .photo-input:focus + label {
        border: 2px solid #f4623a;
    }

    .crop-container {
        margin: 0;
    }

    .crop-container-inner {
        margin: 20px;
    }
</style>
