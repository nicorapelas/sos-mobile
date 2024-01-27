import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

import { normalize } from '../../../../utils/fontUtils'

const SubmitButton = ({ onPress, title = 'Submit' }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    width: '70%',
    paddingVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    color: '#ffffff',
    fontSize: normalize(14),
    fontWeight: 'bold',
  },
});

export default SubmitButton;
