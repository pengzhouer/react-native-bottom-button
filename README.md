# react-native-bottom-button

`react-native-bottom-button` is a performant, extendable, production ready React Native component that renders an animated set of upglide buttons.

<img width="280" src='https://raw.githubusercontent.com/13773753970/images/master/bottom-button.gif'/>

### Dependencies

`react-native-reanimated` : https://github.com/software-mansion/react-native-reanimated

`react-native-gesture-handler` : https://github.com/software-mansion/react-native-gesture-handler

`react-native-safe-area-context` : https://github.com/th3rdwave/react-native-safe-area-context

`react-native-redash` : https://github.com/wcandillon/react-native-redash

### Installation
```
yarn add react-native-reanimated react-native-gesture-handler react-native-safe-area-context react-native-redash
```
```
cd ios && pod install
```
```
yarn add react-native-bottom-button
```

## Usage

### Basic

```jsx
import BottomButtons, {ForwardRef} from 'react-native-bottom-button';

function PageA() {
    const bottomButtonsRef = useRef<null | ForwardRef>();
    const closeBottomButtons = () => {
        if(bottomButtonsRef.current){
            bottomButtonsRef.current.close();
        }
    }
    const forwardRef = useMemo(() => (ref: ForwardRef) => bottomButtonsRef.current = ref, []);
    const buttons = [
        {name: 'A', onPress: closeBottomButtons},
        {name: 'B', onPress: closeBottomButtons}
    ]
    return (
        <View style={styles.container}>
            <TouchableHighlight onPress={() => {
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
    )
}
```

### Custom button content

```jsx
const buttons = [
    {content: <Text style={{color: '#1d1d1d', fontSize: 17}}>B</Text>, onPress: closeBottomButtons},
    {content: <Text style={{color: '#1d1d1d', fontSize: 17}}>B</Text>, onPress: closeBottomButtons}
]
```

### loading

```jsx
const [loading, setLoading] = useState(false);
const buttons = [
    {name: 'A', loading: loading, onPress: () => {
        setLoading(true);
        setTimeout(() => {
            closeBottomButtons();
            setLoading(false);
        }, 2000);
    }}
]
```

### transition
```jsx
const transition = useMemo(() => new Animated.Value(0), []);
// you can use transition to control extra relevant 
return (
    <BottomButtons
        forwardRef={forwardRef}
        buttons={buttons}
        transition={transition}
    />
)
```

## Example

The source code for the example (showcase) app is under the Example/ directory. If you want to play with the API but don't feel like trying it on a real app, you can run the example project. Clone the repo, go to the Example/ folder and run:

```
yarn
```

### Running on iOS

Before running the app, install the cocoapods dependencies:

```
cd ios && pod install && cd ..
```

Now, you can start the app:

```
react-native run-ios
```

### Running on Android

Run the react native's cli command:

```
react-native run-android
```

#### Important: 
You will need to have an Android or iOS device or emulator connected as well as react-native-cli package installed globally.

## License

MIT. Copyright (c) 2020 Daniel Bryan.
