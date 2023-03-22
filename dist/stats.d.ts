export declare const stats: {
    AIGunner: {
        health: number;
        speed: number;
    };
    Bush: {
        radius: number;
    };
    Gunner: {
        health: number;
        speed: number;
        radius: number;
    };
    Rock: {
        radius: number;
        health: number;
    };
    Bullet: {
        radius: number;
    };
};
export declare function getStats<T extends keyof typeof stats>(name: T): {
    AIGunner: {
        health: number;
        speed: number;
    };
    Bush: {
        radius: number;
    };
    Gunner: {
        health: number;
        speed: number;
        radius: number;
    };
    Rock: {
        radius: number;
        health: number;
    };
    Bullet: {
        radius: number;
    };
}[T];
//# sourceMappingURL=stats.d.ts.map