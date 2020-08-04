import React, { useMemo, useState, useEffect } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, BackHandler, Platform } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { timing } from 'react-native-redash';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const { Value, interpolate, useCode, cond, eq, set, Clock, not, clockRunning, call, block } = Animated;
function BottomBox(props) {
    const { forwardRef, children, height, containerStyle, transition: _transition } = props;
    const insets = useSafeAreaInsets();
    const [visible, setVisible] = useState(false);
    const goUp = useMemo(() => new Value(0), []);
    const goDown = useMemo(() => new Value(0), []);
    const transition = useMemo(() => _transition ? _transition : new Value(0), []);
    const upClock = useMemo(() => new Clock(), []);
    const downClock = useMemo(() => new Clock(), []);
    if (forwardRef) {
        forwardRef({
            open: () => {
                goUp.setValue(1);
                setVisible(true);
            },
            close: () => {
                goDown.setValue(1);
            },
        });
    }
    useCode(() => block([
        cond(eq(goUp, 1), [
            set(transition, timing({ clock: upClock, from: 0, to: 1, duration: 200, easing: Easing.bezier(0.61, 1, 0.88, 1) })),
            cond(not(clockRunning(upClock)), set(goUp, 0))
        ]),
        cond(eq(goDown, 1), [
            set(transition, timing({ clock: downClock, from: 1, to: 0, duration: 200, easing: Easing.bezier(0.61, 1, 0.88, 1) })),
            cond(not(clockRunning(downClock)), [
                set(goDown, 0),
                call([], () => {
                    setVisible(false);
                })
            ])
        ]),
    ]), []);
    useEffect(() => {
        if (visible && Platform.OS === 'android') {
            const handleBackButtonPressAndroid = () => {
                goDown.setValue(1);
                return true;
            };
            BackHandler.addEventListener('hardwareBackPress', handleBackButtonPressAndroid);
            return () => BackHandler.removeEventListener('hardwareBackPress', handleBackButtonPressAndroid);
        }
    }, [visible]);
    return (<View style={[StyleSheet.absoluteFill, { zIndex: visible ? 100 : -100, display: visible ? 'flex' : 'none' }]}>
            <TouchableWithoutFeedback onPress={() => {
        if (visible) {
            goDown.setValue(1);
        }
    }}>
                <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: 'black', opacity: interpolate(transition, {
                inputRange: [0, 1],
                outputRange: [0, 0.4]
            }) }]}/>
            </TouchableWithoutFeedback>
            <Animated.View style={[
        styles.container,
        containerStyle ? containerStyle : {},
        { height: height + insets.bottom, paddingBottom: insets.bottom },
        { transform: [{ translateY: interpolate(transition, {
                        inputRange: [0, 1],
                        outputRange: [height + insets.bottom, 0]
                    }) }] }
    ]}>
                {children}
            </Animated.View>
        </View>);
}
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#f7f7f7',
        width: '100%',
        bottom: 0,
    },
});
export default BottomBox;
