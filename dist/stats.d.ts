export declare const EntityStats: {
    speed: number;
    health: number;
};
export declare const GunStats: {
    amount: number;
    autoCD: number;
    isAuto: boolean;
    loadCD: number;
    tolerance: number;
    size: number;
};
export declare const MobStats: {
    speed: number;
    health: number;
    radius: number;
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
    Ak47: {
        isAuto: boolean;
        amount: number;
        autoCD: number;
        loadCD: number;
        tolerance: number;
        size: number;
    };
    Revolver: {
        amount: number;
        autoCD: number;
        loadCD: number;
        tolerance: number;
        size: number;
        isAuto: boolean;
    };
    Wolf: {
        speed: number;
        health: number;
        radius: number;
    };
    Spider: {
        speed: number;
        health: number;
        radius: number;
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
    Ak47: {
        isAuto: boolean;
        amount: number;
        autoCD: number;
        loadCD: number;
        tolerance: number;
        size: number;
    };
    Revolver: {
        amount: number;
        autoCD: number;
        loadCD: number;
        tolerance: number;
        size: number;
        isAuto: boolean;
    };
    Wolf: {
        speed: number;
        health: number;
        radius: number;
    };
    Spider: {
        speed: number;
        health: number;
        radius: number;
    };
}[T];
//# sourceMappingURL=stats.d.ts.map