import React from 'react';
import { TextInput, View, Text } from 'react-native';
import styles from '../constants/styles';

const InputField = ({ label, value, onChangeText, placeholder, secureTextEntry = false, multiline = false }) => {
  return (
    <View style={{ marginBottom: 1 }}>
      {label && <Text style={[styles.text, { fontWeight: 'bold' }]}>{label}</Text>}
      <TextInput
        style={[styles.input, multiline && { height: 100, textAlignVertical: 'top' }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        multiline={multiline}
      />
    </View>
  );
};

export default InputField;