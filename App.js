import * as React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BluetoothScreen from './src/pages/BluetoothScreen';
import ArScreen from './src/pages/ArScreen';
import ConnectScreen from './src/pages/ConnectScreen';

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Presiona para iniciar...</Text>
      <Button
        title="Establecer Conexión"
        color='#841584'
        onPress={() => navigation.navigate('Connection')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Bluetooth" component={BluetoothScreen} />
        <Stack.Screen name="Realidad Aumentada" component={ArScreen} />
        <Stack.Screen name="Connection" component={ConnectScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
