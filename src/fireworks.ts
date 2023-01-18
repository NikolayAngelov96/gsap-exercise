import * as PIXI from 'pixi.js';
import { gsap, Power2 } from 'gsap';
import { PixiPlugin } from 'gsap/PixiPlugin';
import { FederatedPointerEvent } from 'pixi.js';

gsap.registerPlugin(PixiPlugin);

PixiPlugin.registerPIXI(PIXI);

const app = new PIXI.Application({
    width: 800,
    height: 600,
});

const background = new PIXI.Graphics();
background.beginFill();
background.drawRect(0, 0, 800, 600);
background.endFill();

app.stage.addChild(background);

background.interactive = true;
background.on('pointertap', ({ globalX: x, globalY: y }: FederatedPointerEvent) => {
    const fire = firework(x, y, randomColor());

    app.stage.addChild(fire);
})


document.body.appendChild(app.view as HTMLCanvasElement);

function particle(color: number, parent: PIXI.Container) {
    const gr = new PIXI.Graphics();
    gr.beginFill(0xffffff);
    gr.drawRect(0, 0, 4, 4);
    gr.pivot.set(2, 2);
    gr.endFill();

    gsap.fromTo(
        gr,
        { pixi: { scale: 0, tint: color }, duration: 1 },
        { pixi: { x: 'random(-100,100)', y: 'random(-100, 100)', rotation: 1440, scale: 2, blur: 1, tint: 0 }, duration: 2, delay: 1 }
    );

    parent.addChild(gr);
}

function firework(x: number, y: number, color: number) {
    const container = new PIXI.Container();
    container.position.set(x, y);

    for (let i = 0; i < 100; i++) {
        particle(color, container);
    };

    gsap.to(container, {
        pixi: { y: '+=100' }, duration: 2, ease: Power2.easeIn, onComplete: () => {
            container.destroy();
        }
    });

    return container;
}

function randomColor() {
    return ((Math.random() * 256 | 0) << 16) + ((Math.random() * 256 | 0) << 8) + (Math.random() * 256 | 0);
}
