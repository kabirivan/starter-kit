import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroARSceneNavigator,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from '@viro-community/react-viro';

const ArScreen = ({route}) => {
  const {textAR} = route.params;

  console.log('textAr', textAR);

  ViroARTrackingTargets.createTargets({
    notebook: {
      source: require('../assets/qr.png'),
      orientation: 'Up',
      physicalWidth: 0.05, // real world width in meters
    },
  });

  const HelloWorldSceneAR = ({navigation}) => {
    const [text, setText] = useState('Initializing AR...');

    function onInitialized(state, reason) {
      console.log('guncelleme', state, reason);
      if (state === ViroConstants.TRACKING_NORMAL) {
        setText('Hello World!');
      } else if (state === ViroConstants.TRACKING_NONE) {
        // Handle loss of tracking
      }
    }

    return (
      <ViroARScene>
        <ViroARImageMarker
          target={'notebook'}
          onAnchorFound={() => console.log('works!')}>
          <ViroText
            text={textAR}
            scale={[0.1, 0.1, 0.1]}
            position={[0, 0.0, 0]}
            rotation={[-90, 0, 0]}
            style={styles.helloWorldTextStyle}
          />
        </ViroARImageMarker>
      </ViroARScene>
    );
  };

  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 40,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default ArScreen;
