/// <reference types="react" />
import { ViewStyle, StyleProp } from 'react-native';
import Animated from 'react-native-reanimated';
declare type Props = {
    forwardRef?: (ref: {
        open: () => void;
        close: () => void;
    }) => void;
    children: any;
    height: number;
    containerStyle?: StyleProp<ViewStyle>;
    transition?: Animated.Value<number>;
};
declare function BottomBox(props: Props): JSX.Element;
export default BottomBox;
