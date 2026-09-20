import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text, TextStyle,
    ViewStyle,
} from 'react-native';

import { delayFormatter, DelayCategory } from './delayFormatter';

interface DelayHighlightProps {
    delay: number | null;
}

const COLORS: Record<DelayCategory, string> = {
    none: 'rgb(0 0 0 / 0)', //0 alpha :D
    small: '#FFC107',
    medium: '#FF9800',
    large: '#F44336',
};

export const DelayHighlight = ({
                                   delay,
                               }: DelayHighlightProps) => {
    const scale = useRef(new Animated.Value(1)).current; //sets basic size of element as 1

    const { category, shouldAnimate } = delayFormatter(delay);

    const color = COLORS[category];

    useEffect(() => {
        if (!shouldAnimate) {
            scale.setValue(1);
            return;
        }

        const animation = Animated.loop( //this is responsible for constantly scaling between sizes
            Animated.sequence([
                Animated.timing(scale, {
                    toValue: 1.1,
                    duration: 600, //time spent in 'swelled' state
                    useNativeDriver: true,
                }),
                Animated.timing(scale, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
            ]),
        );

        animation.start();

        return () => {
            animation.stop();
        };
    }, [scale, shouldAnimate]);

    return (
        <Animated.View
            style={[
                styles.container,
                {
                    backgroundColor: color,
                    transform: [{ scale }],
                },
            ]}
        >
            <Text style={styles.text}>
                +{delay} s
            </Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({ //styles for element (CSS-like) maybe extract later to styles directory
    container: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
    },

    text: {
        color: '#FFFFFF',
        fontWeight: '600',
    },
});
