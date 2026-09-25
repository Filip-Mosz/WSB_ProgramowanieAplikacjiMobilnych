export type DelayCategory = 'none' | 'small' | 'medium' | 'large';

export interface DelayInfo {
    category: DelayCategory;
    shouldAnimate: boolean;
}

export const delayFormatter = (delay: number | null): DelayInfo => {
    if (delay === null || delay <= 0) {
        return {
            category: 'none',
            shouldAnimate: false,
        };
    }

    if (delay <= 60) {
        return {
            category: 'small',
            shouldAnimate: false,
        };
    }

    if (delay <= 120) {
        return {
            category: 'medium',
            shouldAnimate: true,
        };
    }

    return {
        category: 'large',
        shouldAnimate: true,
    };
};
