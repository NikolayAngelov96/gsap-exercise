import * as PIXI from 'pixi.js';
import { gsap } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x999999
});

document.body.appendChild(app.view as HTMLCanvasElement);

const boxes = [
    createBoxes(100, 300, { rotation: 360 }),
    createBoxes(300, 300, { blur: 10 }),
    createBoxes(500, 300, { skewX: 50 }),
    createBoxes(700, 300, { tint: 0xff0000 })
];

app.stage.addChild(...boxes);

function createBoxes(x: number, y: number, animatedProperty: object) {
    const square = new PIXI.Graphics();
    square.beginFill(0xffffff);
    square.drawRect(0, 0, 100, 100);
    square.endFill();

    square.position.set(x, y);
    square.pivot.set(50, 50);

    const anim = gsap.to(square, { pixi: animatedProperty, duration: 1, paused: true });
    square.interactive = true;

    square.on('pointertap', () => {
        if (anim.reversed()) {
            anim.play();
        } else {
            anim.reverse();
        }

    });

    return square;
}