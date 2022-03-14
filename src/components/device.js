import React from 'react';
import {
  View,
  Text,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Separator from './separator';

const Device = props => {
  return (
    <>
      <TouchableOpacity style={styles.wrapper} onPress={props.onPress}>
        <View style={styles.wrapperLeft}>
          {/* <Image style={styles.iconLeft} source={props.iconLeft} /> */}
        </View>
        <View style={styles.wrapperName}>
          <Text style={styles.name}>{props.name}</Text>
        </View>
        {/* <Image style={styles.iconRight} source={props.iconRight} /> */}
      </TouchableOpacity>
      <Separator />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'space-between',
  },
  wrapperLeft: {
    width: 10,
    height: 10,
    borderRadius: 20,
    borderColor: 'gray',
    borderWidth: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconLeft: {
    width: 20,
    height: 20,
  },
  wrapperName: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
  },
  name: {
    justifyContent: 'flex-start',
    marginLeft: 15,
    flex: 1,
  },
  iconRight: {
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1,
  },
});

export default Device;
