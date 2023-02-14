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
        speed: 5,
        radius: 50,
    },
    Rock: {
        radius: 55,
    },
};
export default function getStats(name) {
    return structuredClone(stats[name]);
}
//# sourceMappingURL=stats.js.map