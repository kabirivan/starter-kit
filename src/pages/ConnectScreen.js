import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import {Formik} from 'formik';
import MQTT from 'sp-react-native-mqtt';

const MQTTScreen = ({navigation}) => {
  const [credentials, setCredentials] = useState({
    host: 'b44eefb2cd114616914f947cbfe39ee5.s1.eu.hivemq.cloud',
    tls: true,
    port: 8883,
    clientId: 'your_client_id',
    auth: true,
    user: 'test29',
    pass: 'Test2903',
  });
  const [bolEnable, setBolEnable] = useState(false);
  const [dataMessage, setDataMessage] = useState(null);
  /* create mqtt client */
  const publishMqtt = (device, status) => {
    MQTT.createClient(credentials)
      .then(function (client) {
        client.on('closed', function () {
          console.log('mqtt.event.closed');
          setBolEnable(false);
        });

        client.on('error', function (msg) {
          console.log('mqtt.event.error', msg);
          setBolEnable(false);
        });

        client.on('message', function (msg) {
          console.log('mqtt.event.message', msg);
          setDataMessage(msg.data);
          console.log('mensaje', msg.data);
          console.log('topic', msg.topic);
        });

        client.on('connect', function () {
          console.log('connected');
          setBolEnable(true);
          client.subscribe('/review_connection', 0);
          client.publish('/xavier', 'Works', 0, false);
        });

        client.connect();
      })
      .catch(function (err) {
        console.log(err);
        console.log('No works');
        setBolEnable(false);
      });
  };

  useEffect(() => {
    publishMqtt();
  }, []);

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{
          host: credentials.host,
          port: credentials.port.toString(),
          user: credentials.user,
          pass: credentials.pass,
        }}
        onSubmit={values => {
          console.log(values);
          setCredentials({
            ...credentials,
            host: values.host,
            port: parseInt(values.port, 10),
            user: values.user,
            password: values.password,
          });
          publishMqtt();
        }}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <TextInput
              placeholder="Host"
              onChangeText={handleChange('host')}
              onBlur={handleBlur('host')}
              value={values.host}
            />
            <TextInput
              placeholder="Port"
              onChangeText={handleChange('port')}
              onBlur={handleBlur('port')}
              value={values.port}
              keyboardType="numeric"
            />
            <TextInput
              placeholder="User"
              onChangeText={handleChange('user')}
              onBlur={handleBlur('user')}
              value={values.user}
            />
            <TextInput
              placeholder="Password"
              onChangeText={handleChange('pass')}
              onBlur={handleBlur('pass')}
              value={values.pass}
              secureTextEntry
            />
            <Button onPress={handleSubmit} title="Guardado" />
          </View>
        )}
      </Formik>
      <Text
        style={{
          marginTop: 50,
          marginBottom: 10,
          fontWeight: 'bold',
        }}>
        {`Estado: ${bolEnable ? 'Conectado' : 'Desconectado'}`}
      </Text>
      {!dataMessage ? (
        <Text
          style={{
            marginTop: 10,
            marginBottom: 50,
          }}>
          Esperando mensaje....
        </Text>
      ) : (
        <Text
          style={{
            marginTop: 10,
            marginBottom: 50,
            fontWeight: 'bold',
          }}>
          Mensaje recibido!
        </Text>
      )}
      {dataMessage && (
        <View style={{marginTop: 20}}>
          <Button
            title="Nueva Prueba"
            color="#841584"
            onPress={() => {
              navigation.navigate('Realidad Aumentada', {textAR: dataMessage});
              setTimeout(() => {
                setDataMessage(null)
              }, 100);
            }}
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

export default MQTTScreen;
