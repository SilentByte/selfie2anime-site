/**
 * Selfie2Anime <https://selfie2anime.com>
 * Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
 */

// Generates composite images for the portfolio lightbox.

const path = require("path");
const glob = require("glob");
const Jimp = require("jimp");

const ORIGINAL_DIR = "./public/img/portfolio/original";
const GAN_DIR = "./public/img/portfolio/gan";
const COMPOSITE_DIR = "./public/img/portfolio/composite";
const SIZE = 256;

async function generate() {
    const originals = glob.sync(path.join(ORIGINAL_DIR, "*.jpg"));
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    const box = new Jimp(135, 40, "#000000AA");

    let counter = 0;
    for(const filename of originals) {
        let progress = ++counter / originals.length * 100;
        console.log(`PROCESSING (${progress.toFixed(1).padStart(5)}%) ${path.basename(filename)}`);

        let o = await Jimp.read(filename);
        let g = await Jimp.read(path.join(GAN_DIR, path.basename(filename)));
        const n = new Jimp(SIZE * 2, SIZE);

        await n.blit(o.resize(SIZE, SIZE), 0, 0)
            .blit(g.resize(SIZE, SIZE), SIZE, 0)
            .blit(box, 2 * SIZE - 135, SIZE - 18)
            .print(font, 2 * SIZE - 129, SIZE - 18, "selfie2anime.com")
            .writeAsync(path.join(COMPOSITE_DIR, path.basename(filename)));
    }
}

generate().then(() => {
    console.log("DONE");
});
