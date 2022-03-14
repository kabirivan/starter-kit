import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Button, Alert} from 'react-native';
import Toggle from '../components/toogle';
import Subtitle from '../components/subtitle';
import BluetoothSerial, {read} from 'react-native-bluetooth-serial-next';
import Device from '../components/device';

const BluetoothScreen = ({navigation}) => {
  const [list, setList] = useState([]);
  const [bolEnable, setBolEnable] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = React.useState('a');
  const [dataMessage, setDataMessage] = useState(false);
  const [message, setMessage] = useState('New');

  console.log('disp', selectedId);
  const renderItem = ({item}) => {
    return (
      <Device
        {...item}
        onPress={() => connectDevice(item)}
        newSelected={selectedId}
      />
    );
  };

  const connectDevice = async item => {
    try {
      setSelectedId(item);
      const device = await BluetoothSerial.connect(item.id);
      console.log('connectDevice', device);
    } catch (error) {
      console.log('No se pudo conectar');
    }
  };

  useEffect(() => {
    async function init() {
      const enable = await BluetoothSerial.requestEnable();
      const lista = await BluetoothSerial.list();
      console.log('lista', lista);
      setList(lista);
      setBolEnable(enable);
    }

    init();

    return () => {
      async function remove() {
        await BluetoothSerial.stopScanning();
        console.log('Termino scanner');
      }

      remove();
    };
  }, []);

  const enableBluetooth = async () => {
    try {
      await BluetoothSerial.requestEnable();
      const lista = await BluetoothSerial.list();
      await BluetoothSerial.stopScanning();
      setBolEnable(true);
      setList(lista);
    } catch (error) {
      console.log(error);
    }
  };

  const disableBluetooth = async () => {
    try {
      await BluetoothSerial.disable();
      await BluetoothSerial.stopScanning();
      setBolEnable(false);
      setSelectedId(null);
      setList([]);
      setDataMessage(false);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleBluetooth = value => {
    if (value) {
      return enableBluetooth();
    }
    disableBluetooth();
  };

  const readData = async () => {
    setStatus(status === 'a' ? 'd' : 'a');
    try {
      await BluetoothSerial.device(selectedId.id).write(status);
      const data = await BluetoothSerial.readUntilDelimiter('\r\n');
      setMessage(data);
      setDataMessage(true);
      console.log('Your data:', data);
    } catch (e) {
      setDataMessage(false);
      console.log(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Toggle value={bolEnable} onValueChange={toggleBluetooth} />
      <Subtitle title={'Lista de dispositivos'} />
      <FlatList
        data={list}
        ListEmptyComponent={() => <Text> No hay dispositivos</Text>}
        renderItem={renderItem}
        // keyExtractor={item => console.log('dispositivo2', item)}
        extraData={selectedId}
      />
      {selectedId && (
        <>
          <Text
            style={{
              marginTop: 50,
              marginBottom: 50,
              fontWeight: 'bold',
            }}>{`Dispositivo Seleccionado: ${
            selectedId.name ? selectedId.name : 'Ninguno'
          }`}</Text>
          <Button
            title="Comprobar"
            style={{marginTop: 50, marginBottom: 50}}
            onPress={() => readData()}
          />
        </>
      )}
      {dataMessage && (
        <View style={{marginTop: 50}}>
          <Button
            title="AR"
            onPress={() =>
              navigation.navigate('Realidad Aumentada', {textAR: message})
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 25,
    backgroundColor: '#f5fcff',
  },
  title: {
    fontSize: 18,
  },
});

export default BluetoothScreen;
