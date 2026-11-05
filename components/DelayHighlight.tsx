import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { DepartureDelay } from '@/src/domain/value-objects/DepartureDelay';

export interface DelayHighlightProps {
    delayInSeconds: number | null | undefined;
}

export function DelayHighlight({ delayInSeconds}: DelayHighlightProps){
    const delay = new DepartureDelay(delayInSeconds);
    const opacityAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (delay.shouldAnimate) {
            const pulseAnimation = Animated.loop(
                Animated.sequence([
                    Animated.timing(opacityAnim, {
                        toValue: 0.25,
                        duration: 700,
                        useNativeDriver: true,
                    }),
                    Animated.timing(opacityAnim, {
                        toValue: 1.0,
                        duration: 700,
                        useNativeDriver: true,
                    }),
                ])
            );
            pulseAnimation.start();

            return () => pulseAnimation.stop();
        } else {
            opacityAnim.setValue(1.0);
        }
    }, [delay.shouldAnimate, opacityAnim]);

    const styleBySeverity =
        delay.severity === 'ON_TIME'
            ? styles.onTime
            : delay.severity === 'MINOR'
                ? styles.minor
                : styles.major;

    return (
        <Animated.Text style={[styles.baseText, styleBySeverity, { opacity: opacityAnim }]}>
            {delay.formattedText}
        </Animated.Text>
    );
}

export default DelayHighlight;

const styles = StyleSheet.create({
    baseText: {
        fontSize: 13,
    },
    onTime: {
        color: '#16A34A',
        fontWeight: '600',
    },
    minor: {
        color: '#D97706',
        fontWeight: '600',
    },
    major: {
        color: '#DC2626',
        fontWeight: 'bold',
    },
});