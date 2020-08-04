import React from 'react';
import Animated from 'react-native-reanimated';
export declare type ForwardRef = {
    open: () => void;
    close: () => void;
};
export declare const getBottomButtonsHeight: (length: number) => number;
declare type Props = {
    forwardRef?: (ref: ForwardRef) => void;
    buttons: Array<{
        name?: string;
        content?: any;
        loading?: boolean;
        onPress: () => void;
    }>;
    transition?: Animated.Value<number>;
};
declare function BottomButton(props: Props): JSX.Element;
declare const _default: React.MemoExoticComponent<typeof BottomButton>;
export default _default;
