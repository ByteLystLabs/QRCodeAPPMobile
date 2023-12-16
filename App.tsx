import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>QR Code Scanner App</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Scanner')}
      >
        <Text style={styles.buttonText}>Scan New Item</Text>
      </TouchableOpacity>
    </View>
  );
};

const ScannerScreen = ({ navigation }) => {
  const [scannedData, setScannedData] = useState(null);

  const onBarCodeRead = (result) => {
    Alert(result);
    if (result.data) {
      setScannedData(result.data);
      navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={onBarCodeRead}
        captureAudio={false}
      />
      {scannedData && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Scanned Data: {scannedData}</Text>
        </View>
      )}
    </View>
  );
};

// PropTypes for ScannerScreen component
ScannerScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  style: View.propTypes.style, // Apply View.propTypes.style
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
