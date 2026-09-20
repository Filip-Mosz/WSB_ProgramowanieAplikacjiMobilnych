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

    if (delay <= 15) {  //probably just arrived, but not yet stopped
        return {
            category: 'small',
            shouldAnimate: false,
        };
    }

    if (delay <= 45) { //probably in sight
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
