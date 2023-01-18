import * as PIXI from 'pixi.js';
import { gsap, Elastic, Sine, Bounce, Power0 } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';

gsap.registerPlugin(PixiPlugin);
PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x999999
});

const circles = [
    createCircle(100, 100),
    createCircle(100, 300),
    createCircle(100, 500)
];

document.body.appendChild(app.view as HTMLCanvasElement);
app.stage.addChild(...circles);

gsap.to(circles[0], { pixi: { x: 700 }, duration: 2, delay: 1 });
gsap.to(circles[0], { pixi: { scale: 1.5 }, duration: 1, delay: 1 });
gsap.to(circles[0], { pixi: { scale: 1 }, duration: 1, delay: 2 });

animateCircle(1, Power0.easeNone, Elastic.easeOut, Elastic.easeIn);
animateCircle(2, Sine.easeInOut, Bounce.easeOut, Bounce.easeIn);

function createCircle(x: number, y: number) {
    const circle = new PIXI.Graphics();
    circle.beginFill();
    circle.drawCircle(0, 0, 50);
    circle.endFill();

    circle.position.set(x, y);

    return circle
}

function animateCircle(indexOfCircle: number, movementEase: any, scaleUpEase: any, scaleDownEase: any) {
    gsap.to(circles[indexOfCircle], { pixi: { x: 700 }, duration: 2, delay: 1, ease: movementEase });
    gsap.to(circles[indexOfCircle], { pixi: { scale: 1.5 }, duration: 1, delay: 1, ease: scaleUpEase });
    gsap.to(circles[indexOfCircle], { pixi: { scale: 1 }, duration: 1, delay: 2, ease: scaleDownEase });
}