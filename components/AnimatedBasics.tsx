import { useRef, useState } from 'react';
import { TextInput, View, Animated, Button, Easing } from 'react-native';
import RadioButtons from './shared/RadioButtons';

type AnimationType = 'spring' | 'timing';
const choices: AnimationType[] = ['spring', 'timing'];

const AnimatedBasics = () => {
  const xOffset = useRef(new Animated.Value(0)).current;
  const [animationDuration, setAnimationDuration] = useState(250);
  const [choice, setChoice] = useState<AnimationType>(choices[0]);

  const moveBoxRandom = () => {
    const randomSign = Math.random();
    const randomX =
      Math.floor(Math.random() * 150) * (randomSign > 0.5 ? 1 : -1);
    moveBox(randomX);
  };

  const animateWithSpring = (newPos: number) => {
    Animated.spring(xOffset, {
      toValue: newPos,
      useNativeDriver: true,
      speed: 1,
      bounciness: 8, // how many bouncing it will take for the box to stop
      //   duration: animationDuration,
    }).start();
  };

  const animateWithTiming = (newPos: number) => {
    Animated.timing(xOffset, {
      toValue: newPos,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const moveBox = (newPos: number) => {
    choice === 'spring' && animateWithSpring(newPos);
    choice === 'timing' && animateWithTiming(newPos);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={[
          {
            height: 50,
            width: 50,
            backgroundColor: 'red',
            opacity: xOffset.interpolate({
              inputRange: [-100, 0, 100],
              outputRange: [0.2, 1, 0.2],
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          },
          { transform: [{ translateX: xOffset }] },
        ]}
      />
      <Button title="Move the box" onPress={moveBoxRandom} />
      <Button title="Reset the box position" onPress={() => moveBox(0)} />
      <View style={{ marginTop: 32 }}>
        <RadioButtons
          choices={choices}
          value={choice}
          onChange={(newValue) => setChoice(newValue)}
          horizontal
        />
        <TextInput
          value={animationDuration.toString()}
          onChangeText={(newValue) =>
            setAnimationDuration(
              isNaN(parseInt(newValue)) ? 0 : parseInt(newValue)
            )
          }
          style={{
            marginTop: 16,
            fontSize: 20,
            fontWeight: '500',
            borderRadius: 16,
            borderWidth: 2,
            paddingVertical: 8,
            borderColor: '#d0d7de',
            color: '#57606a',
            textAlign: 'center',
          }}
        />
      </View>
    </View>
  );
};

export default AnimatedBasics;
