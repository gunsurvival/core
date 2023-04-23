import structuredClone from '@ungap/structured-clone';
export const baseStats = {
    speed: 0,
    health: 0,
};
export const stats = {
    Bush: {
        ...baseStats,
        radius: 50,
    },
    Gunner: {
        ...baseStats,
        speed: 4,
        health: 100,
        radius: 40,
    },
    Rock: {
        ...baseStats,
        health: 100,
        radius: 90,
    },
    Bullet: {
        ...baseStats,
        radius: 10,
    },
};
export function getStats(name) {
    if (!stats[name]) {
        throw new Error(`Stats for ${name} not found`);
    }
    return structuredClone(stats[name]);
}
//# sourceMappingURL=stats.js.map