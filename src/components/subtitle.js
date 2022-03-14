import React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';

const Subtitle = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'gray',
  },
  line: {
    borderBottomWidth: 1,
    marginLeft: 5,
    flex: 1,
    marginTop: 3,
    borderColor: '#eceff1',
  },
});

export default Subtitle;
