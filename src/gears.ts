import * as PIXI from 'pixi.js';
import { gsap, Linear } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x999999
});

document.body.appendChild(app.view as HTMLCanvasElement);


const srcs = {
    gear12: 'assets/gear12.png',
    gear16: 'assets/gear16.png',
    gear20: 'assets/gear20.png',
    gear24: 'assets/gear24.png',
    gear28: 'assets/gear28.png',
    gear40: 'assets/gear40.png',
    gearbox: 'assets/gearbox.png',
    speedNormal: 'assets/speed-normal.png',
    speedFast: 'assets/speed-fast.png',
    speedFaster: 'assets/speed-faster.png',
    speedPaused: 'assets/speed-paused.png',
};

type KeysOfSrc = keyof typeof srcs;
type LoadedAssets = Record<KeysOfSrc, PIXI.Texture>;

PIXI.Assets.addBundle('gears', srcs);

const tl = gsap.timeline();

PIXI.Assets.loadBundle('gears').then(onAssetsLoad);

async function onAssetsLoad(assets: LoadedAssets) {
    const gear40 = spawnGear(assets.gear40, 400, 300, 'cw', 20);
    const gear12 = spawnGear(assets.gear12, 300, 117, 'ccw', 6);
    const gear28 = spawnGear(assets.gear28, 142, 130, 'cw', 14);
    const gear16 = spawnGear(assets.gear16, 542, 471, 'ccw', 8);
    const gear24 = spawnGear(assets.gear24, 676, 388, 'cw', 12);
    const gear20 = spawnGear(assets.gear20, 212, 441, 'ccw', 10);

    const gearbox = spawnGearbox(assets.gearbox, gear40.x, gear40.y);

    spawnControlButtons(gearbox, assets.speedPaused, -57, pause);
    spawnControlButtons(gearbox, assets.speedNormal, -20, normal);
    spawnControlButtons(gearbox, assets.speedFast, 20, fast);
    spawnControlButtons(gearbox, assets.speedFaster, 57, faster);

    app.stage.addChild(gear40, gear12, gear28, gear16, gear24, gear20, gearbox);

}

function spawnGear(texture: PIXI.Texture, x: number, y: number, rotatingDirection: string, animationDuration: number) {
    const sprite = new PIXI.Sprite(texture);
    sprite.anchor.set(0.5);
    sprite.position.set(x, y);

    tl.to(sprite, { pixi: { rotation: 360 * (rotatingDirection == 'cw' ? 1 : -1) }, duration: animationDuration, repeat: -1, ease: Linear.easeNone }, 1);

    return sprite;
}

function spawnControlButtons(parent: PIXI.Sprite, btnTexture: PIXI.Texture, x: number, onClickCallback: () => void) {
    const btn = new PIXI.Sprite(btnTexture);
    btn.anchor.set(0.5);
    btn.x = x;

    btn.interactive = true;
    btn.on('pointertap', onClickCallback);

    parent.addChild(btn);
}

function spawnGearbox(texture: PIXI.Texture, x: number, y: number) {
    const gearbox = new PIXI.Sprite(texture);
    gearbox.anchor.set(0.5);
    gearbox.position.set(x, y);


    return gearbox;
}

function pause() {
    tl.pause();
};

function normal() {
    tl.timeScale(1);
    tl.play();
};

function fast() {
    tl.timeScale(2);
    tl.play();
}

function faster() {
    tl.timeScale(4);
    tl.play();
}
