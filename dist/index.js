//                         _ooOoo_
//                        o8888888o
//                        88" . "88
//                        (| -_- |)
//                        O\  =  /O
//                     ____/`---'\____
//                   .'  \\|     |//  `.
//                  /  \\|||  :  |||//  \
//                 /  _||||| -:- |||||_  \
//                 |   | \\\  -  /'| |   |
//                 | \_|  `\`---'//  |_/ |
//                 \  .-\__ `-. -'__/-.  /
//               ___`. .'  /--.--\  `. .'___
//            ."" '<  `.___\_<|>_/___.' _> \"".
//           | | :  `- \`. ;`. _/; .'/ /  .' ; |
//           \  \ `-.   \_\_`. _.'_/_/  -' _.' /
// ===========`-.`___`-.__\ \___  /__.-'_.'_.-'================
// export * as World from './world'
import player from './entity/Player.js';
import Entity from './entity/Entity.js';
import World from './world/World.js';
import { Circle } from 'detect-collisions';
const pl = new (player(Entity))(new Circle({ x: 1, y: 1 }, 30, {}));
const plq = new (player(Entity))(new Circle({ x: 61, y: 1 }, 30, {}));
const world = new World();
world.add(pl);
world.add(plq);
function simulate(tps = 64) {
    const deltaTime = 1000 / tps;
    let currentTime = performance.now();
    let accumulator = 0;
    let tick = 0;
    let frameTime = 0;
    while (true) {
        frameTime = performance.now() - currentTime;
        currentTime = performance.now();
        accumulator += frameTime;
        while (accumulator >= deltaTime) {
            world.nextTick(tick, deltaTime);
            accumulator -= deltaTime;
            tick += deltaTime;
        }
    }
}
//# sourceMappingURL=index.js.map