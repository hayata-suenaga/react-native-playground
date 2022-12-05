import { Key } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const RadioButtons = <T,>({
  choices,
  onChange,
  value,
  horizontal,
}: {
  choices: T[];
  onChange: (newValue: T) => void;
  value: T;
  horizontal?: boolean;
}) => {
  return (
    <View style={{ flexDirection: horizontal ? 'row' : 'column' }}>
      {choices.map((choice) => {
        return (
          <Pressable
            key={choice as Key}
            onPress={() => onChange(choice)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 16,
            }}
          >
            <View
              style={[
                styles.button,
                choice === value ? styles.active : styles.inactive,
              ]}
            />
            <Text>{choice as String}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default RadioButtons;

const BUTTON_SIZE = 25;
const styles = StyleSheet.create({
  button: {
    marginRight: 8,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    borderWidth: 4,
  },
  active: { borderColor: '#dafbe1', backgroundColor: '#2da44e' },
  inactive: { borderColor: '#d0d7de' },
});
