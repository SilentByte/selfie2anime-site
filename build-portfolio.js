/**
 * Selfie2Anime <https://selfie2anime.com>
 * Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
 */

// Builds portfolio images and generates composites for the portfolio lightbox.

const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");
const glob = require("glob");
const Jimp = require("jimp");

const PORTFOLIO_SRC_DIR = "./public_assets/portfolio/";
const PORTFOLIO_DST_DIR = "./public/img/portfolio/";
const PORTFOLIO_TREE_DST_DIR = "./src/gen/portfolio-tree.gen.json";
const SIZE = 256;

function sha1(buffer) {
    const hash = crypto.createHash("sha1");
    hash.update(buffer);
    return hash.digest("hex");
}

async function generate() {
    const dirs = glob.sync(path.join(PORTFOLIO_SRC_DIR, "*"));
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    const box = new Jimp(135, 40, "#000000aa");

    let counter = 0;
    const portfolioTree = [];
    for(const filename of dirs) {
        let progress = ++counter / dirs.length * 100;
        console.log(`PROCESSING (${progress.toFixed(1).padStart(5)}%) ${filename}`);

        const compositeImage = new Jimp(SIZE * 2, SIZE);
        const [originalImage, ganImage] = await Promise.all([
            Jimp.read(path.join(filename, "original.jpg")),
            Jimp.read(path.join(filename, "gan.jpg")),
        ]);

        const [compositeBuffer, originalBuffer, ganBuffer] = await Promise.all([
            compositeImage.blit(originalImage.resize(SIZE, SIZE), 0, 0)
                .blit(ganImage.resize(SIZE, SIZE), SIZE, 0)
                .blit(box, 2 * SIZE - 135, SIZE - 18)
                .print(font, 2 * SIZE - 129, SIZE - 18, "selfie2anime.com")
                .getBufferAsync(Jimp.MIME_JPEG),
            originalImage.getBufferAsync(Jimp.MIME_JPEG),
            ganImage.getBufferAsync(Jimp.MIME_JPEG),
        ]);

        const originalSha1 = sha1(originalBuffer);
        const ganSha1 = sha1(ganBuffer);
        const compositeSha1 = sha1(compositeBuffer);

        const originalDst = path.join(PORTFOLIO_DST_DIR, originalSha1 + ".gen.jpg");
        const ganDst = path.join(PORTFOLIO_DST_DIR, ganSha1 + ".gen.jpg");
        const compositeDst = path.join(PORTFOLIO_DST_DIR, compositeSha1 + ".gen.jpg");

        await Promise.all([
            fs.writeFile(originalDst, originalBuffer),
            fs.writeFile(ganDst, ganBuffer),
            fs.writeFile(compositeDst, compositeBuffer),
        ]);

        portfolioTree.push({
            original: originalDst.replace("public/", ""),
            gan: ganDst.replace("public/", ""),
            composite: compositeDst.replace("public/", ""),
        });
    }

    await fs.writeFile(PORTFOLIO_TREE_DST_DIR, JSON.stringify(portfolioTree));
}

generate().then(() => {
    console.log("DONE");
});
