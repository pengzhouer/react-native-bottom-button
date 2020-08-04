import React, {useRef, useState, useMemo} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaProvider, initialWindowMetrics} from 'react-native-safe-area-context';
import {TouchableHighlight} from 'react-native-gesture-handler';

import BottomButtons, {ForwardRef} from 'react-native-bottom-button';

const App = () => {
    const bottomButtonsRef = useRef<null | ForwardRef>();
    const [loading, setLoading] = useState(false);
    const closeBottomButtons = () => {
        if(bottomButtonsRef.current){
            bottomButtonsRef.current.close();
        }
    }
    const forwardRef = useMemo(() => (ref: ForwardRef) => bottomButtonsRef.current = ref, []);
    const buttons = useMemo(() => (
        [
            {name: 'A', loading: loading, onPress: () => {
                setLoading(true);
                setTimeout(() => {
                    closeBottomButtons();
                    setLoading(false);
                }, 2000);
            }},
            {content: <Text style={{color: '#1d1d1d', fontSize: 17}}>B</Text>, onPress: () => {
                closeBottomButtons();
            }}
        ]
    ), [loading])
    return (
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
            <View style={styles.container}>
                <TouchableHighlight style={{borderRadius: 5}} onPress={() => {
                    if(bottomButtonsRef.current){
                        bottomButtonsRef.current.open();
                    }
                }}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>Press Me</Text>
                    </View>
                </TouchableHighlight>
                <BottomButtons
                    forwardRef={forwardRef}
                    buttons={buttons}
                />
            </View>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: 'gray',
        borderWidth: 1,
    },
    buttonText: {
        fontSize: 14,
    }
})

export default App