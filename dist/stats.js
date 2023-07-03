import structuredClone from '@ungap/structured-clone';
export const EntityStats = {
    speed: 0,
    health: 0,
};
export const GunStats = {
    amount: 0,
    autoCD: 0,
    isAuto: false,
    loadCD: 0,
    tolerance: 0,
    size: 30,
};
export const MobStats = {
    ...EntityStats,
    speed: 1,
    health: 100,
    radius: 80,
};
export const stats = {
    // Entity
    Bush: {
        ...EntityStats,
        radius: 50,
    },
    Gunner: {
        ...EntityStats,
        speed: 4,
        health: 100,
        radius: 40,
    },
    Rock: {
        ...EntityStats,
        health: 100,
        radius: 90,
    },
    Bullet: {
        ...EntityStats,
        radius: 10,
    },
    // Gun
    Ak47: {
        ...GunStats,
        isAuto: true,
        amount: 30,
        autoCD: 120,
        loadCD: 2000,
        tolerance: 64,
        size: 20,
    },
    Revolver: {
        ...GunStats,
        amount: 6,
        autoCD: 1000,
        loadCD: 1000,
        tolerance: 128,
        size: 30,
    },
    // Mob
    Wolf: {
        ...MobStats,
        speed: 1.5,
        health: 100,
        radius: 70,
    },
    Spider: {
        ...MobStats,
        speed: 1.7,
        health: 100,
        radius: 70,
    },
};
export function getStats(name) {
    if (!stats[name]) {
        throw new Error(`Stats for ${name} not found`);
    }
    return structuredClone(stats[name]);
}
//# sourceMappingURL=stats.js.map