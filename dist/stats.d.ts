export declare const baseStats: {
    speed: number;
    health: number;
};
export declare const stats: {
    Bush: {
        radius: number;
        speed: number;
        health: number;
    };
    Gunner: {
        speed: number;
        health: number;
        radius: number;
    };
    Rock: {
        health: number;
        radius: number;
        speed: number;
    };
    Bullet: {
        radius: number;
        speed: number;
        health: number;
    };
};
export declare function getStats<T extends keyof typeof stats>(name: T): {
    Bush: {
        radius: number;
        speed: number;
        health: number;
    };
    Gunner: {
        speed: number;
        health: number;
        radius: number;
    };
    Rock: {
        health: number;
        radius: number;
        speed: number;
    };
    Bullet: {
        radius: number;
        speed: number;
        health: number;
    };
}[T];
//# sourceMappingURL=stats.d.ts.map