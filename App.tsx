import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import PropTypes from 'prop-types';

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

const HomeScreen = ({ route }) => {
  const { scannedData } = route.params || {};
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>QR Code Scanner App</Text>
      {scannedData ? (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Scanned Data: {scannedData}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Scanner')}
          >
            <Text style={styles.buttonText}>Scan New Item</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Scanner')}
        >
          <Text style={styles.buttonText}>Scan New Item</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const ScannerScreen = () => {
  const [scannedData, setScannedData] = useState<string | null>(null);
  const navigation = useNavigation();

  const onBarCodeRead = (event: BarCodeReadEvent) => {
    console.log('Barcode Read:', event.data);
    if (event.data) {
      setScannedData(event.data);
    }
  };

  useEffect(() => {
    if (scannedData) {
      navigation.navigate('Home', { scannedData });
    }
  }, [scannedData, navigation]);

  return (
    <View style={styles.fullContainer}>
      {!scannedData && (
        <RNCamera
          style={styles.fullCamera}
          type={RNCamera.Constants.Type.front}
          onBarCodeRead={onBarCodeRead}
          captureAudio={false}
        />
      )}
      {scannedData && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>Scanned Data: {scannedData}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Home')}
          >
            <Text style={styles.buttonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

HomeScreen.propTypes = {
  route: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  fullContainer: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  fullCamera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
  },
});

export default App;
