/**
 * Selfie2Anime <https://selfie2anime.com>
 * Copyright (c) 2019 by SilentByte <https://www.silentbyte.com/>
 */

// Builds portfolio images and generates composites for the portfolio lightbox.

const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");
const glob = require("glob");
const del = require("del");
const fx = require("mkdir-recursive");
const Jimp = require("jimp");
const guetzli = require("imagemin-guetzli");

const PORTFOLIO_SRC_DIR = "./public_assets/portfolio/";
const PORTFOLIO_DST_DIR = "./public/gen/portfolio/";
const PORTFOLIO_TREE_DST_DIR = "./src/gen/portfolio-tree.gen.json";

const COMPOSITE_SIZE = 256;
const PORTFOLIO_SIZE = 160;

const QUALITY = 90;

function sha1(buffer) {
    const hash = crypto.createHash("sha1");
    hash.update(buffer);
    return hash.digest("hex");
}

function rgbToCssHex(r, g, b) {
    return "#" + r.toString(16).padStart(2, "0")
        + g.toString(16).padStart(2, "0")
        + b.toString(16).padStart(2, "0");
}

async function generate() {
    fx.mkdirSync(PORTFOLIO_DST_DIR, undefined);
    del.sync(path.join(PORTFOLIO_DST_DIR, "*.gen.jpg"));

    const dirs = glob.sync(path.join(PORTFOLIO_SRC_DIR, "*"));
    const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
    const box = new Jimp(135, 40, "#000000aa");

    let counter = 0;
    const portfolioTree = [];
    for(const filename of dirs) {
        let progress = ++counter / dirs.length * 100;
        console.log(`PROCESSING (${progress.toFixed(1).padStart(5)}%) ${filename}`);

        const compositeImage = new Jimp(COMPOSITE_SIZE * 2, COMPOSITE_SIZE);
        const [originalImage, ganImage] = await Promise.all([
            Jimp.read(path.join(filename, "original.jpg")),
            Jimp.read(path.join(filename, "gan.jpg")),
        ]);

        let [compositeBuffer, originalBuffer, ganBuffer] = await Promise.all([
            compositeImage
                .blit(new Jimp(originalImage).resize(COMPOSITE_SIZE, COMPOSITE_SIZE), 0, 0)
                .blit(new Jimp(ganImage).resize(COMPOSITE_SIZE, COMPOSITE_SIZE), COMPOSITE_SIZE, 0)
                .blit(box, 2 * COMPOSITE_SIZE - 135, COMPOSITE_SIZE - 18)
                .print(font, 2 * COMPOSITE_SIZE - 129, COMPOSITE_SIZE - 18, "selfie2anime.com")
                .getBufferAsync(Jimp.MIME_JPEG),
            originalImage
                .resize(PORTFOLIO_SIZE, PORTFOLIO_SIZE)
                .getBufferAsync(Jimp.MIME_JPEG),
            ganImage
                .resize(PORTFOLIO_SIZE, PORTFOLIO_SIZE)
                .getBufferAsync(Jimp.MIME_JPEG),
        ]);

        if(!process.env.DISABLE_IMAGE_OPTIMIZATION) {
            [compositeBuffer, originalBuffer, ganBuffer] = await Promise.all([
                guetzli({quality: QUALITY})(compositeBuffer),
                guetzli({quality: QUALITY})(originalBuffer),
                guetzli({quality: QUALITY})(ganBuffer),
            ]);
        }

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

        const thumb = Jimp.intToRGBA(ganImage.resize(1, 1).getPixelColor(0, 0));
        portfolioTree.push({
            original: originalDst.replace("public/", ""),
            gan: ganDst.replace("public/", ""),
            composite: compositeDst.replace("public/", ""),
            size: PORTFOLIO_SIZE,
            thumb: rgbToCssHex(thumb.r, thumb.g, thumb.b),
        });
    }

    await fs.writeFile(PORTFOLIO_TREE_DST_DIR, JSON.stringify(portfolioTree, null, 4));
}

if(process.env.DISABLE_PORTFOLIO_BUILD) {
    console.log("SKIPPING PORTFOLIO BUILD");
} else {
    generate().then(() => {
        console.log("DONE");
    });
}
