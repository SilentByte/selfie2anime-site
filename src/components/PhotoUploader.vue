<!--
    Selfie2Anime <https://selfie2anime.com>
    Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
-->

<!--suppress HtmlFormInputWithoutLabel -->
<template>
    <div class="photo-uploader shadow-sm">
        <div class="row">
            <div v-show="step === 'drop'" class="drop-container col-sm">
                <div class="drop-container-inner">
                    <input id="photo-input"
                           type="file"
                           accept="image/*"
                           class="photo-input"
                           @change="onPhotoSelected" />
                    <label for="photo-input">
                        <span class="d-block text-uppercase">
                            What do <span class="text-primary font-weight-bold">YOU</span>
                            look like in <span class="text-primary font-weight-bold">anime</span>?
                        </span>
                        <i class="fa fa-cloud-upload fa-5x my-4 text-primary"></i>
                        <span class="d-block text-primary">
                            Upload a Photo
                        </span>
                    </label>
                </div>
            </div>
            <div v-show="step === 'crop'" class="crop-container col-sm">
                <div class="crop-container-inner text-center">
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
                <div class="text-center" style="margin: 50px">
                    <input type="text"
                           class="form-control"
                           placeholder="E-Mail"
                           v-model="email" />

                    <button type="button"
                            class="btn btn-primary btn-lg mt-3 p-3 text-uppercase"
                            @click="onUploadPhoto">
                        SEND (DEBUG)
                    </button>
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
        email = "";

        async onPhotoSelected(e: Event) {
            const file: File = (e.target as any).files[0];
            this.photoDataUrl = await fileToDataUrl(file);
            this.step = "crop";
        }

        onPhotoCropped() {
            this.step = "email";
            (this.$refs.cropper as any).getCropCoordinates();
        }

        onUploadPhoto() {
            // console.log(this.email);
            // console.log((this.$refs.cropper as any).getCropCoordinates());
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
