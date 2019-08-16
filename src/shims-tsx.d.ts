/**
 * Selfie2Anime <https://selfie2anime.com>
 * Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
 */

import Vue, { VNode } from "vue";

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {
            //
        }

        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {
            //
        }

        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}
