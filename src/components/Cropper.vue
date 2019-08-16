<!--
    Selfie2Anime <https://selfie2anime.com>
    Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
-->

<!--suppress HtmlUnknownTarget -->
<template>
    <div class="col">
        <img ref="image"
             class="img-fluid"
             alt="Crop Image"
             src="@/assets/anonymous.png" />
    </div>
</template>

<!--suppress JSMethodCanBeStatic, JSUnusedGlobalSymbols -->
<script lang="ts">
    import {
        Component,
        Prop,
        Watch,
        Vue,
    } from "vue-property-decorator";

    import Croppr from "croppr";

    @Component
    export default class Cropper extends Vue {
        @Prop(String) readonly photoUrl: string | undefined;
        cropper!: Croppr;

        getCropCoordinates() {
            return this.cropper.getValue();
        }

        @Watch("photoUrl", {deep: true})
        onPhotoUrlChanged(value: string) {
            this.cropper.setImage(value);
        }

        mounted() {
            this.cropper = new Croppr(this.$refs.image as HTMLElement, {
                aspectRatio: 1.0,
                minSize: [50, 50],
            });
        }

        beforeDestroy() {
            this.cropper.destroy();
        }
    }
</script>

<style lang="scss" scoped>
    //
</style>
