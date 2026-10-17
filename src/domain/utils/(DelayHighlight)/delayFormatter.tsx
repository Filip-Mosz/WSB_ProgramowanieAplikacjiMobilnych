export type DelayCategory = 'none' | 'small' | 'medium' | 'large';

export interface DelayInfo {
    category: DelayCategory;
    shouldAnimate: boolean;
    formattedText: string;
}

export const delayFormatter = (delay: number | null): DelayInfo => {
    if (delay === null || delay <= 0) {
        return {
            category: 'none',
            shouldAnimate: false,//add formatted text here
            formattedText: '',
        };
    }

    if (delay <= 60) {
        return {
            category: 'small',
            shouldAnimate: false,
            formattedText: `+${delay} s`,
        };
    }

    if (delay <= 120) {
        return {
            category: 'medium',
            shouldAnimate: true,
            formattedText: `+${delay} s`,
        };
    }

    return {
        category: 'large',
        shouldAnimate: true,
        formattedText: `+${delay} s`,
    };
};
