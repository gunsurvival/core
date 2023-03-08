import structuredClone from '@ungap/structured-clone';
const stats = {
    AIGunner: {
        health: 100,
        speed: 5,
    },
    Bush: {
        radius: 50,
    },
    Gunner: {
        health: 100,
        speed: 4,
        radius: 50,
    },
    Rock: {
        radius: 90,
    },
    Bullet: {
        radius: 10,
    },
};
export default function getStats(name) {
    if (!stats[name]) {
        throw new Error(`Stats for ${name} not found`);
    }
    return structuredClone(stats[name]);
}
//# sourceMappingURL=stats.js.map