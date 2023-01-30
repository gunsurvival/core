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
import World from './world/World.js';
import Gunner from './entity/Gunner.js';
import Bush from './entity/Bush.js';
import Player from './player/Player.World.js';

const gunner = new Gunner();
const bush = new Bush();
const world = new World();
const player = new Player(gunner);
world.add(gunner);
world.add(bush);

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
			world.nextTick({});
			accumulator -= deltaTime;
			tick += deltaTime;
		}
	}
}
