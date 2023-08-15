import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';

const InputView = () => {
  const [inputText, setInputText] = useState('');

  const handleSubmit = () => {
    if (inputText.trim() === '') {
      Alert.alert('Error', 'Please enter some text.');
      return;
    }

    // Process the submitted text here
    console.log('Submitted text:', inputText);

    // Reset the input field
    setInputText('');
  };

  return (
    <View>
      <Text>Simulate a form</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10 }}
        onChangeText={setInputText}
        value={inputText}
        placeholder={'This is a required prop'}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default InputView;
