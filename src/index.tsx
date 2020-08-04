import React from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import Animated from 'react-native-reanimated';
import {TouchableHighlight} from "react-native-gesture-handler";
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import BottomBox from './BottomBox';

const ITEM_HEIGHT = 55;
const SEPARATOR_HEIGHT = 8;

export type ForwardRef = {open: () => void, close: () => void}

export const getBottomButtonsHeight = (length: number) => length * (ITEM_HEIGHT + SEPARATOR_HEIGHT) - SEPARATOR_HEIGHT;

type Props = {
    forwardRef?: (ref: ForwardRef) => void,
    buttons: Array<{
        name?: string,
        content?: any,
        loading?: boolean,
        onPress: () => void,
    }>,
    transition?: Animated.Value<number>
}

function BottomButton(props: Props){
    const {forwardRef, buttons, transition} = props;
    const insets = useSafeAreaInsets();
    return (
        <BottomBox
            height={buttons.length * ITEM_HEIGHT + (buttons.length - 1) * SEPARATOR_HEIGHT}
            forwardRef={forwardRef}
            containerStyle={styles.container}
            transition={transition}
        >
            {buttons.map((x, i) => {
                const extraStyle = i === 0 ? styles.buttonTop : (i === buttons.length - 1 ? {paddingBottom: insets.bottom, height: ITEM_HEIGHT + insets.bottom} : {});
                return (
                    <React.Fragment key={i}>
                        <TouchableHighlight onPress={x.onPress} style={extraStyle}>
                            <View style={[styles.buttonContainer, extraStyle]}>
                                {x.name && !x.loading && <Text style={styles.buttonText}>{x.name}</Text>}
                                {x.content && !x.loading ? x.content : null}
                                {x.loading ? <ActivityIndicator/> : null}
                            </View>
                        </TouchableHighlight>
                        {i !== buttons.length - 1 && <View style={styles.separator}></View>}
                    </React.Fragment>
                )
            })}
        </BottomBox>
    )
}

const styles = StyleSheet.create({
    container: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
    },
    buttonContainer: {
        width: '100%',
        height: ITEM_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'white'
    },
    buttonTop: {
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        overflow: 'hidden',
    },
    buttonText: {
        color: '#1d1d1d',
        fontSize: 17,
    },
    separator: {
        width: '100%',
        height: SEPARATOR_HEIGHT,  
        backgroundColor: '#f7f7f7'
    }
})

export default React.memo(BottomButton)